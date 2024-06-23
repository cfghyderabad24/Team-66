import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import QRCode from "react-qr-code";


function VolunteerHome() {
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState([]);
  const [certificate,setCertificate] = useState(false);
  
  useEffect(() => {
    axios.get(`http://localhost:3000/volunteer/${id}`).then((response) => {
      console.log("Students under this volunteer:", response.data);
      setVolunteer(response.data.volunteer);
      console.log(response.data.volunteer);
    });
  }, []);
  const [qr, setQr] = useState("");
  const [certificateUrl, setCertificateUrl] = useState('');
  const [formData, setFormData] = useState({
    username: "",
  });
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    medicalDetails: {
      bloodGroup: "",
      height: "",
      weight: "",
      disability: "",
    },
    parentName: "",
    parentContact: "",
    parentEmail: "",
    uuid: "",
  });

  const getCertificate = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/volunteer/certificate/${volunteer.name}`, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(response.data);
      setCertificateUrl(url);
    } catch (error) {
      console.error('Error fetching certificate:', error);
    }
  };

  const handleStudentDetails = (e) => {
    if (
      e.target.name === "bloodGroup" ||
      e.target.name === "height" ||
      e.target.name === "weight" ||
      e.target.name === "disability"
    ) {
      setStudentData({
        ...studentData,
        medicalDetails: {
          ...studentData.medicalDetails,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setStudentData({
        ...studentData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleStudentSubmission = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:3000/volunteer/${id}/add-student`, studentData)
      .then((response) => {
        console.log("Student registered:", response.data);
        setStudentData({
          name: "",
          age: "",
          medicalDetails: {
            bloodGroup: "",
            height: "",
            weight: "",
            disability: "",
          },
          parentName: "",
          parentContact: "",
          parentEmail: "",
          uuid: "",
        });
        alert("Student registered successfully");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/volunteer/user-login", formData)
      .then((response) => {
        console.log("Login successful:", response.data);
        setQr(formData.username + "/" + response.data.uuid);
        setFormData({
          username: "",
        });
      });
  };

  const onHandler = () => {
    setCertificate(true);
    getCertificate();
  }

  const [query, setQuery] = useState("");
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <div style={{ width: '45%', margin: 'auto', padding: '20px', borderRadius: '8px', marginTop: '10px' }}>
      <div><h1 style={{ color: 'red', fontSize: '2rem', textAlign: 'center' }}> Volunteer Home</h1></div>
      <div style={{backgroundColor:'whitesmoke',textAlign:'center',justifyContent:'center',padding:'10px'}}>
        <h1 style={{ color: '', fontSize: '2rem', textAlign: 'center' }} >Welcome Volunteer {volunteer?.name}</h1>
        <h2>Your email: {volunteer?.email}</h2>
        <h2>Your contact: {volunteer?.mobileNo}</h2>
        <h2>Your profession: {volunteer?.profession}</h2>
        
      </div>
      <div>
        {qr === "" ? (
          <form onSubmit={handleSubmit}>
            <div>
              <h2 style={{ color: 'red', fontSize: '2rem', textAlign: 'center',margin:'10px' }}>Get QR of a student</h2>
              <div>
                <label>Username: </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <button type="submit" className="my-5">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <QRCode value={`http://localhost:5173/parent/${qr}`} />
        )}
        <div>
          <h2 style={{ color: 'red', fontSize: '2rem', textAlign: 'center',margin:'10px' }}>Register a student</h2>
          <form onSubmit={handleStudentSubmission}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={studentData.name}
                onChange={handleStudentDetails}
                placeholder="Enter student's name"
                required
              />
            </div>
            <div>
              <label>Age: </label>
              <input
                type="number"
                name="age"
                value={studentData.age}
                onChange={handleStudentDetails}
                placeholder="Enter student's age"
                required
              />
            </div>
            <div>
              <label>Blood Group: </label>
              <input
                type="text"
                name="bloodGroup"
                value={studentData.medicalDetails.bloodGroup}
                onChange={handleStudentDetails}
                placeholder="Enter student's blood group"
                required
              />
            </div>
            <div>
              <label>Height: </label>
              <input
                type="text"
                name="height"
                value={studentData.medicalDetails.height}
                onChange={handleStudentDetails}
                placeholder="Enter student's height"
                required
              />
            </div>
            <div>
              <label>Weight: </label>
              <input
                type="text"
                name="weight"
                value={studentData.medicalDetails.weight}
                onChange={handleStudentDetails}
                placeholder="Enter student's weight"
                required
              />
            </div>
            <div>
              <label>Disability: </label>
              <input
                type="text"
                name="disability"
                value={studentData.medicalDetails.disability}
                onChange={handleStudentDetails}
                placeholder="Enter student's disability"
                required
              />
            </div>
            <div>
              <label>Parent's Name: </label>
              <input
                type="text"
                name="parentName"
                value={studentData.parentName}
                onChange={handleStudentDetails}
                placeholder="Enter parent's name"
                required
              />
            </div>
            <div>
              <label>Parent's Contact: </label>
              <input
                type="text"
                name="parentContact"
                value={studentData.parentContact}
                onChange={handleStudentDetails}
                placeholder="Enter parent's contact"
                required
              />
            </div>
            <div>
              <label>Parent's Email: </label>
              <input
                type="email"
                name="parentEmail"
                value={studentData.parentEmail}
                onChange={handleStudentDetails}
                placeholder="Enter parent's email"
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h1 style={{ color: 'red', fontSize: '2rem', textAlign: 'center',margin:'10px' }}>Students under you</h1>
          {volunteer.studentIds &&
            volunteer.studentIds.map((student, index) => (
              <div key={index}>
                <h3 style={{ color: 'black', fontSize: '2rem', textAlign: 'center',margin:'10px' }}>{student}</h3>
                <form
                  onSubmit={() => {
                    axios
                      .post(
                        `http://localhost:3000/volunteer/${id}/${student}/report`,
                        { report: query }
                      )
                      .then((response) => {
                        if (response.data.success) {
                          alert("Query added successfully");
                        } else {
                          alert("Error adding query");
                        }
                      });
                  }}
                >
                  <input type="text" value={query} onChange={handleQueryChange} placeholder="Make report on student activity"/>
                  <button type="submit">add Report</button>
                </form>
                <br />
                <br />
        
        
              </div>
            ))}
        </div>
        <button onClick={onHandler}>Get Certificate</button>
                { certificate &&  certificateUrl && (
            <div>
              <iframe src={certificateUrl} width="800" height="600" title="Certificate"></iframe>
            </div>
          )}
      </div>
      </div>
    </>
  );
}

export default VolunteerHome;
