import { Dialog, ImageListItem } from '@mui/material'
import React, { useState } from 'react'
import Post from '../../main/post/Post'

function PostImgItem({ P, reFetch }: any) {
    const [open, setopen] = useState(false)
    const handleDialog = () => {
        setopen(!open)
    }
    return (
        <>
            <ImageListItem style={{ cursor: "pointer" }} onClick={handleDialog}>
                <img
                    src={`${P.media}?w=248&fit=crop&auto=format`}
                    srcSet={`${P.media}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={P.media}
                    loading="lazy"
                />
            </ImageListItem>
            <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <Post post={P} reFetch={reFetch} />
            </Dialog>
        </>
    )
}

export default PostImgItem