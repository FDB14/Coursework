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
                let numberSelected = null;
                for(let i = 0; i < 20; i++){
                    if (typeof response.response[i] !== 'undefined'){
                        numberSelected = response.response[i]
                    }else{
                        return
                    }

                const object = {
                    id : numberSelected.player.id, 
                    playerName : numberSelected.player.name,
                    playerLast : numberSelected.player.lastname,
                    age : numberSelected.player.age,
                    nationality : numberSelected.player.nationality,
                    height : numberSelected.player.height
                }

                client.query(`INSERT INTO playersmain (id, playerName, playerlast, age, nationality, height) VALUES (${object.id},'${object.playerName}', '${object.playerLast}', '${object.age}' ,'${object.nationality}', '${object.height}');`, (err, res)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("successfully connected 👌")
                    }
                    client.end
                })
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
