import React, {useEffect} from "react";
import "./dashboard.scss";
import TokenCard from "./partials/TokenCard/TokenCard";
import DetailsCard from "../partials/DetailsCard/DetailsCard";
import mm from "../../assets/images/mm.svg";
import jumia from "../../assets/images/jumia.svg";
import Label from "../../components/Label/Label";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useAppDispatch} from "../../redux/hooks";
import {getTotalStakedOnYou, getTotalYouStaked, getUttBalance} from "../../redux/slices/balance";

const Dashboard = () => {
    const {utt_balance, total_you_have_staked, total_staked_on_you} = useSelector((state: RootState) => state.balance);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUttBalance())
        dispatch(getTotalStakedOnYou())
        dispatch(getTotalYouStaked())
    }, [dispatch]);

    useEffect(() => {
        document.title = 'Dashboard | Utu Wallet';
    });

    return (
        <div className="container-body">
            <div className="cards-container">
                <TokenCard
                    label="UTT Balance"
                    amount={utt_balance}
                    amount_label="UTT"
                    key="utt-balance"/>

                <TokenCard
                    label="Amount Staked on you"
                    amount={total_staked_on_you}
                    amount_label="UTT"
                    key="amount-stacked-on-you"/>

                <TokenCard
                    label="Total Amount Staked"
                    amount={total_you_have_staked}
                    amount_label="UTT"
                    key="amount-stacked-on-you"/>

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