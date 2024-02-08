import { Link } from 'react-router-dom'
import React from 'react'

export default function Navbar() {
  return (
    <div id='navbar-main'>
        <div className='navbar'>
            <Link to="/">
              <div className='logo'>
                <span className='logo-text tech'>TECH</span>
                <span className='logo-text fails'>FAILS</span>
              </div>
            </Link>
            <div className='options'>
              <div className='option'>FAQs</div>
              <div className='option'>Sign-Up</div>
            </div>
        </div>
    </div>
  )
}
