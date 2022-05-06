import React, {Fragment} from "react";
import "./TutorialCard.scss";
interface tutorialCardProps {
    title: string,
    button: string,
    text: string,
    back: string,
    next: string
}

const TutorialCard = ({title, button, text, back, next}: tutorialCardProps) => {
    return (
        <Fragment> 
        
        <div className="tutorial-container">
                    <div className="tutorial-card">
                        <div className="tutorial-card--card"> 
                            <div className="tutorial--title">
                                <div>{title}</div>
                                <div className="tutorial--title-close">
                                    <div className="tutorial--title-text">{button}</div>
                                    <button className="tutorial--title-btn">x</button>
                                </div>   
                            </div>
                            <div className="tutorial--text">
                                {text}
                            </div>
                            <div className="tutorial--bottom">
                                <button className="tutorial--bottom-left">{back}</button>
                                <button className="tutorial--bottom-right">{next}</button>    
                            </div>
                        </div>
                       

                        <div className="tooltiptail"></div>
                    </div>

        </div>

              
        </Fragment>
    )
}

export default TutorialCard;