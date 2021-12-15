import React from "react";
import "../Label/Label.scss"

interface ButtonProps {
    theme?: string,
    title: string,
    onButtonClick: () => void
}

const Button = ({theme, title, onButtonClick}: ButtonProps) => {
    return (
        <button className={'utu-label button ' + theme} onClick={onButtonClick}>
            {title}
        </button>
    );
}

export default Button;