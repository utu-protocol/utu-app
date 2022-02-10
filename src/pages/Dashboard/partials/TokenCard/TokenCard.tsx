import React, {Fragment} from "react";
import "./TokenCard.scss";
interface tokenCardProps {
    label: string,
    amount: number | null,
    amount_label?: string,
    loading: boolean
}

const TokenCard = ({label, amount, amount_label, loading=false}: tokenCardProps) => {
    return (
        <Fragment>
            {
                loading ?
                    <div className="token--loader token-card">
                        <div className="title skeleton" />
                        <div className="body skeleton" />
                    </div>
                    :
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
            }
        </Fragment>
    )
}

export default TokenCard;