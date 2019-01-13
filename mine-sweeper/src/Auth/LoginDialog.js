import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm';
import { AppContext } from '../AppProvider';

class LoginDialog extends Component {

    render() {
        return (
            <AppContext.Consumer>
                {(context) => <Dialog open={true}>
                    <DialogTitle>Login</DialogTitle>
                    <LoginForm onUserAuthenticated={(userWithToken) => {
                        context.onUserAuthenticated(userWithToken);
                    }}/>
                </Dialog>
                }
            </AppContext.Consumer>
        );
    }
}

export default LoginDialog;