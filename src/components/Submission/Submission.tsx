import React, { useState, useCallback, useContext } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

import { GameCorrect, ScoreboardContext } from '../../contexts/ScoreboardContext';
import useColorFlash from '../../hooks/useColorFlash';

import './Submission.css';

function checkGuess(guessText: string, answerText: string) {
    return guessText.toLocaleLowerCase() === answerText.toLocaleLowerCase();
}

const Submission = ({ data, onNewGame }: { data: { subreddit: string }, onNewGame: () => void }) => {

    const [guessText, setGuessText] = useState<string>("");
    const [guessCounter, setGuessCounter] = useState<number>(0);
    const [isGiveUp, setIsGiveUp] = useState(false);
    const [isWon, setIsWon] = useState(false);

    const { saveScore, saveNewScore } = useContext(ScoreboardContext);

    const resetGame = useCallback(
        () => {
            setGuessText("");
            setGuessCounter(0);

            onNewGame();

            setIsGiveUp(false);
            setIsWon(false);
        },
        [setGuessText, setGuessCounter, onNewGame, setIsGiveUp, setIsWon]
    );

    const newGame = useCallback(
        () => {
            saveNewScore(data.subreddit, guessCounter, GameCorrect.UNFINISHED);
            resetGame();
        },
        [saveNewScore, data.subreddit, guessCounter, resetGame]
    );

    const submitGuess = useCallback(
        () => {
            if (checkGuess(guessText, data.subreddit)) {
                setIsWon(true);
                saveScore(data.subreddit, guessCounter + 1, GameCorrect.CORRECT);
            }
            setGuessCounter(int => int + 1);
        },
        [setGuessCounter, guessCounter, saveScore, data.subreddit, guessText]
    );

    const giveUp = useCallback(
        () => {
            setIsGiveUp(true);
            saveScore(data.subreddit, guessCounter, GameCorrect.INCORRECT);
        },
        [setIsGiveUp, saveScore, data.subreddit, guessCounter]
    );

    const isRevealed = isGiveUp || isWon;

    const flashingAnimationStyle = useColorFlash(guessCounter);

    return <section>
        {/* The submission/answer line */}
        <Container fluid style={{ marginTop: "10px" }}>
            <Row>
                <Col md={6}>
                    <Container fluid>
                        <Row>
                            <Col md={8}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="r-slash">
                                            /r/
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        aria-label="subreddit"
                                        aria-describedby="r-slash"
                                        value={guessText}
                                        onChange={(event) => { setGuessText(event.target.value); }}
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            variant="outline-dark"
                                            onClick={submitGuess}
                                        >
                                            Submit
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            <Col md={4}>
                                <p className="num-guesses" >
                                    Guesses: <span style={flashingAnimationStyle}>{guessCounter}</span>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={6}>
                    {
                        isWon && <Alert variant="success" onClose={newGame} dismissible>
                            <Alert.Heading>
                                Great Job! <b>r/{data.subreddit}</b>
                            </Alert.Heading>
                        </Alert>
                    }
                    {
                        isGiveUp && <Alert variant="danger" onClose={newGame} dismissible>
                            <Alert.Heading>
                                Oh no! Its <b>r/{data.subreddit}</b>
                            </Alert.Heading>
                        </Alert>
                    }
                    {
                        !isRevealed && <Container fluid>
                            <Row>
                                <Col md={1} />
                                <Col md={5} style={{ margin: "5px" }}>
                                    <Button variant="success" block style={{ fontSize: "larger" }} onClick={newGame}>
                                        New Game
                                    </Button>
                                </Col>
                                <Col md={5} style={{ margin: "5px" }}>
                                    <Button variant="danger" block style={{ fontSize: "larger" }} onClick={giveUp}>
                                        Give up
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    }
                </Col>
            </Row>
        </Container>
    </section>;
};

export default Submission;