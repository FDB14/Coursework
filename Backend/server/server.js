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

let obj = JSON.parse(fs.readFileSync('../test.json', 'utf8'));

app.get('/info', (req, res) => {
    res.json({data : obj});
});

app.post('/', (req, res) => {
    const {package} = req.body
    if (!package){
        return res.status(400).send({status : 'failed'})
    }
    res.status(200).send({status: 'recieved'})
    console.log(`${JSON.stringify(package)}`)
})

client.connect()

async function Send_Team_Info(){
    try{
        let response = await client.query(`INSERT INTO USERTEAM player_id, user_id VALUES (${temp}, ${parcel})`)
        client.end()
        return response
    }
    catch(error){
        console.error(`Error: ${error}`)
    }
}
