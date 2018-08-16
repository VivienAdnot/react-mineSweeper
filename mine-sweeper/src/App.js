import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import Main from './Main';
import DisplayDialogIfNeeded from './Auth/DisplayDialogIfNeeded';

class App extends Component {

    render() {

        return (
            <div>
                <AppBar />
                <DisplayDialogIfNeeded></DisplayDialogIfNeeded>
                <Main />
            </div>
        );

    }

}

export default App;
