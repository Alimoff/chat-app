
import './App.css';
import io from 'socket.io-client';
import {useState} from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");


function App() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [showChat,setShowChat] = useState(false);

  const joinRoom =  (data) =>{
    if(username !== "" && room !== ""){
    socket.emit('joinRoom',room )
    setShowChat(true); 
    }
  }

  return(
  <div className='App'> 
  {!showChat ? (
  <div className='join-chat-container'>
  <h3>Join A Chat</h3>
  <input className="input-placeholder"
          type='text' 
          placeholder='Username' 
          onChange={(event) =>{
    setUsername(event.target.value)
  }}/>
  <input className="input-placeholder" 
          type='text' 
          placeholder='Room ID' 
          onChange={(event) =>{
    setRoom(event.target.value);
  }}
  />
  <button  className="join-btn" onClick={joinRoom}>Join Room</button> 
  </div>
  )
:(
  <Chat socket={socket} username = {username} room = {room} />
)}
</div>
    );
    }
    
export default App;
