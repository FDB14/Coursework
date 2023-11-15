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

app.post('/team', (req, res) => {
    const package = req.body.package.sub
    console.log(package)
})

app.get('/team', async (req, res) => {
    const data = await Send_Players_Team()
    console.log(data)
    res.status(200).json({data : data})
})

let obj = JSON.parse(fs.readFileSync('../test.json', 'utf8'));
 
app.get('/info', (req, res) => {
    res.status(200).json({data : obj});
});

app.post('/', (req, res) => {
    const {package} = req.body
    if (!package){
        return res.status(400).send({status : 'failed'})
    }
    res.status(200).send({status: 'recieved'})
    Send_Team_Info(package)
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

        let res = await client.query(`SELECT DISTINCT * FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id IN(SELECT user_id FROM(SELECT user_id, ROW_NUMBER() OVER(PARTITION BY user_id) AS occurrences FROM userteam) AS duplicates WHERE duplicates.occurrences > 4);`)

        res.rows.map((players) => (
            console.log(players.position)
        ))
        
        if(res.rowCount > 4){
            let foo = await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${res.rows[0].player_id} AND position = 'Defender';`)
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

