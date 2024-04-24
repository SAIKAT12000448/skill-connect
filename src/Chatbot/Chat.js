import React, { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client'

// let socket;

const Chat = () => {
    // const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const [ socketId, setSocketId] = useState("");
    const socket = useMemo(()=>io('localhost:4000'),[]);
  

    const handleSubmit=(e)=>{
        e.preventDefault();
        socket.emit('message',{messages,room});
        socket.emit('messages',message);
        message("");
    }   





    useEffect(() => {
        socket.on("connect", () => {
          setSocketId(socket.id);
          console.log("connected", socket.id);
        });
    
        socket.on("personal-message", (data) => {
          console.log(data);
          setMessages((messages) => [...messages, data]);
        });
    
        socket.on("message", (s) => {
          console.log(s);
        //   setMessage(s);
        });
    
        return () => {
          socket.disconnect();
        };
      }, []);

    

    // const handleSend=()=>{
    //     var msg = document.getElementById("msg").value;
    //     if (msg!=="") {
    //         socket.emit("user-message", msg)

    //         document.getElementById("msg").value=""

    //     } else alert("Please enter a message!");
        
    
    // }


    

    return (
        <div style={{width:'50%', textAlign:'center',marginLeft:'0',marginRight:'0'}}>
            <h1>Chat</h1>


            <h5>
                {
                    // socketId
                    
                }
            </h5>
            <form onSubmit={handleSubmit} action="">
            <input
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            id='msg' type="text" placeholder='Enter Message' />    

            <input
            onChange={(e)=>setRoom(e.target.value)}
            value={room}
            id='msg' type="text" placeholder='Enter Room' />            
            <button type='submit'>Send</button> 
            </form>
           <p>
            {
                 messages.map((m, i) => (
                    <p key={i} variant="h6" component="div" gutterBottom>
                      {m}
                    </p>
                  ))
            }
           </p>
        </div>
    );
};

export default Chat;