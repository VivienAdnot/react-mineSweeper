import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';

class RegisterDialog extends Component {

    state = {
        open: this.props.open
    };

    closeDialog = () => {
        this.setState({ open: false})
    };

    onUserCreated = (userCreatedWithToken) => {
        this.props.onUserCreated(userCreatedWithToken);
        this.setState({ open: false});
    }

    render() {
        return (
            <Dialog open={this.state.open} onClose={this.props.onClose}>
                <DialogTitle>Register</DialogTitle>

                <RegisterForm onUserCreated={this.onUserCreated}/>
            </Dialog>
        );
    }
}

RegisterDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onUserCreated: PropTypes.func.required
};

export default RegisterDialog;