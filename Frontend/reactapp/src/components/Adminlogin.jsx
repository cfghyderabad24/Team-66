import React, { useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import './volunterlogin.css';

function Volunteerlogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/admin/login', formData)
      .then((response)=>{
        console.log('Login successful:', response.data);
        if(response.data.success){
          navigate('/admin/dashboard')
        }
        setFormData({
          username: '',
          password: '',
        });
      })
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={{ width: '45%', margin: 'auto', padding: '20px', borderRadius: '8px', marginTop: '10px' }}>
      <h1 style={{ color: 'red', fontSize: '2rem', textAlign: 'center' }}>Admin login form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>username: </label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Enter your username' required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter your password' required />
          </div>
          <button type="submit" className='my-5'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Volunteerlogin;
