import React from "react";
import utu from "../../../../assets/images/utu.svg";
import "./ConnectionHelper.scss";

interface ConnectionHelperProps {
    icon: string,
    title: string,
    description: string
}

const ConnectHelper = ({icon, title, description}: ConnectionHelperProps) => {
    return (
        <div className="connection-helper">
            <div className="avatars">
                <div className="ellipse">
                    <img src={icon} alt="Twitter" height="50"/>
                </div>
                <div className="plus">
                    +
                </div>
                <div className="ellipse">
                    <img src={utu} alt="Utu" height="50"/>
                </div>
            </div>
            <div className="description">
                <div className="title">{title}</div>
                <div className="details">{description}</div>
            </div>
        </div>
    )
}

export default ConnectHelper;