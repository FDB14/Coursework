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

app.use(cors())
app.use(express.json())

app.listen(port, () => console.log(`server has started on port: ${port}`))

app.get('/team', async (req, res) => {
    const data = await Send_Players_Team()
    res.status(200).json({data : (data)})
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
    console.log(package.sub)
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
    }
    return userId
}

async function Send_Team_Info(package){
    try{
        let response = await client.query(`INSERT INTO userteam(player_id, user_id) VALUES(${Number(package.playerId)}, ${(Get_User_Id(package))});`)

        let res = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 4 AND position = 'Defender');`)
        if(res.rowCount > 4){
            await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res.rows[0].player_id} AND position = 'Defender';`)
        }

        let res1 = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 1 AND position = 'Goalkeeper');`)
        if(res1.rowCount > 1){
            await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res1.rows[0].player_id} AND position = 'Goalkeeper';`)
        }

        let res2 = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 3 AND position = 'Midfielder');`)
        if(res2.rowCount > 3){
            await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res2.rows[0].player_id} AND position = 'Midfielder';`)
        }
        
        let res3 = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 3 AND position = 'Attacker');`)
        if(res3.rowCount > 3){
            await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res3.rows[0].player_id} AND position = 'Attacker';`)
        }

        return response
    }
    catch(error){
        console.error(`Error: ${error}`)
    }
}

async function Send_Players_Team(){
    try{
        var response = await client.query(`SELECT playername, nationality, teamicon, rating, position FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id = '104658729806845260677';`)
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

