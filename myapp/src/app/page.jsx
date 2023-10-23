import Login from './components/Login'
import NavBar from './components/NavBar'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600">
      <link rel="stylesheet" href="src\app\styles.css"/>
      <NavBar></NavBar>
      <div className='font-mono text-4xl font-bold transition hover:text-transparent hover:bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500 hover:bg-clip-text'>FantasyFootball</div>
      <Login></Login>
    </main>
  )
}




