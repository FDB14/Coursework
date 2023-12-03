import React from 'react'
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { setUncaughtExceptionCaptureCallback } from 'process';
import RankingComp from './RankingComp';

function Ranking() {

    const { user, error, isLoading } = useUser();

    const [scores, setScores] = useState([{"userscore": null, "userid": 107}]);

    useEffect(() => {
        fetch("http://localhost:8383/ranking").then(
            response => {return response.json()}
        ).then(data => {
            setScores(data.data)
        })
    },[])

    function quickSort(arr){
        if(arr.length < 2){
            return arr
        }
        let pivot = arr[arr.length - 1]
        let right = []
        let left = []
        for(let i = 0; i < arr.length -1; i++){
            if(arr[i].userscore >= pivot.userscore){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return[...quickSort(left), pivot, ...quickSort(right)]
    }


    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }
    if(error){
        <div>{error.message}</div>
    }
    return (
        <div className='align-middle font-medium m-10'>
            <table className=''>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    quickSort(scores).map((scores, index) => (
                <tbody className='' key={index}>
                        <RankingComp scores={scores} key={index}></RankingComp>
                </tbody>
                                    ))
                                }
            </table>
        </div>
    )
}

export default Ranking