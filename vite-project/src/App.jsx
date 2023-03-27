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
      
      <Parallax pages={3}>
      
        <ParallaxLayer offset={0} speed={0.5}>
      
          <Header></Header>
      
        </ParallaxLayer>
      
        <ParallaxLayer offset={0.3}>
      
          <Body></Body>
      
        </ParallaxLayer>
        
        <ParallaxLayer offset={1.4}>
      
          <Lineup/>
      
        </ParallaxLayer>
      
        <ParallaxLayer offset={0.99} speed={1}>
      
          <Table></Table>
      
        </ParallaxLayer>
        
        <ParallaxLayer offset={2.5} speed={1}>
      
          <Footer></Footer>
      
        </ParallaxLayer>
      
      </Parallax>
           
      </>      
  )
}

export default App
