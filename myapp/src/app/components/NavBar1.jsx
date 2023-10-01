import Link from 'next/link';

const NavBar1 = () => {

    return(
        
                <div className='flex font-bold text-lg flex-row align-middle'>
                    <Link href='/' className='mx-5'>Home</Link>
                    <Link className='mx-5' href='/squad'>Team</Link>
                    <Link className='mx-5' href='/score'>Score</Link>
                </div>
    )
}

export default NavBar1;