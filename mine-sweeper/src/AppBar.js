import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AppContext } from './AppProvider';

const styles = {
    root: {
        flexGrow: 1
    },
    //flex: 1 will use all the space available. So the rest will be pushed to the right.
    flex: {
        flex: 1,
    }
};

const title = 'Minesweeper';

function Greeting(context) {
    const { isAuthenticated, user } = context;

    if (isAuthenticated) {

        return <Typography color="inherit" variant="subheading">Welcome {user.fullName}</Typography>;

    } else {

        return <Button color="inherit">Register</Button>;

    }
}

function ButtonAppBar(props) {

    const { classes } = props;

    return (
        <div className={classes.root}>
        <AppContext.Consumer>
            {(context) =>

                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {title}
                        </Typography>

                        <Greeting {...context} />
                    </Toolbar>
                </AppBar>

            }
            </AppContext.Consumer>
        </div>
    );

}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar);