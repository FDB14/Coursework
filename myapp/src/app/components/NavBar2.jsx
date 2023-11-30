import Link from 'next/link';

const NavBar1 = () => {

    return(
                <div className='flex font-bold text-lg flex-row align-middle'>
                    <div>
                    <Link href='/' className='mx-5 active:cursor-progress text-blueGray-500 transition hover:text-white'>Home</Link>
                    </div>
                    <div className='flex flex-col'>
                        <Link className='mx-5 active:cursor-progress text-blueGray-500 transition hover:text-white' href='/squad'>Team</Link>
                    </div>
                    <div className='flex flex-col'>
                        <div className=''><a className='mx-5 active:cursor-progress p-0 h-auto' href='/score'>Score</a></div>
                        <div className='text-center -m-3 h-0 text-emerald-500 text-lg cursor-default'>.</div>
                    </div>
                </div>
    )
}

export default NavBar1;