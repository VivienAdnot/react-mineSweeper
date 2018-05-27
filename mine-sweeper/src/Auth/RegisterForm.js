import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit
    }
});

class RegisterForm extends Component {

    state = {
        fullName: '',
        email: '',
        password: '',
        confirmationPassword: ''
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.id;

        const newVal = {
            [name]: value
        };

        this.setState(newVal);
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log('submitted', this.state);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form className={classes.container} onSubmit={this.handleSubmit}>
                    <TextField
                        className={classes.textField}
                        id="fullName"
                        label="Full Name"
                        margin="normal"
                        fullWidth
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        className={classes.textField}
                        id="email"
                        label="Email"
                        type="email"
                        margin="normal"
                        fullWidth
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        className={classes.textField}
                        id="password"
                        label="Password"
                        type="password"
                        margin="normal"
                        fullWidth
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        className={classes.textField}
                        id="confirmationPassword"
                        label="Confirmation Password"
                        type="password"
                        margin="normal"
                        fullWidth
                        onChange={this.handleInputChange}
                    />
                    <Button
                        className={classes.button}
                        variant="raised"
                        color="primary"
                        label="Submit"
                        type="submit"
                    >
                        Create account
                    </Button>
                </form>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterForm);