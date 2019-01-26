import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { config } from './config';
import { withStyles } from '@material-ui/core/styles';
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

    interval;

    // use arrow function to bind this
    fetchBestScores = () => {

        getBestScores()
        .then(({ data: bestScores }) => {

            this.setState({
                bestScores
            });

        });

    }

    startInterval() {

        this.interval = window.setInterval(this.fetchBestScores, 30000);

    }

    componentDidMount() {

        this.fetchBestScores();
        this.startInterval();

    }

    componentWillUnmount() {

        window.clearInterval(this.interval);

    }

    render() {

        const { classes } = this.props;

        return(
            <div className={classes.bestScoresRoot}>
                <h1 className={classes.title}>Fastest finishes</h1>
                <Divider />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>Ranking</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Time</TableCell>
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

export default withStyles(styles)(BestScores);