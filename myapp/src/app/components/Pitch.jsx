'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

function Pitch({id}) {

    const { user, error, isLoading } = useUser();

    const [forwards, setForwards ] = useState('')
    const [defenders, setDefenders] = useState('')
    const [midfielders, setMidfielders] = useState('')
    const [goalkeepers, setGoalkeepers] = useState('')
    const [credit, setCredit] = useState()
    
    useEffect(() => {
        Fetch_User_Team()
    }, [])

    async function Fetch_User_Team(){
        const user_id = `${id}`
        const parcel = {userId : user_id}
        fetch('http://localhost:8383/team',
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
            setCredit(data.credit[0].user_credit)
            data = data.data
            return data
        }).then(data => {
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
    }

    function Remove_Player(player_id, player_rating){
        const parcel = {player_id : player_id, userId : id, player_cost : player_rating}
        const res = fetch('http://localhost:8383/delete',
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
            {!user && !isLoading &&( 
                <div className='flex flex-col text-center'>
                    <div className=''>Sign In On The Home Page</div>
                    <div className='underline text-blue-500'><a href='/'>HERE</a></div>
                </div>
            )}
            {user && !isLoading &&(
                <div className='flex flex-col'>
                    <div className='text-center m-16 font-bold'>
                        You Have<p className='text-red-600 font-black text-xl'>{credit}</p> Credits To Spend
                    </div>
                    <div className='flex flex-row pl-20'>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-teal-500 text-white rounded-t-md max-h-6'><a href={forwards[0] ? '/squad' : '/forwardselect'}>{forwards[0] ? forwards[0].playername : 'fwd'}</a></div>
                            <div className=''>{forwards[0] ? forwards[0].nationality : ''}</div>
                            <div className='text-green-600 '>{forwards[0] ? `Rating: ${Math.round((forwards[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={forwards[0] ? forwards[0].teamicon : ''} alt=''></img></div>
                            <button onClick={forwards[0] ? () => {Remove_Player(forwards[0].id, forwards[0].rating)} : null}><a href='/squad'>{forwards[0] ? "Remove" : null}</a></button>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-teal-500 text-white rounded-t-md max-h-6'><a href={forwards[1] ? '/squad' : '/forwardselect'}>{forwards[1] ? forwards[1].playername : 'fwd'}</a></div>
                            <div className=''>{forwards[1] ? forwards[1].nationality : ''}</div>
                            <div className='text-green-600 '>{forwards[1] ? `Rating: ${Math.round((forwards[1].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={forwards[1] ? forwards[1].teamicon : ''} alt=''></img></div>
                            <button onClick={forwards[1] ? () => {Remove_Player(forwards[1].id, forwards[1].rating)} : null}><a href='/squad'>{forwards[1] ? "Remove" : null}</a></button>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-teal-500 text-white rounded-t-md max-h-6'><a href={forwards[2] ? '/squad' : '/forwardselect'}>{forwards[2] ? forwards[2].playername : 'fwd'}</a></div>
                            <div className=''>{forwards[2] ? forwards[2].nationality : ''}</div>
                            <div className='text-green-600 '>{forwards[2] ? `Rating: ${Math.round((forwards[2].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={forwards[2] ? forwards[2].teamicon : ''} alt=''></img></div>
                            <button onClick={forwards[2] ? () => {Remove_Player(forwards[2].id, forwards[2].rating)} : null}><a href='/squad'>{forwards[2] ? "Remove" : null}</a></button>
                        </div>
                    </div>
                    <div className='flex flex-row pl-20'>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-indigo-500 text-white rounded-t-md max-h-6'><a href={midfielders[0] ? '/squad' : '/midselect'}>{midfielders[0] ? midfielders[0].playername : 'mid'}</a></div>
                            <div className=''>{midfielders[0] ? midfielders[0].nationality : ''}</div>
                            <div className='text-green-600 '>{midfielders[0] ? `Rating: ${Math.round((midfielders[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={midfielders[0] ? midfielders[0].teamicon : ''} alt=''></img></div>
                            <button onClick={midfielders[0] ? () => {Remove_Player(midfielders[0].id, midfielders[0].rating)} : null}><a href='/squad'>{midfielders[0] ? "Remove" : null}</a></button>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-indigo-500 text-white rounded-t-md max-h-6'><a href={midfielders[1] ? '/squad' : '/midselect'}>{midfielders[1] ? midfielders[1].playername : 'mid'}</a></div>
                            <div className=''>{midfielders[1] ? midfielders[1].nationality : ''}</div>
                            <div className='text-green-600 '>{midfielders[1] ? `Rating: ${Math.round((midfielders[1].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={midfielders[1] ? midfielders[1].teamicon : ''} alt=''></img></div>
                            <button onClick={midfielders[1] ? () => {Remove_Player(midfielders[1].id, midfielders[1].rating)} : null}><a href='/squad'>{midfielders[1] ? "Remove" : null}</a></button>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-indigo-500 text-white rounded-t-md max-h-6'><a href={midfielders[2] ? '/squad' : '/midselect'}>{midfielders[2] ? midfielders[2].playername : 'mid'}</a></div>
                            <div className=''>{midfielders[2] ? midfielders[2].nationality : ''}</div>
                            <div className='text-green-600 '>{midfielders[2] ? `Rating: ${Math.round((midfielders[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={midfielders[2] ? midfielders[2].teamicon : ''} alt=''></img></div>
                            <button onClick={midfielders[2] ? () => {Remove_Player(midfielders[2].id, midfielders[2].rating)} : null}><a href='/squad'>{midfielders[2] ? "Remove" : null}</a></button>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md max-h-6'><a href={defenders[0] ? '/squad' : '/playerselect'}>{defenders[0] ? defenders[0].playername : 'def'}</a></div>
                            <div className=''>{defenders[0] ? defenders[0].nationality : ''}</div>
                            <div className='text-green-600 '>{defenders[0] ? `Rating: ${Math.round((defenders[0].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={defenders[0] ? defenders[0].teamicon : ''} alt=''></img></div>
                            <button onClick={defenders[0] ? () => {Remove_Player(defenders[0].id, defenders[0].rating)} : null}><a href='/squad'>{defenders[0] ? "Remove" : null}</a></button>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md max-h-6'><a href={defenders[1] ? '/squad' : '/playerselect'}>{defenders[1] ? defenders[1].playername : 'def'}</a></div>
                            <div className=''>{defenders[1] ? defenders[1].nationality : ''}</div>
                            <div className='text-green-600 '>{defenders[1] ? `Rating: ${Math.round((defenders[1].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={defenders[1] ? defenders[1].teamicon : ''} alt=''></img></div>
                            <button onClick={defenders[1] ? () => {Remove_Player(defenders[1].id, defenders[1].rating)} : null}><a href='/squad'>{defenders[1] ? "Remove" : null}</a></button>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md max-h-6'><a href={defenders[2] ? '/squad' : '/playerselect'}>{defenders[2] ? defenders[2].playername : 'def'}</a></div>
                            <div className=''>{defenders[2] ? defenders[2].nationality : ''}</div>
                            <div className='text-green-600 '>{defenders[2] ? `Rating: ${Math.round((defenders[2].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={defenders[2] ? defenders[2].teamicon : ''} alt=''></img></div>
                            <button onClick={defenders[2] ? () => {Remove_Player(defenders[2].id, defenders[2].rating)} : null}><a href='/squad'>{defenders[2] ? "Remove" : null}</a></button>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md max-h-6 overflow-hidden'><a href={defenders[3] ? '/squad' : '/playerselect'}>{defenders[3] ? defenders[3].playername : 'def'}</a></div>
                            <div className=''>{defenders[3] ? defenders[3].nationality : ''}</div>
                            <div className='text-green-600 '>{defenders[3] ? `Rating: ${Math.round((defenders[3].rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={defenders[3] ? defenders[3].teamicon : ''} alt=''></img></div>
                            <button onClick={defenders[3] ? () => {Remove_Player(defenders[3].id, defenders[3].rating)} : null}><a href='/squad'>{defenders[3] ? "Remove" : null}</a></button>
                        </div>
                    </div>
                    <div className='flex flex-row pl-60'>
                        <div className='w-36 h-48 rounded-md m-2  text-black text-center font-bold flex flex-col gap-1 bg-white bg-opacity-95 hover:bg-opacity-80'>
                            <div className='bg-slate-500 text-white rounded-t-md max-h-6'><a href={goalkeepers ? '/squad' : '/goalieselect'}>{goalkeepers ? goalkeepers.playername : 'gk'}</a></div>
                            <div className=''>{goalkeepers ? goalkeepers.nationality : ''}</div>
                            <div className='text-green-600 '>{goalkeepers ? `Rating: ${Math.round((goalkeepers.rating)*10)}` : ''}</div>
                            <div className='mx-auto'><img className='h-16' src={goalkeepers ? goalkeepers.teamicon : ''} alt=''></img></div>
                            <button onClick={goalkeepers ? () => {Remove_Player(goalkeepers.id, goalkeepers.rating)} : null}><a href='/squad'>{goalkeepers ? "Remove" : null}</a></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pitch;

