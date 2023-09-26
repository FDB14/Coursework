import { error } from "console";
const {Client} = require('pg');
import Link from "next/link";
import NavBar from './components/NavBar'

const client = new Client({
  host : "localhost",
  user : "admin",
  port : 5432,
  password : "root",
  database : "mainconnection"
})

client.connect()

let playersNames = client.query(`SELECT playername FROM playersmain;`)
            .then((result) => {return (result.rows)})
            .then(result => {return JSON.stringify(result)})
            .then(result => {return result.replaceAll(/[^a-zA-Z0-9ãćØéáíóúüñäöß]/g, " ")})
            .then(result => {return result.replaceAll('playername', '')})
            .catch(error => console.log(error))
            .finally(() => client.end)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-primary">
      <link rel="stylesheet" href="src\app\styles.css"/>
      <div className='font-mono text-4xl font-bold'>FantasyFootball</div>
      <NavBar></NavBar>
      <div className="bg-white/70 shadow-inner text-center">
        <p className="font-mono">{playersNames}</p>
      </div>
    </main>
  )
}




