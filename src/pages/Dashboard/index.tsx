import React, {useEffect} from "react";
import "./dashboard.scss";
import TokenCard from "./partials/TokenCard/TokenCard";
import DetailsCard from "../partials/DetailsCard/DetailsCard";
import mm from "../../assets/images/mm.svg";
import jumia from "../../assets/images/jumia.svg";
import Label from "../../components/Label/Label";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Dashboard = () => {
    const UTTBalance = useSelector((state: RootState) => state.connectionStatus.UTT_balance);

    const tokenData = [
        {
            label: "UTT Balance",
            amount: {UTTBalance},
            amount_label: "UTT"
        },
        {
            label: "Amount Staked on you",
            amount: "5200",
            amount_label: "UTT"
        },
        {
            label: "Total Amount Staked",
            amount: "5200",
            amount_label: "UTT"
        }

    ]

    useEffect(() => {
        document.title = 'Dashboard | Utu Wallet';
    });


    return (
        <div className="container-body">
            <div className="cards-container">
                {
                    tokenData.map((data, key) => <TokenCard  {...data} key={key}/>)
                }
            </div>

            <div className="details-cards">
                <div className="details-cards--title">
                    All Activities
                </div>

                <DetailsCard key="mm"
                             title="12/7/2021"
                             description="Ronald has endorsed your review on MARAMOJA Transports"
                             icon={mm}
                             actions={[<Label title="+ 129 UTT" theme="success"/>]}
                />

                <DetailsCard key="jumia"
                             title="12/7/2021"
                             description="Ronald has endorsed your review on Jumia Kenya"
                             icon={jumia}
                             actions={[<Label title="- 30 UTT" theme="danger"/>]}
                />

            </div>
        </div>
    )
}

export default Dashboard;