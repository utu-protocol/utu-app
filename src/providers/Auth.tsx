

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../api';
import { connectApi, getUTUApiAccessToken } from "../redux/slices/wallet";

const AuthProvider = ({ children }: {
    children: any
}) => {
    const dispatch = useDispatch();
    const { address } = useSelector(
        (state: any) => state.wallet
    )

    const redirectToHome = () => {
        if (
            window.location.pathname !== '/'
        ) {
            window.location.href = '/';
        }
    };

    const checkIfAccessTokenExist = useCallback(async () => {
        const accessToken = await getUTUApiAccessToken();
        if (accessToken) return;
        dispatch(connectApi());
    }, [dispatch])

    const checkAccessTokenValidity = useCallback(async () => {
        const accessToken = await getUTUApiAccessToken();
        if (!accessToken) return;
        try {
            await apiRequest.get(`${process.env.REACT_APP_API_SOCIAL_CONNECTOR_URL}/status`);
        } catch (e: any) {
            if (e.response && e.response.status === 401) {
                dispatch(connectApi());
            }
        }
    }, [dispatch])

    useEffect(() => {
        if (!address) return redirectToHome();
        checkAccessTokenValidity();
        checkIfAccessTokenExist();
    }, [address]);

    return <>{children}</>;
};

export default AuthProvider;
