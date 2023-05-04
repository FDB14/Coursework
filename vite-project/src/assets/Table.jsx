import * as React from 'react';
import mockData from './MOCK_DATA.json'
import { DataGrid, GridToolbarQuickFilter} from '@mui/x-data-grid'
import player_model from './player_model'

function Table() {

    const [selectionModel, setSelectionModel] = React.useState([])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
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
        <div className='h-5/6 w-fit items-center ml-auto mr-auto'>
            <div className='text-red-500 text-center font-extrabold font-mono'>
              <p id='type'>Select 11 Players</p>
            </div>
            <DataGrid className='bg-slate-400/80'
            id="table"
            rows={mockData}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            autoPageSize
            slots={{
                toolbar: CustomToolbar
            }}
            
            onRowSelectionModelChange={(itm) => { if(itm.length === 11){
              
              const selectedRowData = itm.map((id) => mockData.find((row) => row.id === id))

              console.log(selectedRowData);

              const pickedPlayer = {
                playerID : selectedRowData[0].id,
                playerName : selectedRowData[0].player_name,
                playerGoals : selectedRowData[0].goals,
                playerAssists : selectedRowData[0].assists
              }

              console.log(pickedPlayer.playerAssists)

              document.getElementById("type").innerHTML = "Lineup Saved 👍"
              document.getElementById("type").style.color = "green"
            
            } else if(itm.length > 11){
              console.log("Too many items selected")
              document.getElementById("type").innerHTML = "Too Many Players Selected"
              document.getElementById("type").style.color = "rgb(239 68 68)"
            
            } else if(itm.length < 11){
              console.log("Select 11 Players")
              document.getElementById("type").innerHTML = "Select 11 Players"
              document.getElementById("type").style.color = "rgb(239 68 68)"
            }
            }}
            />
        </div>
        );
        }

  
export default Table
