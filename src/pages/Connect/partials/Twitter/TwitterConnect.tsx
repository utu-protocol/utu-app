import React, {Fragment, useCallback, useEffect, useState} from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import twitter from "../../../../assets/images/twitter.svg"
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {connectTwitter, requestToken, selectSecret} from "../../../../redux/slices/twitter";
import UtuButton from "../../../../components/Button/UtuButton";
import "./TwitterConnection.scss";
import ConnectHelper from "../ConnectHelper/ConnectHelper";
import queryString from 'query-string';
import {selectAddress} from "../../../../redux/slices/wallet";
import {notifier} from "../../../../components/Notification/notify";
import Spinner from "../../../../components/Spinner/Spinner";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

const TwitterConnect = () => {
    const [connectModal, setConnectModal] = useState(false);
    const dispatch = useAppDispatch();
    const oauth_token_secret = useAppSelector(selectSecret);
    const address = useAppSelector(selectAddress);
    const loadingToken: boolean = useSelector((state: RootState) => state.twitter.loadingToken);
    const loadingStatus: boolean = useSelector((state: RootState) => state.connectionStatus.connectionTypeLoading);

    const submitRequest = async () => {
        dispatch(requestToken())
    };

    const fetchAccessToken = useCallback(() => {
        const {oauth_token, oauth_verifier} = queryString.parse(window.location.search);
        if (oauth_token && oauth_verifier && address) {
            try {
                dispatch(connectTwitter({oauth_token, oauth_verifier, oauth_token_secret}))
            } catch (error) {
                notifier.alert("An Error connecting twitter")
            }
        }
    }, [dispatch, address, oauth_token_secret])

    useEffect(() => {
        fetchAccessToken()
    }, [fetchAccessToken]);

    return (
        <Fragment>
            {loadingStatus ?
                <UtuButton onButtonClick={()=>{}} title="" loading={true}  theme="secondary" center key="spinner-btn"/>
                :
                <Button onButtonClick={() => setConnectModal(true)} title="Connect to earn 10,000 UTT" theme="primary"
                        key="twitter-connect"/>
            }


            <Modal onClose={() => setConnectModal(false)} show={connectModal} style={{maxWidth: 500, minHeight: "60%"}}
                   onAction={() => submitRequest()}>
                <ConnectHelper icon={twitter} title="Allow Access" description="You are about to grant access to UTU"/>
                {
                    loadingToken &&
                    <div className="twitter-spinner">
                        <Spinner/>
                    </div>
                }

            </Modal>
        </Fragment>
    );
}

export default TwitterConnect;