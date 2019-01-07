import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AppContext } from './AppProvider';
import { config } from './config';

const styles = {
    appBar: {
        width: `calc(100% - ${config.drawerWidth}px)`,
        marginRight: config.drawerWidth,
        flexGrow: 1
    },
    flex: {
        flex: 1
    }
};

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

                <AppBar position="fixed" className={classes.appBar} color="primary">

                    <Toolbar>
                        <Typography variant="title" className={classes.flex} color="inherit" noWrap>
                            {config.title}
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