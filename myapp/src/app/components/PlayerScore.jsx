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
        <div className='font-extrabold text-7xl shadow-xl backdrop-blur-2xl'>{score}</div>
    )
}

export default PlayerScore
