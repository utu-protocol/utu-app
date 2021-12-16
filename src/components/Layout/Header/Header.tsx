import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./header.scss";
import logo from "../../../assets/images/utu-light-logo.svg";
import avatar from "../../../assets/images/driver.png";
import UserAvatar from "./partials/UserAvatar/UserAvatar";

const Header = () => {
    const [responsive, setResponsive] = useState(false);
    return (
        <header className={responsive ? "header responsive" : "header"}>
            <nav className="menu">
                <div className="menu-item">
                    <Link to="/"><img src={logo} alt="Utu Logo" height="40"/></Link>
                </div>
                <div className="menu-item">
                    <UserAvatar token="020a4b1a-5dcf-11ec-bf63-0242ac130002" logo={avatar}/>
                </div>

                <div className="menu-item icon" onClick={() => setResponsive(!responsive)}>
                    <div>
                        &#9776;
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;