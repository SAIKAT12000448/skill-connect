import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (res) => {
  console.log(res)
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: res.token,
    userId: res._id,
    imageURL: res.profile_image,
    username: res.username,
    bio: res.bio,
    email: res.email,
  };
};

export const saveSuccess = (res) => {
    console.log(res)
  return {
    type: actionTypes.SAVE_SUCCESS,
    imageURL: res.profile_image,
    username: res.username,
    bio: res.bio,
    email: res.email,
    message: res.message
  };
};

export const saveDetails = (details) => {
  let url = "https://tweeter-test-yin.herokuapp.com/profile";
  return (dispatch, getState) => {
    axios
      .post(url, details, {
        headers: {
          Authorization: getState().token,
        },
      })
      .then((response) => {
        dispatch(saveSuccess(response.data));
      })
      .catch((error) => {
        dispatch(authFail(error.message));
      });
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };
    let url = "https://tweeter-test-yin.herokuapp.com/register";
    if (!method) {
      url = "https://tweeter-test-yin.herokuapp.com/login";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        dispatch(authFail(error.message));
      });
  };
};


export const postTweet = (tweet) => {
  return (dispatch, getState) => {
    let url = "https://tweeter-test-yin.herokuapp.com/posts/create";
    axios({
      method: "post",
      url: url,
      data: tweet,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": getState().token
      }
    })
    .then(
      dispatch({type: actionTypes.TWEET_SUCCESS})
    )
    .catch(
      dispatch({type: actionTypes.TWEET_FAIL})
    )
  }
}
