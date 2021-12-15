import {useRoutes} from "react-router-dom";
import Connect from "../pages/Connect";
import Dashboard from "../pages/Dashboard";

const Routes = () => {
    return useRoutes([
        {path: "/", element: <Dashboard/>},
        {path: "connect", element: <Connect/>},
    ]);
};

export default Routes;