import React, { useState } from 'react';
import axios from 'axios'; 
import './volunterlogin.css';

function Volunteerlogin() {
  const [formData, setFormData] = useState({
    email: '',
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
      const response = await axios.post('http://localhost:5000/api/enquiry', formData);
      console.log('Login successful:', response.data);
      setFormData({
        email: '',
        password: '',
      });
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
            <label>Email: </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email id' required />
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
