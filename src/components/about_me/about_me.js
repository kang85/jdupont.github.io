import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { GitHubButton, StackOverflowButton, LinkedInButton } from './social_media_button';
import BlogHelmet from '../blog_helmet';
import MarkdownRenderer from '../../widgets/markdown/markdown_renderer';
import { fullRowWidth, contentRowWidths } from '../../style/dimensions';
import { GridToolbarMargin } from '../../style/grid_styles';
import { MY_NAME } from '../../docs/blog_constants.js';
// Disabling eslint for these imports because they don't like webpack loader syntax
// But, that's needed in create-react-app without ejecting because there's no
// access to the webpack configuration files
/* eslint-disable */
import aboutMe from '!json-loader!front-matter-loader!../../docs/about_me.md';
import aboutBlog from '!json-loader!front-matter-loader!../../docs/about_blog.md';
/* eslint-enable */

const contentStyles = theme => ({
  aboutMeBox: {
    padding: theme.spacing.unit * 2,
  },
  centeredGrid: {
    justifyContent: 'center',
  },
  circleContainer: {
    width: '100%',
    paddingBottom: '100%',
    backgroundImage: `url("${process.env.PUBLIC_URL}/images/me.jpg")`,
    backgroundSize: 'cover',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  headerText: {
    color: theme.typography.title.color,
  },
  paddedForTitlebar: {
    paddingTop: theme.spacing.unit * 2,
  },
});

const AboutMe = (props) => {
  const { classes } = props;

  return (
    <Grid container >
      <GridToolbarMargin />
      <BlogHelmet pageTitle="About Me" />
      <Grid item {...fullRowWidth} className={classes.paddedForTitlebar}>
        <Grid container justify="center" spacing={16}>
          <Grid item {...contentRowWidths} component={Paper}>
            <Grid container className={classes.aboutMeBox} spacing={16}>
              <Grid item xs={12} sm={3} md={3}>
                <Paper elevation={5} className={classes.circleContainer} />
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Grid container>
                  <Grid item {...fullRowWidth}>
                    <Typography variant="display3" className={classes.headerText}>{MY_NAME}</Typography>
                  </Grid>
                  <Grid item {...fullRowWidth}>
                    <MarkdownRenderer markdown={aboutMe.body} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid container className={classes.aboutMeBox}>
              <Grid item {...fullRowWidth}>
                <Grid container>
                  <Grid item {...fullRowWidth}>
                    <Typography variant="display1">About this blog</Typography>
                  </Grid>
                  <Grid item {...fullRowWidth}>
                    <MarkdownRenderer markdown={aboutBlog.body} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container wrap="wrap" className={classes.aboutMeBox} justify="center">
              <Grid item {...fullRowWidth} className={classes.buttonRow}>
                <GitHubButton />
                <StackOverflowButton />
                <LinkedInButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

AboutMe.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  classes: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default withStyles(contentStyles, { withTheme: true })(AboutMe);
