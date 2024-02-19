import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from './StateProvider';
import { onSnapshot, collection } from "firebase/firestore";

function Sidebar() {
    const [{ user }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]); 

    useEffect(() => {
    // Code inside this block runs after the component mounts
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
        // Code inside this callback runs when there are changes in the 'rooms' collection
        setRooms(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        );
    });
        return () => {
            unsubscribe();
        }
}, []);

  return (
      <div className="Sidebar">
          <div className='sidebar_header'>
              <Avatar src={ user?.photoURL} />
              <div className='sidebar_headerRight'>
                  <IconButton>
                        <DonutLargeIcon/>
                  </IconButton>
                  <IconButton>
                        <ChatIcon/>
                  </IconButton>
                  <IconButton>
                        <MoreVertIcon/>
                  </IconButton>
              </div>
          </div>

          <div className='sidebar_search'>
              <div className='sidebar_searchContainer'>
                  <SearchOutlined />
                  <input placeholder='search or start new chat' type = "text"/>
              </div>
          </div>

          <div className='sidebar_chats'>
              <SidebarChat addNewChat/>
              {rooms.map(room => (
                  <SidebarChat key={room.id} id={room.id} name = {room.data.name} />
              ))}
          </div>
    </div>
  )
}

export default Sidebar;