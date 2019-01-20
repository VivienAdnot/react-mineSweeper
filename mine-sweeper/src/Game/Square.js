import React, { PureComponent } from 'react';
import './Square.css';

class Square extends PureComponent {

    getValue = () => {
        switch (this.props.visibility) {
            case 'hidden':
                return 'none';
            case 'visible':
                return this.props.value;
            case 'marked':
                return 'M';
            default: throw new Error(`unknown state ${this.state.squareStatus}`);
        }
    }

    render() {

        let value = this.getValue();

        let fullClassName = `square square-${this.props.visibility} square-value-${value}`;

        if (this.props.isPositionLost) {
            fullClassName += ' bomb-lost';
        }

        return (
            <button
                className={fullClassName}

                onLeftClick={() => {
                    if (this.props.clickable) this.props.onLeftClick(this.props.position)
                }}

                onContextMenu={(ev) => {
                    ev.preventDefault();
                    if (this.props.clickable) this.props.onRightClick(this.props.position);
                }}

                onDoubleClick={() => {
                    if (this.props.clickable) this.props.onDblClick(this.props.position)
                }}
            >
                {value}
            </button>
        );

    }
}

export default Square;