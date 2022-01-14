import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  handleUserLogout
} from "../../redux/actions/action";
import { ReduxStore } from "../../types/reduxStore";
import { SinglePostType } from "./feedInterface";
import FeedToolBar from "./FeedToolBar";
import Post from "./post/Post";
import "./style.css";
//
//
function Main() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, tokens, app } = useSelector((state: ReduxStore) => state);
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
        // console.log(data.message);
        // alert(data.message);
        if (data.message === "Relogin") {
          dispatch(handleUserLogout());
          history.push("/login");
        }
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
          PostFetches.map((P: SinglePostType) => (
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
