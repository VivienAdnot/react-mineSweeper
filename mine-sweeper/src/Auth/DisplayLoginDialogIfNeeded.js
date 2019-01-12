import React, { Component } from 'react';
import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';
import { AppContext } from '../AppProvider';

const DisplayLoginDialogIfNeeded = (props) => (
    <div>
        <AppContext.Consumer>
            {(context) => context.showAuthenticatePopup
                ? <LoginDialog></LoginDialog>
                : null
            }
        </AppContext.Consumer>
    </div>
);

export default DisplayLoginDialogIfNeeded;