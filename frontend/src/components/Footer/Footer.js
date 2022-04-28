import React from 'react';
import "./footer.css"
function Footer() {
    return (
        <footer>
          <div className='footer-content'>
            <div className='footer-icons'>
          <i className="fa-brands footer-icon fa-facebook"></i>
          <i className="fa-brands footer-icon fa-instagram"></i>
          <i className="fa-brands footer-icon fa-twitter"></i>
          </div>
           <span className='footer-text'>Copyright © 2022</span>
           </div>
        </footer>
    );
}

export default Footer;