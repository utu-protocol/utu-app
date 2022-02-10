import React from "react";
import "./TokenCard.scss";
interface tokenCardProps {
    label: string,
    amount: number | null,
    amount_label?: string
}

const TokenCard = ({label, amount, amount_label}: tokenCardProps) => {
    return (
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
    )
}

export default TokenCard;