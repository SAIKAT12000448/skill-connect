import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'

// let socket;

const Chat = () => {
    // const [name, setName] = useState('');
    const [message, setMessage] = useState("");
  
    const socket = io('localhost:5000');

    const handleSubmit=(e)=>{
        e.preventDefault();
        socket.emit('message',message);
        setMessage(" ");
    }   





    function connectSocket(){
        socket.on("connection",(socket)=>{
            console.log(socket);
        })

        // return ()=>{
        //     socket.disconnect();
        // }
        
    }
    useEffect(() => {
        connectSocket();

       
    });

    socket.on('receive-message',message=>{
        console.log(message);
    })

    // const handleSend=()=>{
    //     var msg = document.getElementById("msg").value;
    //     if (msg!=="") {
    //         socket.emit("user-message", msg)

    //         document.getElementById("msg").value=""

    //     } else alert("Please enter a message!");
        
    
    // }


    

    return (
        <div>
            <h1>Chat</h1>
            <form onSubmit={handleSubmit} action="">
            <input
            onChange={(e)=>setMessage(e.target.value)}
            id='msg' type="text" placeholder='Enter Message' />            
            <button type='submit'>Send</button> 
            </form>
            {/* <input id='msg' type="text" placeholder='Enter Message' />            
            <button onClick={handleSend}>Send</button> */}
        </div>
    );
};

export default Chat;