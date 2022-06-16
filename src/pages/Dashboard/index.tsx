import React, { useEffect } from "react";
import "./dashboard.scss";
import TokenCard from "./partials/TokenCard/TokenCard";
import DetailsCard from "../partials/DetailsCard/DetailsCard";
import Label from "../../components/Label/Label";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import { getUttBalance } from "../../redux/slices/balance";
import { getEndorsements } from "../../redux/slices/endorsement";

const Dashboard = () => {
    const {
        utt_balance,
        total_you_have_staked,
        total_staked_on_you,
        balance_loading,
        total_you_staked_loading,
        staked_on_you_loading
    } = useSelector((state: RootState) => state.balance);
    const { endorsements, endorsements_loading } = useSelector((state: RootState) => state.endorsement);
    const { address } = useSelector((state: RootState) => state.wallet);
    const lowerCaseAddress = String(address).toLowerCase();
    const dispatch = useAppDispatch();

    const tokenData = [
        {
            label: "UTT Balance",
            amount: utt_balance,
            amount_label: "UTT",
            loading: balance_loading
        },
        {
            label: "Amount Staked on you",
            amount: total_staked_on_you,
            amount_label: "UTT",
            loading: total_you_staked_loading
        },
        {
            label: "Total Amount Staked",
            amount: total_you_have_staked,
            amount_label: "UTT",
            loading: staked_on_you_loading
        }

    ]

    useEffect(() => {
        dispatch(getUttBalance())
        // dispatch(getTotalStakedOnYou())
        // dispatch(getTotalYouStaked());
        dispatch(getEndorsements());

    }, [dispatch]);

    useEffect(() => {
        document.title = 'Dashboard | Utu Wallet';
    });

    return (
        <div className="container-body">
            <div className="cards-container">
                {
                    tokenData.map((data, key) => <TokenCard {...data} key={key} />)
                }
            </div>

            <div className="details-cards">
                <div className="details-cards--title">
                    All Activities
                </div>
                {
                    endorsements.length > 0 ?
                        endorsements.map((endorsement, index) =>
                            <DetailsCard key={index}
                                title={`${endorsement.source === lowerCaseAddress ? 'Endorsement issued' : 'Endorsement received'}`}
                                description={`${endorsement.source === lowerCaseAddress ? 'You have issued an endorsement of value ' : 'You received an endorsement of value '} ${endorsement.value}`}
                                actions={[<Label key={index}
                                    title={`${endorsement.source === lowerCaseAddress ? '- ' : '+ '} ${endorsement.value}`}
                                    theme={`${endorsement.source === lowerCaseAddress ? 'danger' : 'success'}`} />]}
                            />)
                        :
                        endorsements_loading ?
                            <DetailsCard title="" description="" loading={endorsements_loading} />
                            :
                            <div className="empty-now">
                                No Activities for now!
                            </div>
                }


            </div>
        </div>
    )
}

export default Dashboard;