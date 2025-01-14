import axios from "axios";
import baseurl from "../baseurl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: "",
    isAdminLogin: false,
    allEmployees: [],
    isEmployeeCreated: false,
    totalEmployee:[],
    sumOfSalary: null,
    attendenceCreate : false,
    allAttendence: null,
    isLogout: false,
    isEmployee: false,
    employee: null,
    attendance: null,
    employeeDeleted:false,
    employeeId: null
};

// admin login
export const adminLogin = createAsyncThunk(
    "admin/adminLogin",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${baseurl}/admin/login`,info, {
                withCredentials: true,
            });
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Error in admin login:", error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
//create employee
export const createEmployee = createAsyncThunk(
    "admin/createEmployee",
    async (info, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.post(`${baseurl}/createemployee`, info, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // get all employees
export const getAllEmployees = createAsyncThunk(
    "admin/getAllEmployees",
    async (_, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.get(`${baseurl}/allemployees`, {
          withCredentials: true,
        });
        console.log(data.allEmployees)
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
// employee count
export const getEmployeeCount = createAsyncThunk("admin/employeecount",async(_,{rejectWithValue,fulfillWithValue})=>{
    try {
        const {data} = await axios.get(`${baseurl}/employeecount`,{
            withCredentials: true
        })
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
// sum of salary
export const getSalary = createAsyncThunk("admin/salary", async(_,{rejectWithValue,fulfillWithValue})=>{
  try {
    const {data} = await axios.get(`${baseurl}/salary`,{
      withCredentials: true
    })
    console.log(data.sumOfSalary)
    return fulfillWithValue(data.sumOfSalary);
  } catch (error) {
    return rejectWithValue(error)
  }
})

//Create Attendence
export const createAttendence = createAsyncThunk("admin/createAttendence",async(info,{rejectWithValue,fulfillWithValue})=>{
  try {
    const {data} = await axios.post(`${baseurl}/newAttendence`,info,{
      withCredentials: true
    })
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
// get all attendence
export const getAllAttendence = createAsyncThunk("admin/attemdence",async(_,{rejectWithValue,fulfillWithValue})=>{
  try {
    const {data} = await axios.get(`${baseurl}/allAttendence`,{
      withCredentials:true
    })
    return fulfillWithValue(data)
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
// logout
export const logout = createAsyncThunk("admin/logout",async(_,{rejectWithValue,fulfillWithValue})=>{
  try {
    const {data} = await axios.get(`${baseurl}/logout`,{
      withCredentials:true
    })
    return fulfillWithValue(data)
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
//employee login
export const employeeLogin = createAsyncThunk("admin/employeelogin",async(info,{rejectWithValue,fulfillWithValue})=>{
  try {
    const {data} = await axios.post(`${baseurl}/employeelogin`,info,{
      withCredentials:true
    })
    return fulfillWithValue(data)
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
// get single employee data
export const getSingleEmployee = createAsyncThunk(
  "admin/single-employee",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/singleemployee/${id}`, {
        withCredentials: true,
      });
      console.log(data.employee);
      return fulfillWithValue(data.employee);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get single attendance data
export const getSingleAttendance = createAsyncThunk(
  "admin/single-attendance",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/singleAttendence/${id}`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data.attendance);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete employee
export const deleteEmployee = createAsyncThunk("admin/deleteemployee",async(id,{rejectWithValue,fulfillWithValue})=>{
  try {
    const {data} = await axios.delete(`${baseurl}/delete/${id}`,{
      withCredentials:true
    })
    return fulfillWithValue(data)
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const adminReducer = createSlice({
    name: "adminReducer",
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state.error = ""
            state.isAdminLogin = false
            state.isEmployeeCreated=false
            state.allEmployees=[]
            state.totalEmployee=[]
            state.sumOfSalary=null
            state.attendenceCreate =false
            state.allAttendence= null
            state.isLogout =false
            state.isEmployee= false
            state.employee = null;
            state.attendance = null;
            state.employeeDeleted=false
            state.employeeId = null;
        },
    },
    extraReducers: (builder) => {
        // admin login
        builder.addCase(adminLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdminLogin = true;
        });
        builder.addCase(adminLogin.rejected, (state, action) => {
            state.loading = false; 
            state.error = action.error.message;
        });
        // create employee
      builder.addCase(createEmployee.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.isEmployeeCreated = true;
      });
      builder.addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      // get all employees
    builder.addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmployees = action.payload;
      });
      builder.addCase(getAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

        // employee count
        builder.addCase(getEmployeeCount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEmployeeCount.fulfilled, (state, action) => {
            state.loading = false;
            state.totalEmployee = action.payload;
        });
        builder.addCase(getEmployeeCount.rejected, (state, action) => {
            state.loading = false; 
            state.error = action.error.message;
        });
       
        // gry total salary
        builder.addCase(getSalary.pending, (state) => {
          state.loading = true;
      });
      builder.addCase(getSalary.fulfilled, (state, action) => {
          state.loading = false;
          state.sumOfSalary= action.payload;
      });
      builder.addCase(getSalary.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.error.message;
      });
     
       // Create Attendence
      builder.addCase(createAttendence.pending, (state) => {
          state.loading = true;
      });
      builder.addCase(createAttendence.fulfilled, (state, action) => {
          state.loading = false;
          state.attendenceCreate = true;
      });
      builder.addCase(createAttendence.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.error.message;
      });
          // for all Attendence
        builder.addCase(getAllAttendence.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllAttendence.fulfilled, (state, action) => {
            state.loading = false;
            state.allAttendence = action.payload;
        });
        builder.addCase(getAllAttendence.rejected, (state, action) => {
            state.loading = false; 
            state.error = action.error.message;
        });
            // for all Attendence
          builder.addCase(logout.pending, (state) => {
              state.loading = true;
          });
          builder.addCase(logout.fulfilled, (state, action) => {
              state.loading = false;
              state.isLogout = true;
          });
          builder.addCase(logout.rejected, (state, action) => {
              state.loading = false; 
              state.error = action.error.message;
          });

            //  employee login
          builder.addCase(employeeLogin.pending, (state) => {
              state.loading = true;
          });
          builder.addCase(employeeLogin.fulfilled, (state, action) => {
              state.loading = false;
              state.isEmployee = true;
          });
          builder.addCase(employeeLogin.rejected, (state, action) => {
              state.loading = false; 
              state.error = action.error.message;
          });
            //single  employee 
            builder.addCase(getSingleEmployee.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(getSingleEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
            });
            builder.addCase(getSingleEmployee.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.error.message;
            });
              //single  Attendence
            builder.addCase(getSingleAttendance.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(getSingleAttendance.fulfilled, (state, action) => {
                state.loading = false;
                state.attendance = action.payload;
            });
            builder.addCase(getSingleAttendance.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.error.message;
            });

              //employee deleted
             builder.addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeDeleted= true;
            });
            builder.addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.error.message;
            });
    },
});

export default adminReducer.reducer;
export const { clearState } = adminReducer.actions;
