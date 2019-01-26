import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import './App.css';
import DisplayRegisterDialogIfNeeded from './Auth/DisplayRegisterDialogIfNeeded';
import DisplayLoginDialogIfNeeded from './Auth/DisplayLoginDialogIfNeeded';
import Game from './Game/Game';
import Rules from './Rules';
import Drawer from './Drawer';
import { AppContext } from './AppProvider';

let secretCode = 'audreydiallo';
let secretCodeBuffer = [];
const winOnNextClickCommand = 'winnext';

const stringContains = (strSource, str) => strSource.indexOf(str) !== -1;

const isMobileDevice = () => {

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);

}

const minimumScreenSizeOk = () => {

    return !isMobileDevice() && window.innerWidth >= 1200 && window.innerHeight >= 600;

}

const renderApp = (props) => {

    return (
        <AppContext.Consumer>
        {(context) =>
            <div className="root">
                <DisplayRegisterDialogIfNeeded></DisplayRegisterDialogIfNeeded>
                <DisplayLoginDialogIfNeeded></DisplayLoginDialogIfNeeded>
                <AppBar />
                <Drawer></Drawer>
                <Switch>
                    <Route exact path='/' component={Rules}/>
                    <Route path='/rules' component={Rules}/>
                    <Route path='/game' render={() => <Game {...props} context={context} />}/>
                </Switch>
            </div>
        }
        </AppContext.Consumer>
    );

};

const renderMinScreenSizeError = () => {

    return (
        <div className="root">
            <AppBar />
            <div style={{margin:"100px auto 0 auto"}}>
                <h1 >Sorry, your screen is too small.</h1>
                <h2>This game is designed for desktop screens.</h2>
                <h2>The minimum required screen size to be able to play the game is 1200px x 600px.</h2>
            </div>
        </div>
    );

};

class App extends Component {

    state = {
        debug: false
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    }

    onKeyPressed(e) {

        secretCodeBuffer.push(e.key);
        const buffer = secretCodeBuffer.join('');

        if (this.state.debug && stringContains(buffer, winOnNextClickCommand)) {
            this.setState({ winNext: true });
        }

        if (stringContains(buffer, secretCode)) {
            secretCodeBuffer = [];
            this.setState((prevState) => ({
                debug: !prevState.debug,
                winNext: false
            }));
        }

    }

    render() {

        const ScreenToRender = (minimumScreenSizeOk())
            ? renderApp
            : renderMinScreenSizeError;

        return <ScreenToRender {...this.state}/>

    }

}

export default App;
