import React, { Component } from 'react';
import withSession from '../withSession';
import { Mutation } from 'react-apollo';
import { UNLIKE_RECIPE, LIKE_RECIPE, GET_RECIPE } from '../../queries';

class LikeRecipe extends Component {
  state = {
    liked: false,
    username: ''
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { id } = this.props;
      const prevLiked = favorites.findIndex(favorite => favorite.id === id) > -1;
      this.setState({
        liked: prevLiked,
        username
      });
    }
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => this.handleLike(likeRecipe, unlikeRecipe)
    );
  };

  handleLike = (likeRecipe, unlikeRecipe) => {
    if (this.state.liked) {
      likeRecipe.then(async ({ data }) => {
        await this.props.refetch();
      });
    } else {
      unlikeRecipe.then(async ({ data }) => {
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { id } });

    cache.writeQueryToStore({
      query: GET_RECIPE,
      variables: { id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { id } });

    cache.writeQueryToStore({
      query: GET_RECIPE,
      variables: { id },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
      }
    });
  };

  render() {
    const { liked, username } = this.state;
    const { id } = this.props;
    return (
      <Mutation mutation={UNLIKE_RECIPE} variables={{ id, username }} update={this.updateUnlike}>
        {unlikeRecipe => (
          <Mutation mutation={LIKE_RECIPE} variables={{ id, username }} update={this.updateLike}>
            {likeRecipe => {
              return (
                username && (
                  <button onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
                    {liked ? 'Unlike' : 'Like'}
                  </button>
                )
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
