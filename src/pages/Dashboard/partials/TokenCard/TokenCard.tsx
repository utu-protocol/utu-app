import React, {Fragment, useState} from "react";
import "./TokenCard.scss";
import TutorialCard from "../../partials/TutorialCard/TutorialCard"

interface tokenCardProps {
    label: string,
    amount: number | null,
    amount_label?: string,
    loading: boolean,
    id: any
}
// create a state contains current index

const TokenCard = ({label, amount, amount_label, loading=false, id}: tokenCardProps) => {
    
    
    const [currentCard, setCurrentCard] = useState(0)

    const numberB = [];
    const total = 3;
    
    for (let i = 0; i < total; i++) {
      numberB.push(i);
      console.log(i)
      console.log(typeof i)
    }
    console.log(typeof numberB)
    console.log("numberB", numberB)
    console.log("numberB-2", numberB)

    
  const tutorialData = 
        {
            title: "The title goes here", 
            button: "Close", 
            text: "Select your next action by clicking next or back and it goes over here", 
            back: "Back", 
            next: "Next"
        }


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
                        <TutorialCard id={id} numberB={undefined} {...tutorialData}/>
                    </div>
                    
            }
        </Fragment>
    )
}

export default TokenCard;