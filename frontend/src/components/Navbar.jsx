import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css"

function Navbar() {
  return (
    <div>
          <div className='header'>
      <div className='left_side'>
        {/* <img src={Icon} alt="logo" /> */}
        <Link to="/">
          <h1>Crud</h1>
        </Link>
      </div>
      <div className='right_side'>
        <Link to="/">Create</Link>
        <Link to="/read">Read/Update/Delete</Link>
      </div>
    </div>
    </div>
  )
}

export default Navbar
