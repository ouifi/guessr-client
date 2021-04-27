import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

const ErrorMessage = ({ onReload }: { onReload: () => void }) => {
    return <Container fluid style={{ padding: "50px" }}>
        <Row>
            <Col md={3} />
            <Col md={6}>
                <p>
                    Something has gone wrong.
                    The site might be experiencing high traffic, or perhaps there is a bug preventing the page from loading.
                    You may attempt to try again by pressing the button below, but please do not spam it.
                </p>
            </Col>
        </Row>
        <Button onClick={onReload} size="lg">
            Reload
        </Button>
    </Container>;
};

export default ErrorMessage;