import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Spinner from "../comonents/Spinner"
import { adminLogin } from "../store/reducers/adminReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
    const [selectBtn,setSelecetBtn] =useState('Admin');
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const {loading,error,isAdminLogin} =useSelector((state)=>state.admin)
    const dispatch =useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
      if(isAdminLogin){
        toast.success("Login successfully")
        navigate("/admin")
      }
      if(error){
        toast.error("Invalid password or email")
      }
    },[isAdminLogin,error])

    const submit =(e) =>{
      e.preventDefault();
      if(email === "mudassar@gmail.com" && password === "mudassar"){
        dispatch(adminLogin({email,password}))
      }else{
        toast.error("Wrong email or password")
      }
    }
    if(loading){
      return <Spinner/>
    }
  return (
    <div className=" flex justify-center items-center  w-full h-screen bg-gradient-to-r from-[#003268] to-[#006ee8]">
        <div className=" w-1/4 h-auto p-10 rounded-lg bg-white ">
            <div className=" flex flex-col gap-8">
              <h1 className=" m-auto text-2xl font-bold">Welcome Back</h1>
                <div className=" flex border  border-gray-400 rounded text-center">
                    <Link className={` flex-1  w-120 p-2 rounded  ${selectBtn === 'Admin' ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white" :" text-blue-900, bg-white" }`} onClick={()=>setSelecetBtn('Admin')} >
                      Admin
                    </Link>
                    <Link to="/employeelogin" className={`flex-1  w-120 p-2 rounded ${selectBtn === 'Employee' ? "bg-gradient-to-r from-[#003268] to-[#006ee8]  text-white" :" text-blue-900, bg-white" }`} onClick={()=>setSelecetBtn('Employee')} >
                      Employee
                    </Link>
                </div>
                <form onSubmit={submit} >
                <input
  required
  className="w-full border border-gray-400 rounded p-1 outline-none"
  type="text"
  placeholder={selectBtn === 'Admin' ? "mudassar@gmail.com" : "Enter your email"}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<input
  required
  className="mt-2 w-full border border-gray-400 rounded p-1 outline-none"
  type="password"
  placeholder={selectBtn === 'Admin' ? "mudassar" : "Enter your password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

                  <div>
                  <button type="submit"  className="  w-full text-center bg-gradient-to-r from-[#003268] to-[#006ee8] p-2 rounded text-white mt-10">Login</button>
                  </div>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default Login