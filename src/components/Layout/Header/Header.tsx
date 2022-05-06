import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../../assets/images/utu-light-logo.svg";
import avatar from "../../../assets/images/profile.svg";
import UserAvatar from "./partials/UserAvatar/UserAvatar";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { connectWallet, disconnectWallet, initWallet, selectAddress, connectApi } from "../../../redux/slices/wallet";

const Header = () => {
    const [responsive, setResponsive] = useState(false);
    // const [walletConnected, setWalletConnected] = useState(false);

    const address = useAppSelector(selectAddress);

    const dispatch = useAppDispatch();

    const connect = async () => {
        await dispatch(connectWallet());
        // await setWalletConnected(true)
    };

    const disconnect = async () => {
        dispatch(disconnectWallet())
    };

    useEffect(() => {
        dispatch(initWallet());
        // setWalletConnected(false)
    }, [dispatch])

    return (
        <header className={responsive ? "header responsive" : "header"}>
            <nav className="menu">
                <div className="menu-item">
                    <Link to="/">
                        <img src={logo} alt="Utu Logo" height="40" />
                    </Link>
                </div>
                <div className="menu-item">
                    {!address ? (
                        <>
                            <span
                                style={{ color: "white", cursor: "pointer" }}
                                onClick={connect}
                            >
                                Connect
                            </span>
                        </>
                    ) : (
                        <UserAvatar
                            token={address}
                            logo={avatar}
                        />
                    )}
                </div>
   
                <div className="menu-item icon" onClick={() => setResponsive(!responsive)}>
                    <div>
                        &#9776;
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;
