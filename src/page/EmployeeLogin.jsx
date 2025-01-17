import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { employeeLogin } from '../store/reducers/adminReducer';
import toast from 'react-hot-toast';
const EmployeeLogin = () => {
    const [selectBtn,setSelecetBtn] =useState('Employee');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const {loading,error,isEmployee} =useSelector((state)=>state.admin)
    const dispatch =useDispatch()
    const navigate = useNavigate()
    // let id =null;
    const submit = async (e) => {
      e.preventDefault();
      try {
        const action = await dispatch(employeeLogin({ email, password }));
        const { id, message } = action.payload; // Ensure you're accessing id from the payload
    
        if (message === "Login successfully" && id) {
          console.log(id); // Debugging id
          navigate(`/employeedashboard/${id}`); // Navigate to the employee dashboard
          toast.success("Login Successfully");
        } else {
          toast.error("Login failed: " + message); // Error message handling
        }
      } catch (error) {
        toast.error("Error: " + error.message); // Error handling
      }
    };
    
  return (
    <div className=" flex justify-center items-center  w-full h-screen bg-gradient-to-r from-[#003268] to-[#006ee8]">
        <div className=" w-1/4 h-auto p-10 rounded-lg bg-white ">
            <div className=" flex flex-col gap-8">
              <h1 className=" m-auto text-2xl font-bold">Welcome Back</h1>
                <div className=" flex border  border-gray-400 rounded text-center">
                    <Link to="/" className={` flex-1  w-120 p-2 rounded  ${selectBtn === 'Admin' ? " bg-gradient-to-r from-[#003268] to-[#006ee8]  text-white" :" text-blue-900, bg-white" }`} onClick={()=>setSelecetBtn('Admin')} >
                      Admin
                    </Link>
                    <Link  className={`flex-1  w-120 p-2 rounded ${selectBtn === 'Employee' ? " bg-gradient-to-r from-[#003268] to-[#006ee8]  text-white" :" text-blue-900, bg-white" }`} onClick={()=>setSelecetBtn('Employee')} >
                      Employee
                    </Link>
                </div>
                <form onSubmit={submit} >
                  <input required className=" w-full  border  border-gray-400 rounded p-1 outline-none " type="text" placeholder=" Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                  <input required className=" mt-2 w-full  border  border-gray-400 rounded p-1 outline-none " type="text" placeholder=" Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <div>
                  <button  type='submit' className=" w-full text-center bg-gradient-to-r from-[#003268] to-[#006ee8] p-2 rounded text-white mt-10">Login</button>
                </div>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default EmployeeLogin