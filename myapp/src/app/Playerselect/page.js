import NavBar1 from "../components/NavBar1"
import DefenderTable from "../components/DefenderTable"
import Defenders from "./test.json"
import { redirect } from "next/dist/server/api-utils"

export default async function Playerselect() {

    function quickSort(arr){
        if(arr.length < 2){
            return arr
        }
        let pivot = arr[arr.length - 1]
        let right = []
        let left = []
        for(let i = 0; i < arr.length -1; i++){
            if(arr[i].rating >= pivot.rating){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return[...quickSort(left), pivot, ...quickSort(right)]
    }

    return(
        <div className = "flex min-h-screen flex-col p-12 items-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600">
            <NavBar1>
            </NavBar1>
            <DefenderTable Defenders={quickSort(Defenders)}>
            </DefenderTable>
        </div>
    )
}