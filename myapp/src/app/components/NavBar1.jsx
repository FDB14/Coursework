import Link from 'next/link';

const NavBar1 = () => {

    return(
                <div className='flex font-bold text-lg flex-row align-middle'>
                    <Link href='/' className='mx-5 active:cursor-progress'>Home</Link>
                    <Link className='mx-5 active:cursor-progress' href='/squad'>Team</Link>
                    <Link className='mx-5 active:cursor-progress' href='/score'>Score</Link>
                </div>
    )
}

export default NavBar1;