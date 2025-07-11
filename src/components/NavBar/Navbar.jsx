// components/Topbar.jsx
import React, { useState } from "react";
import { FaUser, FaCogs, FaList, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import useAuthStore from "../../Zustand_State/AuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { authUser,logout } = useAuthStore();
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  return (
    <nav className="topbar">
      {authUser && (
        <div className="user-info">
          <div className="user-trigger" onClick={toggleDropdown}>
            {authUser && authUser.picture && (
              <>
                <span className="username">{authUser.name}</span>
                <img
                  className="user-avatar"
                  src={authUser?.picture || "https://tse2.mm.bing.net/th/id/OIP.WjcaF01cijGxSrLoZuikxAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"}
                  alt="User Profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://fallback-url.com/avatar.png";
                  }}
                />
                
                {console.log("User Profile Picture:", authUser.picture)}
              </>

            )}
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
            <Link className="dropdown-item" to="/dashboard">
              <FaList  className="icon" /> Dashbaord</Link>


              <div className="dropdown-divider" />
              <a className="dropdown-item" onClick={logout} href="#">
                <FaSignOutAlt className="icon" />
                Logout
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar

