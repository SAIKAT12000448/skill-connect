import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { render } from "@testing-library/react";
import Post from "../post/post";
import Spinner from "../spinner/spinner";

class Feed extends React.Component {
  state = {
    tweets: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    let url = "https://tweeter-8qqa.onrender.com/feed";
    axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: this.props.token,
      },
    })
      .then((res) =>
        this.setState({ tweets: res.data.slice(0, 30), loading: false })
      )
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  render() {
    return (
      <section>
        {this.state.error && (
          <p style={{ display: "flex", justifyContent: "center" }}>
            Sorry, an error occurred. Please try again.
          </p>
        )}
        {this.state.tweets.map((post, index) => (
          <Post
            user={post.user}
            caption={post.caption}
            image={post.post_urls[0]}
            comments={post.comments}
            retweets={post.retweets}
            datetime={post.createdAt}
            post_id={post._id}
            liked={post.liked}
            likes={post.likes}
            retweeted={post.retweeted}
            saved={post.saved}
            saves={post.bookmarks}
            key={index}
          />
        ))}
        {this.state.loading && <Spinner />}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imageURL: state.imageURL,
    username: state.username,
    token: state.token,
  };
};

export default connect(mapStateToProps, null)(Feed);
