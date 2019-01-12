import React, { Component } from 'react';
import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';
import { AppContext } from '../AppProvider';

const DisplayRegisterDialogIfNeeded = (props) => (
    <div>
        <AppContext.Consumer>
            {(context) => context.showRegisterPopup
                ? <RegisterDialog></RegisterDialog>
                : null
            }
        </AppContext.Consumer>
    </div>
);

export default DisplayRegisterDialogIfNeeded;