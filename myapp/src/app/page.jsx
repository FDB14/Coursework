import { error } from "console";
const {Client} = require('pg');
import { useUser } from "@auth0/nextjs-auth0/client";

const client = new Client({
  host : "localhost",
  user : "admin",
  port : 5432,
  password : "root",
  database : "mainconnection"
})

client.connect()

let temp = client.query(`SELECT playername FROM playersmain;`)
            .then((result) => {return (result.rows)})
            .then(result => {return JSON.stringify(result)})
            .then(result => {return result.replaceAll(/[^a-zA-Z0-9ãćØéáíóúüñäöß]/g, " ")})
            .then(result => {return result.replaceAll('playername', '')})
            .catch(error => console.log(error))
            .finally(() => client.end)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <link rel="stylesheet" href="src\app\styles.css"/>
      <div className='font-mono text-4xl font-bold'>FantasyFootball</div>
      <div>
        <a href="/login" className="font-mono font-semibold hover:opacity-50 hover:transition">Sign In</a>
      </div>
      <div>
        <a href='/signup' className="font-mono font-semibold hover:opacity-50 hover:transition">Sign Up</a>
      </div>
      <div className="font-mono text-white w-10/12 animate-marquee truncate overflow-hidden">{temp}
      </div>
    </main>
  )
}




