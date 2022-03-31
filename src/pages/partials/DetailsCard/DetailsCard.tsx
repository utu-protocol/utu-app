import React, {Fragment} from "react";
import "./DetailsCard.scss";

interface detailsCardProp {
    icon?: string,
    title: string,
    description: string,
    title_sub?: string,
    actions?: any[],
    loading?: boolean
}

const DetailsCard = ({icon, title, description, title_sub, actions, loading = false}: detailsCardProp) => {
    return (
        <Fragment>
            {
                loading ?
                    <div className="details-card details-card__loading">
                        <div className="description">
                            <div className="icon skeleton"/>

                            <div className="details">
                                <div className="title skeleton"/>
                                <div className="information skeleton"/>
                            </div>
                        </div>

                        <div className="action skeleton"/>
                    </div>
                    :
                    <div className="details-card">
                        <div className="description">
                            {
                                icon &&
                                <div className="icon">
                                    <img src={icon} alt="Avatar" height="50"/>
                                </div>
                            }

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
            }
        </Fragment>
    )
}

export default DetailsCard;