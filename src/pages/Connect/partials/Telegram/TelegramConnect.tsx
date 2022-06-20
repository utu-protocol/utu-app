import React, { Fragment, useState } from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import ConnectHelper from "../ConnectHelper/ConnectHelper";
import telegram from "../../../../assets/images/telegram.svg";

import "./TelegramConnect.scss";
import { useAppDispatch } from "../../../../redux/hooks";
import { requestCode, sendToken, setShowCode, setTokenSent } from "../../../../redux/slices/telegram";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Checkmark from "../../../../components/Checkmark/Checkmark";
import UtuButton from "../../../../components/Button/UtuButton";
import { switchNetwork } from "../../../../redux/slices/wallet";

const TelegramConnect = () => {
    const [connectModal, setConnectModal] = useState(false);

    const dispatch = useAppDispatch();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [password, setPassword] = useState("");

    const { codeVisible, showPasswordField, codeSent, submittingCode, submittingPhone, loadingStatus } = useSelector((state: RootState) => ({
        codeVisible: state.telegram.showCode,
        submittingPhone: state.telegram.submittingPhone,
        codeSent: state.telegram.codeSent,
        submittingCode: state.telegram.submittingCode,
        loadingStatus: state.connectionStatus.connectionTypeLoading,
        showPasswordField: state.telegram.showPasswordField
    }));

    const requestPhoneCode = async () => {
        dispatch(requestCode({ phone: phoneNumber }));
    };

    const submitCode = () => {
        dispatch(sendToken({
            phone_code: phoneCode,
            password,
        }));
    }

    const connect = async () => {
        await switchNetwork();
        setConnectModal(true)
    }

    return (
        <Fragment>
            {loadingStatus ?
                <UtuButton title="" loading={true} theme="secondary" center key="spinner-btn" />
                :
                <Button
                    onButtonClick={() => connect()}
                    title="Connect to earn 10,000 UTT"
                    theme="primary"
                    key="twitter-connect"
                />
            }

            <Modal
                actions={false}
                closeIcon={true}
                onClose={() => {
                    setConnectModal(false);
                    dispatch(setShowCode(false));
                    dispatch(setTokenSent(false))
                }}
                show={connectModal}
                style={{ maxWidth: 500, minHeight: "60%" }}
            >
                <ConnectHelper
                    icon={telegram}
                    title="Allow Access"
                    description="You are about to grant access to UTU"
                />
                {
                    codeSent ?
                        <div className="telegram-success">
                            <Checkmark />
                        </div>
                        :
                        <div>
                            <label>Phone Number</label>
                            <input
                                type="text"
                                placeholder="Enter your phone number (+2547XXXXXX)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <br />

                            {
                                codeVisible &&
                                <div>
                                    <label>Code</label>
                                    <input
                                        type="text"
                                        placeholder="Sent code"
                                        value={phoneCode}
                                        onChange={(e) => setPhoneCode(e.target.value)}
                                    />
                                </div>
                            }

                            {
                                showPasswordField &&
                                <div>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        placeholder="Two-Step Verification Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span style={{ fontSize: '12px', opacity: 0.6 }}>Looks like you have <strong>Two-Step Verification</strong> enabled. you need to provide your password to enable the connection</span>
                                </div>
                            }

                            <div className="telegram-actions">
                                {
                                    codeVisible ?
                                        <UtuButton title="Submit" onButtonClick={submitCode} loading={submittingCode} />
                                        :
                                        <UtuButton onButtonClick={requestPhoneCode} title="Next"
                                            loading={submittingPhone} />
                                }
                            </div>

                        </div>
                }

            </Modal>
        </Fragment>
    );
};

export default TelegramConnect;
