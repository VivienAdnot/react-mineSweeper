import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import './App.css';
import DisplayRegisterDialogIfNeeded from './Auth/DisplayRegisterDialogIfNeeded';
import DisplayLoginDialogIfNeeded from './Auth/DisplayLoginDialogIfNeeded';
import Game from './Game/Game';
import Drawer from './Drawer';

class App extends Component {

    render() {

        return (
            <div className="root">
                <DisplayRegisterDialogIfNeeded></DisplayRegisterDialogIfNeeded>
                <DisplayLoginDialogIfNeeded></DisplayLoginDialogIfNeeded>
                <AppBar />
                <Drawer></Drawer>
                <Game></Game>
            </div>
        );

    }

}

export default App;
