import React, { Component } from 'react';
import Game from './Game/Game';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Game></Game>
            </div>
        );
    }
}

export default App;
