import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import './App.css';
import DisplayDialogIfNeeded from './Auth/DisplayDialogIfNeeded';
import Game from './Game/Game';
import Drawer from './Drawer';

class App extends Component {

    render() {

        return (
            <div className="root">
                <AppBar />
                <DisplayDialogIfNeeded></DisplayDialogIfNeeded>
                <Game></Game>
                <Drawer></Drawer>
            </div>
        );

    }

}

export default App;
