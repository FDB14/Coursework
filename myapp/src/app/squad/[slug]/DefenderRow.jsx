import Link from "next/link"

function DefenderRow({defender, handleClick, slug}) {
    
    return(
        <tr className="outline-1 outline h-12 font-semibold">
            <td className="py-1 px-1">
                <Link href={`/squad/${slug}/${defender.id}`}>
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
            <td className="px-2">{defender.rating === 0 ? 'null' : Math.round(defender.rating * 10)}</td>
            <td className="px-2">
                <button className=" transition bg-blue-500 hover:bg-emerald-500 text-xs text-white font-bold py-1 px-2 rounded" onClick={() => handleClick(defender)}>Choose</button>
            </td>
        </tr>
    )
}  

export default DefenderRow