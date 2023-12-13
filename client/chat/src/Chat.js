import React, { useEffect } from "react";
import { useState } from "react";

function Chat({socket, username, room}){

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async ()=>{
        if(currentMessage !== ""){
            const messageData = {
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            }

            await socket.emit("sendMessage", messageData)
            setMessageList((list) => [...list, messageData ]);
            setCurrentMessage("");
        }
    }

    useEffect( () =>{
        socket.on("receiveMessage", (data)=>{
            setMessageList((list) => [...list, data ])
        });
    }, [socket])
    
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>

            <div className="chat-body">
                {messageList.map((messageContent) =>{
                    return (
                        <div className="message"
                        id={username === messageContent.author ? "you" : "other"}>
                            <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p>{messageContent.time}</p>
                                <p>{messageContent.author}</p>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="chat-footer">
                <input className = "footer-input" type="text" value={currentMessage} placeholder="Message..." onChange={(event) =>{
                    setCurrentMessage(event.target.value)
                }} onKeyPress={(event)=>{
                    event.key === "Enter" && sendMessage(); 
                }}/>
                <button className="footer-send-button" onClick={sendMessage} >Send</button>
            </div>

        </div>
    )
    }
export default Chat