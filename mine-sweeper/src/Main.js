import React from 'react';
import Grid from '@material-ui/core/Grid';
import Game from './Game/Game';
import BestScores from './BestScores';

const Main = (props) => (
    <React.Fragment>
        <Grid container spacing={40}>
            <Grid item md={9}>
                <Game/>
            </Grid>
            <Grid item md={3}>
                <BestScores/>
            </Grid>
        </Grid>
    </React.Fragment>
);

export default Main;