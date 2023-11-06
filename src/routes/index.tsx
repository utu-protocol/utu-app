import {useRoutes} from "react-router-dom";
import Connect from "../pages/Connect";
import Dashboard from "../pages/Dashboard";
import AddressDetails from '../pages/AddressDetails'

const Routes = () => {
    return useRoutes([
        {path: "/", element: <Dashboard/>},
        {path: "connect", element: <Connect/>},
        {path: "address-details", element: <AddressDetails/>},
    ]);
};

export default Routes;