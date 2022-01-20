import React from "react";
import "./UtuButton.scss";

interface ButtonProps {
    theme?: string,
    title: string,
    onButtonClick: () => void,
    loading?: boolean
}

const UtuButton = ({theme, title, onButtonClick, loading = false}: ButtonProps) => {
    return (
        <button className={'utu-btn ' + theme} onClick={onButtonClick} disabled={loading}>
            {loading ?
                <div className="utu-btn__spinner">
                    <span className="spinner"/>
                    <span className="utu-btn__text">Loading...</span>
                </div>
                : title}
        </button>
    );
}

export default UtuButton;