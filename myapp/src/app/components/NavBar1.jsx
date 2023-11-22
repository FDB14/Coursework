import Link from 'next/link';

const NavBar1 = () => {

    return(
                <div className='flex font-bold text-lg flex-row align-middle'>
                    <a href='/' className='mx-5 active:cursor-progress'>Home</a>
                    <a className='mx-5 active:cursor-progress' href='/squad'>Team</a>
                    <a className='mx-5 active:cursor-progress' href='/score'>Score</a>
                </div>
    )
}

export default NavBar1;