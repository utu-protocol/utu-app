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
import UtuButton from "../../../../components/Button/UtuButton";

const TelegramConnect = () => {
    const [connectModal, setConnectModal] = useState(false);

    const dispatch = useAppDispatch();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const codeVisible = useSelector((state: RootState) => state.telegram.showCode);
    const codeSent = useSelector((state: RootState) => state.telegram.codeSent);
    const submittingCode: any = useSelector((state: RootState) => state.telegram.submittingCode);
    const submittingPhone: any = useSelector((state: RootState) => state.telegram.submittingPhone);

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
                actions={false}
                closeIcon={true}
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
                            <label>Phone Number</label>
                            <input
                                type="text"
                                placeholder="Your phone number (+2547XXXXXX)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <br/>

                            {
                                codeVisible &&
                                <div>
                                    <label>Code</label>
                                    <input
                                        type="text"
                                        placeholder="sent code"
                                        value={phoneCode}
                                        onChange={(e) => setPhoneCode(e.target.value)}
                                    />
                                </div>
                            }

                            <div className="telegram-actions">
                                {
                                    codeVisible ?
                                        <UtuButton title="Submit" onButtonClick={submitCode} loading={submittingCode}/>
                                        :
                                        <UtuButton onButtonClick={requestPhoneCode} title="Next" loading={submittingPhone} />
                                }
                            </div>

                        </div>
                }

            </Modal>
        </Fragment>
    );
};

export default TelegramConnect;
