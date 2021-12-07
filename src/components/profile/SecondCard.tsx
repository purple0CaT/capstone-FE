import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ImageList, LinearProgress, Tab } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostImgItem from './PostImgItem';

function SecondCard({ userId }: any) {
    const [value, setValue] = React.useState('1');
    const tokens = useSelector((state: any) => state.tokens)
    const [Posts, setPosts] = useState([])
    const [Loading, setLoading] = useState(true)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const fetchUserPosts = async () => {
        setLoading(true)
        try {
            const url = `${process.env.REACT_APP_FETCHURL}/post/userPosts/${userId}`;
            const res = await fetch(url, {
                method: "GET",
                headers: { Authorization: `Bearer ${tokens.accessToken}` },
            });
            if (res.ok) {
                const data = await res.json()
                setPosts(data)
                setLoading(false)
            } else {
                setLoading(false)
                console.log(res);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // 
    useEffect(() => {
        fetchUserPosts()
    }, [])
    return (
        <div className='secondCard'>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="Posts" value="1" />
                        <Tab label="Booking" value="2" />
                        <Tab label="Store" value="3" />
                    </TabList>
                </Box>
                {/* POST TAB */}
                <TabPanel value="1">
                    {Loading && <LinearProgress />
                    }
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {Posts.length > 0 && Posts.map((P: any) =>
                            <PostImgItem P={P} key={P.media} reFetch={fetchUserPosts} />
                        )}
                    </ImageList>
                </TabPanel>
                {/* BOOKING TAB */}
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </div>
    )
}

export default SecondCard
