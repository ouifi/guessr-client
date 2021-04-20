import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Scoreboard from '../Scoreboard/Scoreboard';

import './Header.css';

const Header = () => {
    return <header className="header-footer-common header">
        <Container fluid>
            <Row>
                <Col md={{ span: 4, order: 'first' }} id="how-to-play">
                    <h3>
                        How To Play
                    </h3>
                    <p>
                        Below you will be presented with the titles of posts from a subreddit. Enter your guess for which subreddit these posts originate from. Click or tap on the imges for a full sized preview.
                    </p>
                </Col>
                <Col md={{ span: 4 }} xs={{ order: 'first' }}>
                    <h1 id="logo">
                        <a href={window.location.href} onClick={() => { window.location.reload(); }}>
                            guess/r/.io
                        </a>
                    </h1>
                </Col>
                <Col md={4} xs={{ order: 3 }}>
                    <Scoreboard/>
                </Col>
            </Row>
        </Container>
    </header>;
};

export default Header;