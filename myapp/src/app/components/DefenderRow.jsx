function DefenderRow({defender, handleClick}) {
        
    return(
        <tr className="outline-1 outline">
            <td className="py-1 px-1">{defender.playername}</td>
            <td className="px-1">{defender.nationality}</td>
            <td className="px-9">{defender.age}</td>
            <td className="px-2">{defender.height === 'null' ? 'n/a' : defender.height}</td>
            <td className="px-10">{defender.goals === null ? 0 : defender.goals}</td>
            <td className="px-10">{defender.assists === null ? (0) : (defender.assists)}</td>
            <td className="px-10">{defender.minutes === null ? 0 : defender.minutes}</td>
            <td className="px-4">{defender.team}</td>
            <td className="px-2">{defender.rating === 0 ? 'null' : Math.round(defender.rating * 10)}</td>
            <td className="px-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-xs text-white font-bold py-1 px-2 rounded" onClick={() => handleClick(defender)}><a href="/squad">Choose</a></button>
            </td>
        </tr>
    )
}  

export default DefenderRow