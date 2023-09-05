const {Client} = require('pg')

const client = new Client({
  host : "localhost",
  user : "admin",
  port : 5432,
  password : "root",
  database : "mainconnection"
})

let temp = client.query(`SELECT playername FROM playersmain;`)
            .then((result) => {return (result.rows)})
            .then(result => {return JSON.stringify(result)})

client.connect();

let targetofgreeting = 'hello'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='font-mono text-5xl font-bold'>FantasyFootball</div>
      <div>
        <a href="/login">Sign In</a>
      </div>
      <div>
        <a href='/signup'>Sign Up</a>
      </div>
      <div className="bg-white p-5 text-black rounded-md">
        <img src=''>
          {temp}
        </img>
      </div>
    </main>
  )
}

