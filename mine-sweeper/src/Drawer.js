import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import BestScores from './BestScores';
import { config } from './config';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    drawer: {
      width: config.drawerWidth,
      flexShrink: 0
    },
    toolbar: theme.mixins.toolbar
});

function ClippedDrawer(props) {

  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      anchor={"left"}
    >
      <div className={classes.toolbar} />
      <Divider />
      <BestScores/>
    </Drawer>
  );

}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ClippedDrawer);