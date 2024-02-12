const foo = {
                    id : foo.id, 
                    playerName : foo.name,
                    playerLast : foo.lastname,
                    age : foo.age,
                    nationality : foo.nationality,
                    height : foo.height,

                }

`INSERT INTO playersmain (id, playername, playerlast, age, nationality, height, team, teamicon, appearances, minutes, rating, goals, assists, conceded, passes, tackles, duelswon
dribbles, foulswon, fouls, yellow, yellowred, red, penwon, pencommitted, penscored, penmissed, position) VALUES (${foo.id}, ${})`

team : bar.team.name,
                    teamicon : bar.team.logo,
                    appearances : bar.games.appearences,
                    minutes : bar.games.minutes,
                    rating : bar.games.rating,
                    goals : bar.goals.total,
                    assists : bar.goals.assists,
                    conceded : bar.goals.conceded,
                    passes : bar.passes.total,
                    tackles : bar.tackles.total,
                    duelswon: bar.duels.won,
                    dribbles : bar.dribbles.success,
                    foulswon : bar.fouls.drawn,
                    fouls : bar.fouls.committed,
                    yellow : bar.cards.yellow,
                    yellowred : bar.cards.yellowred,
                    red : bar.cards.red,
                    penwon : bar.penalty.won,
                    pencommited : bar.penalty.commited,
                    penscored : bar.penalty.scored,
                    penmissed : bar.penalty.missed,
                    position : bar.games.position,    

`INSERT INTO ffootti.playersmain(id, playername, playerlast, age, nationality, height, team, teamicon, appearances, rating, goals, assists, conceded, passes, tackles, duelswon, dribbles, foulswon, fouls, yellow, yellowred, red, penwon, pencommitted, penscored, penmissed, minutes, position) VALUES (${foo.id},'${foo.firstname}', '${foo.lastname}', ${foo.age},'${foo.nationality}', '${foo.height}','${bar.team.name}', '${bar.team.logo}', ${bar.games.appearences}, ${bar.games.rating}, ${bar.goals.total} , ${bar.goals.assists}, ${bar.goals.concecded}, ${bar.passes.total}, ${bar.tackles.total}, ${bar.duels.won}, ${bar.dribbles.success}, ${bar.fouls.won}, ${bar.fouls.committed}, ${bar.cards.yellow}, ${bar.cards.yellowred}, ${bar.cards.red}, ${bar.penalty.won}, ${bar.penalty.commited}, ${bar.penalty.scored}, ${bar.penalty.missed}, ${bar.games.minutes}, '${bar.games.position}') ON CONFLICT (id) DO UPDATE SET playername ='${foo.firstname}', playerlast = '${foo.lastname}', age = ${foo.age}, nationality = '${foo.nationality}', height = '${foo.height}', team = '${bar.team.name}',teamicon = '${bar.logo}', appearances = ${bar.games.appearences}, rating = ${bar.games.rating}, goals = ${bar.goals.total} , assists = ${bar.goals.assists}, conceded = ${bar.goals.concecded}, passes = ${bar.passes.total}, tackles = ${bar.tackles.total}, duelswon = ${bar.duels.won}, dribbles = ${bar.dribbles.success}, foulswon = ${bar.fouls.won}, fouls = ${bar.fouls.committed}, yellow = ${bar.cards.yellow}, yellowred = ${bar.cards.yellowred}, red = ${bar.cards.red}, penwon = ${bar.penalty.won}, pencommited = ${bar.penalty.commited}, penscored = ${bar.penalty.scored}, penmissed = ${bar.penalty.missed}, minutes = ${bar.games.minutes}, position = '${bar.games.position}';`
