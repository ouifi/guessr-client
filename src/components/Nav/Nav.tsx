import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import Icon from '../Icon/Icon';
import Hamburger from '../Icon/src/Hamburger';

import './Nav.css';

const Nav = ({ children }: { children: React.ReactNode }) => {

    const [hideMenu, setHideMenu] = useState(true);

    return <Row as="nav" style={{ width: "100%" }}>
        <Col md={11} id="nav-content" className={hideMenu ? "nav-responsive" : ""}>
            {children}
        </Col>
        <Col md={1} id="nav-hamburger">
            <button  onClick={() => { setHideMenu(show => !show); }} style={{marginBottom: "-50px"}}>
                <Icon>
                    <Hamburger wide height={30}/>
                </Icon>
            </button>
        </Col>
    </Row>;
};

export default Nav;