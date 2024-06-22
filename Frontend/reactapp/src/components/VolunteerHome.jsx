import React , { useState }from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import QRCode from "react-qr-code";

function VolunteerHome() {

    const [qr, setQr] = useState('')
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: ''
      });
      
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/volunteer/user-login', formData)
    .then((response)=>{
        console.log('Login successful:', response.data);
        setQr(formData.username+"/"+response.data.uuid)
        setFormData({
            username: ''
        });
    })
  };
  return (<>
    <div>VolunteerHome</div>
    {qr === '' ? (<form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Username: </label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Enter your username' required />
          </div>
          <button type="submit" className='my-5'>Submit</button>
        </div>
      </form>):(<QRCode value={`http://localhost:5173/parent/${qr}`} />)}
    </>
  )
}

export default VolunteerHome