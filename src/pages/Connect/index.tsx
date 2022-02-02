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

const Connect = () => {
    useEffect(() => {
        document.title = 'Connect to Earn | Utu Wallet';
    });

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
                             actions={[<TwitterConnect/>]}
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
                             actions={[<TelegramConnect/>]}
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