import React, { Fragment, useCallback, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal/Modal";
import twitter from "../../../../assets/images/twitter.svg"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getAccessToken, requestToken, selectSecret } from "../../../../redux/slices/twitter";

import "./TwitterConnection.scss";
import ConnectHelper from "../ConnectHelper/ConnectHelper";
import queryString from 'query-string';
import { selectAddress } from "../../../../redux/slices/wallet";

const TwitterConnect = () => {
    const [connectModal, setConnectModal] = useState(false);
    const dispatch = useAppDispatch();
    const oauth_token_secret = useAppSelector(selectSecret);
    const address = useAppSelector(selectAddress);
    const submitRequest = async () => {
        dispatch(requestToken())
    };

    const fetchAccessToken = useCallback(() => {
        const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);
        if (oauth_token && oauth_verifier && address) {
            try {
                dispatch(getAccessToken({ oauth_token, oauth_verifier, oauth_token_secret }))
            } catch (error) {
                console.error(error);
            }
        }
    }, [dispatch, address, oauth_token_secret])

    useEffect(() => {
        fetchAccessToken()
    }, [fetchAccessToken]);

    return (
        <Fragment>
            <Button onButtonClick={() => setConnectModal(true)} title="Connect to earn 50 UTT" theme="primary"
                key="twitter-connect" />

            <Modal onClose={() => setConnectModal(false)} show={connectModal} style={{ maxWidth: 500, minHeight: "60%" }}
                onAction={() => submitRequest()}>
                <ConnectHelper icon={twitter} title="Allow Access" description="You are about to grant access to UTU" />
            </Modal>
        </Fragment>
    );
}

export default TwitterConnect;