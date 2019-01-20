import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { config } from './config';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import { getBestScores } from './services/scores';

const styles = theme => ({
    bestScoresRoot: {
      width: config.drawerWidth
    },
    title: {
        textAlign: 'center'
    }
});

class BestScores extends Component {

    state = {
        bestScores: []
    };

    componentDidMount() {

        getBestScores()
        .then(({ data: bestScores }) => {

            this.setState(() => ({
                bestScores
            }));

        });

    }

    render() {

        const { classes } = this.props;

        return(
            <div className={classes.bestScoresRoot}>
                <h1 className={classes.title}>Best Scores</h1>
                <Divider />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>Ranking</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {this.state.bestScores.map((bestScore, index) => {
                            return (
                                <TableRow key={bestScore.id}>
                                    <TableCell>#{index + 1}</TableCell>
                                    <TableCell>{bestScore.user.fullName}</TableCell>
                                    <TableCell numeric>{bestScore.score}</TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </div>
        );

    }
}

BestScores.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BestScores);