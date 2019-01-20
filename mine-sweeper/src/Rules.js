import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    marginTop: '70px',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

function Rules(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <main className={classes.content}>
            <h1>Instructions for MineSweeper</h1>

            <h2>Quick Start:</h2>
            <Typography paragraph>
                You are presented with a board of squares. Some squares contain mines (bombs), others don't.<br/>
                If you click on a square containing a bomb, you lose.<br/>
                If you manage to click all the squares (without clicking on any bombs) you win.<br/>
                Clicking a square which doesn't have a bomb reveals the number of neighbouring squares containing bombs.<br/>
                Use this information plus some guess work to avoid the bombs.<br/>
                To open a square, point at the square and click on it.<br/>
                To mark a square you think is a bomb, point and right-click (or hover with the mouse and press Space).<br/>
                If you think you marked all the bombs, double-click on the square.<br/>
                It will automatically open all the neighbors.<br/>
            </Typography>

            <h2>Detailed Instructions:</h2>
            <Typography paragraph>
                A squares "neighbours" are the squares adjacent above, below, left, right, and all 4 diagonals.<br/>
                Squares on the sides of the board or in a corner have fewer neighbors.<br/>
                If you open a square with 0 neighboring bombs, all its neighbors will automatically open.<br/>
                This can cause a large area to automatically open!<br/>
                To remove a bomb marker from a square, point at it and right-click again.<br/>
                If you mark a bomb incorrectly, you will have to correct the mistake before you can win.<br/>
                Incorrect bomb marking doesn't kill you, but it can lead to mistakes which do.<br/>
                You don't have to mark all the bombs to win; you just need to open all non-bomb squares.<br/>
            </Typography>

             <Link to='/game'>Play now</Link>
            </main>
        </div>
  );
}

Rules.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rules);