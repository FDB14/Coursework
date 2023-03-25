import React, { useEffect, useState } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import football from './football.jpg'

function Header() {

    const [count, setCount] = useState(0);
    const backgroundImage = './football.jpg'


    return (
        <div className='text-xl overflow-hidden'>
            
            <Parallax pages={2}>
                
                <ParallaxLayer offset={0.2} className='p-0 m-0'>
                    <h2 className='text-5xl font-extrabold font-serif text-center'>Welcome To My Website</h2>
                </ParallaxLayer>
                
                <ParallaxLayer offset={0.8} speed={0.5}>
                    <h2 className='text-5xl font-extrabold font-serif text-center'>Goodbye</h2>
                </ParallaxLayer>
                
                <ParallaxLayer 
                offset={1}  
                speed={0.05} 
                factor={1}
                style={{
                    backgroundImage : `url(${football})`,
                    backgroundSize : 'cover'                
                }}
                >
                </ParallaxLayer>

            </Parallax>
        
        </div>
        
    )
}



export default Header