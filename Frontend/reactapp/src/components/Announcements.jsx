import React from 'react'

function Announcements() {
  return (
    <div style = {{display:'flex'}}>
        <div style= {{backgroundColor:'orange',height:'40px',margin:'0px'}}>
            <h3 style={{margin:'10px'}}>Announcements</h3>
        </div>
        <marquee direction="left" style={{margin:'10px'}}>
            <a href="/announcements" style={{color:'black',textDecoration:'none'}}>Awareness programme on 24th July 2024</a>         
        </marquee>
    </div>
  )
}

export default Announcements
