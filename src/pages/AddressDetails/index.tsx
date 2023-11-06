import React, { useEffect } from "react";
import "./address-details.scss";
import TokenCard from "./partials/TokenCard/TokenCard";
import DetailsCard from "../partials/DetailsCard/DetailsCard";
import Label from "../../components/Label/Label";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUttBalance, getStakedAmountBy, getStakedAmountOn } from "../../redux/slices/balance";
import { getEndorsements } from "../../redux/slices/endorsement";
import { fetchAddressDetails } from '../../redux/slices/addressDetails';

const AddressDetails = () => {
    const dispatch = useAppDispatch();
    const addressDetails = useAppSelector((state) => state.addressDetails.addressDetails);
    const addressDetailsStatus = useAppSelector((state) => state.addressDetails.status);
  
    useEffect(() => {
      dispatch(fetchAddressDetails());
    }, [dispatch]);

    useEffect(() => {
        document.title = 'Address Details | Utu App';
    });

    return (
        <div className="container-body">
            <div>
            {/* Map through addressDetails and render them */}
            </div>
        </div>
    )
}

export default AddressDetails;