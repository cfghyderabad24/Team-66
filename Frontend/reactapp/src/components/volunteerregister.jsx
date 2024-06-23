import React, { useState } from 'react';
import axios from 'axios'; // Don't forget to import axios
import { useNavigate } from 'react-router-dom';

function Volunteerregister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    profession: '',
    mobileNo: '',
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
      await axios.post('http://localhost:3000/volunteer/register', formData)
      .then((response)=>{
      if(response.data.success) {
        navigate(`/volunteer/home/${formData.email}`);
      }
      setFormData({
        name: '',
        age: '',
        profession: '',
        mobileNo: '',
        email: '',
        password: '',
      });
    })
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  return (
    <div style={{ width: '45%', margin: 'auto', padding: '20px', borderRadius: '8px', marginTop: '10px' }}>
      <h1 style={{ color: 'red', fontSize: '2rem', textAlign: 'center' }}>Volunteer Registration form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Name: </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter your name' required />
          </div>
          <div>
            <label>Age: </label>
            <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder='Enter your age' required />
          </div>
          <div>
            <label>Profession: </label>
            <input type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder='Enter your profession' required />
          </div>
          <div>
            <label>Mobile No: </label>
            <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder='Enter your mobile number' required />
          </div>
          <div>
            <label>Email: </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email id' required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter your password' required />
          </div>
          <button type="submit" className='my-5'>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Volunteerregister;
