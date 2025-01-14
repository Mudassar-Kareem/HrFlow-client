import React, { useEffect } from 'react'
import img from "./img/logo.png"
import { RxDashboard } from "react-icons/rx";
import { IoPeople } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/reducers/adminReducer';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
  const {error, isLogout} =useSelector((state)=>state.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const location = useLocation();
    useEffect(()=>{
      if(isLogout){
        navigate("/")
        toast.success("Logout Successfully")
      }
      
    },[dispatch,navigate,isLogout])
    const logoutHandle = (e)=>{
      e.preventDefault();
      dispatch(logout())
    }
  return (
    <div className=' fixed bg-cyan-50 h-full  '>
        <div className=' flex items-center justify-center pt-8'>
            <h1 className=' flex items-center text-lg font-bold  '> <img src={img} alt="" className=' h-10'/> HRFLOW </h1>
        </div>
        <div className=' flex flex-col gap-10 p-5 '>
            <Link to={"/admin"} className={` flex items-center gap-3 text-xl p-4 h-10 ${location.pathname === '/admin' ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white" : ""} `}><RxDashboard  size={20}/> Dashboard</Link>
            <Link to={'/employee'} className={` flex items-center gap-3 text-xl p-4 h-10 ${location.pathname === '/employee' ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white " : ""} `}><IoPeople size={20} /> Employee</Link>
            <Link to={'/attendence'} className={` flex items-center gap-3 text-xl p-4 h-10 ${location.pathname === '/attendence' ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white " : ""} `}><GiNotebook size={20}/> Attendance</Link>
            <Link to={'/history'} className={` flex items-center gap-3 text-xl p-4 h-10 ${location.pathname === '/history' ? " bg-blue-900 text-white" : ""} `}><FaHistory  size={20}/> History</Link>
            <Link onClick={logoutHandle} className={` flex items-center gap-3 text-xl p-4 h-10 ${location.pathname === '/' ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white " : ""} `}><RiLogoutCircleLine size={20} /> Logout</Link>
        </div>
    </div>
  )
}

export default Admin