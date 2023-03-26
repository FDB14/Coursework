import React, { useEffect, useState } from 'react'

function Header() {

    return (
        <>
        <div className='p-5 text-white font-extrabold font-sans bg-cyan-900/20 outline outline-1 outline-slate-200/20 gap-1'>
            <span>fantasyFootball</span>
                <button className='absolute right-2 hover:underline hover:cursor-pointer active:bg-amber-600/20 focus:outline-none focus:ring-1 focus:rounded-3xl  focus:ring-white'>Sign In</button>
            <button className='absolute right-2 mr-20 hover:underline hover:cursor-pointer active:bg-amber-600/20 focus:outline-none focus:ring-1 focus:rounded-3xl  focus:ring-white'>Sign Up</button>
            
            
        </div>
        </>        
    )
}

export default Header