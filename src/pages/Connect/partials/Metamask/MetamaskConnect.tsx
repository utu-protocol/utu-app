import React, {Fragment, useState} from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import ConnectHelper from "../ConnectHelper/ConnectHelper";
import metamask from "../../../../assets/images/metamask.svg";

const MetamaskConnect = () => {
    const [connectModal, setConnectModal] = useState(false);

    return (
        <Fragment>
            <Button onButtonClick={() => setConnectModal(true)} title="Connect to earn 50 UTT" theme="primary"
                    key="metamask-connect"/>

            <Modal onClose={() => setConnectModal(false)} show={connectModal} style={{maxWidth: 500, minHeight: "60%"}}>
                <ConnectHelper icon={metamask} title="Allow Access" description="You are about to grant access to UTU" />
            </Modal>
        </Fragment>
    )
}

export default MetamaskConnect;