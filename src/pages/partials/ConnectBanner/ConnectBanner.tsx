import { useEffect } from "react";
import UtuButton from "../../../components/Button/UtuButton";
import Modal from "../../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { connectWallet, initWallet, selectAuthorizingState, selectConnectingState } from "../../../redux/slices/wallet";
import "./ConnectBanner.scss";

const ConnectBanner = () => {
    const dispatch = useAppDispatch();

    const connecting = useAppSelector(selectConnectingState);

    const authorizing = useAppSelector(selectAuthorizingState);
    

    const connect = async () => {
        await dispatch(connectWallet());
    };

    useEffect(() => {
        dispatch(initWallet());
    }, [dispatch]);

    return (
        <div className="connect-landing">
            
            { (!connecting && !authorizing) ? (<UtuButton title="Connect Wallet" center={false} onButtonClick={connect} />) : null }
            {authorizing && (<Modal show={true} onClose={() => { }} actions={false}>
                    <div>
                        <h1>Connect and Authorize your wallet</h1>
                        <p>This dapp requires access to your wallet, please login and authorize access to your Wallet to continue</p>
                </div>
                </Modal>)}
            {connecting && (<div className="utu-modal  show container-centered">
                <p>Connecting....</p>
            </div>)}
        </div>
    )
}

export default ConnectBanner;