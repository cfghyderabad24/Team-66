import React from 'react';
import './home.css';
import fileImage from './images/home/file.jpg';
import i5 from './images/home/i5.jpg';
import founderImage from './images/home/founder.webp';
import qrLogin from './images/home/QR-login.png';
import certi from './images/home/certi.jpg';
import success from './images/home/success.png';
import appImage from './images/home/app.jpg';
import playImage from './images/home/play.jpg';
import payImage from './images/home/pay.png';
import chart1 from './images/home/chart.jpg';
import video from "./images/vid.mp4";
import Announcements from './Announcements';
import ChatBot from './ChatBot';


function App() {
  const mystyle={
    marginTop:'70px',
  }
  const mystyle2={
    textSize:'5px',
  }
  const mystyle3={
    textSize:'5px',

  }
  return (
    <>
    <Announcements/>
    <div>
      <section id='home'>
        <a href='#'><img className='bcd' style={{height: "1000px", width: "2000px"}} src={fileImage} alt="" /></a>
        <div className="centered">" Stop thinking in terms of limitations, start thinking in terms of possibilities "</div>
      </section>

      <section id='pic'>
        <div className='mission'>
          <h2 style={{fontSize: "30px"}} >Our Mission</h2>
          <p>At Subhiksha, we strive to help every family prosper. We focus on making families self-reliant and encourage creativity and empowerment. Our goal is to see every household thriving and achieving their dreams.</p>
        </div>
        <div className='work'>
          <h2 style={{fontSize: "30px"}}>Our Work</h2>
          <p>We support individuals facing challenges by offering essential education, vocational training, and therapies. Our programs are designed to help people overcome obstacles and lead successful, fulfilling lives. We aim to transform lives, one step at a time.</p>
        </div>
      </section>

      <section id='about'>
        <div className='ab'>
          <h1 style={{fontSize: "30px"}}>About Subhiksha Voluntary Organization</h1>
          <p style={{fontSize: "20px"}}>Started in 2009 by Mr. Pondi Kishore Kumar and a team of dedicated social workers, Subhiksha is committed to making society more inclusive. We work to improve the lives of people with:</p>
          <ul style={{fontSize: "20px"}} id='base'>
            <li>Intellectual Disabilities</li>
            <li>Autism</li>
            <li>Multiple Disabilities</li>
            <li>Cerebral Palsy</li>
            <li>Physical Challenges</li>
            <li>Hearing Impairments</li>
            <li>Mental Illness</li>
          </ul>
        </div>
      </section>

      <section id="us">
        <div className="text">
          <h1 style={{fontSize: "30px"}}>About Us</h1>
          <h2 style={{fontSize: "25px"}} className='nmg'>Subhiksha Voluntary Organization</h2>
          <p style={{fontSize: "18px"}}>Founded on October 8, 2009, Subhiksha is a dedicated NGO driven by a team of passionate social workers. We focus on providing special care and support to children in need, with a particular emphasis on empowering young girls. Our mission is to create a nurturing environment where every child can thrive.</p>
        </div>
        <div>
          <img style={{Height: "200px", width: "2500px"}}className="img" src={i5} alt="" />
        </div>
      </section>

      <section id="founder">
        <div style={{pdding: "100px 100px"}} className="founder">
          <h1 style={{fontSize: "30px"}}>Founder</h1>
          <h2 style={{fontSize: "30px"}}>Mr. Pondi Kishore Kumar</h2>
        </div>
        <div>
          <img style={{Height: "200px", width: "250px"}} className="ig" src={founderImage} alt="" />
        </div>
      </section>

      <section style = {{padding: "70px 0px 20px 20px", background: "#fff2e5", borderRadius: "100px",boxShadow:'0 5px 15px rgba(0, 0, 0, 0.06)'}}>
        <video style = {{width: "1200px", height: "700px", display: "flex", justifyContent: "center", textAlign: "center",marginLeft:'100px'}} controls autoplay> 
          <source src = {video} type="video/mp4"></source>
          </video>
      </section>

      <h1 className='head'>Why is our website Unique</h1>
      
      <section id='b1'>
        <div className='b4 p-10'>
          <h5 style={{fontSize: "20px", margin: "auto"}} className='a'><span>Efficient Parent Access: </span>Each child has a specialized QR code, allowing parents to directly view their child's progress and activities</h5>
          <img className='i' src={qrLogin} alt="" />
        </div>
      </section>

      <section id='b2'>
        <div className='b5'>
          <img className='j' src={certi} alt="" />
          <h5 className='b' style={{fontSize: "20px", margin: "auto"}}><span>Certificate Generation: </span>The system can generate certificates for volunteers, acknowledging their contributions and efforts.</h5>
        </div>
      </section>

      <section id='b3'>
        <div className='b6'>
          <h5 style={{fontSize: "20px", margin: "auto"}} className='c'><span>User-Friendly Experience: </span>A simple notification of payment success, encouraging donors to contribute again in the future.</h5>
          <img className='k' src={success} alt="" />
        </div>
      </section>

      <section id='b10'>
        <div style = {{padding : "70px 70px", display: "flex", flexDirection: "column"}}>
          <h1 style = {{fontSize : "45px", display: "flex", justifyContent: "center"}}>Data Analysis Regarding Enrolment of Children</h1>
          <div>
          <img style = {{width: "600px", height: "500px", display: "flex", justifyContent: "center"}}className='i' src={chart1} alt="" />
          <h4 style = {{fontSize : "30px", display: "flex", justifyContent: "center"}}>Increasing growth of Student Enrolment</h4>
          </div>
        </div>
      </section>

 
      <section style = {mystyle} id="newsletter" className="section-p1 section-m1">
        <div style = {{padding: "50px 50px"}} className="newstext">
          <h4>Sign Up for Newsletters</h4>
          <p>Get E-mail updates about our latest shop and <span>special offers</span></p>
        </div>
        <div className="form">
          <input type="text" placeholder="Your email address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>

      <footer className="section-p1" style={mystyle2}>
        <div className="col">
          <h4 style = {{textSize: "20px"}}>Contact</h4>
          <p><strong>Address: </strong>No : 3, Plot No :112, Road, Dhanalaxmi Colony, Mahendra Hills</p>
          <p>East Marredpally, Secunderabad, Telangana 500026</p>
          <p><strong>Phone: </strong> 040 6050 1664 /099080 76899</p>
          <p><strong>Hours: </strong> Open 24 hours, Mon - Sat</p>
          <div className="follow">
            <h4>Follow us</h4>
            <div className="icon">
              <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-pinterest-p"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>

        <div className="col">
          <h4>About</h4>
          <a href="#">About Us</a>
          <a href="#">Volunteer Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="col">
          <h4>My Account</h4>
          <a href="#">Sign In</a>
          <a href="#">Announcements</a>
          <a href="#">Help</a>
        </div>

        <div className="col install">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="row">
            <img src={appImage} alt="" />
            <img src={playImage} alt="" />
          </div>
          <p>Secured Payment Gateways</p>
          <img src={payImage} alt="" />
        </div>

        <div className="copyright">
          <p>© 2024 Subhiksha. Unauthorized use of website content is prohibited.</p>
        </div>
        <ChatBot/>
      </footer>
    </div>
    </>
  );
}

export default App;
