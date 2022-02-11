import React from "react";
import "./Label.scss";

interface LabelProps {
    theme?: string,
    title: any
}

const Label = ({theme, title}: LabelProps) => {
    return (
        <div className= {'utu-label ' + theme}>
            {title}
        </div>
    )
};

export default Label;