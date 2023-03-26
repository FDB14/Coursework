import { useState } from 'react'
import './App.css'
import Header from './assets/header.jsx'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'


function App() {
  const [count, setCount] = useState(0)

  return (
  
      <Parallax pages={2}>
        <ParallaxLayer offset={0}>
          <Header></Header>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={5}>
          <Header></Header>
        </ParallaxLayer>

      </Parallax>
         
  )
}

export default App
