import React, { useEffect, useState } from 'react';
import Header from '../../header/header';
import './Recomendation.css'; // Import CSS file for styling
import { NavLink } from 'react-router-dom';

const Recomendation = () => {
    const [users, setUsers] = useState([]);
    const useSkill = localStorage.getItem("skill");

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                if (Array.isArray(data.data)) {
                    console.log('skills',data.data.map(skill=>skill.skills[0]));
                    setUsers(data.data);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            })
            .catch(error => {
                // Handle any errors
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div>
            <Header />
            {/* Render the fetched users data */}
            <div style={{margin:'20px'}} className="user-container">
                {users.map(user => (  user.skills[0]===useSkill &&
                    <div key={user._id} className="user-card">
                        {/* Render user details */}
                        <h4>Name: {user.name}</h4>
                        {/* <p>Email: {user.email}</p>/ */}
                        <p>I am expertise in {user.skills[0]}</p>


                    
                        <button>
                        <NavLink className="navLink" to={`/chat`}>
                                       Message
        </NavLink>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recomendation;
