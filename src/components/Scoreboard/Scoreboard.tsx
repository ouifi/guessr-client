import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';

import Pill from '../Pill/Pill';
import { ScoreboardContext, GameCorrect } from "../../contexts/ScoreboardContext";

import './Scoreboard.css';

const Scoreboard = () => {

    const { scoreboard, resetScoreboard } = useContext(ScoreboardContext);

    return (
        <Container id="scoreboard">
            <h3>Your Scoreboard <span id="clear-scoreboard" onClick={resetScoreboard}>(clear)</span></h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {
                    Object.keys(scoreboard).length
                        ? Object.entries(scoreboard)
                        .map(
                            ([r, rData]) => {
                                let backgroundColor = undefined;
                                let title = undefined;
                                if (rData.correct === GameCorrect.INCORRECT) {
                                    title = "You got this one wrong";
                                    backgroundColor = "red";
                                } else if (rData.correct === GameCorrect.CORRECT) {
                                    title = "You got this one right";
                                    backgroundColor = "limegreen";
                                } else {
                                    title = "You did not finish this one";
                                    backgroundColor = "darkblue";
                                }
                                return <Pill style={{ backgroundColor: backgroundColor }} className="scoreboard-pill" title={title} key={r}>{r}: {rData.guesses}</Pill>;
                            }
                        ) 
                        : <p style={{ fontSize:"smaller"}}>Nothing here yet!</p>
                }
            </div>
        </Container>
    );
};

export default Scoreboard;