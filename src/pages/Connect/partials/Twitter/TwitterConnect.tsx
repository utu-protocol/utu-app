import React, {Fragment, useState} from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import twitter from "../../../../assets/images/twitter.svg"

import "./TwitterConnection.scss";
import ConnectHelper from "../ConnectHelper/ConnectHelper";

const TwitterConnect = () => {
    const [connectModal, setConnectModal] = useState(false);
    return (
        <Fragment>
            <Button onButtonClick={() => setConnectModal(true)} title="Connect to earn 50 UTT" theme="primary"
                    key="twitter-connect"/>

            <Modal onClose={() => setConnectModal(false)} show={connectModal} style={{maxWidth: 500, minHeight: "60%"}}>
                <ConnectHelper icon={twitter} title="Allow Access" description="You are about to grant access to UTU" />
            </Modal>
        </Fragment>
    );
}

export default TwitterConnect;