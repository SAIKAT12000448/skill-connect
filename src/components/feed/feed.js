import React, { useEffect, useState } from 'react';
import './feed.css'
const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/feed')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFeed(data.data);
      })
  }, []);

  const handleLike = (postId) => {
    // Implement logic to like the post with postId
    console.log('Liked post with ID:', postId);
  };

  const handleComment = (postId) => {
    // Implement logic to add comment to the post with postId
    console.log('Commented on post with ID:', postId, 'Comment:', commentText);
    // Reset comment text area after posting comment
    setCommentText("");
  };

  return (
    <div className="feed-container">
      {feed.map(item => (
        <div className="feed-item" key={item._id}>
          <div className="feed-header">
            {/* <img className="avatar" src={item.user.avatar} alt={item.user.name} /> */}
            <div className="user-info">
              {/* <h3 className="username">{item.user.name}</h3>
              <p className="timestamp">{item.timestamp}</p> */}
            </div>
          </div>
          <p className="caption">{item.caption}</p>
          <img style={{width:'100%',height:'300px'}} className="post-image" src={item.image} alt={item.caption} />
          <div style={{display:'flex',justifyContent:'space-around'}} className="interactions">
            <button onClick={() => handleLike(item._id)}>Like</button>
            <textarea
              className="comment-textarea"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={() => handleComment(item._id)}>comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
