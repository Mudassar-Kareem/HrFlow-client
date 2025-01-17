import React, { useEffect, useState } from 'react';
import Admin from '../comonents/Admin';
import { useDispatch, useSelector } from "react-redux";
import { createAttendence, clearState } from '../store/reducers/adminReducer';
import toast from 'react-hot-toast';

const Attendence = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const { loading, error, attendenceCreate } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (attendenceCreate) {
      // Reset the form data after successful attendance creation
      setEmployeeId('');
      setDate('');
      setStatus('present');
      dispatch(clearState());
      toast.success("Attendance added successfully");
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, attendenceCreate, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId || !date) {
      toast.error("Please fill in all fields");
      return;
    }
    await dispatch(createAttendence({ employeeId, date, status }));
  };

  return (
    <div className="flex">
      <Admin />
      <div className="flex justify-center items-center flex-col w-full m-[4%]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 border rounded bg-slate-100 p-10">
          <h1 className="flex text-center justify-center font-semibold text-2xl">Add Attendance</h1>
          
          <div className="flex flex-col gap-3">
            <label className="font-medium font-xl" htmlFor="">Enter Employee ID</label>
            <input
              className="w-[250px] p-1.5 border rounded outline-none"
              type="text"
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium font-xl" htmlFor="">Enter Date</label>
            <input
              className="w-[250px] p-1.5 border rounded outline-none"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium font-xl" htmlFor="">Select Status</label>
            <select
              className="w-[250px] p-1.5 border rounded outline-none"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div className="bg-gradient-to-r from-[#003268] to-[#006ee8] text-white justify-center flex p-1.5 border rounded">
            <button type="submit" disabled={loading}>
              {loading ? "Creating Attendance..." : "Create Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Attendence;
