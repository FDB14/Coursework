const express = require('express')
const app = express()
const port = 8383
const fs = require('fs'); 
const cors = require("cors")
const {Client} = require('pg')

const client = new Client({
    host : "localhost",
    user : "admin",
    port : 5432,
    password : "root",
    database : "mainconnection"
})

app.use(express.json())
app.use(cors())

app.listen(port, () => console.log(`server has started on port: ${port}`))

app.post('/team', async (req, res) => {
    const {package} =  await req.body
    const user_id = await Get_User_Id(package)
    const data = await Send_Players_Team(user_id)
    console.log(data)
    res.json({data : data})
})

app.post('/delete', async(req, res) => {
    const {package} = await req.body
    if (!package){
        return res.status(400).send({status : 'failed'})
    }
    res.status(200).send({status: 'recieved'})
    let userId = await Get_User_Id(package)
    await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${package.player_id} AND user_id = '${userId}';`)
})
 
app.post('/', (req, res) => {
    const {package} = req.body
    if (!package){
        return res.status(400).send({status : 'failed'})
    }
    res.status(200).send({status: 'recieved'})
    Send_Team_Info(package)
})

app.get('/getdefender', async(req, res) => {
    let obj = await Get_Players_From_Db('Defender')
    res.status(200).json({data : obj})
})

app.get('/getmidfield', async(req, res) => {
    let obj = await Get_Players_From_Db('Midfielder')
    res.status(200).json({data : obj})
})

app.get('/getgoalkeeper', async(req, res) => {
    let obj = await Get_Players_From_Db('Goalkeeper')
    res.status(200).json({data : obj})
})

app.get('/getforward', async(req, res) => {
    let obj = await Get_Players_From_Db('Attacker')
    res.status(200).json({data : obj})
})

app.post('/getid', (req, res) => {
    const {package} = req.body
    if (!package){
        return res.status(400).send({status : 'failed'})
    }
    res.status(200).send({status: 'recieved'})
})

app.get('/teamscore', async (req, res) => {
    const data = await calc_score()
    res.status(200).json({data : data})
})

client.connect()

function Get_User_Id(package){
    let userId = (package.userId)
    if(userId.includes("google-oauth2|")){
        userId = userId.replace("google-oauth2|", "")
    }else if(userId.includes("apple|")){
        userId = userId.replace("apple|", "")
    }else if(userId.includes("auth0|")){
        userId = userId.replace("auth0|", "")
    }else{
        return
    }
    return userId
}

async function Send_Team_Info(package){
    try{
        let response = await client.query(`INSERT INTO userteam(player_id, user_id) VALUES(${Number(package.playerId)}, '${(Get_User_Id(package))}');`)

        let res = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 4 AND position = 'Defender');`)
        if(res.rowCount > 4){
            await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res.rows[0].player_id} AND position = 'Defender' AND user_id = '${Get_User_Id(package)}';`)
        }

        let res1 = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 1 AND position = 'Goalkeeper');`)
        if(res1.rowCount > 1){
            await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res1.rows[0].player_id} AND position = 'Goalkeeper' AND user_id = '${Get_User_Id(package)}';`)
        }

        let res2 = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 3 AND position = 'Midfielder');`)
        if(res2.rowCount > 3){
            await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res2.rows[0].player_id} AND position = 'Midfielder' AND user_id = '${Get_User_Id(package)}';`)
        }
        
        let res3 = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 3 AND position = 'Attacker');`)
        if(res3.rowCount > 3){
            await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res3.rows[0].player_id} AND position = 'Attacker' AND user_id = '${Get_User_Id(package)}';`)
        }

        return response
    }
    catch(error){
        console.error(`Error: ${error}`)
    }
}

async function Send_Players_Team(id){
    try{
        var response = await client.query(`SELECT id, playername, nationality, teamicon, rating, position FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id = '${id}';`)
    }catch(error){
        console.error(`Error: ${error}`)
    }
    let foo = response.rows
    return foo
}

async function Get_Players_From_Db(position){
    try{
        var response = await client.query(`SELECT id, playername, playerlast, nationality, age, height, minutes, goals, assists, rating, team FROM playersmain WHERE position = '${position}';`)
    }catch(error){
        console.error(`Error: ${error}`)
    }
    return (response.rows)
}

async function calc_score(){
    let score = 0
    let response = await client.query(`SELECT appearances, goals, assists, passes, conceded, yellow, yellowred, red, minutes, duelswon, penwon, penscored, penmissed, pencommited FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id = '001219.564b1b03e5434e05b8e08af147f58012.1528'`)
    response.rows.map((player) => {
        if(player.appearances > 0){
            score += player.minutes / 30
            score += 5 * player.goals
            score += 3 * player.assists
            score += player.passes / 30
            score -= player.conceded / 4
            score -= 2 * player.yellow
            score -= 2 * player.yellowred
            score -= 5 * player.red
            score += player.duelswon
            score += player.penwon
            score -= player.penscored
            score += player.penmissed
            score -= player.pencommited
        }
    })
    console.log(score)
    return(Math.round(score))
}
