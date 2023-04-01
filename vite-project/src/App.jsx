import './App.css';
import Header from './assets/header.jsx';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Table from './assets/Table';
import Body from './assets/Body';
import Footer from './assets/Footer';
import Lineup from './assets/Lineup';


function App() {
  return (
    <>
      
      <Parallax pages={2.5}>
      
        <ParallaxLayer offset={0}>
      
          <Header></Header>
      
        </ParallaxLayer>
              
        <ParallaxLayer offset={0.25}>
      
          <Lineup/>
      
        </ParallaxLayer>
      
        <ParallaxLayer offset={1} speed={0.5}>
      
          <Table></Table>
      
        </ParallaxLayer>
        
        <ParallaxLayer offset={1.9} speed={0}>
      
          <Footer></Footer>
      
        </ParallaxLayer>
      
      </Parallax>
           
      </>      
  )
}

export default App
