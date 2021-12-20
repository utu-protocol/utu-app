import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../../assets/images/utu-light-logo.svg";
import avatar from "../../../assets/images/driver.png";
import UserAvatar from "../partials/UserAvatar";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { connectWallet, disconnectWallet, initWallet, selectAddress } from "../../../redux/slices/wallet";

const Header = () => {
    const address = useAppSelector(selectAddress);

    const dispatch = useAppDispatch();

    const connect = async () => {
        dispatch(connectWallet())
    };

    const disconnect = async () => {
        dispatch(disconnectWallet())
    };

    useEffect(() => {
        dispatch(initWallet());
    }, [dispatch])

    return (
        <header className="header">
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
            </nav>
        </header>
    );
};
export default Header;
