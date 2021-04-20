import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import censor from '../../lib/censor';

import Card from '../Card/Card';

import './Clues.css';

export type PostData = {
    title: string,
    image: string | null
}

export type CluesProps = {
    data: {
        subreddit: string,
        posts: PostData[]
    }
};

function postMapper(post: PostData, subreddit: string) {
    return <Card key={post.title} imageLink={post.image} title={post.title.substr(0, 15) + "..."}>
        <p className="clue-content">
            {censor(post.title, subreddit)}
        </p>
    </Card>;
}

const Clues = ({ data }: CluesProps) => {
    return <section>
        <Container fluid>
            <Row>
                <Col md={6} id="left-col">
                    {/* Left Hand Side */}
                    {
                        data.subreddit
                            ? data.posts.filter((elem, idx) => (idx % 2 === 0)).map((elem) => postMapper(elem, data.subreddit))
                            : null
                    }
                </Col>
                <Col md={6} id="right-col">
                    {/* Right Hand Side */}
                    {
                        data.subreddit
                            ? data.posts.filter((elem, idx) => (idx % 2 === 1)).map((elem) => postMapper(elem, data.subreddit))
                            : null
                    }
                </Col>
            </Row>
        </Container>
    </section>;
};

export default Clues;