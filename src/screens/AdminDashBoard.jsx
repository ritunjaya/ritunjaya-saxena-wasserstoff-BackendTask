import React from 'react'
import SideBar from '../component/admin/SideBar'
import AdminTable from '../component/admin/AdminTable'

const AdminDashBoard = () => {
    return (
        <div className='flex flex-row gap-2'>
            <SideBar />
            <div className='p-12'>
                <AdminTable />
            </div>
        </div>
    )
}

export default AdminDashBoard
