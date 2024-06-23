import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
function ParentHome() {
    const [studentData, setStudentData] = useState({})
    const navigate = useNavigate();
    const { id, uuid } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:3000/parent/login/${id}/${uuid}`)
        .then((response)=>{
            if(response.data.success) {
                console.log('Parent found:', response.data);
                setStudentData(response.data.student)
            }
            else{
                navigate('/home')
            }
        })
    }, [])
  return (<>
    <div>
        <h1>ParentHome</h1>
        <h2>Student Details</h2>
        <h3>Name: {studentData.name}</h3>
        <div>
            <h3>Age: {studentData.age}</h3>
            <h3>Medical Details:</h3>
            <ul>
                <li>Blood Group: {studentData.medicalDetails?.bloodGroup}</li>
                <li>Height: {studentData.medicalDetails?.height}</li>
                <li>Weight: {studentData.medicalDetails?.weight}</li>
                <li>Disability: {studentData.medicalDetails?.disability}</li>
            </ul>
            <h3>Parent Contact: {studentData.parentContact}</h3>
            <h3>Parent Email: {studentData.parentEmail}</h3>
            <h3>Parent Name: {studentData.parentName}</h3>
            <h3>Reports:</h3>
            <ul>
                {studentData?.reports?.map((report, index) => (
                    <li key={index}>{report.comment}</li>
                ))}
            </ul>
        </div>
    </div>

  </>
  )
}

export default ParentHome