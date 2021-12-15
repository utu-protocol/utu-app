import React from "react";
import {NavLink} from "react-router-dom";
import "./menu.scss";

const Menu = () => {
    return (
        <div className="menu">
            <NavLink to="/" className="menu-card" >Dashboard</NavLink>
            <NavLink to="/connect" className="menu-card">Connect to earn</NavLink>
        </div>
    )
}

export default Menu;