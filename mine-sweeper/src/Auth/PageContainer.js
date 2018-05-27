import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RegisterDialog from './RegisterDialog';
import RegisterForm from './RegisterForm';

class PageContainer extends Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = value => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>

                <Button onClick={this.handleClickOpen}>Open register dialog</Button>

                <RegisterDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default PageContainer;