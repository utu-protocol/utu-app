import React, {useEffect} from "react";
import DetailsCard from "../partials/DetailsCard/DetailsCard";
import twitter from "../../assets/images/twitter.svg";
import Label from "../../components/Label/Label";

import telegram from "../../assets/images/telegram.svg";
import TwitterConnect from "./partials/Twitter/TwitterConnect";
import TelegramConnect from "./partials/Telegram/TelegramConnect";

import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";


import {useAppDispatch} from "../../redux/hooks"
import {connectionStatus} from "../../redux/slices/connectionStatus"


const Connect = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(connectionStatus());
    }, [dispatch])

    useEffect(() => {
        document.title = 'Connect to Earn | Utu Wallet';
    });

    const connectionType = useSelector((state: RootState) => state.connectionStatus.connectionType);

    const isConnected = (social: string) => {
        return connectionType.some((value: any) => value.type === social);
    }

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
                             actions={isConnected("Twitter") ?
                                 [<Label title={`+50UTT`} theme="secondary"/>,
                                     <Label title="Connected" theme="basic"/>] : [<TwitterConnect/>]}
                />

                <DetailsCard key="telegram"
                             title="Telegram"
                             description="Earn up 0.01UTT for staying connected"
                             icon={telegram}
                             actions={isConnected("Telegram") ?
                                 [<Label title={`+50UTT`} theme="secondary"/>,
                                     <Label title="Connected" theme="basic"/>] : [<TelegramConnect/>]}
                />


                {/*<DetailsCard key="discord"*/}
                {/*             title="Discord"*/}
                {/*             title_sub="Earning 0.01 UTT evry (X time) for staying connected"*/}
                {/*             description="Logged in as  Hakeem SalimRiz"*/}
                {/*             icon={discord}*/}
                {/*             actions={[<Label title="+ 50 UTT" theme="secondary"/>,*/}
                {/*                 <Label title="Connected" theme="basic"/>]}*/}
                {/*/>*/}


                {/*<DetailsCard key="metamask"*/}
                {/*             title="Metamask"*/}
                {/*             description="Earn up 0.01UTT for staying connected"*/}
                {/*             icon={metamask}*/}
                {/*             actions={[<MetamaskConnect/>]}*/}
                {/*/>*/}


            </div>
        </div>
    );
}

export default Connect;