import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';

class RegisterDialog extends Component {

    state = {
        open: this.props.open
    };

    onUserCreated = (userCreatedWithToken) => {
        this.setState({ open: false});
        this.props.onUserCreated(userCreatedWithToken);
    }

    render() {
        return (
            <Dialog open={this.state.open}>
                <DialogTitle>Register</DialogTitle>
                <RegisterForm onUserCreated={this.onUserCreated}/>
            </Dialog>
        );
    }
}

RegisterDialog.propTypes = {
    open: PropTypes.bool,
    onUserCreated: PropTypes.func.isRequired
};

export default RegisterDialog;