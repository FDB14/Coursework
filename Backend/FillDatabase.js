const { Client } = require('pg')
const key = process.env.PG_PASS

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: `${key}`,
    database: 'fantasyfootball'
})

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c3fea4af30msh2c3b781cdc7cd06p18ae75jsne303f5bef812',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

client.connect()

client.query('SELECT * FROM ffootti.useraccount;').then(response => { console.log(response.rows) })

class ADD_PLAYERS {

    constructor() {
        this.counter = 1;
    }

    async getPlayers() {
        try {
            let data = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?league=39&season=2023&page=${this.counter}`, options);
            let parseData = await data.json();
            if(parseData.response[0] !== undefined){
                this.counter += 1;
                console.log(parseData.response[0])
                return parseData;
            }else{
                console.log('data')
                return
            }
        } catch (error) {
            console.error(error);
        }
    }

    async putPlayers(foo, bar) {
        let playerName = ""
        let playerLast = ""
        let nationality = ""
            if((foo.name).includes(";") || (foo.name).includes("'") || (foo.nationality).includes("'")){
                playerName = (foo.name).replace(/[;'",._]/g, '');
                playerLast = (foo.lastname).replace(/[;'",._]/g, '');
                nationality = (foo.nationality).replace(/[;'",._]/g, '');
                console.log('working' + '' + `${playerName}`);
            }else{
                playerName = foo.name
                console.log(`not working ${playerName}`)
                playerLast = foo.lastname
                nationality = foo.nationality
            }
            client.query(`INSERT INTO ffootti.playersmain(id, playername, playerlast, age, nationality, height, team, teamicon, appearances, rating, goals, assists, conceded, passes, tackles, duelswon, dribbles, foulswon, fouls, yellow, yellowred, red, penwon, pencommited, penscored, penmissed, minutes, position, photo) VALUES (${foo.id}, '${(playerName)}', '${playerLast}', ${foo.age}, '${nationality}', '${foo.height}', '${bar.team.name}', '${bar.team.logo}', ${bar.games.appearences}, ${bar.games.rating}, ${bar.goals.total}, ${bar.goals.assists}, ${bar.goals.conceded}, ${bar.passes.total}, ${bar.tackles.total}, ${bar.duels.total}, ${bar.dribbles.success}, ${bar.fouls.drawn}, ${bar.fouls.committed}, ${bar.cards.yellow}, ${bar.cards.yellowred}, ${bar.cards.red}, ${bar.penalty.won}, ${bar.penalty.commited}, ${bar.penalty.scored}, ${bar.penalty.missed}, ${bar.games.minutes}, '${bar.games.position}', '${foo.photo}') ON CONFLICT (id) DO UPDATE SET playername = '${playerName}', playerlast = '${playerLast}', age = ${foo.age}, nationality = '${nationality}', height = '${foo.height}', team = '${bar.team.name}', teamicon = '${bar.team.logo}', appearances = ${bar.games.appearences}, rating = ${bar.games.rating}, goals= ${bar.goals.total}, assists = ${bar.goals.assists}, conceded = ${bar.goals.conceded}, passes = ${bar.passes.total}, tackles = ${bar.tackles.total}, duelswon = ${bar.duels.total}, dribbles = ${bar.dribbles.success}, foulswon = ${bar.fouls.drawn}, fouls = ${bar.fouls.committed}, yellow = ${bar.cards.yellow}, yellowred = ${bar.cards.yellowred}, red = ${bar.cards.red}, penwon = ${bar.penalty.won}, pencommited = ${bar.penalty.commited}, penscored = ${bar.penalty.scored}, penmissed = ${bar.penalty.missed}, minutes = ${bar.games.minutes}, position = '${bar.games.position}', photo = '${foo.photo}'`), (err, res) => {
                if(err){
                    console.error(err)
                }else{
                    console.log(res)
                }
            }

    }
}

//instantiate the class
const playerInst = new ADD_PLAYERS

async function await_class() {
    //call the method within the class
    let data = await playerInst.getPlayers();
    let params = await data.parameters;
    let response = await data.response;
    //map through the array from the method
    response.map(async data => {
        let foo = await data.player;
        let bar = await data.statistics[0];
        playerInst.putPlayers(foo, bar)
        }
    )
    if(data){
        setTimeout(() => await_class(), 5000);
    }else{
        return
    }
}
await_class();