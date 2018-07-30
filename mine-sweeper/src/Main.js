import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './Game/Game';

const Main = (props) => (
    <main>
        <Switch>
            <Route exact path='/' render={() => {
                return <Game
                    {...props}
                    onWin={props.onWin}
                />
            }
          }/>
        </Switch>
    </main>
);

export default Main;