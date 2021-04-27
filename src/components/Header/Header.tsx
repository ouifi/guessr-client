import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import './Header.css';

import Nav from '../Nav/Nav';

const Header = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const matchLocation = useCallback(
        (loc) => {
            if (loc === location.pathname) {
                return "nav-selected";
            } else {
                return "";
            }
        },
        [location]
    );

    return <header className="header-footer-common header">
        <Nav>
            <Link to="/easy" id={matchLocation("/easy")}>
                Easy
            </Link>
            <Link to="/normal" id={matchLocation("/normal")}>
                Normal
            </Link>
            <Link to="/hard" id={matchLocation("/hard")}>
                Hard
            </Link>
        </Nav>
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
                    {children}
                </Col>
            </Row>
        </Container>
    </header>;
};

export default Header;