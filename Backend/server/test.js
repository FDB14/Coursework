const {Client} = require('pg')
const key = process.env.PG_PASS;

const client = new Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : `${key}`,
    database : "fantasyfootball"
})

client.connect()

async function getTEAM(){
    try{
        let temp = await client.query('SELECT * FROM ffootti.userteam;')
        return temp
    }catch(error){
        console.error(error)
    }
}

async function awaitpls(){
    let temp = await getTEAM()
    console.log(temp)
}

awaitpls()