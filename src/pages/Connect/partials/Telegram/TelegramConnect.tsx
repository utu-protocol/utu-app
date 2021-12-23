import React, {Fragment, useState} from "react";
import TwitterConnect from "../Twitter/TwitterConnect";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import ConnectHelper from "../ConnectHelper/ConnectHelper";
import telegram from "../../../../assets/images/telegram.svg";

import "./TelegramConnect.scss"
import {TGApi} from "./TelegramApi";

const TelegramConnect = () => {
    const [connectModal, setConnectModal] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [phoneCode, setPhoneCode] = useState('')

    const submitHandler = (e :any) => {
        e.preventDefault()
        console.log(phoneNumber,password, phoneCode)
        // TGApi(phoneNumber,password,phoneCode)
    }


    return (
        <Fragment>
            <Button onButtonClick={() => setConnectModal(true)} title="Connect to earn 50 UTT" theme="primary"
                    key="twitter-connect"/>

            <Modal onClose={() => setConnectModal(false)} show={connectModal}
                   style={{maxWidth: 500, minHeight: "60%"}}>

                <ConnectHelper icon={telegram} title="Allow Access" description="You are about to grant access to UTU"/>
                <form onSubmit={submitHandler}>
                    <label>phone number</label>
                    <input type="text" placeholder="your phone number" value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <br/>

                    <label>password</label>
                    <input type="text"
                           placeholder="your password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <br/>

                    <label>code</label>
                    <input type="text" placeholder="sent code" value={phoneCode}
                           onChange={(e) => setPhoneCode(e.target.value)}/>

                    <input type="submit" value="Submit"/>
                </form>
            </Modal>
        </Fragment>
    )
}


export default TelegramConnect;