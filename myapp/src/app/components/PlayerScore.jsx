"use client"

import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { useEffect, useState } from 'react'


function PlayerScore({user, name}) {

    const [score, setScore] = useState()

    useEffect(() => {
        async function Find_Score(){
            const user_id = user
            const parcel = {userId : user_id}
            fetch('http://localhost:8383/teamscore',
            {
                method : 'POST',
                headers : {
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify({
                    package : parcel,
                }
                )
            }
            ).then(response => {
                return response.json()
            }).then(data => {
                return data.data
            }).then(data => {
                setScore(data)
            }
            )
        }

        Find_Score()
    },[])

    return(
        <div className='flex flex-col'>
            <div className='text-center'>You Have Won</div>
            <div className='slashed-zero font-extrabold text-7xl shadow-xl backdrop-blur-2xl text-center'>{score}</div>
            <div className='text-center'>Points</div>
        </div>
    )
}

export default PlayerScore
