import React, { useState } from 'react';
import './CreateTeacherForm.css';
import { useApi } from '../../../Contexts/ApiContext';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';

const CreateTeacherForm = () => {
  const navigate = useNavigate();
  const {baseURL} = useApi();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    adharNumber: '',
    department: '',
    designation: '',
    profileImage: '',
    qualifications: '',
    subjects: '',
    dateOfJoining: '',
    address: '',
    gender: '',
    dob: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = ()=>{
//   console.log(formData)
  const respinse = axios.post(`${baseURL}/new-facultyCreation`,formData, {withCredentials: true})
  }

  return (
    <div className="CreateStudent">
      <IoCloseOutline  className='closeButton' size={24} onClick={()=>navigate(-1)} />
      <h2>Create Student</h2>

      <div className="StudentForm">
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>Phone No:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>

        <label>Adhar Number:
          <input type="text" name="adharNumber" value={formData.adharNumber} onChange={handleChange} required />
        </label>

        <label>Department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </label>

        <label>Designation:
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />
        </label>

        <label>Qualifications:
          <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} required />
        </label>

        <label>Subjects (comma separated):
          <input type="text" name="subjects" value={formData.subjects} onChange={handleChange} />
        </label>

        <label>Date Of Joining:
          <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
        </label>

        <label>Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>

        <label>Gender:
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
        </label>

        <label>Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateTeacherForm;
