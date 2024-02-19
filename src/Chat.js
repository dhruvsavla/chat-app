import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { Avatar, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import axios from './axios';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { onSnapshot, collection, doc, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { useStateValue } from './StateProvider';

function Chat({ msg }) {
    const { roomId } = useParams();
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [showPicker, setShowPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    
    useEffect(() => {
        if (roomId) {
            const roomRef = doc(db, 'rooms', roomId);

            const unsubscribe = onSnapshot(roomRef, (snapshot) => {
                if (snapshot.exists()) {
                    setRoomName(snapshot.data().name);

                    // Fetch messages using query
                    const messagesRef = collection(roomRef, 'messages');
                    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

                    onSnapshot(messagesQuery, (snapshot) => {
                        setMessages(snapshot.docs.map((doc) => doc.data()));
                    });
                }
            });

            return () => {
                // Unsubscribe from the snapshot listener when the component unmounts
                unsubscribe();
            };
        }
    }, [roomId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return; // Don't send empty messages
        
        const roomRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(roomRef, 'messages');

        // Adding a new message to the 'messages' collection
        const newMessage = {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp(),
        };

        try {
            await addDoc(messagesRef, newMessage);
            console.log('Message added successfully!');
        } catch (error) {
            console.error('Error adding message: ', error);
        }

        setInput(""); // Clear input field after sending message
    }

    return (
        <div className='Chat'>
            <div className='chat_header'>
                <Avatar />
                <div className='chat_headerInfo'>
                    <h3>{ roomName }</h3>
                    <p>Last seen {" "}
                        {messages.length > 0 && 
                            new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>
                {messages.map((message) => (
                    <p key={message.timestamp} className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                        <span className='chat_name'>
                            {message.name}
                        </span>
                        {message.message}
                        <span className='chat_timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className='chat_footer'>
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message ...' type='text' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
