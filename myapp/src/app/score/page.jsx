import NavBar1 from "../components/NavBar1"
import PlayerScore from "../components/PlayerScore"

function Squad() {

    return(
            <div className="flex min-h-screen flex-col items-center p-12">
                <div>
                    <NavBar1></NavBar1>
                </div >
                <div className="py-32 font-body">
                    <PlayerScore></PlayerScore>
                </div>
            </div>
    )
}

export default Squad