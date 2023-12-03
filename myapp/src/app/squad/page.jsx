'use client'

import NavBar1 from "../components/NavBar1"
import Pitch from '../components/Pitch'
import close from '../img/Close.svg';
import Image from "next/image";
import { useUser } from '@auth0/nextjs-auth0/client';
import Head1 from "../components/Head1";
import { useEffect, useState } from "react";


export default function Squad() {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const { user, error, isLoading } = useUser();

    return( 
        <div>
        {isLoading &&(
            <div className="flex min-h-screen flex-col items-center p-12 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 animate-pulse">
                Loading...
            </div>
        )}
        {!user && !isLoading &&(
      <div className='flex'>
      <Head1></Head1>
        <div className='absolute w-screen h-screen justify-between py-[50vh] text-center'>
          <div className=' text-white font-black text-2xl m-5'>Return home to sign in</div>
        </div>
      </div>
        )
        }
        {!isLoading && user &&(
            <div className="flex relative">
                <div className="fixed top-0 z-50">
                <Head1></Head1>
                </div>
                    <div className="flex absolute justify-center w-full">
                        <div className="font-body">
                            <Pitch id={user.sub}></Pitch>
                        </div>
                    </div>
            </div>
          )} 
          </div>

    )
}
