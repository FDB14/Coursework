import React from 'react';
import mockData from './MOCK_DATA.json'
import { DataGrid, GridToolbar, GridToolbarQuickFilter} from '@mui/x-data-grid'
import Football from './football.png'
import Box from '@mui/material/Box';


function Table() {
    const columns = [
        { field: 'id', headerName: 'Points', width: 70 },
        { field: 'player_name', headerName: 'Player Name', width: 180},
        { field: 'goals', headerName: 'Goals', width: 140},
        { field: 'assists', headerName: 'Assists', width: 140},   
    ]


    function CustomToolbar() {
        return (
          <GridToolbarQuickFilter></GridToolbarQuickFilter>
        );
      }
      
    return (
        <div className='grid h-screen place-items-center' style={{ height: 700, width: '100%'}}>
            <DataGrid className='bg-slate-400/80'
            rows={mockData}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            autoPageSize
            slots={{
                toolbar: CustomToolbar
            }}
            />
            <div className='bg-white'>
                <p></p>
            </div>
        </div>
        );
        }

  
export default Table
