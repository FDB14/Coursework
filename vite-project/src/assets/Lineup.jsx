import React from 'react';
import SoccerLineup from 'react-soccer-lineup'

function Lineup(){
    return(
        <div className='flex items-center justify-center h-screen'>
        <SoccerLineup className=''
            size={'small'}
            color={'lightseagreen'}
            pattern={'lines'}
            homeTeam={{squad:{ 'cm': [{'number' : 5}, {'number' : 10}, {'number' : 2}], 'gk': {'number' : 1}, 'df': [{'number' : 3}, {'number' : 5}, {'number' : 5}, {'number' : 5}], 'fw': [{'number': 9}, {'number': 11}, {'number': 7}]}}}
        />    
        </div>
    )

}

export default Lineup
