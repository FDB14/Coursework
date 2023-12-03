'use client'

import Head1 from "../components/Head1";
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
        {!user &&(
            <div className="flex min-h-screen flex-col items-center p-12">Return to home to login</div>
        )}
        {!isLoading && user &&(
            <div className="flex flex-col">
                <Head1></Head1>
                    <div className="flex absolute justify-center w-screen">
                        <div className="py-32 font-body">
                            <PlayerScore user={user.sub} name={user.name}></PlayerScore>
                            <Ranking></Ranking>
                        </div>
                    </div>
            </div>
    )}
    </div>
    )
}

export default Squad