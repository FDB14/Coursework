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

function getSeason(){
    let date= new Date()
    if(date.getMonth() >= 7){
        return date.getFullYear()
    }else{
        return (date.getFullYear()-1)
    }
}

async function getDefenders(i){
    try{
        var response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?league=39&season=${getSeason()}&page=${i}`, options)
    }catch(error){
        console.error(error)
    }
    return response
}

async function getPaging(func){
    let bar = await(func)
    bar = await bar.json()
    let numPages = await bar.paging.total
    return numPages
}

async function iteratePaging(i){
    let foo = await getPaging(getDefenders())
    if(i < foo){
        let defenders = await getDefenders(i)
        defenders = await defenders.json()
        console.log(defenders)
    }
}

function delayPrintPaging(){
    let i = 1 
    while(i < 20){
        setTimeout(() => iteratePaging(i),1000)
        i++
    }
}

delayPrintPaging()