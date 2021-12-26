import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import CreatePost from "./createPost/CreatePost";
import FeedToolBar from "./FeedToolBar";
import Post from "./post/Post";
import "./style.css";
//
//
function Main() {
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const app = useSelector((state: any) => state.app);
  const [PostFetches, setPostFetches] = useState([]);
  const [Loading, setLoading] = useState(true);
  //
  const fetchPosts = async () => {
    try {
      const url = app.feed
        ? `${process.env.REACT_APP_FETCHURL}/post`
        : `${process.env.REACT_APP_FETCHURL}/post/followed`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPostFetches(data);
        setLoading(false);
      } else {
        console.log(data);
        alert(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //
  useEffect(() => {
    if (user._id === "") {
      history.push("/login");
    } else {
      fetchPosts();
    }
  }, [app.feed]);
  return (
    <>
      {Loading && <LinearProgress />}
      <div className="post-container px-3">
        <FeedToolBar reFetch={fetchPosts} />
        {PostFetches.length > 0 &&
          PostFetches.map((P: any) => (
            <div key={P._id + P.text}>
              <br />
              <Post post={P} reFetch={fetchPosts} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Main;
