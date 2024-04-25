import React, { useEffect, useState } from 'react';
import './feed.css';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/feed')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFeed(data.data);
      });
  }, []);

  const [likedItems, setLikedItems] = useState({});

  const handleLike = (itemId) => {
    setLikedItems(prevLikedItems => ({
      ...prevLikedItems,
      [itemId]: !prevLikedItems[itemId]
    }));
  };

  const handleComment = (itemId) => {
    // Here you would add logic to post the comment and then update the state
    const newComment = commentText; // Example comment, replace it with actual comment

    setComments(prevComments => ({
      ...prevComments,
      [itemId]: [...(prevComments[itemId] || []), newComment]
    }));

    // Clear the comment input after adding the comment
    setCommentText("");
  };

  return (
    <div style={{marginTop:'30px'}} className="feed-container">
      {feed.reverse().map(item => (
        <div className="feed-item" key={item._id}>
          <div className="feed-header">
            {/* <img className="avatar" src={item.user.avatar} alt={item.user.name} /> */}
            <div className="user-info">
              {/* <h3 className="username">{item.user.name}</h3>
              <p className="timestamp">{item.timestamp}</p> */}
            </div>
          </div>
          {
            item.name && 
          <h5 style={{marginBottom:'30px'}}>{item.name} posted this</h5>

          }
          <p className="caption">{item.caption}</p>
          <img style={{width:'100%',height:'300px'}} className="post-image" src={item.image} alt={item.caption} />
          <div style={{display:'flex',justifyContent:'space-around'}} className="interactions">
            <button onClick={() => handleLike(item._id)} className={`like-button ${likedItems[item._id] ? 'liked' : ''}`}>
              {likedItems[item._id] ? '❤️' : 'Like'}
            </button>
            <textarea
              className="comment-textarea"
              placeholder="Write a comment..."
              value={commentText}
              // style={{ width: '50px' }} 
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={() => handleComment(item._id)}>Comment</button>
          </div>
          <div style={{textAlign:'center'}}>
          <h5>Comments</h5>
          <div className="comments">
            {comments[item._id] && comments[item._id].map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
