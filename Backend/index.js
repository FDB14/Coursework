const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c3fea4af30msh2c3b781cdc7cd06p18ae75jsne303f5bef812',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

function fetchPlayerData(page){
        //fetch player data (page is a changing variable with a recursive function)
        fetch(`https://api-football-v1.p.rapidapi.com/v3/players?league=39&season=2022&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
            if(page <= response.paging.total){
                let answer = response.response[1]
                console.log(answer)
                setTimeout(() => fetchPlayerData(page + 1), 5000)
        }})
        .catch(err => console.error(err))
}

//call fetch function (argument corresponds to the starting page)
fetchPlayerData(1)