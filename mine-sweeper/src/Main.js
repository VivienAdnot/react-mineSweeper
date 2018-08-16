import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './Game/Game';

const Main = (props) => (
    <main>
        <Switch>
            <Route exact path='/' component={Game}/>
        </Switch>
    </main>
);

export default Main;