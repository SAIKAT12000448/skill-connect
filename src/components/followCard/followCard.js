import React, { useEffect, useState } from 'react';
import './followCard.css'; // Import CSS file for styling

const FollowCard = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setFollowers(data.data);
      });
  }, []);

  return (
    <div className="follow-card-container">
      <h5 className="follow-card-title">Who to follow</h5>
      <div className="follow-card-list">
        {followers.map(follower => (
          <div style={{display:'flex',alignItems:'center'}} key={follower._id} className="follow-card-item">
            <p className="follow-card-email">{follower.email}</p>
            <button style={{marginLeft:'20px'}}>follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowCard;
