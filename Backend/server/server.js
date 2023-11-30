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
    const user_credit = await Get_User_Credit(user_id)
    const bar = await Save_User_Score(user_id)
    res.json({data : data, credit : user_credit})
})

app.post('/delete', async(req, res) => {
    const {package} = await req.body
    if (!package){
        return res.status(400).send({status : 'failed'})
    }
    res.status(200).send({status: 'recieved'})
    let userId = await Get_User_Id(package)
    await client.query(`DELETE FROM userteam USING playersmain WHERE userteam.player_id = playersmain.id AND player_id = ${package.player_id} AND user_id = '${userId}';`)
    await client.query(`UPDATE useraccount SET user_credit = user_credit + ${Math.round(package.player_cost * 10)} -2 WHERE auth0_id = '${userId}';`)
})
 
app.post('/', async(req, res) => {
    const {package} = req.body
    if(!package){
        res.status(400).send({status : 'invalid'})
    }
    const foo = await Send_Team_Info(package)
    if(foo){
        res.status(200).send({status: 'recieved'})
    }else{
        res.status(200).send({status : 'false'})
    }
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

app.post('/teamscore', async (req, res) => {
    const {package} =  await req.body
    const user_data = await Get_User_Id(package)
    const foo = await Get_User_Score(user_data)
    const bar = user_data.user_name
    res.json({data : foo, user_name : bar})
})

app.post('/usercredit', async(req, res) => {
    const {package} = req.body
    const player_cost = Math.round(package.rating * 10)
    console.log(package)
    const playerId = await Get_User_Id(package)
    Update_User_Credit(player_cost, playerId)
    if(!package){
        return res.status(400).send({status : 'failed'})
    }
})

app.post('/saveuser', async(req, res) => {
    const {package} = req.body
    if(package == true){
        await Save_User()
        return res.send({status : 'success'})
    }
})

app.get('/ranking', async(req, res) => {
    let obj = await Get_All_User_Score()
    res.status(200).json({data : obj})
})

client.connect()

function Update_User_Credit(cost, id){
    if(cost > 20){
        let response = client.query(`UPDATE useraccount SET user_credit = user_credit - ${cost} WHERE auth0_id = '${id}';`)
    }else{
        client.query(`UPDATE useraccount SET user_credit = user_credit - 20 WHERE auth0_id = '${id}';`)
    }
}

function Get_User_Id(package){
    let userId = (package.userId)
    if(userId.includes("google-oauth2|")){
        userId = userId.replace("google-oauth2|", "")
    }else if(userId.includes("apple|")){
        userId = userId.replace("apple|", "")
    }else if(userId.includes("auth0|")){
        userId = userId.replace("auth0|", "")
    }else{
        userId = userId
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

async function calc_score(id){
    let score = 0
    let response = await client.query(`SELECT appearances, goals, assists, passes, conceded, yellow, yellowred, red, minutes, duelswon, penwon, penscored, penmissed, pencommited FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id = '${id}'`)
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

async function Get_User_Score(id){
    let response = await client.query(`SELECT userscore FROM useraccount WHERE auth0_id = '${id}';`)
    return response.rows[0].userscore
}

async function Get_All_User_Score(){
    let response = await client.query(`SELECT userscore, userid, auth0_id, user_name FROM useraccount;`)
    console.log(response)
    return response.rows
}

async function Get_User_Credit(user_id){
    try{
        var res = await client.query(`SELECT user_credit FROM useraccount WHERE auth0_id = '${user_id}'`)
    }catch(error){
        console.error(error)
    }
    return res.rows
}

async function Save_User_Score(id){
    let score = 0 
    try{
        var res = await client.query(`SELECT appearances, goals, assists, passes, conceded, yellow, yellowred, red, minutes, duelswon, penwon, penscored, penmissed, pencommited FROM userteam INNER JOIN playersmain ON player_id = id WHERE user_id = '${id}'`)
        res.rows.map((player) => {
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
        var send = client.query(`UPDATE useraccount SET userscore = ${score} WHERE auth0_id = '${id}'`)
    }catch(error){
        console.error(error)
    }
}

async function Save_User(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijc1UkROc2tjb29lNkkxYUpCam9kOSJ9.eyJpc3MiOiJodHRwczovL2Rldi1hYTJ5NW03ZGsxanBuN3pvLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkTE5jS3NLQnZ5ZG9hOTU2QTJEVXJLUHFFTThERE9zV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtYWEyeTVtN2RrMWpwbjd6by51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcwMDU3NjE2NiwiZXhwIjoxNzAzMTY4MTY2LCJhenAiOiJkTE5jS3NLQnZ5ZG9hOTU2QTJEVXJLUHFFTThERE9zVyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOmNsaWVudF9jcmVkZW50aWFscyBjcmVhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIHVwZGF0ZTpjbGllbnRfY3JlZGVudGlhbHMgZGVsZXRlOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.ZYvHhwYHU5Dl2-suBGA0SxVUJFlucxyshNrEk7dASlNAusMNAqy3ekQGXCS7kxsAVaupmhBbTfgHnxk7NCRq38BIOL1W9wmD6MQw4A34aJtx0n4WFnf8N_G1buOF8t1K4HznRJ5vdaG7iDR-CDMPvuDLz7nWRKgWCpt4T_33XL_RX_CNF_c07HrkDkiZC0QpXkqDsjnn9c1tam3BIZPXDtYEsRxfXr6iodmMwreEQ9d-JnzwgRI11m6d9O5ZMG9ZpHo5bM7XPb4oZkPJ_y72zXdYEY4GdM0x-7dKl9riDHeLvntI63IEI2lN0kDmiqAQPcOIkZY9IHLsXFSmKv__PA");
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://dev-aa2y5m7dk1jpn7zo.us.auth0.com/api/v2/users?fields=name%2Cidentities&include_fields=true", requestOptions)
    .then(response => response.json())
    .then(response => {
        for(let i = 0; i < response.length; i++){
            let user_id = response[i].identities[0].user_id
            let user_name = response[i].name
            console.log(user_id)
            client.query(`INSERT INTO useraccount (auth0_id, user_name) VALUES ('${user_id}', '${user_name}');`, (err, res)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`user's id inserted successfully ${i+1}`)
                }
            })
        }
    })
    .catch(error => console.log('error', error));
}