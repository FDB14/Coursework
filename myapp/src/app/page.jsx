import Login from './components/Login'
import NavBar from './components/NavBar'

export default function Home() {

  return (
    <div>
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600">
      <NavBar></NavBar>
      <div className='text-4xl font-bold transition hover:text-transparent hover:bg-gradient-to-l from-green-200 via-green-400 to-green-500 hover:bg-clip-text'>FantasyFootball</div>
      <Login></Login>
    </main>
    </div>
  )
}




