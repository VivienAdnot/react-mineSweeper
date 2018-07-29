import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './Game/Game';
import PageContainer from './Auth/PageContainer';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Game}/>

      {/* PageContainer is a testing route */}
      <Route exact path="/register" component={PageContainer} />
    </Switch>
  </main>
);

export default Main;