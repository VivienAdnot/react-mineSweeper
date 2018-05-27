import React, { Component } from 'react';
import Game from './Game/Game';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    goTo(route) {
        this.props.history.replace(`/${route}`);
    }

    // renderNavbar() {

    //     const styles = {
    //         root: {
    //             flexGrow: 1,
    //         },
    //         flex: {
    //             flex: 1,
    //         },
    //         menuButton: {
    //             marginLeft: -12,
    //             marginRight: 20,
    //         }
    //     };

    //     return (
    //         <div>
    //             <Navbar fluid>

    //                 <Navbar.Header>

    //                     <Navbar.Brand>
    //                         <a href="#">Minesweeper</a>
    //                     </Navbar.Brand>

    //                     <Button onClick={this.goTo.bind(this, 'game')}>Game</Button>

    //                     <Button onClick={this.goTo.bind(this, 'page')}>PageContainer</Button>

    //                 </Navbar.Header>

    //             </Navbar>
    //         </div>
    //     );

    // }

    render() {
        return (
            <div>
                {/* {
                    this.renderNavbar()
                } */}
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
