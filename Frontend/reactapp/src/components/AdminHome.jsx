
import React, { useEffect,useState } from 'react';
import axios from 'axios';
function AdminHome() {
    const [volunteers, setVolunteers] = useState([{}])
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
  return (
  <div>
    
        <div>AdminHome</div>
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
  )
}

export default AdminHome