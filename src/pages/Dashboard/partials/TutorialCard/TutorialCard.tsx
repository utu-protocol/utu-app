import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import "./TutorialCard.scss";
import { useState } from "react";
import {useAppDispatch} from "../../../../redux/hooks";
import {setCurrentCard} from "../../../../redux/slices/ui"
interface tutorialCardProps {
    title: string,
    button: string,
    text: string,
    back: string,
    next: string,
    id: any,
    numberB: any
}

const TutorialCard = ({title, button, text, back, next, numberB, id}: tutorialCardProps) => {
    const selected = useSelector((state: RootState) => state.ui.currentCard);
    const dispatch = useAppDispatch();

    const [nextCard, setNextCard] = useState(false);
    // const [nextCard, setNextCard] = useState(false);


        // const numberB = [];
        // const total = 3;
        
        // for (let i = 0; i < total; i++) {
        //   numberB.push(i);
        //   console.log(i)
        //   console.log(typeof i)
        // }
        // console.log(typeof numberB)
        // console.log("numberB", numberB)
        // console.log("numberB-2", numberB)
    if (selected !== id) {
        console.log("check if it works", selected, id)
        return null;
    }



    console.log("check if it works 2")


    return (
        <Fragment> 
        
        <div className={`tutorial-container ${numberB}`}>
                    <div className="tutorial-card-dashboard">
                        <div className="tutorial-card--card"> 
                            <div className="tutorial--title">
                                <div>{title}</div>
                                <div>{numberB}</div>
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
                                <button 
                                    className="tutorial--bottom-right" 
                                    onClick={() => { dispatch(setCurrentCard(selected + 1))}}>{next}</button>    
                            </div>
                        </div>
                       

                        <div className="tooltiptail-dashboard"></div>
                    </div>

        </div>

              
        </Fragment>
    )
}

export default TutorialCard;