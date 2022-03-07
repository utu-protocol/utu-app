import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { connectApi, connectWallet, initWallet } from "../../../redux/slices/wallet";
import UtuButton from "../../../components/Button/UtuButton";
import "./ConnectBanner.scss";

const ConnectBanner = () => {
    const dispatch = useAppDispatch();

    const connect = async () => {
        await dispatch(connectWallet());
        await dispatch(connectApi());
    };

    useEffect(() => {
        dispatch(initWallet());
    }, [dispatch]);

    return (
        <div className="connect-landing">
            <UtuButton title="Connect Wallet" center={false} onButtonClick={connect} />
        </div>
    )
}

export default ConnectBanner;