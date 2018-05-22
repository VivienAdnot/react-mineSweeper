import React, { Component } from 'react';
import Game from './Game/Game';
import { Navbar, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    goTo(route) {
        this.props.history.replace(`/${route}`);
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    renderNavbar() {

        const { isAuthenticated } = this.props.auth;

        return (
            <div>
                <Navbar fluid>

                    <Navbar.Header>

                        <Navbar.Brand>
                            <a href="#">Minesweeper</a>
                        </Navbar.Brand>

                        <Button onClick={this.goTo.bind(this, 'game')}>Game</Button>

                        {
                            !isAuthenticated() && (
                                <Button onClick={this.login.bind(this)}>Log in</Button>
                            )
                        }

                        {
                            isAuthenticated() && (
                                <Button onClick={this.goTo.bind(this, 'profile')}>Profile</Button>
                            )
                        }
                        {
                            isAuthenticated() && (
                                <Button onClick={this.logout.bind(this)}>Log out</Button>
                            )
                        }

                    </Navbar.Header>

                </Navbar>
            </div>
        );

    }

    render() {
        return (
            <div>
                {
                    this.renderNavbar()
                }
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
