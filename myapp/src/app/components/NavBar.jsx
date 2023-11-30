'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const NavBar = () => {
    const { user } = useUser()

    return(
        <div>
            {user && (
        <div className='flex font-bold text-lg flex-row align-middle'>
            <div>
                <Link href='/' className='mx-5 active:cursor-progress'>Home</Link>
                <div className='text-center -m-3 h-0 text-emerald-500 text-lg cursor-default'>.</div>
            </div>
                <div className='flex flex-col text-blueGray-500 transition hover:text-white'>
                <Link className='mx-5 active:cursor-progress' href='/squad'>Team</Link>
            </div>
            <div className='flex flex-col'>
                <div className=''><Link className='mx-5 active:cursor-progress p-0 h-auto text-blueGray-500 transition hover:text-white' href='/score'>Score</Link></div>
            </div>
        </div>
            )}
        </div>
    )
}

export default NavBar;