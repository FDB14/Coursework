'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react'
import DefenderRow from './DefenderRow';
import Back from '../../components/Back'
import Popup from '../../components/Success'

function Playerselect({params}) {
  
    const { user, error, isLoading } = useUser();

    const [player, setPlayer] = useState([{"id":"","playername":"","playerlast":"","nationality":"","age": null,"height":"","minutes":null,"goals":null,"assists":null,"rating":null,"team":""}])
    const [success, setSuccess] = useState(true)
    const [newResponse, setNewResponse] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8383/${params.slug}`).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                setPlayer(data.data)
            }
        )
    }, [])

    function quickSort(arr){
        if(arr.length < 2){
            return arr
        }
        let pivot = arr[arr.length - 1]
        let right = []
        let left = []
        for(let i = 0; i < arr.length -1; i++){
            if(arr[i].rating >= pivot.rating){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return[...quickSort(left), pivot, ...quickSort(right)]
    }

    const handleClick =  async(player) => {
        const full_json = {playerId : player.id, userId : user.sub}
        const status = await makeRequest(full_json)
        console.log(status)
        const foo = await status.status
        if(foo == 'recieved'){
            Update_User_Credit({rating : player.rating, userId : user.sub})
            setSuccess(true)
            setNewResponse(true)
        }else{
            setSuccess(false)
            setNewResponse(false)
            return
        }
    }

    async function makeRequest(parcel){
        if(parcel == ''){ return }
        const res = await fetch('http://localhost:8383/',
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

    async function Update_User_Credit(parcel){
        if(parcel == ''){ return }
        const res = await fetch('http://localhost:8383/usercredit',
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
    }

    if (isLoading) return <div className='animate-bounce m-20'>...loading</div>;
    if (error) return <div>{error.message}</div>;

    return(
        <div className = "flex flex-col justify-center align-middle">
            <div className=''>
                <div className='fixed'>
                    <Back params={params}>
                    </Back>
                </div>
            </div>
            {
                newResponse ? 
                <div className='flex justify-center text-center'>
                    <div className='fixed pt-5'>
                    <Popup success={true}></Popup>
                    </div>     
                </div>
                : <div></div>
            }
            {
                success ? 
                <div></div> 
                : 
                <div className={`justify-center text-center flex `}>
                    <div className='fixed pt-5'>
                    <Popup success={false}></Popup>
                    </div>
                </div>
            }


            <div className="justify-center self-center bg-slate-800 text-white font-medium m-10 outline-offset-2  w-fit">    
                <table className=''>
                    <thead>
                        <tr className="">
                            <th className="font-black">Name</th>
                            <th className="font-extrabold">Nationality</th>
                            <th className="font-extrabold">Age</th>
                            <th className="font-extrabold">Height</th>
                            <th className="font-extrabold">Goals</th>
                            <th className="font-extrabold">Assists</th>
                            <th className="font-extrabold">Minutes</th>
                            <th className="font-extrabold">Club</th>
                            <th className="font-extrabold">Cost</th>
                        </tr>    
                    </thead>
                    {quickSort(player).map((player, index) => (
                        <tbody className="" key={index}>
                                    <DefenderRow defender={player} handleClick={handleClick} slug={params.slug}></DefenderRow>
                        </tbody>
                        ))}
                </table>       
                
            </div>
            
        </div>
        
    )
}

export default Playerselect
