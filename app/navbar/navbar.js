// Navbar.js
import React, { useState } from 'react';
import './styles.css'; // Import the CSS file
import FavoriteIcon from '@mui/icons-material/Favorite';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

const Navbar = (inputs) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  //replace image.png with Beautiful Together Image
  //replace links with future pages
  //Uses Material UI dependency, RUN npm install
  return (
    <nav className="navbar">
      <img src="/path/to/your/image.png" alt="Logo" className="logo" />
      <div className="navbar-text">{inputs.title}</div>
      <div className='iconInDiv'>
      <FavoriteIcon className='heart'/>
      </div>
      <div className="dropdown">
        <div className='iconInDiv'>
        <DensitySmallIcon onClick={toggleDropdown} className='lines'/>
        </div>
        {dropdownOpen && (
          <div className="dropdown-content">
            <a href="/">Home Page</a>
            <a href="#link2">Link 2</a>
            <a href="#link3">Link 3</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
