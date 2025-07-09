import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
    FaTachometerAlt,
    FaChartArea,
    FaTable,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const menuItems = [
        // { to: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
        { to: "/introduction", label: "Introduction", icon: <FaChartArea /> },
        { to: "/home", label: "Home", icon: <FaChartArea /> },
        { to: "/download-log", label: "Download Log", icon: <FaTable /> },
        { to: "/subscription", label: "Subscription", icon: <FaTable /> },
    ];

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className={`brand ${collapsed ? "collapsed" : ""}`}>
                <img src={logo} alt="RetroFit Logo" className="logo-img" />
                {!collapsed && <h1 className="brand-title">RETROFIT</h1>}
            </div>
            <hr className="divider" />

            <nav className="menu">
                {menuItems.map((item, index) => (
                    <NavLink key={index} to={item.to} className="menu-item">
                        <div className="menu-icon">{item.icon}</div>
                        <span className="menu-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <hr className="divider" />

            <div className="toggle-btn">
                <button onClick={toggleSidebar}>
                    {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
