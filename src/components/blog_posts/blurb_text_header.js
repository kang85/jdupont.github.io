import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { emphasize } from 'material-ui/styles/colorManipulator';
import { CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import QueryLink from '../routing/query_link';
import JdAvatar from '../jd_avatar';

const textHeaderStyles = theme => ({
  text: {
    color: theme.palette.background.default,
  },
  textHeader: {
    background: emphasize(theme.palette.primary[300], 0.26),
    flexGrow: 1,
  },
  actionButton: {
    alignSelf: 'center',
    marginTop: 0,
    marginRight: 0,
  },
});

const BlurbTextHeader = (props) => {
  const { classes } = props;
  return (
    <CardHeader
      classes={{
        action: classes.actionButton,
      }}
      className={classes.textHeader}
      title={(
        <Typography type="headline" component="h2" className={classes.text}>
          {props.title}
        </Typography>)}
      subheader={(
        <Typography className={classes.text}>
          {props.date}
        </Typography>
      )}
      avatar={(
        <JdAvatar />
      )}
      action={(
        <Button dense raised color="accent" component={QueryLink} to={props.link}>READ</Button>
      )}
    />
  );
};

BlurbTextHeader.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  classes: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.shape({
    query: PropTypes.object,
  }).isRequired,
};

export default withStyles(textHeaderStyles, { withTheme: true })(BlurbTextHeader);
