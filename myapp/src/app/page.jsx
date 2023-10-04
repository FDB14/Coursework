import Login from './components/Login'
import NavBar from './components/NavBar'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-primary">
      <link rel="stylesheet" href="src\app\styles.css"/>
      <NavBar></NavBar>
      <div className='font-mono text-4xl font-bold'>FantasyFootball</div>
      <Login></Login>
    </main>
  )
}




