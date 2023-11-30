'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

const Login = () => {
    const { user, isLoading } = useUser()

    console.log(user)

    useEffect(() => {
        const res = fetch('http://localhost:8383/saveuser',
        {
            method : 'POST',
            headers : {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({
                package : true,
            }
            )
        }
        )
    }, [])

    return(
        <div>
            {isLoading &&(
                <div className='animate-pulse text-blue-800 font-bold'>...loading</div>
            )
            }
            {!isLoading && !user &&(
                <a
                href="/api/auth/login"
                className='font-bold p-5 text-3xl font-sans animate-pulse'
                >
                login
                </a>
            )}
            {user &&(
                
                <div className='flex flex-col items-center'>
                    <img
                    src={user.picture}
                    alt='user'
                    className='w-16 h-16 rounded-full'
                    >
                    </img>
                    {user.name &&(
                        <p className='text-white py-2'>{user.name}</p>
                    )
                    }
                    <a href="/api/auth/logout" className='font-bold'>logout</a>
                </div>
                
            )}
        </div>
    )
}

export default Login;