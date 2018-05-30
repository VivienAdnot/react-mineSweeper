import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';

class RegisterDialog extends Component {
    handleClose = () => {
        this.props.onClose();
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.handleClose}>
                <DialogTitle>Register</DialogTitle>

                <RegisterForm score={this.props.score}/>
            </Dialog>
        );
    }
}

RegisterDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    score: PropTypes.number
};

export default RegisterDialog;