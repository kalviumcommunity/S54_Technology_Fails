import React from 'react'

export default function Navbar() {
  return (
    <div id='navbar-main'>
        <div className='navbar'>
            <div className='logo'>
              <span className='logo-text tech'>TECH</span>
              <span className='logo-text fails'>FAILS</span>
            </div>
            <div className='options'>
              <div className='option'>FAQs</div>
              <div className='option'>Sign-Up / Log-In</div>
            </div>
        </div>
    </div>
  )
}
