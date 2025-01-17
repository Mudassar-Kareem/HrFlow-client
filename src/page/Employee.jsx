import React, { useEffect, useState } from 'react';
import Admin from '../comonents/Admin';
import { Input } from '@material-tailwind/react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { CgMail } from 'react-icons/cg';
import { FaPhone } from 'react-icons/fa';
import { createEmployee, getAllEmployees, getEmployeeCount, deleteEmployee } from '../store/reducers/adminReducer';
import baseurl from '../store/baseurl';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../store/reducers/adminReducer';
import toast from 'react-hot-toast';

const Employee = () => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');
  const [dateOfJoined, setDateOfJoined] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [deductionForLeave, setDeductionForLeave] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    address: '',
    dateOfJoined: '',
    salary: '',
    department: '',
    phoneNo: '',
    deductionForLeave: '',
    designation: '',
    gender: '',
  });

  const {
    isEmployeeCreated,
    allEmployees,
    loading,
    error,
    totalEmployee,
    employeeDeleted,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(getEmployeeCount());
  }, [dispatch]);
const handleFileInputChange = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
  
      const payload = {
        name,
        email,
        password,
        address,
        salary,
        gender,
        designation,
        dateOfJoined,
        phoneNo,
        department,
        deductionForLeave,
        image,
      };
  
      await dispatch(createEmployee(payload));
    } catch (err) {
      toast.error('Error creating employee');
      console.error(err);
    }
  };
  

  const clearFormData = () => {
    setName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setImage(null);
    setDateOfJoined('');
    setSalary('');
    setDepartment('');
    setPhoneNo('');
    setDeductionForLeave('');
    setDesignation('');
    setGender('');
  };

  useEffect(() => {
    if (isEmployeeCreated) {
      dispatch(clearState());
      dispatch(getAllEmployees());
      dispatch(getEmployeeCount());
      clearFormData();
      toast.success('User created successfully');
    }
  }, [dispatch, isEmployeeCreated]);

  const deleteHandle = (id) => {
    dispatch(deleteEmployee(id));
  };

  useEffect(() => {
    if (employeeDeleted) {
      dispatch(clearState());
      dispatch(getAllEmployees());
      dispatch(getEmployeeCount());
      toast.success('User deleted successfully');
    }
  }, [dispatch, employeeDeleted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateData = (employeeId) => {
    setSelectedId(employeeId);

    const editData = allEmployees.find((emp) => emp._id === employeeId);
    if (editData) {
      setUpdateData({
        name: editData.name,
        email: editData.email,
        image: editData.image,
        address: editData.address,
        dateOfJoined: editData.dateOfJoined,
        salary: editData.salary,
        department: editData.department,
        phoneNo: editData.phoneNo,
        deductionForLeave: editData.deductionForLeave,
        designation: editData.designation,
        gender: editData.gender,
      });
    } else {
      toast.error('Employee not found');
    }
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${baseurl}/update/${selectedId}`, updateData)
      .then(() => {
        dispatch(getAllEmployees());
        toast.success('Employee updated successfully');
      })
      .catch(() => {
        toast.error('Error in updating employee');
      });
  };

  return (
    <div className="flex">
      <Admin />
      <div className=" flex flex-col w-full gap-20 ml-72 mr-8 mt-7 mb-10 ">
            <div className=' flex justify-between  items-center '>
                <div className=' flex gap-4  items-center text-xl  font-semibold'>
                    {totalEmployee ? (<p className=' font-bold text-blue-800'> {totalEmployee} Employee</p>) : <p> 0 Employee</p>}
                </div>
                <div>
                <button className='bg-gradient-to-r from-[#003268] to-[#006ee8] p-3 rounded text-white font-semibold' data-bs-toggle="modal" data-bs-target="#staticBackdrop" > + Add Employee</button>
                </div>
            </div>
            <div className="modal fade" id='staticBackdrop' data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className='modal-title' id="staticBackdropLabel" style={{fontSize: "25px"}}> Add Employee</h4>
                <button className=' bg-gradient-to-r from-[#003268] to-[#006ee8] text-white p-2 rounded w-24' type=' button' aria-label='close' data-bs-dismiss="modal"> Close</button>
              </div>
              <div className='modal-body'>
                <form onSubmit={handleSubmit}>
                  <div className=' flex flex-col gap-8'>
                    <Input name='name' label='Enter Name' color='blue' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <Input name='email' label='Enter Email Adress' color='blue' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Input name='password' label='Enter Password ' color='blue' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <Input name='address' label='Enter Address ' color='blue' value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    <Input type='date' label='Enter Date ' color='blue' value={dateOfJoined} onChange={(e)=>setDateOfJoined(e.target.value)}/>
                    <Input name='number' label='Enter Phone Number' color='blue' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/>
                    <Input name='salary' label='Enter Salary' color='blue' value={salary} onChange={(e)=>setSalary(e.target.value)}/>
                    <Input name='department' label='Enter Deparment ' color='blue' value={department} onChange={(e)=>setDepartment(e.target.value)}/>
                    <Input name='leave' label='Enter Leave ' color='blue' value={deductionForLeave} onChange={(e)=>setDeductionForLeave(e.target.value)}/>
                    <Input name='designation' label='Enter Designation ' color='blue' value={designation} onChange={(e)=>setDesignation(e.target.value)}/>
                    <Input name='gender' label='Enter Gender ' color='blue' value={gender} onChange={(e)=>setGender(e.target.value)}/>
                    <input
                      type="file"
                      name="image"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                      className="w-full border border-[black] rounded-lg "
                    />
                    
                  </div>
                  <div className='modal-button'>
                    <button type='submit' aria-label='Close' data-bs-dismiss="modal" className=" bg-gradient-to-r from-[#003268] to-[#006ee8] text-[white] mt-3  p-2 rounded-lg">
                      Add Employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
           </div>
           <div className="grid grid-cols-3 gap-8">
          {allEmployees ? (
            allEmployees?.map((emp, index) => {
              return (
                <div
                  className="flex flex-col p-4 rounded-xl h-[410px] w-[350px] bg-[#f8fafb]"
                  key={index}
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <img
                        src={emp?.image?.url}
                        alt="user"
                        className=" rounded-full h-[80px] w-[80px] object-cover"
                      />
                      <h1 className="mt-2 text-[21px]">{emp.name}</h1>
                      <p className=" text-[#0000007b]">{emp.designation}</p>
                    </div>
                    {/*  */}
                    <div class="dropdown">
                      <button
                        type="button"
                        id={`dropdownMenuButton${index}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <HiDotsHorizontal className="text-[25px] cursor-pointer" />
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${index}`}
                      >
                        <li>
                          <a class="dropdown-item">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => handleUpdateData(emp._id)}
                            >
                              Update
                            </button>
                          </a>
                        </li>

                        {/*  */}
                        <li>
                          <a
                            class="dropdown-item hover:bg-[red] hover:text-white"
                            href="#"
                            onClick={() => deleteHandle(emp._id)}
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl mt-4 p-4">
                    <div className="flex justify-between text-[#0000007b]">
                      <p>Department</p>
                      <p>Hired Date</p>
                    </div>
                    <div className=" flex justify-between my-2 font-medium">
                      <p>{emp.department}</p>
                      <p>
                        {new Date(emp.dateOfJoined).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center mt-6">
                      <CgMail className="text-[20px]" />
                      <p>{emp.email}</p>
                    </div>
                    <div className="flex gap-3 items-center mt-3">
                      <FaPhone className="text-[20px] " />
                      <p>{emp.phoneNo}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
         <div   class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-[25px]" id="exampleModalLabel"> Update Employee</h5>
                <button type=' button' aria-label='Close' data-bs-dismiss="modal" class=' text-white bg-[#54595e] rounded-md p-2 w-20'>Close</button>
              </div>
              <div class='modal-body'>
                <form onSubmit={handleSubmitUpdate} >
                  <div className=' flex flex-col gap-3'>
                    <Input color='blue' name='name' label='Enter Name' value={updateData.name} onChange={handleChange}/>
                    <Input color='blue' name='email' label='Enter email Address' value={updateData.email} onChange={handleChange}/>
                    <Input color='blue' name='password' label='Enter Password' value={updateData.password} onChange={handleChange}/>
                    <Input color='blue' name='address' label='Enter Address' value={updateData.address} onChange={handleChange}/>
                    <Input type='date' color='blue' name='dateOfJoined' label='Enter Date' value={updateData.dateOfJoined} onChange={handleChange}/>
                    <Input type='number' color='blue' name='phoneNo' label='Enter PhoneNo' value={updateData.phoneNo} onChange={handleChange}/>
                    <Input  type='number' color='blue' name='salary' label='Enter Salary' value={updateData.salary} onChange={handleChange}/>
                    <Input color='blue' name='department' label='Enter Department' value={updateData.department} onChange={handleChange}/>
                    <Input color='blue' name='deductionForLeave' label='Enter Leave' value={updateData.deductionForLeave} onChange={handleChange}/>
                    <Input color='blue' name='designation' label='Enter Designation' value={updateData.designation} onChange={handleChange}/>
                    <Input color='blue' name='gender' label='Enter Gender' value={updateData.gender} onChange={handleChange}/>
                  </div>
                  <div class='modal-footer'>
                    <button className=" bg-gradient-to-r from-[#003268] to-[#006ee8] text-[white] px-4 py-2 rounded-lg" data-bs-dismiss="modal" type=' submit' aria-label='Close'> Update Employee</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
         </div>
        </div>
        </div>
       
    </div>
  );
};

export default Employee;



