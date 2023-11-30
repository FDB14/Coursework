import Link from 'next/link';

const NavBar1 = () => {

    return(
        <div className='flex font-bold text-lg flex-row align-middle'>
            <div>
                <a href='/' className='mx-5 active:cursor-progress text-blueGray-500 transition hover:text-white'>Home</a>
            </div>
            <div className='flex flex-col'>
                <a className='mx-5 active:cursor-progress' href='/squad'>Team</a>
                <div className='text-center -m-3 h-0 text-emerald-500 text-lg cursor-default'>.</div>
            </div>
            <div className='flex flex-col'>
                <div className=''><a className='mx-5 active:cursor-progress p-0 h-auto text-blueGray-500 transition hover:text-white' href='/score'>Score</a></div>
            </div>
    </div>
    )
}

export default NavBar1;