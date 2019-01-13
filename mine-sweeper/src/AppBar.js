import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AppContext } from './AppProvider';
import { config } from './config';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
    },
    spacer: {
        flex: 1
    },
    title: {
        marginRight: "50px"
    },
    btnHref: {
        color: "white",
        textDecoration: "none"
    }
});

function Greeting(context) {
    const { isAuthenticated, user, requestShowRegisterPopup, requestShowAuthenticatePopup } = context;

    if (isAuthenticated) {

        return <Typography color="inherit" variant="subheading">Welcome {user.fullName}</Typography>;

    } else {

        return (
            <div>
                <Button color="inherit" onClick={requestShowAuthenticatePopup}>Login</Button>
                <Button color="inherit" onClick={requestShowRegisterPopup}>Register</Button>
            </div>
        );

    }
}

function ButtonAppBar(props) {

    const { classes } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppContext.Consumer>
                {(context) =>
                    <AppBar position="fixed" className={classes.appBar} color="primary">
                        <Toolbar>
                            <Typography className={classes.title} variant="title" color="inherit" noWrap>
                                {config.title}
                            </Typography>

                            <Button>
                                <Link className={classes.btnHref} to='/game'>Play</Link>
                            </Button>

                            <Button >
                                <Link className={classes.btnHref} to='/rules'>Rules</Link>
                            </Button>

                            <div className={classes.spacer}></div>

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