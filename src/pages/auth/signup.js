import React, { useState } from 'react';
import './signup.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institute:'',
    password: '',
    skills: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (e) => {
    const { options } = e.target;
    const selectedSkills = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSkills.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      skills: selectedSkills,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(formData);
        console.log('Form data successfully submitted:', data);
        localStorage.setItem('email',formData.email);
        localStorage.setItem('skill',formData.skills[0])
        navigate('/');
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
      });
  };


  return (
    <div className="signup-container">
                 <h1 style={{color:'#2f80ed'}}>Skill connect</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Institute name:</label>
          <input type="text" id="name" name="institute" value={formData.institute} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <select multiple id="skills" name="skills" value={formData.skills} onChange={handleSkillChange}>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        {/* <div className="form-group">
          <label htmlFor="image">Profile Picture:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
        </div> */}
       
        <button type="submit">Sign Up</button>
      </form>
      <p>
            Already Registered? <Link to="/login">Login</Link>
          </p>
    </div>
  );
};

export default SignupPage;
