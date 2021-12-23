import React from "react";
import './index.css';
import {NavLink } from 'react-router-dom';
import { tablePath, homePath } from "../../constants";


const Sidebar = () => {
    return (
            <div id="sidebar-wrapper">
               

                <nav>
                    <NavLink to={homePath} className="nav-item" activeclassname="nav-item-active">Home</NavLink>
                    <NavLink to={tablePath} className="nav-item" activeclassname="nav-item-active">Table</NavLink>
                </nav>
            </div>
    )
}

export default Sidebar;