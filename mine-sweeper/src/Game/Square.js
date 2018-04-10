import React, { Component } from 'react';

class Square extends Component {

    renderSwitch = () => {
        switch (this.props.visibility) {
            case 'hidden':
                return '?';
            case 'visible':
                return this.props.value;
            case 'marked':
                return 'M';
            default: throw new Error(`unknown state ${this.state.squareStatus}`);
        }
    }

    render() {

        return (
            <button
                onClick={() => this.props.onLeftClick(this.props.position)}
                onContextMenu={() => this.props.onRightClick(this.props.position)}
                onDoubleClick={() => this.props.onDblClick(this.props.position)}
                className="square"
            >
                {this.renderSwitch()}
            </button>
        );

    }
}

export default Square;