import NavBar1 from "../components/NavBar1"
import Pitch from '../components/Pitch'

export default function Squad() {

    return( 
        <html>
            <body id="one" className="flex min-h-screen flex-col items-center p-12 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600">
                <NavBar1></NavBar1>
                <div className="h-screen">
                    <div className="p-16">
                    <div className="font-black text-3xl hover:blur-sm transition hover:underline text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 text-center"><a href="#two">Choose Your Players</a></div>
                    </div>
                    <div className="flex flex-col h-fit bg-white items-center gap-5 opacity-80 text-black font-medium p-5 rounded-md  hover:outline-offset-2 outline transition-all ease-in-out hover:outline-slate-300 ">
                        <div className="text-black font-black text-lg">Instructions</div>
                        <div className="text-black font-bold">Choose which players you would like to select by clicking on the top of each banner.</div>
                        <div className="text-black font-bold">You will be redirected to a table of players you will choose from.</div>
                        <div className="text-black font-bold">Make sure you stay within your credit limit by not spending too much.</div>
                        <div className="text-black font-bold">You are given 770 credits to choose the players you like.</div>
                        <div className="text-black font-bold">If you remove a player your credit will be restored.</div>
                    </div>
                </div>
                <div id="two" className="p-2"></div>
                <Pitch></Pitch>
            </body>
        </html>
    )
}
