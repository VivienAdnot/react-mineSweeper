import React, { Component } from 'react';

class Square extends Component {

    state = {
        squareStatus: 'hidden' // hidden, leftClicked, marked
    };

    onLeftClick = () => {
        this.setState((prevState) => {
            if (prevState.squareStatus === 'hidden') {
                console.log(`left click: ${this.props.value}`);
                return { squareStatus: 'leftClicked' };
            }
        });
    }

    onRightClick = () => {
        this.setState((prevState) => {
            if (prevState.squareStatus === 'hidden') {
                console.log(`right click: ${this.props.value}`);
                return { squareStatus: 'marked' };
            }
        });
    }

    renderSwitch = () => {
        switch (this.state.squareStatus) {
            case 'hidden':
                return '?';
            case 'leftClicked':
                return this.props.value;
            case 'marked':
                return 'M';
            default: throw new Error(`unknown state ${this.state.squareStatus}`);
        }
    }

    render() {

        return (
            <button
                onClick={this.onLeftClick}
                onContextMenu={this.onRightClick}
                className="square"
            >
                {this.renderSwitch()}
            </button>
        );

    }
}

export default Square;