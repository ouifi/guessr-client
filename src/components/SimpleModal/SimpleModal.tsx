import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

import './SimpleModal.css';

const SimpleModal = ({ children, title, show, onClose }: { children: ReactNode, title?: string, show: boolean, onClose: () => void }) => {

    return (
        <Modal show={show} onHide={onClose} size="lg">
            {
                title
                    ? <Modal.Header closeButton>
                        <Modal.Title className="modal-title-text">
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    : <Modal.Header closeButton/>
            }
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal >
    );
};

export default SimpleModal;