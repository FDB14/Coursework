import './App.css';
import Header from './assets/header.jsx';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Table from './assets/Table'


function App() {
  return (
      <Parallax pages={2}>
        <ParallaxLayer offset={0} speed={0.5}>
          <Header></Header>
        </ParallaxLayer>
        <ParallaxLayer offset={1.2} speed={5}>
          <Table></Table>
        </ParallaxLayer>
      </Parallax>
         
  )
}

export default App
