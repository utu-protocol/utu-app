import React from "react";
import "./DetailsCard.scss";

interface detailsCardProp {
    icon?: string,
    title: string,
    description: string,
    title_sub?: string,
    actions?: any[]
}

const DetailsCard = ({icon, title, description, title_sub, actions}: detailsCardProp) => {
    return (
        <div className="details-card">
            <div className="description">
                <div className="icon">
                    <img src={icon} alt="Avatar" height="50"/>
                </div>

                <div className="details">
                    <div className="title">
                        {title}
                        <span className="title--sub">{title_sub ? ' - ' + title_sub : ''}</span>
                    </div>

                    <div className="information">
                        {description}
                    </div>
                </div>

            </div>

            <div className="action">
                {actions}
            </div>
        </div>
    )
}

export default DetailsCard;