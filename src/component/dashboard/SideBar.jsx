import React from 'react'
import { FaHome } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { IoMdContact } from "react-icons/io";

const SideBar = () => {


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    return (
        <div className="p-2 pt-4  w-[300px] text-white bg-[#475569] h-[100vh] drop-shadow-xl ">
            <div className="flex flex-col gap-12">
                <h4 className="font-bold  pb-2 border-b-2 border-white">
                    User Dashboard
                </h4>
                <div className="flex flex-col pl-4 gap-6">
                    <div className="flex flex-row gap-4 hover:text-blue-500 cursor-pointer">
                        <FaHome size={20} />
                        <a href="/dashboard">
                            <h5>Home</h5>
                        </a>
                    </div>
                    <div className="flex flex-row gap-4 hover:text-blue-500 cursor-pointer">
                        <BsEye size={20} />
                        <a href="/table">
                            <h5>Review Image Status</h5>
                        </a>
                    </div>
                    <div className="flex flex-row gap-4 hover:text-blue-500 cursor-pointer" onClick={handleLogout}>
                        <IoMdContact size={20} />
                        <h5>Logout</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
