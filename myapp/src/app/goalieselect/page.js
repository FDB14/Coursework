import React from 'react'
import NavBar1 from '../components/NavBar1'
import GoalTable from '../components/GoalTable'

const page = () => {
  return (
    <div className = "flex min-h-screen flex-col p-12 items-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600">
    <NavBar1>
    </NavBar1>
    <GoalTable>
    </GoalTable>
    </div>
            
    )
}

export default page