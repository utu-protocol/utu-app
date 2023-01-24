import {
    BrowserRouter as Router
} from "react-router-dom";
import Layout from "../components/Layout";
import Routes from "../routes";
import Menu from "../components/Layout/Menu/Menu";
import { useAppSelector } from "../redux/hooks";
import { selectAddress, selectConnectedState } from "../redux/slices/wallet";
import ConnectBanner from "./partials/ConnectBanner/ConnectBanner";
import AuthProvider from "../providers/Auth";
import { EVENT_UTU_CONFIG, SDK_ENV } from "../config";
import { useEffect } from "react";

const Pages = () => {
    const address = useAppSelector(selectAddress);
    const connected = useAppSelector(selectConnectedState);
    useEffect(() => {
        document.title = 'Welcome | UTU App';
        if (SDK_ENV === 'production') {
            window.dispatchEvent(new CustomEvent(EVENT_UTU_CONFIG, {
              detail: {
                production: true,
              }
            }));
          }
    });
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <div className="container">
                        {
                            connected ?
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