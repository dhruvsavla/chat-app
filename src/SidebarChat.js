import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material'
import db from "./firebase"
import { doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import {Link} from "react-router-dom"
import { useStateValue } from './StateProvider';

function SidebarChat({ id, name, addNewChat }) {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState("");

  const createChat = async () => {
    const roomName = prompt("Please enter the name of the chat");
    if (roomName) {
      try {
        // Log the roomName before adding the document
        console.log('Room Name: ', roomName);
  
        // Add a new document with a generated id to the "rooms" collection
        const docRef = await addDoc(collection(db, 'rooms'), {
          name: roomName,
        });
  
        console.log('Document written with ID : ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  }
  

  useEffect(() => {
    if (id) {
        const roomMessagesRef = collection(doc(db, 'rooms', id), 'messages');
        const messagesQuery = query(roomMessagesRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
        });

        return () => {
            // Unsubscribe from the snapshot listener when the component unmounts
            unsubscribe();
        };
    }
}, [id]);

  return !addNewChat ? (
    <Link to = {`/rooms/${id}`}>
      <div className='SidebarChat'>
          <Avatar src = "https://avatars.dicebear.com/api/human/123.svg"/>
          <div className='sidebarChat-info'>
              <h2>{name}</h2>
              <p>{messages[0]?.message}</p>
          </div>
      </div>
      </Link>
  ) : (
      <div onClick={createChat} className='SidebarChat'>
        <h2>Add new Chat</h2>
      </div>
  )
}

export default SidebarChat