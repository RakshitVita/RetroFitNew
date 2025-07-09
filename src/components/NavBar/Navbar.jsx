// components/Topbar.jsx
import React, { useState } from "react";
import { FaUser, FaCogs, FaList, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css"; 

const Navbar = () => {
      const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  return (
<nav className="topbar">
      <div className="user-info">
        <div className="user-trigger" onClick={toggleDropdown}>
          <span className="username">User1</span>
          <img
            className="user-avatar"
            src="https://tse2.mm.bing.net/th/id/OIP.WjcaF01cijGxSrLoZuikxAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="User Profile"
          />
        </div>

        {dropdownOpen && (
          <div className="dropdown">
            {/* <a className="dropdown-item" href="#">
              <FaUser className="icon" />
              Profile
            </a>
            <a className="dropdown-item" href="#">
              <FaCogs className="icon" />
              Settings
            </a> */}
            <a className="dropdown-item" href="/dashboard">
              <FaList className="icon" />
              Dashboard
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              <FaSignOutAlt className="icon" />
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

