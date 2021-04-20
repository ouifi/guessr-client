import React, { useCallback, useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Clues, { PostData } from './components/Clues/Clues';
import Submission from './components/Submission/Submission';
import Spinner from './components/Spinner/Spinner';
import ScoreboardProvider from './contexts/ScoreboardContext';

import API from './lib/api';

import './App.css';

type AppData = {
    subreddit: string,
    posts: PostData[]
};

const initialState: AppData = { subreddit: "", posts: [] };

function App() {

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
        <div className="App">
            <ScoreboardProvider>
                <Header />
                {
                    data.subreddit
                        ? <>
                            <Submission data={data} onNewGame={newGame} />
                            <Clues data={data} />
                        </>
                        : (
                            hasError
                                ? <>
                                    <p>
                                        Something has gone wrong.
                                        The site might be experiencing high traffic, or perhaps there is a bug preventing the page from loading.
                                        You may attempt to try again by pressing the button below, but please do not spam it.
                                    </p>
                                </>
                                : <div style={{ minHeight: "400px" }}>
                                    <Spinner size="xl" className="ml-auto mr-auto spinner-spaced" />
                                </div>
                        )
                }
                <Footer />
            </ScoreboardProvider>
        </div>
    );
}

export default App;
