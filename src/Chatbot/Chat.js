import React, { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client'
import Header from '../components/header/header';

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
        socket.emit('message',{message,room});
        message("");
    }   





    useEffect(() => {
        socket.on("connect", () => {
          setSocketId(socket.id);
          console.log("connected", socket.id);
        });
    
        socket.on("receive-message", (data) => {
          console.log(data);
          setMessages((messages) => [...messages, data]);
        });
    
        socket.on("welcome", (s) => {
          console.log(s);
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
       <div >

        <Header></Header>
         <div style={{width:'50%', textAlign:'center',marginLeft:'0',marginRight:'0', marginTop:'20px',display:'flex',justifyContent:'space-around'}}>
            <div>
            <h1>Chat</h1>

      <h4>Room Id</h4>        
<h5>
    
    {
        socketId
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
id='msg' type="text" placeholder='Enter Room ID here' />            
<button type='submit'>Send</button> 
</form>

            </div>
            <div>
            <h4 style={{marginBottom:'20px'}}>Message</h4>
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
        </div>
       </div>
    );
};

export default Chat;