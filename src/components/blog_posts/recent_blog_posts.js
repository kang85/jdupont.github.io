import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import InfiniteScroll from '../../widgets/infinite_scroll/infinite_scroll';

import BlogHelmet from '../blog_helmet';
import BlurbCard from './blurb_card';
import BlogPostsManager from './blog_posts_manager';
import { filepathToUrlParam } from '../routing/title_to_url_converter';
import { contentRowWidths } from '../../style/dimensions';
import { GridToolbarMargin } from '../../style/grid_styles';

const contentStyles = () => ({});

class RecentBlogPosts extends Component {
  static createBlurb(postFileName, post) {
    return (
      <BlurbCard
        key={postFileName}
        title={post.attributes.title}
        date={post.attributes.date}
        description={post.attributes.description}
        image={`${process.env.PUBLIC_URL}/images/blog_posts/${post.attributes.coverImage}`}
        link={{ pathname: '/blogs', query: { title: filepathToUrlParam(postFileName) } }}
        tags={post.attributes.tags}
      />
    );
  }

  static wrapInGrid(item, uniqueKey) {
    return (
      <Grid item {...contentRowWidths} key={uniqueKey}>
        { item }
      </Grid>
    );
  }

  constructor(props) {
    super(props);

    this.manager = new BlogPostsManager();

    this.state = {
      posts: [...this.manager.posts(0)],
      hasMorePosts: this.manager.hasMorePages(0),
    };

    this.onLoadMoreBlogPosts = this.onLoadMoreBlogPosts.bind(this);
  }

  onLoadMoreBlogPosts(pageNumToLoad) {
    const additionalPosts = this.manager.posts(pageNumToLoad);
    this.setState(prevState => ({
      posts: prevState.posts.concat(additionalPosts),
      hasMorePosts: this.manager.hasMorePages(pageNumToLoad),
    }));
  }

  render() {
    const { posts, hasMorePosts } = this.state;
    const renderedPosts = posts.map(({ post, fileName }) => {
      const blurbCard = RecentBlogPosts.createBlurb(fileName, post);
      return RecentBlogPosts.wrapInGrid(blurbCard, fileName);
    });

    return (
      <Grid container>
        <GridToolbarMargin />
        <BlogHelmet pageTitle="Recent Posts" />
        <Grid item xs={12}>
          <InfiniteScroll
            element={Grid}
            container
            spacing={16}
            justify="center"
            loadMore={this.onLoadMoreBlogPosts}
            loadingIndicatorComponent={RecentBlogPosts.wrapInGrid(<div>Loading...</div>, 'loadercomponent')}
            hasMore={hasMorePosts}
            useWindow
            threshold={100}
          >
            { renderedPosts }
          </InfiniteScroll>
        </Grid>
      </Grid>
    );
  }
}

RecentBlogPosts.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  classes: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default withStyles(contentStyles, { withTheme: true })(RecentBlogPosts);
