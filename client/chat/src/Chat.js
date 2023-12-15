import React, { useEffect } from "react";
import { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import ScrollToBottom from 'react-scroll-to-bottom';

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
            setMessageList((list) => [...list, data]);

        });
    }, [socket])


    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>

            <div className="chat-body">

                <ScrollToBottom className="message-container">
                {messageList.map((messageContent) =>{
                    console.log(messageContent.message)
                    return (
                        <div className="message"
                        id={username === messageContent.author ? "you" : "other"}>
                            <div className="msg">
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time" >{messageContent.time}</p>
                                <p id="user">{messageContent.author}</p>
                            </div>
                            </div>
                        </div>
                    );
                })}

                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input className = "footer-input" type="text" value={currentMessage} placeholder="Message..." onChange={(event) =>{
                    setCurrentMessage(event.target.value)
                }} onKeyPress={(event)=>{
                    event.key === "Enter" && sendMessage(); 
                }}/>
                <button className="footer-button" onClick={sendMessage} ><RiSendPlane2Fill/></button>
            </div>

        </div>
    )
    }
export default Chat