import React, { useState } from 'react';
import './CreateClasses.css';
import { useApi } from '../../../Contexts/ApiContext';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';

const CreateClasses = () => {
  const navigate = useNavigate();
  const { baseURL } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    section: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await axios.post(`${baseURL}/new-classCreation`, formData, { withCredentials: true })
    if (response.data.message === "This class is already created") {
      alert("This class is already created")
    }
    else if (response.data.success) {
      alert("Class is created successfully");
    }
  }

  return (
    <div className="CreateStudent">
      <IoCloseOutline className='closeButton' size={24} onClick={() => navigate(-1)} />
      <h2>Create Class</h2>

      <div className="StudentForm">
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>Section:
          <input type="text" name="section" value={formData.section} onChange={handleChange} required />
        </label>


      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateClasses;
