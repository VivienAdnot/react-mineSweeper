import React, { Component } from 'react';
import Game from './Game/Game';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to MineSweeper</h1>
                </header>

                <p className="App-intro">
                    Try to sweep the mines before exploding.
                </p>

                <Game></Game>
            </div>
        );
    }
}

export default App;
