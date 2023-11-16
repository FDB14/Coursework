'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Pitch() {

    const { user, error, isLoading } = useUser();

    post_id(user)

    const [forwards, setForwards ] = useState('')
    const [defenders, setDefenders] = useState('')
    const [midfielders, setMidfielders] = useState('')
    const [goalkeepers, setGoalkeepers] = useState('')

    useEffect(() => {

        fetch("http://localhost:8383/team").then(
            response => response.json()
        ).then(
            data => { 
                return data.data
            }
        ).then(
            data => {
                let defenderArray = []
                let midfielderArray = []
                let forwardArray = []
                for(let i = 0; i < data.length; i++){
                    if(data[i].position == "Goalkeeper"){
                        setGoalkeepers(data[i])
                    }else if(data[i].position == "Defender"){
                        defenderArray.push(data[i])
                        setDefenders(defenderArray)
                    }else if(data[i].position == "Midfielder"){
                        midfielderArray.push(data[i])
                        setMidfielders(midfielderArray)
                    }else if(data[i].position == "Attacker"){
                        forwardArray.push(data[i])
                        setForwards(forwardArray)
                    }
                }
            }
        )
    }, [])    



    async function post_id(parcel){
        const res = await fetch('http://localhost:8383/getid',
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
    

    return(
        <div>
            {isLoading &&(
                <div className=' animate-pulse'>...Loading</div>
            )
            }
            {user && !isLoading &&(
                <div>
                    <div className='flex flex-row pl-20'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold flex flex-col gap-1'>
                            <div className='bg-teal-500 text-white rounded-t-md'>{forwards[0] ? forwards[0].playername : 'fwd'}</div>
                            <a className='' href='/forwardselect'>{forwards[0] ? forwards[0].nationality : '+'}</a>
                            <div className='text-green-600 '>{forwards[0] ? `Rating: ${Math.round((forwards[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={forwards[0] ? forwards[0].teamicon : ''} alt=''></img></div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold flex flex-col gap-1'>
                            <div className='bg-teal-500 text-white rounded-t-md'>{forwards[1] ? forwards[1].playername : 'fwd'}</div>
                            <a className='' href='/forwardselect'>{forwards[1] ? forwards[1].nationality : '+'}</a>
                            <div className='text-green-600 '>{forwards[1] ? `Rating: ${Math.round((forwards[1].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={forwards[1] ? forwards[1].teamicon : ''} alt=''></img></div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold flex flex-col gap-1'>
                            <div className='bg-teal-500 text-white rounded-t-md'>{forwards[2] ? forwards[2].playername : 'fwd'}</div>
                            <a className='' href='/forwardselect'>{forwards[2] ? forwards[2].nationality : '+'}</a>
                            <div className='text-green-600 '>{forwards[2] ? `Rating: ${Math.round((forwards[2].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={forwards[2] ? forwards[2].teamicon : ''} alt=''></img></div>
                        </div>
                    </div>
                    <div className='flex flex-row pl-20'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold flex flex-col gap-1'>
                            <div className='bg-indigo-500 text-white rounded-t-md'>{midfielders[0] ? midfielders[0].playername : 'mid'}</div>
                            <a className='' href='/midselect'>{midfielders[0] ? midfielders[0].nationality : '+'}</a>
                            <div className='text-green-600 '>{midfielders[0] ? `Rating: ${Math.round((midfielders[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={midfielders[0] ? midfielders[0].teamicon : ''} alt=''></img></div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold flex flex-col gap-1'>
                            <div className='bg-indigo-500 text-white rounded-t-md'>{midfielders[1] ? midfielders[1].playername : 'mid'}</div>
                            <a className='' href='/midselect'>{midfielders[1] ? midfielders[1].nationality : '+'}</a>
                            <div className='text-green-600 '>{midfielders[1] ? `Rating: ${Math.round((midfielders[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={midfielders[1] ? midfielders[1].teamicon : ''} alt=''></img></div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold flex flex-col gap-1'>
                            <div className='bg-indigo-500 text-white rounded-t-md'>{midfielders[2] ? midfielders[2].playername : 'mid'}</div>
                            <a className='' href='/midselect'>{midfielders[2] ? midfielders[2].nationality : '+'}</a>
                            <div className='text-green-600 '>{midfielders[2] ? `Rating: ${Math.round((midfielders[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={midfielders[2] ? midfielders[2].teamicon : ''} alt=''></img></div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer flex flex-col gap-1'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>{defenders[0] ? defenders[0].playername : 'def'}</div>
                            <a className='' href='/playerselect'>{defenders[0] ? defenders[0].nationality : '+'}</a>
                            <div className='text-green-600 '>{defenders[0] ? `Rating: ${Math.round((defenders[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={defenders[0] ? defenders[0].teamicon : ''} alt=''></img></div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer flex flex-col gap-1'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>{defenders[0] ? defenders[1].playername : 'def'}</div>
                            <a className='' href='/playerselect'>{defenders[1] ? defenders[1].nationality : '+'}</a>
                            <div className='text-green-600 '>{defenders[1] ? `Rating: ${Math.round((defenders[1].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={defenders[1] ? defenders[1].teamicon : ''} alt=''></img></div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer flex flex-col gap-1'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>{defenders[2] ? defenders[2].playername : 'def'}</div>
                            <a className='' href='/playerselect'>{defenders[2] ? defenders[2].nationality : '+'}</a>
                            <div className='text-green-600 '>{defenders[2] ? `Rating: ${Math.round((defenders[2].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={defenders[2] ? defenders[2].teamicon : ''} alt=''></img></div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer flex flex-col gap-1'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'><a href='/playerselect'>{defenders[3] ? defenders[3].playername : 'def'}</a></div>
                            <a className='' href='/playerselect'>{defenders[3] ? defenders[3].nationality : '+'}</a>
                            <div className='text-green-600 '>{defenders[3] ? `Rating: ${Math.round((defenders[3].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={defenders[3] ? defenders[3].teamicon : ''} alt=''></img></div>
                        </div>
                    </div>
                    <div className='flex flex-row pl-60'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold flex flex-col gap-1'>
                            <div className='bg-gray-500 text-white rounded-t-md'>{goalkeepers ? goalkeepers.playername : 'gk'}</div>
                            <a className='' href='/goalieselect'>{goalkeepers ? goalkeepers.nationality : '+'}</a>
                            <div className='text-green-600 '>{goalkeepers ? `Rating: ${Math.round((goalkeepers.rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={goalkeepers ? goalkeepers.teamicon : ''} alt=''></img></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pitch;

