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
        await client.query(`UPDATE ffootti.useraccount SET user_credit = user_credit + ${Math.round(package.player_cost * 10)} WHERE auth0_id = '${userId}';`)
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
    res.json({data : foo})
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
        let current_credit = await client.query(`SELECT user_credit FROM ffootti.useraccount WHERE auth0_id = '${Get_User_Id(package)}';`);

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

        if(Math.round((foo.rows[0].rating) * 10) > current_credit.rows[0].user_credit){
            return false
        }else{
            
            let response = await client.query(`INSERT INTO ffootti.userteam(player_id, user_id, dateadded) VALUES(${Number(package.playerId)}, '${(Get_User_Id(package))}', ${Date.now()});`)
            
            let res1 = await client.query(`SELECT user_id, position, COUNT(position) FROM ffootti.userteam INNER JOIN ffootti.playersmain ON userteam.player_id = playersmain.id WHERE user_id = '${Get_User_Id(package)}' AND position = '${foo.rows[0].position}' GROUP BY user_id, position`)
            console.log(res1.rows)
    
    
            if(res1.rows[0].count > temp){
                let res = await client.query(`DELETE FROM ffootti.userteam WHERE player_id = ${package.playerId} AND user_id = '${res1.rows[0].user_id}';`)
                client.query(`UPDATE ffootti.useraccount SET user_credit = user_credit + ${Math.round((foo.rows[0].rating) * 10)} WHERE auth0_id = '${userId}'`)
                }
    
            return response
        }
        
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
    let score = 0;
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
                score -= 2 * player.penmissed
                score -= player.pencommited
            }
        })
        var send = client.query(`UPDATE ffootti.useraccount SET userscore = ${score} WHERE auth0_id = '${id}'`);
    }catch(error){
        console.error(error);
    }
}

async function Save_User(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijc1UkROc2tjb29lNkkxYUpCam9kOSJ9.eyJpc3MiOiJodHRwczovL2Rldi1hYTJ5NW03ZGsxanBuN3pvLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkTE5jS3NLQnZ5ZG9hOTU2QTJEVXJLUHFFTThERE9zV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtYWEyeTVtN2RrMWpwbjd6by51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcxMzI3MzUwNywiZXhwIjoxNzE1ODY1NTA3LCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJkTE5jS3NLQnZ5ZG9hOTU2QTJEVXJLUHFFTThERE9zVyJ9.ol9bn473olGP0S1bXPps3EqsLtwJusuuATUL5J5jtjAPrEscwUXIZyX1N_owfir_wI8kY8nE15dmYGPJ4tKuintASrZweHe6bswH31iawPICOXqhEwDIr5r3AEu_87A1giS7c3-t7TJK7uxii58kkEoZui0m4oe8qCHk-SDWaivcKvUp5RkSqY9WlFN-PZIb0RT8oepuf4z_uE3GiZL683z9JoS4fdaCiUtwCgnOG0-YYKUIqrdSOx70om3krbt-f8Ns9da97OOM9rg4LnW1vw5nahlDQXDtBACUk9IwI2FgkdfLN_Yoya0BU5BQRqMY8Gj24HY5_UzDFfl9ZZG0mg");
    
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