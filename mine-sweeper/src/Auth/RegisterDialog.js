import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import RegisterForm from './RegisterForm';
import { AppContext } from '../AppProvider';

class RegisterDialog extends Component {

    state = {
        open: true
    };

    close = () => {
        this.setState({ open: false});
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => <Dialog open={this.state.open}>
                    <DialogTitle>Register</DialogTitle>
                    <RegisterForm onUserCreated={(userCreatedWithToken) => {
                        context.onUserCreated(userCreatedWithToken);
                        this.close();
                    }}/>
                </Dialog>
                }
            </AppContext.Consumer>
        );
    }
}

export default RegisterDialog;