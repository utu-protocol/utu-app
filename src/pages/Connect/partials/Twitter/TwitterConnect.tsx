import React, {Fragment, useState} from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import twitter from "../../../../assets/images/twitter.svg"
import utu from "../../../../assets/images/utu.svg"

import "./TwitterConnection.scss";

const TwitterConnect = () => {
    const [connectModal, setConnectModal] = useState(false);
    return (
        <Fragment>
            <Button onButtonClick={() => setConnectModal(true)} title="Connect to earn 50 UTT" theme="primary"
                    key="twitter-connect"/>

            <Modal onClose={() => setConnectModal(false)} show={connectModal} style={{maxWidth: 645, minHeight: "70%"}}>
                <div className="twitter-connection">
                    <div className="avatars">
                        <div className="ellipse">
                            <img src={twitter} alt="Twitter" height="50"/>
                        </div>
                        <div className="plus">
                            +
                        </div>
                        <div className="ellipse">
                            <img src={utu} alt="Utu" height="50"/>
                        </div>
                    </div>
                    <div className="description">
                        <div className="title">Allow Access</div>
                        <div className="details">You are about to grant access to UTU</div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}

export default TwitterConnect;