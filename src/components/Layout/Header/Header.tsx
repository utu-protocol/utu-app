import React from 'react';
import {Link} from "react-router-dom";
import "./header.scss";
import logo from "../../../assets/images/utu-light-logo.svg";
import avatar from "../../../assets/images/driver.png";
import UserAvatar from "../partials/UserAvatar";

const Header = () => {
    return (
        <header className="header">
            <nav className="menu">
                <div className="menu-item">
                    <Link to="/"><img src={logo} alt="Utu Logo" height="40"/></Link>
                </div>
                <div className="menu-item">
                    <UserAvatar token="020a4b1a-5dcf-11ec-bf63-0242ac130002" logo={avatar} />
                </div>
            </nav>
        </header>
    );
};
export default Header;