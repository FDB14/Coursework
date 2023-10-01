'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const Pitch = () => {
    const { user, isLoading } = useUser()

    return(
        <div>
            {user && (
                <div>
                    <div className='flex flex-row pl-20'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>fwd</div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>fwd</div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>fwd</div>
                    </div>
                    <div className='flex flex-row pl-20'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>mid</div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>mid</div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>mid</div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>def</div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>def</div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>def</div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>def</div>
                    </div>
                    <div className='flex flex-row pl-60'>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>gk</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pitch;

