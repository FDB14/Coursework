'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react'
import DefenderRow from './DefenderRow';
import Back from '../../components/Back'

function Playerselect({params}) {
  
    const { user, error, isLoading } = useUser();

    const [defender, setDefender] = useState([{"id":"","playername":"","playerlast":"","nationality":"","age": null,"height":"","minutes":null,"goals":null,"assists":null,"rating":null,"team":""}])
    const [input, setInput] = useState('')
    const [success, setSuccess] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:8383/${params.slug}`).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                setDefender(data.data)
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

    const handleClick =  async(defender) => {
        const full_json = {playerId : defender.id, userId : user.sub}
        const status = await makeRequest(full_json)
        console.log(status)
        const foo = await status.status
        if(foo == 'recieved'){
            Update_User_Credit({rating : defender.rating, userId : user.sub})
            setSuccess(true)
        }else{
            setSuccess(false)
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
            <div>
                <Back params={params}>
                </Back>
            </div>
            {
                !success ? <div className=' text-red-500 font-extrabold text-center'>TOO MANY PLAYERS OR DUPLICATE PLAYERS</div>: <div></div> 
            }

            <div className="justify-center self-center bg-slate-200 text-black font-medium m-10 outline-offset-2 outline-slate-300 w-fit">    
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
                    {quickSort(defender).map((defender, index) => (
                        <tbody className="" key={index}>
                                    <DefenderRow defender={defender} handleClick={handleClick} slug={params.slug}></DefenderRow>
                        </tbody>
                        ))}
                </table>       
                
            </div>
            
        </div>
        
    )
}

export default Playerselect
