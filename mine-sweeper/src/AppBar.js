import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
    },
    //flex: 1 will use all the space available. So the rest will be pushed to the right.
    flex: {
        flex: 1,
    }
};

function ButtonAppBar(props) {
    const { classes } = props;
    const title = 'Minesweeper';
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {title}
                    </Typography>

                    <Button color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
        </div>
    );

}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar);