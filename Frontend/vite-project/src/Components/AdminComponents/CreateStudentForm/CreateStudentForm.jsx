import React, { useState } from 'react';
import './CreateStudentForm.css';
import { useApi } from '../../../Contexts/ApiContext';
import axios from "axios"
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CreateStudentForm = () => {
  const navigate = useNavigate();
  const { baseURL } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    class: "",
    phone: '',
    password: '',
    session: '',
    age: '',
    adharNumber: '',
    section: '',
    fatherName: '',
    motherName: '',
    address: '',
    college: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {

      const response = await axios.post(`${baseURL}/new-studentCreation`, formData, { withCredentials: true });

      if (response.data.success) {
        alert("Student is created successfully");
      } else if (response.data.message === "This Roll Number is already registered") {
        alert("This Roll Number is already registered");
      } else {
        alert("Problem in creating student");
      }
    } catch (error) {
      console.log(error, "error in creating student");
      if (
        error.response &&
        error.response.data.message === "This Roll Number is already registered"
      ) {
        alert("This Roll Number is already registered");
      } else {
        alert("Server error while creating student");
      }
    }
  };

  return (
    <div className="CreateStudent">
      <IoCloseOutline  className='closeButton' size={24} onClick={()=>navigate(-1)} />
      <h2>Create Student</h2>

      <div className="StudentForm">
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>Roll Number:
          <input type="number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
        </label>

        <label>Class:
          <input type="text" name="class" value={formData.class} onChange={handleChange} required />
        </label>

        <label>Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>

        <label>Session:
          <input type="text" name="session" value={formData.session} onChange={handleChange} required />
        </label>

        <label>Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>

        <label>Adhar Number:
          <input type="number" name="adharNumber" value={formData.adharNumber} onChange={handleChange} />
        </label>

        <label>Section:
          <input type="text" name="section" value={formData.section} onChange={handleChange} required />
        </label>

        <label>Father's Name:
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
        </label>

        <label>Mother's Name:
          <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
        </label>

        <label>Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>

        <label>College:
          <input type="text" name="college" value={formData.college} onChange={handleChange} required />
        </label>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateStudentForm;
