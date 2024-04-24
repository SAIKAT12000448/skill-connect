import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './join.css'

const Join = () => {
    const[name,setName] = useState('');
    const[room,setRoom] = useState('');
    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <div><input type="text" placeholder='' className="joinInput" onChange={(e)=>setName(e.target.value)} /></div>
                <div><input type="text" placeholder='' className="joinInput mt-20" onChange={(e)=>setRoom(e.target.value)} /></div>

                <Link
                  onClick={(e) => {
                  if (!name || !room) {
                       e.preventDefault();
                         }
                         else{}
                    }}
  to={`/chat?name=${name}&room=${room}`}
>
  <button className="button mt-20" type="submit">
    Sign in
  </button>
</Link>
                
            </div>
            
        </div>
    );
};

export default Join;