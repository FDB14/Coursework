const {Client} = require('pg')

const client = new Client({
    host : "localhost",
    user : "admin",
    port : 5432,
    password : "root",
    database : "mainconnection"
})

client.connect();

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c3fea4af30msh2c3b781cdc7cd06p18ae75jsne303f5bef812',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

//used for getting the current season, (seasons start and end midway through the year)
function getSeason(){
    let day = new Date()
    if(day.getMonth() >= 7){
        return day.getFullYear()
    }else{
        return (day.getFullYear()-1)
    }
}

function fetchPlayerData(page){
        //fetch player data (page is a changing variable with a recursive function)
        fetch(`https://api-football-v1.p.rapidapi.com/v3/players?league=39&season=${getSeason()}&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
                let currentPage = response.paging.current
                let lastPage = response.paging.total
                let playerSelected = null;
                for(let i = 0; i < 20; i++){
                    if (typeof response.response[i] !== 'undefined'){
                        playerSelected = response.response[i]
                    }else{
                        return
                    }

                const playerObject = {
                    id : playerSelected.player.id, 
                    playerName : playerSelected.player.name,
                    playerLast : playerSelected.player.lastname,
                    age : playerSelected.player.age,
                    nationality : playerSelected.player.nationality,
                    height : playerSelected.player.height,
                }

                const statObject = {
                    team : playerSelected.statistics[0].team.name,
                    teamicon : playerSelected.statistics[0].team.logo,
                    appearances : playerSelected.statistics[0].games.appearences,
                    minutes : playerSelected.statistics[0].games.minutes,
                    rating : playerSelected.statistics[0].games.rating,
                    goals : playerSelected.statistics[0].goals.total,
                    assists : playerSelected.statistics[0].goals.assists,
                    conceded : playerSelected.statistics[0].goals.conceded,
                    passes : playerSelected.statistics[0].passes.total,
                    tackles : playerSelected.statistics[0].tackles.total,
                    duelswon: playerSelected.statistics[0].duels.won,
                    dribbles : playerSelected.statistics[0].dribbles.success,
                    foulswon : playerSelected.statistics[0].fouls.drawn,
                    fouls : playerSelected.statistics[0].fouls.committed,
                    yellow : playerSelected.statistics[0].cards.yellow,
                    yellowred : playerSelected.statistics[0].cards.yellowred,
                    red : playerSelected.statistics[0].cards.red,
                    penwon : playerSelected.statistics[0].penalty.won,
                    pencommited : playerSelected.statistics[0].penalty.commited,
                    penscored : playerSelected.statistics[0].penalty.scored,
                    penmissed : playerSelected.statistics[0].penalty.missed,
                }

                client.query(`INSERT INTO playersmain VALUES (${playerObject.id},'${playerObject.playerName}', '${playerObject.playerLast}', ${playerObject.age},'${playerObject.nationality}', '${playerObject.height}','${statObject.team}', '${statObject.teamicon}', ${statObject.appearances}, ${statObject.rating}, ${statObject.goals} , ${statObject.assists}, ${statObject.conceded}, ${statObject.passes}, ${statObject.tackles}, ${statObject.duelswon}, ${statObject.dribbles}, ${statObject.foulswon}, ${statObject.fouls}, ${statObject.yellow}, ${statObject.yellowred}, ${statObject.red}, ${statObject.penwon}, ${statObject.pencommited}, ${statObject.penscored}, ${statObject.penmissed}, ${statObject.minutes});`, (err, res)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(`player information successfully inserted 👌 ${i+1} ${res}`)
                    }
                    client.end
                })

                client.query(`UPDATE playersmain SET minutes = ${statObject.minutes} WHERE `)

            }
                return [currentPage, lastPage]
        })
        .then(response => {
            if(response[0] <= response[1] -1){
                setTimeout(() => fetchPlayerData(page + 1), 5000)
            }
        })
        .catch(err => console.error(err))
}

//call fetch function (argument corresponds to the starting page)
let temp = fetchPlayerData(1)
