import React, {useEffect} from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, children }) => {

    useEffect(() => {
            const onEscPress = (e) => {
        if (e.code === 'Escape') {
            onCloseModal();
        }
            }
        
        window.addEventListener('keydown', onEscPress);
    
        return () => {
            window.removeEventListener('keydown', onEscPress);
        }
    }, [onCloseModal]);

    function onClose(e) {
        if (e.currentTarget === e.target) {
            onCloseModal();
        }
    }

    return createPortal(
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal}>
                {children}
            </div>
        </div>, modalRoot);
};

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;