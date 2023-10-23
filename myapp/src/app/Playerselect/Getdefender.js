const {Client} = require('pg')

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
        let response = await client.query(`SELECT id, playerlast, nationality, age, height FROM playersmain WHERE position = 'Defender';`)
        return response
    }
    catch(error){
        console.error(`Error: ${error}`)
    }

}

export default Defenders().then(responses =>
    responses.rows
);


