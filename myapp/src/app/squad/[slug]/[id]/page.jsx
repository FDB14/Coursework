'use client'

import React, { useEffect, useState } from 'react'
import Back from '../../../components/Back'

function page({params}) {

    const [data, setData] = useState([])

    console.log(params)

    useEffect(() => {
        makeRequest(params.id)
        .then(response => {return response.data[0]})
        .then(response =>  setData(response))
    }
    ,[])

    async function makeRequest(parcel){
        if(parcel == ''){ return }
        const res = await fetch('http://localhost:8383/viewplayer',
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
        )
        return (res.json())
    }

  return (
    <div className=' font-medium flex justify-center items-center my-auto h-screen '>
        <div>
            <Back params={params}></Back>
        </div>

        <div className='flex-row flex gap-5'>

        <div className='flex flex-row '>
            <img className='rounded-lg w-full h-full' alt='' src={data.photo}></img>
            <img  className='w-full h-full' alt='' src={data.teamicon}></img>
        </div>
        <div className='flex flex-col ml-5'>
            <div>
                <div className='font-black'>
                Name: {data.playername}
                </div>
                <div>
                Last Name: {data.playerlast}
                </div>
            </div>
            <div>
                Nationality: {data.nationality}
            </div>
            <div>
                Minutes: {data.minutes}
            </div>
            <div>
                Position: {data.position}
            </div>
            <div>
                Height: {data.height}
            </div>
            <div className='flex flex-row'>
                Rating: {Math.round(data.rating * 10)}
            </div>
        </div>
        <div>
            <div className=' font-black'>
                Performance:
            </div>
            <div>
                Goals: {data.goals}
            </div>
            <div>
                Assists: {data.assists}
            </div>
            <div>
                Dribbles: {data.dribbles}
            </div>
            <div>
                Penalty Goals: {data.penscored}
            </div>
        </div>
        <div>
            <div className='font-black'>
                Discipline:
            </div>
            <div>
                Fouls: {data.fouls}
            </div>
            <div>
                Yellow Cards: {data.yellow}
            </div>
            <div>
                Red Cards: {data.red}
            </div>
        </div>            
    </div>
        </div>
  )
}

export default page