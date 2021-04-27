import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Footer from './components/Footer/Footer';

import Games from './games/Games';
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/easy">
                        <Games.Easy />
                    </Route>
                    <Route path="/normal">
                        <Games.Normal />
                    </Route>
                    <Route path="/">
                        <Redirect to="/normal"/>
                    </Route>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
