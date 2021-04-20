import React, { useEffect, useState, useCallback } from 'react';

// eslint-disable-next-line no-unused-vars
enum GameCorrect {
    INCORRECT = -1,
    UNFINISHED = 0,
    CORRECT = 1
};

type ScoreboardEntry = {
    guesses: number,
    correct: GameCorrect
};

type ScoreboardData = Record<string, ScoreboardEntry>;

type ScoreboardContextType = {
    scoreboard: ScoreboardData,
    setEntry: (newData: ScoreboardData) => ScoreboardData
    saveScore: (subreddit: string, guesses: number, correct: GameCorrect) => string
    saveNewScore: (subreddit: string, guesses: number, correct: GameCorrect) => string
    resetScoreboard: () => void

}

const ScoreboardContext = React.createContext<ScoreboardContextType>({
    scoreboard: {},
    setEntry: (newData: ScoreboardData) => (newData),
    saveScore: (subreddit: string, guesses: number, correct: GameCorrect) => subreddit,
    saveNewScore: (subreddit: string, guesses: number, correct: GameCorrect) => subreddit,
    resetScoreboard: () => undefined
});

const ScoreboardProvider = ({ children }: { children: React.ReactNode }) => {

    const [scoreboardState, setScoreboardState] = useState<ScoreboardData>({});

    useEffect(
        () => {
            const scoreboardSaveData = JSON.parse(localStorage.getItem("scoreboard") || "{}");
            console.log("Retrieving save data from localStorage");
            setScoreboardState(scoreboardSaveData);
        },
        []
    );

    const setSubredditEntry = useCallback(
        (newData: ScoreboardData) => {
            setScoreboardState(
                oldData => {
                    const retVal = {
                        ...oldData,
                        ...newData
                    };

                    localStorage.setItem("scoreboard", JSON.stringify(retVal));
                    return retVal;
                }
            );
            return newData;
        },
        [setScoreboardState]
    );

    const saveScore = useCallback(
        (subreddit: string, guesses: number, correct: GameCorrect) => {
            setSubredditEntry({
                [subreddit]: {
                    guesses: guesses, 
                    correct: correct
                }
            });
            return subreddit;
        },
        [setSubredditEntry]
    );

    const saveNewScore = useCallback(
        (subreddit: string, guesses: number, correct: GameCorrect) => {
            setScoreboardState(
                oldData => {
                    if (!oldData[subreddit]) {
                        return {
                            ...oldData,
                            [subreddit]: {
                                guesses: guesses, 
                                correct: correct
                            }
                        };
                    } else {
                        return {
                            ...oldData
                        };
                    }
                }
            );

            return subreddit;
        },
        []
    );

    const resetScoreboard = useCallback(
        () => {
            setScoreboardState({});
            localStorage.setItem("scoreboard", JSON.stringify({}));
        },
        []
    );

    return <ScoreboardContext.Provider value={{ scoreboard: scoreboardState, setEntry: setSubredditEntry, saveScore: saveScore, saveNewScore: saveNewScore, resetScoreboard: resetScoreboard }}>
        {children}
    </ScoreboardContext.Provider>;
};

export default ScoreboardProvider;
export { ScoreboardContext, GameCorrect };
