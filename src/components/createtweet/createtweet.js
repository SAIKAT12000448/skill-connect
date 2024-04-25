import React, { useState } from 'react';
import axios from 'axios';

const CreateTweet = () => {
    const person = localStorage.getItem('email');

    const [formData, setFormData] = useState({
        person:person,
        caption: '',
        image: null,
    });
    const imgbbKey = "1a03298dd6a97dfcf880c2a6daaaea04";

    const [imagePreview, setImagePreview] = useState(null);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    
    const handlePostTweet = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('caption', formData.caption);

            const image = formData.image;
            const formDataImage = new FormData();
            formDataImage.append('image', image);
            const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`
            fetch(url, {
                method: 'POST',
                body: formDataImage
            })
            .then(res=>res.json())
            .then(imgData=>{
              const feed = {
                name:person,
                caption: formData.caption, 
                image:imgData.data.url
              }
         if(imgData.success){
            fetch('http://localhost:5000/tweets', {
              method:'POST',
              headers:{
                "content-type":"application/json"
              },
              body:JSON.stringify(feed)
            })
            .then(res=>res.json())
            .then(data=>{
              setFormData({
                caption: '',
                image: null,
              });
              window.location.reload();
            });
          }
        })
      } catch (error) {
          console.error('Error posting tweet:', error);
      }
    };

    return (
        <div className="create-tweet-container">
            <form onSubmit={handlePostTweet}>
                <textarea
                    placeholder="What’s happening?"
                    name="caption"
                    value={formData.caption}
                    onChange={handleChange}
                    maxLength="250"
                    style={{width:'500px',height:'120px'}}
                    className="tweet-textarea"
                />
                <div className="image-upload-container">
                    <label htmlFor="image-upload" className="image-upload-label">
                        <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} />
                        <span>Upload Image</span>
                    </label>
                    {imagePreview && <img width='80%' height="330px" src={imagePreview} alt=" Preview" className="image-preview" />}

                </div>

                <button type="submit" className="post-button">Post</button>
            </form>
        </div>
    );
};

export default CreateTweet;
