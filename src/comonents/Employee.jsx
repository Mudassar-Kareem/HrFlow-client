import React from 'react'
import logo from "./img/logo.png"
import { RxDashboard } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
const Employee = () => {
  return (
    <div className=' fixed  bg-cyan-50 h-full'>
        <div className=' flex justify-center items-center gap-1 pt-8'>
            <img src={logo} alt="Logo" className=' h-10' />
            <h1 className=' font-bold text-2xl'>HRFLOW</h1>
        </div>
        <div className=' flex flex-col p-8 gap-5'>
            <Link className=' flex  gap-3 bg-gradient-to-r from-[#003268] to-[#006ee8] text-white p-2 px-4'> <RxDashboard size={20}/> Dashboard</Link>
            <Link className=' flex gap-3 text-xl items-center' to="/"> <RiLogoutCircleLine size={20}/> Logout</Link>
        </div>
    </div>
  )
}

export default Employee