import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Back from '../img/backarrow.svg'

function back({params}) {

    console.log(params.id)
  return (
    <div className='flex p-5'>
        <Link href={params.id ? `/squad/${params.slug}` : `/squad/`} className='flex flex-row hover:translate-x-2 transition-all'>
            <Image src={Back} alt='' className=''></Image>
            <div className='text-white'>
                Back
            </div>
        </Link>
    </div>
  )
}

export default back