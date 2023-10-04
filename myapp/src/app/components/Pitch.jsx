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
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center'>
                            <div className='bg-teal-500 text-white rounded-t-md font-bold'>fwd</div>
                            <div>
                                <div className='font-semibold'>Kevin de Bruyne</div>
                                <div>goals: 200000</div>
                                <div>assists: 9999999</div>
                            </div>
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
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>def</div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>def</div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>def</div>
                        </div>
                        <div className='w-36 h-48 rounded-md m-2 bg-white text-black text-center font-bold hover:cursor-pointer'>
                            <div className='bg-fuchsia-500 text-white rounded-t-md'>def</div>
                            <a className='text-3xl'>+</a>
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

