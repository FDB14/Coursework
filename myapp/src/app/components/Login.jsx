'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const Login = () => {
    const { user, isLoading } = useUser()

    return(
        <div>
            {isLoading &&(
                <div className='animate-pulse text-blue-800 font-bold'>...loading</div>
            )
            }
            {!isLoading && !user &&(
                <Link
                href="/api/auth/login"
                className='font-bold p-5 text-3xl font-sans animate-pulse'
                >
                login
                </Link>
            )}
            {user && (
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
                    
                    <Link href="/api/auth/logout" className='font-bold'>logout</Link>
                </div>
                
            )}
        </div>
    )
}

export default Login;