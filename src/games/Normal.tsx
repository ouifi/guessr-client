import React, { useCallback, useEffect, useState } from 'react';

import Header from '../components/Header/Header';
import Clues from '../components/Clues/Clues';
import Submission from '../components/Submission/Submission';
import Spinner from '../components/Spinner/Spinner';
import Scoreboard from '../components/Scoreboard/Scoreboard';

import ScoreboardProvider from '../contexts/ScoreboardContext';

import API, { AppData } from '../lib/api';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const initialState: AppData = { subreddit: "", posts: [] };

const Normal = () => {
    const [data, setData] = useState<AppData>(initialState);
    const [hasError, setHasError] = useState(false);

    const newGame = useCallback(
        () => {
            setData(initialState);
            API.newGame()
                .then(
                    (body) => {
                        setData(body);
                    }
                ).catch(
                    (err) => {
                        console.error(err);
                        setData(initialState);
                        setHasError(true);
                    }
                );
        },
        [setData]
    );

    useEffect(
        () => {
            newGame();
        },
        [newGame]
    );

    return (
        <ScoreboardProvider scoreboardKey="normal">
            <Header>
                <Scoreboard/>
            </Header>
            {
                data.subreddit
                    ? <>
                        <Submission data={data} onNewGame={newGame} />
                        <Clues data={data} />
                    </>
                    : (
                        hasError
                            ? <ErrorMessage onReload={() => { setHasError(false); newGame(); }}/>
                            : <div style={{ minHeight: "400px" }}>
                                <Spinner size="xl" className="ml-auto mr-auto spinner-spaced" />
                            </div>
                    )
            }
        </ScoreboardProvider>
    );
};

export default Normal;