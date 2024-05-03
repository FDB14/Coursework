'use client'

import React from 'react'
import Squad from '../components/Pitch2'
import { useUser } from '@auth0/nextjs-auth0/client';


function page() {

    const { user, error, isLoading } = useUser();

  return (
    <div>
    {!isLoading && user &&(
        <div>
            <Squad id={user.sub}></Squad>
        </div>
    )
    }
    </div>
  )
}

export default page