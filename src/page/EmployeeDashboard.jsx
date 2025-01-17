import React, { useEffect } from 'react';
import Employee from '../comonents/Employee';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {getSingleAttendance,getSingleEmployee } from '../store/reducers/adminReducer';
import Spinner from "../comonents/Spinner"
const EmployeeDashboard = () => {
  const { id } = useParams();
  const { loading, error, attendance, employee } = useSelector((state) => state.admin);
  console.log(attendance);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleAttendance(id));
    dispatch(getSingleEmployee(id));
    
  }, [dispatch, id]);

  return (
    <div className='flex'>
      <Employee />
      <div className='flex flex-col ml-64 mt-10 mb-10 mr-8 w-full'>
        <div className='bg-cyan-50 rounded p-8'>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            employee && (
              <div key={employee._id}>
                <div className='flex justify-between p-2 mb-6'>
                  <div className='flex flex-col gap-4'>
                    <p className='font-bold text-xl'>{employee.name}</p>
                    <p className='text-xl text-gray-500'>{employee.designation}</p>
                  </div>
                  <div className='flex justify-center items-center border-4 border-blue-900 rounded-full w-28 h-28'>
                    <img src={employee?.image?.url} alt="" className='w-[100px] h-[100px] rounded-full' />
                  </div>
                </div>
                <div className='flex justify-between rounded bg-white p-7'>
                  <div className='flex items-center gap-5'>
                    <div className='flex flex-col text-gray-500 gap-2.5'>
                      <p>Email</p>
                      <p>PhoneNo</p>
                      <p>Address</p>
                      <p>Joined date</p>
                    </div>
                    <div className='flex flex-col font-semibold gap-2.5 '>
                      <p>{employee.email}</p>
                      <p>{employee.phoneNo}</p>
                      <p>{employee.address}</p>
                      <p>{new Date(employee.dateOfJoined).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-5'>
                    <div className='flex flex-col gap-2.5 text-gray-500'>
                      <p>Salary</p>
                      <p>Department</p>
                      <p>Designation</p>
                      <p>Deduction for Leave</p>
                    </div>
                    <div className='flex flex-col gap-2.5 font-semibold'>
                      <p>{employee.salary}</p>
                      <p>{employee.department}</p>
                      <p>{employee.designation}</p>
                      <p>{employee.deductionForLeave}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div>
          <div className="text-[30px] font-semibold py-4">Attendence History</div>
          <div>
            {attendance && attendance.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                  <TableHead>
                    <TableRow className="bg-[#0157b3] text-[white] text-[40px]">
                      <TableCell align="center" className="text-white text-[45px]">History ID</TableCell>
                      <TableCell align="center" className="text-white text-[45px]">Employee ID</TableCell>
                      <TableCell align="center" className="text-white text-[45px]">Date</TableCell>
                      <TableCell align="center" className="text-white text-[45px]">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendance.map((row, index) => (
                      <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="center">{row._id}</TableCell>
                        <TableCell align="center">{row.employeeId}</TableCell>
                        <TableCell align="center">{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell align="center">
                          <span className={`text-${row.status === 'present' ? 'green-500 font-semibold text-[15px]' : 'red-500 font-semibold text-[15px]'}`}>{row.status}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className="text-[20px] ml-10 text-gray-500 text-center">
                No history found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
