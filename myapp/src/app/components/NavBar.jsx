'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const NavBar = () => {
    const { user } = useUser()

    return(
        <div>
            {user && (
                <div className='flex font-bold text-lg flex-row align-middle'>
                    <Link href='/' className='mx-5 active:cursor-progress'>Home</Link>
                    <a className='mx-5 active:cursor-progress' href='/squad'>Team</a>
                    <Link className='mx-5 active:cursor-progress' href='/score'>Score</Link>
                </div>
            )}
        </div>
    )
}

export default NavBar;