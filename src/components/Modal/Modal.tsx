import React from "react";
import "./Modal.scss";
import Button from "../Button";

interface ModalProps {
    onClose: () => void;
    onAction?: () => void;
    children?: any;
    show: boolean,
    style?: any
}

const Modal = ({onClose, onAction, children, show, style}: ModalProps) => {

    const simpFn = () => {
    };
    return (
        <div className={show ? "utu-modal  show" : "utu-modal  hide"}>
            <div className="utu-modal--container" style={style}>
                <div className="body">
                    {
                        children
                    }
                </div>

                <div className="actions">
                    <Button onButtonClick={onAction ? onAction : simpFn} title="Proceed" theme="primary"
                            key="proceed-button"/>
                    <Button onButtonClick={onClose} title="Cancel" theme="Secondary" key="close-button"/>
                </div>

            </div>
        </div>
    )
}

export default Modal;