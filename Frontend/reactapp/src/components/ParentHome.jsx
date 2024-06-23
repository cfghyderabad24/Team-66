import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
function ParentHome() {
    const navigate = useNavigate();
    const { id, uuid } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:3000/parent/login/${id}/${uuid}`)
        .then((response)=>{
            if(response.data.success) {
                console.log('Parent found:', response.data);
            }
            else{
                navigate('/home')
            }
        })
    }, [])
  return (
    <div>ParentHome</div>
  )
}

export default ParentHome