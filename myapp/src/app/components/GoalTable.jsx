'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import DefenderRow from "./DefenderRow"
import { useState, useEffect } from "react"

function Playerselect() {
  
    const { user, error, isLoading } = useUser();

    const [defender, setDefender] = useState([{"id":"","playername":"","playerlast":"","nationality":"","age": null,"height":"","minutes":null,"goals":null,"assists":null,"rating":null,"team":""}])

    useEffect(() => {
        fetch("http://localhost:8383/getgoalkeeper").then(
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

    const handleClick = (defender) => {
        let full_json = {playerId : defender.id, userId : user.sub}
        makeRequest(full_json)
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
    }

    if (isLoading) return <div className='animate-bounce'>...loading</div>;
    if (error) return <div>{error.message}</div>;

    return(
        <div className = "">
            <div className="align-middle bg-blueGray-300 text-black font-medium rounded-md m-10 outline outline-2 outline-offset-2 outline-slate-300">    
                <table>
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
                            <th className="font-extrabold">Rating</th>
                        </tr>    
                    </thead>
                        <tbody className="">
                            {quickSort(defender).map((defender) => (
                                    <DefenderRow defender={defender} handleClick={handleClick}></DefenderRow>
                            ))
                            }
                        </tbody>
                </table>       
                
            </div>
            
        </div>
        
    )
}

export default Playerselect