import React, { useState } from 'react';
import './Login.css';
import { useApi } from '../../Contexts/ApiContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { baseURL } = useApi();
    const [userType, setUsertype] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/login`, {
                phoneNumber,
                password,
                role: userType
            }, { withCredentials: true });

            localStorage.setItem("userId", response.data.user._id);
            const role = response.data.user.role;
            navigate(`/${role}`);
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please check credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='loginPage'>
            <div className='loginBox'>
                {loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <>
                        <h1>Login Page</h1>

                        <div className='formGroup'>
                            <label>Phone Number</label>
                            <input
                                type='text'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder='Enter phone number'
                            />
                        </div>

                        <div className='formGroup'>
                            <label>Password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter password'
                            />
                        </div>

                        <div className='formGroup'>
                            <label>User Type</label>
                            <select value={userType} onChange={(e) => setUsertype(e.target.value)}>
                                <option value="">Select user type</option>
                                <option value="faculty">Faculty</option>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button onClick={handleSubmit}>Login</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
