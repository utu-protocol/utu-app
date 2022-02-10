import React, {useEffect, useCallback} from "react";
import {useAppDispatch} from "../../../redux/hooks";
import {connectApi, connectWallet, initWallet} from "../../../redux/slices/wallet";
import UtuButton from "../../../components/Button/UtuButton";
import "./ConnectBanner.scss";

const ConnectBanner = () => {
    const dispatch = useAppDispatch();

    const connect = useCallback(() => {
        dispatch(connectWallet());
        dispatch(connectApi());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initWallet());
        connect();
    }, [dispatch, connect]);

    return (
        <div className="connect-landing">
            <UtuButton title="Connect Wallet" center={false} onButtonClick={connect} />
        </div>
    )
}

export default ConnectBanner;