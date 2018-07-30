import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './Game/Game';
import PageContainer from './Auth/PageContainer';

const Main = (props) => (
    <main>
        <Switch>
            <Route exact path='/' render={() => {
                return <Game
                    {...props}
                    onUserCreated={props.onUserCreated}
                />
            }
          }/>
        </Switch>
    </main>
);

export default Main;