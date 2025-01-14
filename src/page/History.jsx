import React, { useEffect } from 'react'
import Admin from '../comonents/Admin'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllAttendence } from '../store/reducers/adminReducer';
const History = () => {
    const {loading,error,allAttendence} =useSelector((state)=>state.admin)
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(getAllAttendence());
    })
   
  return (
    <div className="flex">
        <Admin/>
        <div className=" flex ml-72 mt-10 mr-8 mb-10">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1010 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='bg-gradient-to-r from-[#003268] to-[#006ee8]'>
                            <TableCell align='center' style={{color:"white", fontSize:"1rem", fontWeight:"700"}}> History Id</TableCell>
                            <TableCell align='center' style={{color:"white", fontSize:"1rem", fontWeight:"700"}}> Employee Id</TableCell>
                            <TableCell align='center' style={{color:"white", fontSize:"1rem", fontWeight:"700"}}> Date </TableCell>
                            <TableCell  align='center' style={{color:"white", fontSize:"1rem", fontWeight:"700"}}> Status </TableCell>
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allAttendence && allAttendence.length !== 0 ? (
                            allAttendence.map((attendence,index)=>(
                                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 },}}>
                                    <TableCell align='center'> {attendence._id} </TableCell>
                                    <TableCell align='center'> {attendence.employeeId} </TableCell>
                                    <TableCell align='center'> {attendence.date} </TableCell>
                                    <TableCell align='center'> <span  className={`${attendence.status === "present" ? " text-green-700 font-bold" : " text-red-700 font-bold"}`}>{attendence.status}</span>  </TableCell>
                                    
                                </TableRow>
                            ))
                        ): (
                            <TableRow> <TableCell colSpan={6} align='center'> No Attendence Added </TableCell> </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default History