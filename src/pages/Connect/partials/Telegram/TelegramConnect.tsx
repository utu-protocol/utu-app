import React, {Fragment, useState} from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import ConnectHelper from "../ConnectHelper/ConnectHelper";
import telegram from "../../../../assets/images/telegram.svg";

import "./TelegramConnect.scss";
import {useAppDispatch} from "../../../../redux/hooks";
import {requestCode, sendToken} from "../../../../redux/slices/telegram";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import Checkmark from "../../../../components/Checkmark/Checkmark";

const TelegramConnect = () => {
    const [connectModal, setConnectModal] = useState(false);

    const dispatch = useAppDispatch();
    const [phoneNumber, setPhoneNumber] = useState("+254711733346");
    const [phoneCode, setPhoneCode] = useState("");
    const codeVisible = useSelector((state: RootState) => state.telegram.showCode);
    const codeSent = useSelector((state: RootState) => state.telegram.codeSent);

    const requestPhoneCode = async () => {
        dispatch(requestCode({phone: phoneNumber}));
    };

    const submitCode = () => {
        dispatch(sendToken({
            phone_code: phoneCode
        }));
    }

    return (
        <Fragment>
            <Button
                onButtonClick={() => setConnectModal(true)}
                title="Connect to earn 50 UTT"
                theme="primary"
                key="twitter-connect"
            />

            <Modal
                onAction={() => setConnectModal(false)}
                onClose={() => setConnectModal(false)}
                show={connectModal}
                style={{maxWidth: 500, minHeight: "60%"}}
            >
                <ConnectHelper
                    icon={telegram}
                    title="Allow Access"
                    description="You are about to grant access to UTU"
                />
                {
                    codeSent ?
                        <div className="telegram-success">
                            <Checkmark/>
                        </div>
                        :
                        <div>
                            <label>phone number</label>
                            <input
                                type="text"
                                placeholder="your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <br/>

                            {
                                codeVisible &&
                                <div>
                                    <label>code</label>
                                    <input
                                        type="text"
                                        placeholder="sent code"
                                        value={phoneCode}
                                        onChange={(e) => setPhoneCode(e.target.value)}
                                    />
                                </div>
                            }

                            {
                                codeVisible ?
                                    <button className="tg_btn" onClick={submitCode}>
                                        Submit
                                    </button>
                                    :
                                    <button className="tg_btn" onClick={requestPhoneCode}>
                                        Next
                                    </button>
                            }

                        </div>
                }

            </Modal>
        </Fragment>
    );
};

export default TelegramConnect;
