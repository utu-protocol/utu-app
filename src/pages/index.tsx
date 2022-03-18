import React, { useEffect } from "react";
import {
    BrowserRouter as Router
} from "react-router-dom";
import Layout from "../components/Layout";
import Routes from "../routes";
import Menu from "../components/Layout/Menu/Menu";
import { useAppSelector } from "../redux/hooks";
import { selectAddress } from "../redux/slices/wallet";
import ConnectBanner from "./partials/ConnectBanner/ConnectBanner";
import AuthProvider from "../providers/Auth";

const Pages = () => {
    const address = useAppSelector(selectAddress);
    useEffect(() => {
        document.title = 'Welcome | Utu Wallet';
    });
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <div className="container">
                        {
                            address ?
                                <div>
                                    <Menu />
                                    <Routes />
                                </div>
                                :
                                <ConnectBanner />
                        }
                    </div>
                </Layout>
            </Router>
        </AuthProvider>
    )
}

export default Pages;