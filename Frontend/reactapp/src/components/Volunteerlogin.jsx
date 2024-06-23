import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios

function Volunteerlogin() {
  const navigate = useNavigate();
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
      await axios.post('http://localhost:3000/volunteer/login', formData)
      .then((response)=>{
        console.log('Login successful:', response.data);
        navigate(`/volunteer/home/${formData.email}`)
        setFormData({
          email: '',
          password: '',
        });
      })
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={{ width: '45%', margin: 'auto', padding: '20px', borderRadius: '8px', marginTop: '10px' }}>
      <h1 style={{ color: 'red', fontSize: '2rem', textAlign: 'center' }}>Volunteer login form</h1>
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
      <div style={{ textAlign: 'center' }}>
        <Link
          to="/volunteerregister"
          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
        >
          Don't have an account? Register here
        </Link>
      </div>
    </div>
  );
}

export default Volunteerlogin;
