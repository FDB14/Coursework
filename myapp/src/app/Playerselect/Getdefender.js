const {Client} = require('pg')
const { error } = require('console');
const { writeFileSync } = require('fs');

const client = new Client({
    host : "localhost",
    user : "admin",
    port : 5432,
    password : "root",
    database : "mainconnection"
})

client.connect();


async function Defenders(){
    try{
        let response = await client.query(`SELECT id, playername, playerlast, nationality, age, height, minutes, goals, assists, rating, team FROM playersmain WHERE position = 'Defender';`)
        client.end
        return response
    }
    catch(error){
        console.error(`Error: ${error}`)
    }

}


const path = './test.json';
Defenders().then(response => {return JSON.stringify(response.rows)})
.then(response => {writeFileSync(path, response, 'utf-8')})