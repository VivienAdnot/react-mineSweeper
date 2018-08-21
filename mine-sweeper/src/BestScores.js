import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const BestScores = (props) => (
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
                    <TableRow key={1}>
                        <TableCell>Vivien</TableCell>
                        <TableCell numeric>250</TableCell>
                    </TableRow>
                    <TableRow key={2}>
                        <TableCell>Michael</TableCell>
                        <TableCell numeric>350</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    </div>
);

export default BestScores;