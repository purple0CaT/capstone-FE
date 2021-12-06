import { Avatar, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./style.css";

function Profile() {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(true)
  const [FetchedUser, setFetchedUser]: any = useState()
  const params: any = useParams();
  // 
  const fetchProfile = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user/single/${params.id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        setLoading(false)
        const data = await res.json()
        setFetchedUser(data)
        console.log(data)
      } else {
        setLoading(false)
        console.log(res);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  //
  useEffect(() => {
    fetchProfile()
  }, []);
  // 
  return (
    <>
      {Loading &&
        <LinearProgress color="success" />
      }
      <div className="profile-page">
        {
          !Loading && FetchedUser! &&
          <>
            <div className='position-relative'>
              <div className='position-relative'>
                <img src={FetchedUser.user.backGround}
                  alt="" style={{ width: "20rem", aspectRatio: '1/1', objectFit: 'cover' }} />
                <div className='img-avatar'>
                  <Avatar
                    alt={FetchedUser.user.firstname + " " + FetchedUser.user.lastname}
                    src={FetchedUser.user.avatar}
                    sx={{ width: "10rem", height: "10rem" }}
                  />
                </div>
              </div>

            </div>
            <div className="ml-5">TEXT</div>
          </>
        }
      </div>
    </>
  );
}

export default Profile;
