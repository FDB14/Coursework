import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { stringify } from 'querystring'

function RankingComp({scores}) {

  const {user} = useUser()
  let VerId = scores.auth0_id

  if(user.sub.includes((VerId)) == true){
    return(
      <tr className=' bg-emerald-500 bg-opacity-50 text-center outline outline-1'>
        <td className='px-5'>{scores.user_name ? scores.user_name : 'n/a'}</td>
        <td className='px-5'>{scores.userscore ? scores.userscore : 0}</td>
        <td className='px-5'>You</td>
      </tr>
    )
  }else{
    return (
      <tr className='text-center'>
        <td className='px-5'>{scores.user_name ? scores.user_name : 'n/a'}</td>
        <td className='px-5'>{scores.userscore ? scores.userscore : 0}</td>
        <td></td>
      </tr>
    )
  }
}

export default RankingComp