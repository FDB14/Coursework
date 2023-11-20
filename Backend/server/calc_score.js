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

client.connect()

app.get('/teamscore', async(req, res) => {
    const data = await calc_score('104658729806845260677')
    res.status(200).json({data : data})
})

async function calc_score(id){
    let response = await client.query(`SELECT appearances, goals, assists, passes, conceded, yellow, yellowred, red FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id = ${id}`)
    console.log(response.rows)
}
