import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import './App.css';
import DisplayDialogIfNeeded from './Auth/DisplayDialogIfNeeded';
import Main from './Main';

class App extends Component {

    render() {

        return (
            <div>
                <AppBar />
                <DisplayDialogIfNeeded></DisplayDialogIfNeeded>

                <main>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                    </Switch>
                </main>
            </div>
        );

    }

}

export default App;
