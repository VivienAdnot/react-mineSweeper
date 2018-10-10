import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class BestScores extends Component {

    state = {
        bestScores: []
    };

    componentDidMount() {

        axios.get('http://localhost:8089/api/best-scores')
        .then(({ data: bestScores }) => {

            this.setState(() => ({
                bestScores
            }));

        });

    }

    render() {

        return(
            <div>
                <h1>Best Scores</h1>

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell numeric>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.state.bestScores.map((bestScore) => {
                                return (
                                    <TableRow key={bestScore.id}>
                                        <TableCell>{bestScore.user.fullName}</TableCell>
                                        <TableCell numeric>{bestScore.score}</TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );

    }
}

export default BestScores;