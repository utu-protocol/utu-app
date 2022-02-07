import React, {useEffect} from "react";
import {useAppDispatch} from "../../../redux/hooks";
import {connectApi, connectWallet, initWallet} from "../../../redux/slices/wallet";

const ConnectBanner = () => {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(initWallet());

        dispatch(connectWallet());
         dispatch(connectApi());
    }, [dispatch]);

  return (
      <div />
  )
}

export default ConnectBanner;