'use client'

import NavBar1 from "../components/NavBar1"
import Pitch from '../components/Pitch'
import close from '../img/Close.svg';
import Image from "next/image";
import { useUser } from '@auth0/nextjs-auth0/client';
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
        {!isLoading &&(
        <body className="flex min-h-screen flex-col items-center p-12 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600">
                <NavBar1></NavBar1>
                <div className="h-screen">
                    <div className="p-16">
                    </div>
                    <div className="flex flex-col h-fit bg-white items-center gap-5 opacity-80 text-black font-medium p-5 rounded-md  hover:outline-offset-2 outline transition-all ease-in-out hover:outline-emerald-600  ">
                        <div className="text-black font-black text-lg inline-flex flex-row w-fit gap-9"><div>Instructions</div></div>
                        <div className="text-black font-bold">Choose which players you would like to select by clicking on the top of each banner.</div>
                        <div className="text-black font-bold">You will be redirected to a table of players you will choose from.</div>
                        <div className="text-black font-bold">Make sure you stay within your credit limit by not spending too much.</div>
                        <div className="text-black font-bold">You are given 770 credits to choose the players you like.</div>
                        <div className="text-black font-bold">Each players rating corresponds to their price</div>
                        <div className="text-black font-bold">If you remove a player your credit will be restored but you will be fined 2 credits.</div>
                        <div className="text-black font-bold">Avoid changing your squad too much or you will lose credits.</div>
                    </div>
                </div>
                <div className="p-2"></div>
                    <Pitch id={user.sub}/>
            </body>
          )} 
          </div>

    )
}
