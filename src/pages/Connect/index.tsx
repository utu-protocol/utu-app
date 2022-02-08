import React, {useEffect} from "react";
import DetailsCard from "../partials/DetailsCard/DetailsCard";
import twitter from "../../assets/images/twitter.svg";
import Label from "../../components/Label/Label";
import discord from "../../assets/images/discord.svg";
import telegram from "../../assets/images/telegram.svg";
import metamask from "../../assets/images/metamask.svg";
import TwitterConnect from "./partials/Twitter/TwitterConnect";
import MetamaskConnect from "./partials/Metamask/MetamaskConnect";
import TelegramConnect from "./partials/Telegram/TelegramConnect";

import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";


import {useAppDispatch} from"../../redux/hooks"
import {requestCode, sendToken, socialData} from "../../redux/slices/telegram"

const Connect = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(socialData());
    }, [socialData])

    // useEffect(() => {
    //     document.title = 'Connect to Earn | Utu Wallet';
    // });

    const telegramConnect = useSelector((state: RootState) => state.telegram.telegram_connected);
    const twitterConnect = useSelector((state: RootState) => state.twitter.twitter_connected);

    const telegramUTTBalance = useSelector((state: RootState) => state.telegram.telegram_UTT_balance);
    const twitterUTTBalance = useSelector((state: RootState) => state.twitter.twitter_UTT_balance);

    return (
        <div className="container-body">
            <div className="details-cards">
                <div className="details-cards--title">
                    <h3>
                        App Integrations
                    </h3>
                    <p>
                        Applications that you’ve granted access to UTU in order to receive benefits from your
                        memberships.
                    </p>
                </div>

                <DetailsCard key="twitter"
                             title="Twitter"
                             description="See your friends activities on UTU"
                             icon={twitter}
                             actions={ twitterConnect ? [<Label title={`+ ${twitterUTTBalance} UTT`} theme="secondary"/>,
                             <Label title="Connected" theme="basic"/>] : [<TwitterConnect/>]}
                />

                <DetailsCard key="discord"
                             title="Discord"
                             title_sub="Earning 0.01 UTT evry (X time) for staying connected"
                             description="Logged in as  Hakeem SalimRiz"
                             icon={discord}
                             actions={[<Label title="+ 50 UTT" theme="secondary"/>,
                                 <Label title="Connected" theme="basic"/>]}
                />
                <DetailsCard key="telegram"
                             title="Telegram"
                             description="Earn up 0.01UTT for staying connected"
                             icon={telegram}
                             actions={ telegramConnect ? [<Label title={`+ ${telegramUTTBalance} UTT`}  theme="secondary"/>,
                                 <Label title="Connected" theme="basic"/>] : [<TelegramConnect/>]}
                />

                <DetailsCard key="metamask"
                             title="Metamask"
                             description="Earn up 0.01UTT for staying connected"
                             icon={metamask}
                             actions={[<MetamaskConnect/>]}
                />


            </div>
        </div>
    );
}

export default Connect;