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
                    }
                }
                return [numberSelected , currentPage, lastPage]
        })
        .then(response => {
            const object = {
                id : response[0].player.id, 
                playerName : response[0].player.name,
                playerLast : response[0].player.lastname,
                age : response[0].player.age,
                nationality : response[0].player.nationality,
                height : response[0].player.height
            }
            currentPage = response[1]
            lastPage = response[2]
            return [object, currentPage, lastPage]
        })
        .then(response => {

            client.query(`INSERT INTO playersmain (id, playerName, playerlast, age, nationality, height) VALUES (${response[0].id},'${response[0].playerName}', '${response[0].playerLast}', '${response[0].age}' ,'${response[0].nationality}', '${response[0].height}');`, (err, res)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("successfully connected 👌")
                }
                client.end
            })

            console.log(response[0])
            currentPage = response[1]
            lastPage = response[2]
            return [currentPage, lastPage]
        })
        .then(response => {
            if(response[0] <= response[1]){
                setTimeout(() => fetchPlayerData(page + 1), 5000)
            }
        })
        .catch(err => console.error(err))
}

//call fetch function (argument corresponds to the starting page)
let temp = fetchPlayerData(1)
