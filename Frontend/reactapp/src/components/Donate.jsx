import React, { useContext, useState } from 'react'
import './volunterlogin.css'

import axios from 'axios';

const Donate = () => {

  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
    amount:"",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data,[name]:value}));
  }

  const makePayment = async (event) => {
      event.preventDefault();

      let paymentData = {
        name:data.name,
        email:data.email,
        amount : data.amount,
        password:data.password,
      }

      let response = await axios.post('http://localhost:3000/donor/payment',paymentData);
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
        
      }
      else{
        alert("Error");
      }
  }

  return (
    <div style={{ width: '45%', margin: 'auto', padding: '20px', borderRadius: '8px',marginTop:'10px' }}  className='mx-40 my-20'>
          <h1 style={{color:'red',fontSize:'2rem'}}>Donate Here</h1>
          <form onSubmit={makePayment}>
            <div>
              <div>
                <label>Name: </label>
                <input name='name' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Name' />
              </div>
              <div>
                <label> Email: </label>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email"  placeholder='Email address'/>
              </div>
              <div>
                <label>Password: </label>
                <input name='password' onChange={onChangeHandler} value={data.street} type="text" placeholder='Password' />
              </div>
              <div>
                <label>Amount: </label>
                <input name='amount' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Amount' />
              </div>
              </div>
              <button type='submit'>Submit</button>
          </form>
        </div>
  )
}

export default Donate

