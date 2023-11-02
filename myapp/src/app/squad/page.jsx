import NavBar1 from "../components/NavBar1"
import Pitch from '../components/Pitch'

export default function Squad() {

    return( 
        <html>
            <body id="one" className="flex min-h-screen flex-col items-center p-12 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600">
                <NavBar1></NavBar1>
                <div className="h-screen">
                    <div className="p-16">
                    <a className="font-black text-3xl hover:blur-sm transition hover:underline text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600" href="#two">Choose Your Players</a>
                    </div>
                    <div className="flex flex-col h-56 bg-white items-center justify-between opacity-80 text-black font-medium p-5 rounded-md">
                        <div className="text-black font-bold text-lg">Instructions</div>
                    </div>
                </div>
                <div id="two" className="p-2"></div>
                <Pitch></Pitch>
            </body>
        </html>
    )
}
