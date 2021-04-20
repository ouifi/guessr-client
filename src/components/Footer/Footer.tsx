import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Footer.css';

const Footer = () => {
    return <footer className="header-footer-common footer">
        <Container>
            <Row>
                <Col md={6}>
                    <a href="https://github.com/ouifi/guessr">
                        <h3 id="github">GitHub</h3>
                    </a>
                </Col>
                <Col md={6}>
                    <p id="disclaimer">
                        Disclaimer: This site is powered by the Reddit "Serendipity" random subreddit function. NSFW-tagged subreddits may be filtered out, 
                        but NSFW-ish subreddits are not. Use your discretion whether to actually use this at work. We think an NSFW filter would be a great
                        feature! PR's are welcome. 
                    </p>
                </Col>
            </Row>
        </Container>
    </footer>;
};

export default Footer;