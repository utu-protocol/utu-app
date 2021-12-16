import React, {Fragment, useState} from "react";
import "./userAvatar.scss";
import UserMenuDropdown from "./UserMenuDropdown";

interface avatarProps {
    token: string,
    logo: string
}

const UserAvatar = ({token, logo}: avatarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <Fragment>
            <div className="user-avatar">
                <div className="token" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="token-header">Account</span>
                    <span className="token-text">{token}</span>
                    {menuOpen && <UserMenuDropdown/>}
                </div>

                <div className="avatar">
                    <img src={logo} alt="Avatar" height="50"/>
                </div>
            </div>
        </Fragment>
    );
}

export default UserAvatar;