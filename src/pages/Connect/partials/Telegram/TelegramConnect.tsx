import React, {Fragment, useState} from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import ConnectHelper from "../ConnectHelper/ConnectHelper";
import telegram from "../../../../assets/images/telegram.svg";
import TutorialCard from "../../partials/TutorialCard/TutorialCard";

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

    const numberB = [];
    const total = 3;
    
    for (let i = 0; i < total; i++) {
      numberB.push(i);
      console.log(i)
      console.log(typeof i)
    }
    console.log(typeof numberB)
    console.log("numberB", numberB)
    console.log("numberB-2", numberB)


    const tutorialData = [
        {
            title: "Title goes here", 
            button: "Close", 
            text: "Select your next action by clicking next or back and it goes over here", 
            back: "Back", 
            next: "Next",
            number: [0],
            numberB: numberB

        }
    ]



    return (
        <Fragment>
            <div className="test">
               {
                 tutorialData.map((data, key) => <TutorialCard {...data} key={key}/>)
                }
                 <Button
                onButtonClick={() => setConnectModal(true)}
                title="Connect to earn 10,000 UTT"
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
                                placeholder="Enter your phone number (+2547XXXXXX)"
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
            
            
            </div>   
           
        </Fragment>
    );
};

export default TelegramConnect;
