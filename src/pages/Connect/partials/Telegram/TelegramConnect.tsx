import React, {Fragment, useState} from "react";
import TwitterConnect from "../Twitter/TwitterConnect";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import ConnectHelper from "../ConnectHelper/ConnectHelper";
import telegram from "../../../../assets/images/telegram.svg";

import "./TelegramConnect.scss"

const TelegramConnect = () => {
    const [connectModal, setConnectModal] = useState(false);
    return (
        <Fragment>
            <Button onButtonClick={() => setConnectModal(true)} title="Connect to earn 50 UTT" theme="primary"
                    key="twitter-connect"/>

            <Modal onClose={() => setConnectModal(false)} show={connectModal} style={{maxWidth: 500, minHeight: "60%"}}>

                <ConnectHelper icon={telegram} title="Allow Access" description="You are about to grant access to UTU"/>

                <form>
                    <label>phone number</label>
                    <input type="text" placeholder="your phone number"/>
                    <br/>
                    <label>password</label>
                    <input type="text" placeholder="your password"/>
                    <br/>
                    <label>phone code</label>
                    <input type="text"  placeholder="sent phone code"/>
                </form>

            </Modal>
        </Fragment>
    )
}


export default TelegramConnect;