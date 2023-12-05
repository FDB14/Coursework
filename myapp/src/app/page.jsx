import Login from './components/Login'
import NavBar from './components/NavBar'
import Head1 from './components/Head1'

export default function Home() {

  return (
      <div className='flex'>
      <Head1></Head1>
        <div className='absolute w-screen h-screen justify-between py-[50vh] text-center'>
          <div className=' text-white font-black text-2xl m-5'>FantasyFootball</div>
          <Login/>
        </div>
      </div>
  )
}