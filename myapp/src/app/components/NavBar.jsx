'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const NavBar = () => {
    const { user, isLoading } = useUser()

    return(
        <div>
            {!isLoading && !user &&(
                <Link
                href="/api/auth/login"
                className='font-bold p-5 text-3xl font-sans'
                >
                login
                </Link>
            )}
            {user && (
                <div className='flex flex-col items-center'>
                    <img
                    src={user.picture}
                    alt='profile'
                    className='w-16 h-16 rounded-full'
                    >
                    </img>
                    {user.name &&(
                        <p className='text-white'>hello {user.name}</p>
                    )
                    }
                    <Link href="/api/auth/logout" className='font-bold p-5'>logout</Link>
                </div>
                
            )}
        </div>
    )
}

export default NavBar;