import React from 'react'
import ReviewTable from '../component/ReviewTable';
import SideBar from './dashboard/SideBar';
import AuthGuard from './AuthGuard';


const Sider = () => {
  return (
    <AuthGuard>
      <div className="flex flex-row">
        <SideBar />
        <ReviewTable />
      </div>
    </AuthGuard>
  )
}

export default Sider