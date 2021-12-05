import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Post from "./post/Post";
import "./style.css";
//
//
function Main() {
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [PostFetches, setPostFetches] = useState([]);
  //
  const fetchPosts = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/post`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPostFetches(data);
        console.log(data);
      } else {
        console.log(res);
      }
    } catch (error) {
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
  }, []);
  return (
    <>
      <div className="post-container">
        <div className="d-flex justify-content-center align-items-center post-create px-2">
          Create post
        </div>
        {PostFetches.length > 0 &&
          PostFetches.map((P: any) => <Post post={P} key={P._id} />)}
      </div>
    </>
  );
}

export default Main;
