'use client'

import React, { useState } from 'react'
import Login from './Login';
import { useUser } from '@auth0/nextjs-auth0/client';

function Head1() {

    const { user, isLoading } = useUser()

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen ? "flex" : "";

  return (
    <>
    <div className={`flex duration-[700ms] ${transClass ? "w-[5vw]" : "w-[100vw]"}`}>
    <div className={`transition-width h-screen duration-1000 ${transClass ? "w-[10vw]" : "w-[25vw]"} bg-col1 text-center flex justify-center items-center font-body z-50 hover:text-opacity-50`}>
            <button onClick={toggle} className='h-full w-full'>
                <div className='-rotate-90 text-6xl text-[#F4F6F6] font-extrabold text-center transition-none m-auto'>
                    {transClass ? "Menu" : "FantasyFootball"}
                </div>
            </button>
    </div>
    <div className={`duration-[1000ms] h-screen w-[25vw] bg-[#474973] text-center ${transClass ? "-translate-x-[25vw]" : ''} z-40 flex justify-center items-center font-body hover:font-Garamond transition`}>
        <div className='-rotate-90 h-fit text-6xl text-[#F4F6F6] font-extrabold '>
            <a href='/'>
                Home
            </a>
        </div>
    </div>
    
    <div className={`duration-[1100ms] h-screen w-[25vw]  bg-[#161b33] text-center ${transClass ? "-translate-x-[50vw]" : ""} flex flex-col justify-center items-center font-body hover:font-Garamond z-30 transition`} >
        <div className='-rotate-90 h-fit text-6xl text-[#F4F6F6] font-extrabold'>
            <a href='/squad'>
            Squad
            </a>
        </div>
        <div className=''>
        </div>
    </div>
    <div className={`duration-[1200ms] h-screen w-[25vw] bg-[#a69cac] text-center flex ${transClass ? "-translate-x-[75vw]" : ""} justify-center items-center font-body hover:font-Garamond transition z-20`}>
        <div className='-rotate-90 h-fit text-6xl text-[#F4F6F6] font-extrabold '>
            <a href='/score'>
            Score
            </a>
        </div>
    </div>
    </div>
    </>
  )
}

export default Head1