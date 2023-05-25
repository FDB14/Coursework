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
            function playerData(){
                //need recursion to sorth through players in the page as well 😞
                    let answer = response.response[1]
                    let currentPage = response.paging.current
                    let lastPage = response.paging.total    
                    return [answer, currentPage, lastPage]
                }
            return playerData()
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
