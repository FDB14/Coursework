const key = process.env.PG_PASS;
const express = require('express')
const app = express()
const port = 8383
const fs = require('fs'); 
const cors = require("cors")
const {Client} = require('pg')

const client = new Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : `${key}`,
    database : "fantasyfootball"
})

app.use(express.json())
app.use(cors())

app.listen(port, () => console.log(`server has started on port: ${port}`))

client.connect()

app.post('/team', async (req, res) => {
    const {package} =  await req.body
    const user_id = await Get_User_Id(package)
    const data = await Send_Players_Team(user_id)
    const user_credit = await Get_User_Credit(user_id)
    Save_User_Score(user_id)
    res.json({data : data, credit : user_credit})
})

app.post('/viewplayer', async(req, res) => {
    const {package} = await req.body
    const foo = await viewPlayer(package)
    res.json({data : foo})
})

app.post('/delete', async(req, res) => {
    const {package} = await req.body
    if (!package){
        return res.status(400).send({status : 'failed'})
    }
    res.status(200).send({status: 'recieved'})
    let userId = await Get_User_Id(package)
    await client.query(`DELETE FROM ffootti.userteam USING ffootti.playersmain WHERE ffootti.userteam.player_id = ffootti.playersmain.id AND player_id = ${package.player_id} AND user_id = '${userId}';`)
    if(package.player_cost * 10 > 20){
        await client.query(`UPDATE ffootti.useraccount SET user_credit = user_credit + ${Math.round(package.player_cost * 10)} -2 WHERE auth0_id = '${userId}';`)
    }else{
        client.query(`UPDATE ffootti.useraccount SET user_credit = user_credit + 18 WHERE auth0_id = '${userId}' `)
    }
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

app.get('/defender', async(req, res) => {
    let obj = await Get_Players_From_Db('Defender')
    res.status(200).json({data : obj})
})

app.get('/midfield', async(req, res) => {
    let obj = await Get_Players_From_Db('Midfielder')
    res.status(200).json({data : obj})
})

app.get('/goalkeeper', async(req, res) => {
    let obj = await Get_Players_From_Db('Goalkeeper')
    res.status(200).json({data : obj})
})

app.get('/forward', async(req, res) => {
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


function Update_User_Credit(cost, id){
    if(cost > 20){
        let response = client.query(`UPDATE ffootti.useraccount SET user_credit = user_credit - ${cost} WHERE auth0_id = '${id}';`)
    }else{
        client.query(`UPDATE ffootti.useraccount SET user_credit = user_credit - 20 WHERE auth0_id = '${id}';`)
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
        let foo = await client.query(`SELECT position, rating FROM ffootti.playersmain WHERE id = ${package.playerId}`)
        let temp = 0
        let pos = (foo.rows[0].position)
        if(pos == 'Attacker'){
            temp = 3
        }else if(pos == 'Midfielder'){
            temp = 3
        }else if(pos == 'Defender'){
            temp = 4
        }else if(pos == 'Goalkeeper'){
            temp = 1 
        }

        let response = await client.query(`INSERT INTO ffootti.userteam(player_id, user_id, dateadded) VALUES(${Number(package.playerId)}, '${(Get_User_Id(package))}', ${Date.now()});`)
        
        let res1 = await client.query(`SELECT user_id, position, COUNT(position) FROM ffootti.userteam INNER JOIN ffootti.playersmain ON userteam.player_id = playersmain.id WHERE user_id = '${Get_User_Id(package)}' AND position = '${foo.rows[0].position}' GROUP BY user_id, position`)
        console.log(res1.rows)


        if(res1.rows[0].count > temp){
            let res = await client.query(`DELETE FROM ffootti.userteam WHERE player_id = ${package.playerId} AND user_id = '${res1.rows[0].user_id}';`)
            client.query(`UPDATE ffootti.useraccount SET user_credit = user_credit + ${Math.round((foo.rows[0].rating) * 10)} WHERE auth0_id = '${userId}'`)
            }

        return response
    }
    catch(error){
        console.error(`Error: ${error}`)
    }
}

async function Send_Players_Team(id){
    try{
        var response = await client.query(`SELECT id, playername, nationality, teamicon, rating, position, photo FROM ffootti.userteam INNER JOIN ffootti.playersmain ON player_id = id WHERE user_id = '${id}';`)
    }catch(error){
        console.error(`Error: ${error}`)
    }
    let foo = response.rows
    return foo
}

async function Get_Players_From_Db(position){
    try{
        var response = await client.query(`SELECT id, playername, playerlast, nationality, age, height, minutes, goals, assists, rating, team FROM ffootti.playersmain WHERE position = '${position}';`)
    }catch(error){
        console.error(`Error: ${error}`)
    }
    return (response.rows)
}

async function Get_User_Score(id){
    let response = await client.query(`SELECT userscore FROM ffootti.useraccount WHERE auth0_id = '${id}';`)
    return response.rows[0].userscore
}

async function Get_All_User_Score(){
    let response = await client.query(`SELECT userscore, userid, auth0_id, user_name FROM ffootti.useraccount;`)
    return response.rows
}

async function Get_User_Credit(user_id){
    try{
        var res = await client.query(`SELECT user_credit FROM ffootti.useraccount WHERE auth0_id = '${user_id}'`)
    }catch(error){
        console.error(error)
    }
    return res.rows
}

async function Save_User_Score(id){
    let score = 0 
    try{
        var res = await client.query(`SELECT appearances, goals, assists, passes, conceded, yellow, yellowred, red, minutes, duelswon, penwon, penscored, penmissed, pencommited FROM ffootti.userteam INNER JOIN ffootti.playersmain ON player_id = id WHERE user_id = '${id}'`)
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
        var send = client.query(`UPDATE ffootti.useraccount SET userscore = ${score} WHERE auth0_id = '${id}'`)
    }catch(error){
        console.error(error)
    }
}

async function Save_User(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijc1UkROc2tjb29lNkkxYUpCam9kOSJ9.eyJpc3MiOiJodHRwczovL2Rldi1hYTJ5NW03ZGsxanBuN3pvLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkTE5jS3NLQnZ5ZG9hOTU2QTJEVXJLUHFFTThERE9zV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtYWEyeTVtN2RrMWpwbjd6by51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcwNzY5MjcwMCwiZXhwIjoxNzEwMjg0NzAwLCJhenAiOiJkTE5jS3NLQnZ5ZG9hOTU2QTJEVXJLUHFFTThERE9zVyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOmNsaWVudF9jcmVkZW50aWFscyBjcmVhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIHVwZGF0ZTpjbGllbnRfY3JlZGVudGlhbHMgZGVsZXRlOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.rnekt_MUCNBbKN06LZA4bzy5AKCU_tFb-2GCNyvl4kZXotYJCcen2aneYeLDMdde7SpgRWLklMjtnaAr96s8jLvQJK7jaJ9AztD9DjhefDMVXjhV05DwsW_az0lqfXUzbY9FRyfKmNPCSseCeAQ7_yxbiNasr7fqFqddPPYAtuzcjNtbSbTnndDH-341QNxiU5JotIY3ngJA40ESz5HQx-lqQTI454z6I4mnszYX_uwAUa-WpQJ8xfcU9v4Y6i35jKTiXmAU96Lo1sDlwOHKM6Ffn1pd1RPkHkdTUf3ZWe4qveLD7itAizzI8KCJ3eAypdpSaSUSb8s8pfftDrOUVw");
    
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
            client.query(`INSERT INTO ffootti.useraccount (auth0_id, user_name) VALUES ('${user_id}', '${user_name}');`, (err, res)=>{
                if(err){
                    console.log(err);
                }else{
                    return
                }
            })
        }
    })
    .catch(error => console.log('error', error));
}

async function viewPlayer(params){
    try{
        const response = await client.query(`SELECT * FROM ffootti.playersmain WHERE id = ${params}`)
        return response.rows
    }catch(error){
        console.error(error)
    }
}

async function updatePlayersPoints(){
    try{
        let temp = await client.query(`SELECT * FROM ffootti.userteam;`)
        console.log(temp.rows)
        await client.query(`ALTER TABLE dated_playerscores ADD COLUMN time_${Date.now()} bigint;`)
    }catch(err){
        console.error(err)
    }
}

updatePlayersPoints()