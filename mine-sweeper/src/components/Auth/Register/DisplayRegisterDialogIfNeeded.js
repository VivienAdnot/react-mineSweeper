import React from 'react';
import RegisterDialog from './RegisterDialog';
import { AppContext } from '../../../AppProvider';

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