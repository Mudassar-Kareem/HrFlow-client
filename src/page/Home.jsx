import React, { useEffect } from 'react'
import Admin from '../comonents/Admin'
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import { ImCoinDollar } from "react-icons/im";
import img from "../comonents/img/profile.jpg"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {getEmployeeCount,getSalary,getAllEmployees} from '../store/reducers/adminReducer';
import { useDispatch, useSelector } from "react-redux";
import Spinner from '../comonents/Spinner';
const Home = () => {
  const {loading,error,totalEmployee,sumOfSalary,allEmployees} =useSelector((state)=>state.admin)
  const dispatch = useDispatch()
useEffect(()=>{
  dispatch(getSalary());
  dispatch(getEmployeeCount());
  dispatch(getAllEmployees());
  console.log(sumOfSalary)
},[dispatch])
  
  
  if(loading){
    return <Spinner/>
  }
  return (
    <div className=" flex">
      <Admin/>
      <div className=" flex flex-col ml-72 mt-8 mb-8 mr-8 w-full ">
        <div className=' flex justify-between  items-center text-center '>
          <div className='  text-xl cursor-pointer'><h1>Dashboard</h1></div>
          <div className=' flex items-center gap-5' >
            <input className=' border border-slate-200 rounded outline-none p-2' type="text" placeholder='Search' />
            <div className=' relative flex justify-center text-center  items-center border border-slate-300 rounded-full w-10 h-10'>
              <IoMdNotificationsOutline size={20} />
              <p className=' absolute text-red-800 -mt-9 -mr-3  '><LuDot size={35}/></p>
            </div>
            <div className=' flex justify-center items-center w-12 h-12 border border-slate-300 rounded-full'> 
              <img src={img} alt="profile img" className=' w-10 h-10 rounded-full' />
            </div>
            <h1 className=' text-xl cursor-pointer '> Admin</h1>
          </div>
        </div>
        <div className=" flex justify-between mt-10">
          <div className=" flex justify-between bg-gradient-to-r from-[#003268] to-[#006ee8] w-[300px] gap-5  text-white rounded p-6">
          <div className=' '>
            <h1 className=' text-xl font-semibold  mb-2'> Total Employees</h1>
            {totalEmployee ?(<p className="text-[30px] font-bold">{totalEmployee}</p>)  : (<p className="text-[30px] font-bold">0</p>)}
          </div>
          <div className=' flex justify-center items-center w-20 h-20 bg-white rounded-full'>
            <FaRegUserCircle size={40} className=' text-black'/>
          </div>
          </div>
          <div className=" flex justify-between bg-gradient-to-r from-[#003268] to-[#006ee8] w-[300px] gap-5  text-white rounded p-6">
          <div className=' '>
            <h1 className=' text-xl font-semibold  mb-2'> Total Budget</h1>
            <p className='text-xl font-bold mt-2'>200000$</p>
          </div>
          <div className=' flex justify-center items-center w-20 h-20 bg-white rounded-full'>
            <ImCoinDollar size={40} className=' text-green-900'/>
          </div>
          </div>
          <div className=" flex justify-between bg-gradient-to-r from-[#003268] to-[#006ee8] w-[300px] gap-5  text-white rounded p-6">
          <div className=' '>
            <h1 className=' text-xl font-semibold  mb-2'> Total Salary</h1>
            {sumOfSalary   ? (<p className='text-xl font-bold mt-2'> {sumOfSalary} $ </p>): (<p className='text-xl font-bold mt-2'>0</p>)}
          </div>
          <div className=' flex justify-center items-center w-20 h-20 bg-white rounded-full'>
            <ImCoinDollar size={40} className=' text-red-900'/>
          </div>
          </div>
        </div>
        <div className=" flex flex-col mt-16 ">
          <h1 className=' text-2xl font-semibold mb-10'> Employees</h1>
          <div className=" flex justify-center items-center w-full">
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1010 }} aria-label="simple table">
                  <TableHead>
                    <TableRow className='bg-gradient-to-r from-[#003268] to-[#006ee8] '>
                    <TableCell align='center' style={{color: 'white', fontSize:"1rem", fontWeight:"700"}}> Employee Id</TableCell>
                    <TableCell align='center' style={{color: 'white', fontSize:"1rem", fontWeight:"700"}}> Name</TableCell>
                    <TableCell align='center' style={{color: 'white', fontSize:"1rem", fontWeight:"700"}}> Email</TableCell>
                    <TableCell align='center' style={{color: 'white', fontSize:"1rem", fontWeight:"700"}}> Salary</TableCell>
                    <TableCell align='center' style={{color: 'white', fontSize:"1rem", fontWeight:"700"}}>Designation</TableCell>
                    <TableCell align='center' style={{color: 'white', fontSize:"1rem", fontWeight:"700"}}>  Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allEmployees && allEmployees.length >0 ?(
                      allEmployees.map((employee)=>(
                        <TableRow key={employee._id} sx={{ "&:last-child td, &:last-child th": { border: 0 },}}>
                          <TableCell align='center'> {employee._id} </TableCell>
                          <TableCell align='center'> {employee.name} </TableCell>
                          <TableCell align='center'> {employee.email} </TableCell>
                          <TableCell align='center'> {employee.salary}$ </TableCell>
                          <TableCell align='center'> {employee.designation} </TableCell>
                          <TableCell align='center'> {employee.address} </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} align='center'><p className=' font-semibold'>No Employees Found</p></TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home