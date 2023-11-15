'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useEffect } from 'react';

function Pitch() {

    const { user, error, isLoading } = useUser();

    useEffect(() => {
        fetch("http://localhost:8383/team").then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
            }
        )
    }, [])
    

    fetch('http://localhost:8383/team',
    {
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({
            package : user,
        }
        )
    }
    )

    return(
        <div>
            {user && (
                <div>
                    <div className='flex flex-row pl-20'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-teal-500 text-white rounded-t-md'>fwd</div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-teal-500 text-white rounded-t-md'>fwd</div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-teal-500 text-white rounded-t-md'>fwd</div>
                        </div>
                    </div>
                    <div className='flex flex-row pl-20'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-indigo-500 text-white rounded-t-md'>mid</div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-indigo-500 text-white rounded-t-md'>mid</div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-indigo-500 text-white rounded-t-md'>mid</div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>def</div>
                            <a className='text-3xl' href='/playerselect'>+</a>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>def</div>
                            <a className='text-3xl' href='/playerselect'>+</a>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>def</div>
                            <a className='text-3xl' href='/playerselect'>+</a>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>def</div>
                            <a className='text-3xl' href='/playerselect'>+</a>
                        </div>
                    </div>
                    <div className='flex flex-row pl-60'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-gray-500 text-white rounded-t-md'>gk</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pitch;

