import React from "react";
import {
    BrowserRouter as Router
} from "react-router-dom";
import Layout from "../components/Layout";
import Routes from "../routes";
import Menu from "../components/Layout/Menu/Menu";

const Pages = () => {
    return (
        <Router>
            <Layout>
                <div className="container">
                    <Menu/>

                    <Routes/>
                </div>
            </Layout>
        </Router>
    )
}

export default Pages;