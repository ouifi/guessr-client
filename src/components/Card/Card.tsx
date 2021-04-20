import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SimpleModal from '../SimpleModal/SimpleModal';

import './Card.css';

type CardProps = {
    children: React.ReactNode,
    imageLink: string | null
};

const Card = ({ children, imageLink }: CardProps) => {

    const [showImageModal, setShowImageModal] = useState(false);

    return (
        <div className="card-outer">
            {
                imageLink
                    ? <Container>
                        <Row>
                            <Col xs={3} sm={2} className="image-wrapper-wrapper">
                                <div className="image-wrapper image-bordered" onClick={() => { setShowImageModal(true); }} title="Click to enlarge">
                                    <img src={imageLink} alt="Reddit post preview" width={60} />
                                </div>
                            </Col>
                            <Col xs={9} sm={10}>
                                {children}
                            </Col>
                        </Row>
                        {
                            showImageModal && <SimpleModal show={showImageModal} onClose={() => { setShowImageModal(false); }}>
                                <div className="image-wrapper">
                                    <img src={imageLink} alt="Reddit post preview" />
                                </div>
                            </SimpleModal>
                        }
                    </Container>
                    : children
            }
        </div>
    );
};

export default Card;