import React, { useEffect, useState } from 'react'

function Header() {

    return (
        <>
            <ul className='bg-cyan-900/20 text-white outline outline-5 outline-slate-200/20 p-5 font-mono font-extrabold'>
                <li className='inline mr-5'><a>fantasyFootball</a></li>
                <li className='
                inline
                mr-5 
                right-24
                p-1 
                absolute
                hover:underline 
                hover:cursor-pointer 
                active:bg-blue-800/30'
                ><a>Sign In</a>
                </li>
                <li className='
                inline
                mr-5 
                right-1 
                p-1 
                absolute
                hover:underline 
                hover:cursor-pointer 
                active:bg-blue-800/30'
                ><a>Sign Up</a>
                </li>
            </ul>
        </>        
    )
}

export default Header