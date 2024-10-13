import React, { useEffect, useState} from 'react'
import { user } from "../Jion/Jion";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../Images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../Images/closeIcon.png";

let socket;
const ENDPOINT = "https://cchat-gamma.vercel.app/";

const Chat=()=>{
    const [id,setid]=useState("");
    const [messages,setMessages]=useState([]);
    const send=()=>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id}); 
        document.getElementById('chatInput').value = "";
    }
     console.log(messages);
    
    useEffect(()=>{
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect',()=>{
            
            alert("connected");
            setid(socket.id);
            

        })
        console.log(socket);
        socket.emit('joined', {user})

        socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
             console.log(data.user,data.message);
            // setMessages((prevMessages) => [...prevMessages, data]);
        })
         

        socket.on('userJoined',(data)=>{
            setMessages([...messages,data]);
            // setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user,data.message);
        })

        socket.on('leave',(data)=>{
             setMessages([...messages,data]);
            
            console.log(data.user,data.message);
        })


        return()=>{
           
           socket.off();
        }

    },[]);
 
    useEffect(()=>{
        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message,data.id);    
    })
    return()=>{
          socket.off();  
    }
   

},[messages])

    return(
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>Real Chat Made by Khushnoor </h2>
                    <a href="/" ><img src={closeIcon} alt="close" /></a>
                </div>
                <ReactScrollToBottom className='chatBox'>
                   {messages.map((item,i)=> <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right' : 'left'}/>)}
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input onKeyDown={(event)=>event.key ==='Enter'?send():null} type='text' id='chatInput' placeholder='Message....'></input>
                    <button onClick={send} className='sendBtn'><img src={sendLogo} alt="Send" /></button>
                </div>
                
            </div>
        </div>
    )
}
export default Chat;

// let socket;

// const ENDPOINT = "https://localhost4500/";

// const Chat = () => {
//     const [id, setid] = useState("");
//     const [messages, setMessages] = useState([])

//     const send = () => {
//         const message = document.getElementById('chatInput').value;
//         socket.emit('message', { message, id });
//         document.getElementById('chatInput').value = "";
//     }

//     console.log(messages);
//     useEffect(() => {
//         socket = socketIo(ENDPOINT, { transports: ['websocket'] });

//         socket.on('connect', () => {
//             alert('Connected');
//             setid(socket.id);

//         })
//         console.log(socket);
//         socket.emit('joined', { user })

//         socket.on('welcome', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message);
//         })

//         socket.on('userJoined', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message);
//         })

//         socket.on('leave', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message)
//         })

//         return () => {
//             socket.off();
//         }
//     },[messages] )

//     useEffect(() => {
//         socket.on('sendMessage', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message, data.id);
//         })
//         return () => {
//             socket.off();
//         }
//     }, [messages])

//     return (
//         <div className="chatPage">
//             <div className="chatContainer">
//                 <div className="header">
//                     <h2>C CHAT</h2>
//                     <a href="/"> <img src={closeIcon} alt="Close" /></a>
//                 </div>
//                 <ReactScrollToBottom className="chatBox">
//                     {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
//                 </ReactScrollToBottom>
//                 <div className="inputBox">
//                     <input onPressKey={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
//                     <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Chat;
