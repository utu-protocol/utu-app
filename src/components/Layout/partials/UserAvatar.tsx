import React from "react";
import "./userAvatar.scss";

interface avatarProps {
    token: string,
    logo: string
}

const UserAvatar = ({token, logo}: avatarProps) => {
    return (
        <div className="user-avatar">
            <div className="token">
                <span className="token-header">Account</span>
                <span className="token-text">{token}</span>
            </div>

            <div className="avatar">
                <img src={logo} alt="Avatar" height="50"/>
            </div>
        </div>
    );
}

export default UserAvatar;