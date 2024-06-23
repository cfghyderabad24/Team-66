
import React, { useEffect,useState } from 'react';
import axios from 'axios';
function AdminHome() {
  const [formData, setFormData] = useState({
    sid:"",
    vid:""
  })
  const [volunteers, setVolunteers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/admin/dashboard')
        .then((response)=>{
            // console.log('Volunteers:', response.data);
            setVolunteers(response.data.volunteers)
        })
        }
    , [])

    const verifyVolunteer = (name) => {
        console.log('Verifying volunteer:', name)
        axios.post('http://localhost:3000/admin/verify_volunteer', {name})
        .then((response)=>{
            // console.log('Volunteer verified:', response.data);
            if(response.data.success){
                setVolunteers(volunteers.filter((volunteer)=>volunteer.name!==name))
            }
        })
    }
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('Form data:', formData)
      axios.post('http://localhost:3000/admin/addSTOV', formData)
      .then((response)=>{
          if(response.data.success){
              alert('Successfully added')
          }else{
            console.log(response.data.message)
          }
      })
      .catch((err)=>{
          console.log(err.message)
      })
    }
  return (<>
  <div>
    
        <div>AdminHome</div>
        <h2>Volunteers to be verified</h2>
        {
          volunteers.map((volunteer,index)=>{
            return(
              <div key={index}>
                <h1>{volunteer.name}</h1>
                <button onClick={()=>{
                    verifyVolunteer(volunteer.name)
                }}>Verify</button>
              </div>
            )
          })
        }
        </div>
        <form>
          <input type="text" name="sid" placeholder="Student ID" onChange={handleChange}/>
          <input type="text" name="vid" placeholder="Volunteer email" onChange={handleChange}/>
          <button onClick={handleSubmit}>Submit</button>
        </form>
        </>
  )
}

export default AdminHome