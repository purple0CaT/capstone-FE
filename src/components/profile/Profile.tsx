import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MainCard from "./MainCard";
import SecondCard from "./SecondCard";
import "./style.css";

function Profile() {
  const params: any = useParams();
  // const matches = useMediaQuery("(min-width:600px)");
  // //
  // const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(true);
  const [FetchedUser, setFetchedUser]: any = useState();
  const [FetchedCreator, setFetchedCreator] = useState();
  //
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user/single/${params.id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFetchedUser(data);
        if (data.user.creator) {
          fetchCreator(data.user.creator);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.log(res);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // /creator/single
  const fetchCreator = async (creatorId: string) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/creator/single/${creatorId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        console.log(data);
        setFetchedCreator(data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(res);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //
  useEffect(() => {
    fetchProfile();
  }, [params.id]);
  //
  return (
    <>
      {Loading && <LinearProgress color="success" />}
      <div className="d-flex flex-column">
        {!Loading && FetchedUser! && (
          <>
            <MainCard
              FetchedUser={FetchedUser}
              reFetch={fetchProfile}
              FetchedCreator={FetchedCreator}
            />
            <br />
            <SecondCard
              userId={params.id}
              FetchedUser={FetchedUser}
              FetchedCreator={FetchedCreator}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
