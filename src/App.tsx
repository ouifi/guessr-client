import React, { useCallback, useEffect, useState } from 'react';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Clues, { PostData } from './components/Clues/Clues';
import Submission from './components/Submission/Submission';
import Spinner from './components/Spinner/Spinner';
import ScoreboardProvider from './contexts/ScoreboardContext';

type AppData = {
    subreddit: string,
    posts: PostData[]
};

const initialState:AppData = { subreddit: "", posts: [] };

function App() {

    const [data, setData] = useState<AppData>(initialState);

    const newGame = useCallback(
        () => {
            setData(initialState);
            fetch("/api/newgame")
                .then(
                    (res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    }
                ).then(
                    (body) => {
                        setData(body);
                    }
                ).catch(
                    (err) => {
                        console.error(err);
                        setData(initialState);
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
                        : <div style={{ minHeight: "500px" }}>
                            <Spinner size="xl" className="ml-auto mr-auto spinner-spaced" />
                        </div>
                }
                <Footer />
            </ScoreboardProvider>
        </div>
    );
}

export default App;
