"use client"

import { useEffect, useState } from 'react'


function PlayerScore() {

    const [score, setScore] = useState()

    useEffect(() => {
        fetch('http://localhost:8383/teamscore').then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                return data.data
            }
        ).then(
            data => {
                setScore(data)
            }
        )
    })

    return(
        <div className='flex flex-col'>
            <div className='text-center'>You Have Won</div>
            <div className='slashed-zero font-extrabold text-7xl shadow-xl backdrop-blur-2xl text-center'>{score}</div>
            <div className='text-center'>Points</div>
        </div>
    )
}

export default PlayerScore
