import React, {Fragment} from "react";
import "./TokenCard.scss";
import TutorialCard from "../../../Dashboard/partials/TutorialCard/TutorialCard"

interface tokenCardProps {
    label: string,
    amount: number | null,
    amount_label?: string,
    loading: boolean
}

const TokenCard = ({label, amount, amount_label, loading=false}: tokenCardProps) => {
    const tutorialData = [
        {
            title: "Title goes here", 
            button: "Close", 
            text: "Select your next action by clicking next or back and it goes over here", 
            back: "Back", 
            next: "Next"
        }
    ]
  
    return (
        <Fragment>
            {
                loading ?
                    <div className="token--loader token-card">
                        <div className="title skeleton" />
                        <div className="body skeleton" />
                    </div>
                    :
                    <div className="test">
                        <div className="token-card">
                            <div className="token--label">
                                {label}
                            </div>
                            <div className="token--amount">
                                {amount}
                                <small>
                                    {amount_label}
                                </small>
                            </div>
                        </div>
                        {
                        tutorialData.map((data, key) => <TutorialCard {...data} key={key}/>)
                         }
                    </div>
                    
            }
        </Fragment>
    )
}

export default TokenCard;