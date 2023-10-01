import { useUser } from "@auth0/nextjs-auth0/client";
import NavBar1 from '../components/NavBar1'
import Pitch from '../components/Pitch'

export default function Squad() {
    return(
        <html>
            <body className="flex min-h-screen flex-col items-center p-24">
                <NavBar1></NavBar1>
                <Pitch></Pitch>
            </body>
        </html>
    )
}