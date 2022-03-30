import React from "react";
import "./UtuButton.scss";

interface ButtonProps {
    theme?: string,
    title: string,
    onButtonClick: () => void,
    loading?: boolean,
    center?: boolean,
    skeleton?: boolean
}

const UtuButton = ({theme, title, onButtonClick, loading = false, center = true}: ButtonProps) => {
    const handler = () => {
        return;
    }
    return (
        <button className={`utu-btn ${theme} ${center ? 'btn-center ' : ''} `}
                onClick={loading ? handler : onButtonClick}
                disabled={loading}>
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