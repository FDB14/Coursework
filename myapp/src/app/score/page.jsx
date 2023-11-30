'use client'

import NavBar2 from "../components/NavBar2"
import PlayerScore from "../components/PlayerScore"
import Ranking from "../components/Ranking"
import { useUser } from '@auth0/nextjs-auth0/client';

function Squad() {

    const { user, error, isLoading } = useUser();

    return(

        <div>
        {isLoading &&(
            <div className="flex min-h-screen flex-col items-center p-12 animate-pulse">
                Loading...
            </div>
        )
        }

        {!isLoading &&(
            <div className="flex min-h-screen flex-col items-center p-12">
                <div>
                    <NavBar2></NavBar2>
                </div >
                <div className="py-32 font-body">
                    <PlayerScore user={user.sub} name={user.name}></PlayerScore>
                </div>
                <div>
                    <Ranking></Ranking>
                </div>
            </div>
    )}
    </div>
    )
}

export default Squad