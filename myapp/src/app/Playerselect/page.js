import { count } from "console"
import NavBar1 from "../components/NavBar1"
import Defenders from "./Getdefender"
import { list } from "postcss"

export default function Playerselect() {
    function handleClick(){
        console.log('hello')
    }
    return(
        <div className = "flex min-h-screen flex-col items-center justify-between p-32 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 ">
            <NavBar1>
            </NavBar1>
            <div className="align-middle bg-blueGray-300 text-black font-medium">
            {Defenders.then(data => {
                var num = 0 
                var playerArray = []
                for(let key in data){
                    var playerData = (data[key])
                    playerArray[num] = (Object.values(playerData))
                    num++
                }
                return playerArray})

                .then(data => {return(data.map(i => {
                    return(
                    <div className="flex flex-row gap-5 items-end outline outline-1 outline-slate-600 p-1 rounded-sm justify-between align-center">
                        <div className="w-32">{i[1]}</div>
                        <div className="w-32">{i[2]}</div>
                        <div className="w-32">{i[3]}</div>
                        <div className="w-32">{i[4]}</div>
                    </div>
                    )
                  }                  
                  ))})
            }
            
            </div>
        </div>
    )
}

