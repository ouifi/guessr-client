import React, { useState, useCallback, useContext } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Alert, Toast } from 'react-bootstrap';

import { GameCorrect, ScoreboardContext } from '../../contexts/ScoreboardContext';
import useColorFlash from '../../hooks/useColorFlash';
import cleanString from '../../lib/cleanString';

import './Submission.css';

const Submission = ({ data, onNewGame }: { data: { subreddit: string }, onNewGame: () => void }) => {

    const [guessText, setGuessText] = useState<string>("");
    const [guessCounter, setGuessCounter] = useState<number>(0);
    const [isGiveUp, setIsGiveUp] = useState(false);
    const [isWon, setIsWon] = useState(false);
    const [isClose, setIsClose] = useState(false);

    const isRevealed = isGiveUp || isWon;

    const { saveScore, saveNewScore } = useContext(ScoreboardContext);

    const showCloseOne = useCallback(
        () => {
            setIsClose(true);
        },
        []
    );

    const checkGuess = useCallback(
        (guessText: string, answerText: string) => {
            const cleanAnswerText = cleanString(answerText);
            const cleanGuessText = cleanString(guessText);

            if (
                true
                && cleanAnswerText.length > 2 // If they are guessing more than 2 letters at a time...
                && cleanAnswerText.includes(cleanGuessText)  // Is the guess a subset of the full answer?
                && cleanAnswerText !== cleanGuessText // But not equal to the full answer...
            ) {
                showCloseOne();
            }
            return cleanAnswerText === cleanGuessText;
        },
        [showCloseOne]
    );

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
            if (cleanString(guessText).length > 0) {
                if (checkGuess(guessText, data.subreddit)) {
                    setIsWon(true);
                    saveScore(data.subreddit, guessCounter + 1, GameCorrect.CORRECT);
                }

                if (!isRevealed) {
                    setGuessCounter(int => int + 1);
                }
            }
        },
        [setGuessCounter, guessCounter, saveScore, data.subreddit, guessText, checkGuess, isRevealed]
    );

    const giveUp = useCallback(
        () => {
            setIsGiveUp(true);
            saveScore(data.subreddit, guessCounter, GameCorrect.INCORRECT);
        },
        [setIsGiveUp, saveScore, data.subreddit, guessCounter]
    );

    const flashingAnimationStyle = useColorFlash(guessCounter);

    const onEnterKeyPress = useCallback(
        () => {
            if (isRevealed) { // This basically allows someone who is very confident in their answer to stroke Enter twice and get a new game on the correct answer
                newGame();
            } else {
                submitGuess();
            }
        },
        [isRevealed, newGame, submitGuess]
    );

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
                                        onKeyPress={(keyEvent: React.KeyboardEvent<HTMLInputElement>) => { if (keyEvent.key === "Enter") { onEnterKeyPress(); } }}
                                        autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" // Disable all validation
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
                        <Toast show={isClose} onClose={() => { setIsClose(false); }} delay={2500} autohide>
                            <Toast.Body>
                                That answer is pretty close, try adding more!
                            </Toast.Body>
                        </Toast>
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
                                <Col md={5} className="spaced-button-col">
                                    <Button variant="success" block onClick={newGame}>
                                        New Game
                                    </Button>
                                </Col>
                                <Col md={5} className="spaced-button-col">
                                    <Button variant="danger" block onClick={giveUp}>
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