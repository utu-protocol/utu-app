import React from "react";
import "./UserMenuDropdown.scss";
import metamask from "../../../../../assets/images/metamask.svg"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {maskValues} from "../../../../../utils/helper";

const UserMenuDropdown = () => {
    const {address, networkName} = useSelector((state: RootState) => state.wallet);

    return (
        <div className="user-dropdown">
            <div className="dropdown-title">
                Connect your wallet
            </div>

            <div className="utu-menu-list">
                <div className="utu-menu-list--item">
                    <div className="utu-alert flex small secondary">
                        <div>
                            Connection Status
                        </div>

                        <div className="flex flex-justify-between flex-items-center">
                            <span className="success mr-5 fs-xxxl">&#9679;</span>
                            <span>Metamask</span>
                        </div>
                    </div>
                </div>

                <div className="utu-menu-list--item border">
                    <div>
                        Wallet Details
                    </div>
                </div>

                <div className="utu-menu-list--item flex flex-justify-between flex-column border">
                    <div className="fs-l mb-5 bold">Address</div>
                    <div className="basic-disabled ">{maskValues(address)}</div>
                </div>

                <div className="utu-menu-list--item flex flex-justify-between flex-column border">
                    <div className="fs-l mb-5 bold">Network</div>
                    <div className="basic-disabled">{networkName}</div>
                </div>

                <div className="utu-menu-list--item ">
                    <div className="utu-alert flex small primary">
                        <div className="bold">
                            Connected to MetaMask
                        </div>

                        <div className="flex flex-justify-between flex-items-center">
                            <img src={metamask} alt="Metamask" height="31" className="mr-15"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserMenuDropdown;