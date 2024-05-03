import Link from "next/link"

function DefenderRow({defender, handleClick, slug}) {

    function makeColour(rating){ 
        let green;
        let red;

        if(rating > 6.5 && rating < 7.5){
            green = 255;
            red = 255 - (255 * (rating - 6.5));
        }else if(rating <= 6.5){
            red = 255;
            green = (42.5 * rating);
        }else{
            green = 255;
            red = 0;
        }

        return [red, green]
    }

    return(
        <tr className="outline-1 outline outline-black h-12 font-semibold">
            <td className="py-1 px-1">
                <Link className="hover:blur-[1px]" href={`/squad/${slug}/${defender.id}`}>
                {defender.playername}
                </Link>
            </td>
            <td className="px-1">{defender.nationality}</td>
            <td className="px-9">{defender.age}</td>
            <td className="px-2">{defender.height === 'null' ? 'n/a' : defender.height}</td>
            <td className="px-10">{defender.goals === null ? 0 : defender.goals}</td>
            <td className="px-10">{defender.assists === null ? (0) : (defender.assists)}</td>
            <td className="px-10">{defender.minutes === null ? 0 : defender.minutes}</td>
            <td className="px-4">{defender.team}</td>
            <td className={`px-2  `} style={{color: `rgb(${makeColour(defender.rating)[0]},${makeColour(defender.rating)[1]},0)`}}>{defender.rating === 0 ? 'null' : Math.round(defender.rating * 10)}</td>
            <td className="px-2">
                <button className=" transition bg-blue-500 hover:bg-emerald-500 text-xs text-white font-bold py-1 px-2 rounded" onClick={() => handleClick(defender)}>Choose</button>
            </td>
            <td className="py-1 px-5 hover:blur-[1px]">
                <Link href={`/squad/${slug}/${defender.id}`}>
                    {'stats >'}                        
                </Link>
            </td>
        </tr>
    )
}  

export default DefenderRow