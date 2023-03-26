import React from 'react';
import mockData from './MOCK_DATA.json'
import { DataGrid } from '@mui/x-data-grid'
import Football from './football.png'


function Table() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'player_name', headerName: 'Player Name', width: 180},
        { field: 'goals', headerName: 'Goals', width: 140},
        { field: 'assists', headerName: 'Assists', width: 140},   
    ]

    
    return (
        <div className='grid h-screen place-items-center' style={{ height: 700, width: '100%'}}>
            <DataGrid className='bg-slate-600/70 text-white'
            rows={mockData}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            />
            <div className='bg-white'>
                <p></p>
            </div>
        </div>
        );
        }

  
export default Table 
