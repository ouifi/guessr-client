import React, { useEffect, useState, useCallback } from 'react';

export enum GameCorrect {
    INCORRECT = -1,
    UNFINISHED = 0,
    CORRECT = 1
}

type ScoreboardEntry = {
    guesses: number,
    correct: GameCorrect
};

type ScoreboardData = Record<string, ScoreboardEntry>;

type Scoreboard = Record<string, ScoreboardData>;

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

const ScoreboardProvider = ({ children, scoreboardKey }: { children: React.ReactNode, scoreboardKey: string }) => {

    const [scoreboardState, setScoreboardState] = useState<Scoreboard>({});

    useEffect(
        () => {
            const scoreboardSaveData = JSON.parse(localStorage.getItem("scoreboard") || "{}");
            setScoreboardState(scoreboardSaveData);
        },
        [scoreboardKey]
    );

    const setSubredditEntry = useCallback(
        (newData: ScoreboardData) => {
            setScoreboardState(
                oldScoreboard => {
                    const newScoreboard = {
                        ...oldScoreboard,
                        [scoreboardKey]: {
                            ...oldScoreboard[scoreboardKey],
                            ...newData
                        }
                    };

                    localStorage.setItem("scoreboard", JSON.stringify(newScoreboard));
                    return newScoreboard;
                }
            );
            return newData;
        },
        [setScoreboardState, scoreboardKey]
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
            if (!scoreboardState[scoreboardKey][subreddit]) {
                saveScore(subreddit, guesses, correct);
            }
            return subreddit;
        },
        [scoreboardState, scoreboardKey, saveScore]
    );

    const resetScoreboard = useCallback(
        () => {
            setScoreboardState({});
            localStorage.setItem("scoreboard", JSON.stringify({}));
        },
        []
    );

    return <ScoreboardContext.Provider value={{ scoreboard: scoreboardState[scoreboardKey] || {}, setEntry: setSubredditEntry, saveScore: saveScore, saveNewScore: saveNewScore, resetScoreboard: resetScoreboard }}>
        {children}
    </ScoreboardContext.Provider>;
};

export default ScoreboardProvider;
export { ScoreboardContext };
