import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
// 
function Chats() {
    const [SearchQuery, setSearchQuery] = useState('')
    const chat = useSelector((state: any) => state.chat.allChat)
    // 
    const fetchUsers = async () => {
        try {

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className="searchChatUsers">
                <SearchIcon className="mx-1" style={{ fontSize: "2rem" }} />{" "}
                <Form.Control
                    value={SearchQuery}
                    type="text"
                    placeholder="...search"
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (SearchQuery.length > 2) {
                            fetchUsers();
                        }
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            fetchUsers();
                        }
                    }}
                /></div>
            <h4 className='mx-2 text-muted'>Chat</h4>
            <div className='d-flex flex-column w-100'>
                {chat.length > 0 &&
                    chat.map((C: any) => <div><Avatar /> One Chat </div>
                    )}
            </div>
        </div>
    )
}

export default Chats
