import { Avatar, Dialog, Grid, Slide, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import FollowCard from "./FollowCard";
import UpdateAvatar from "./UpdateAvatar";
import UpdateBG from "./UpdateBG";
//
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
//
function MainCard({ FetchedUser, reFetch, FetchedCreator }: any) {
  const matches = useMediaQuery("(min-width:599px)");
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  //
  const [OpenFollowers, setOpenFollowers] = useState(false);
  const [OpenFollowing, setOpenFollowing] = useState(false);
  const [OpenLinks, setOpenLinks] = useState(false);
  const [Following, setFollowing] = useState([]);
  const [Followers, setFollowers] = useState([]);
  //
  const followUser = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/follow/${FetchedUser.user._id}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        reFetch();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const unfollowUser = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/follow/${FetchedUser.user._id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        reFetch();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const handleFollowers = () => {
    setOpenFollowers(!OpenFollowers);
  };
  const handleFollowing = () => {
    setOpenFollowing(!OpenFollowing);
  };
  //
  const unFollow = async (id: string) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/follow/${id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        reFetch();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    FetchedUser.followers?.youFollow &&
      setFollowing(FetchedUser.followers.youFollow);
    FetchedUser.followers?.followers &&
      setFollowers(FetchedUser.followers.followers);
  }, [FetchedUser]);
  return (
    <div className="profile-page">
      <Grid item xs={12} sm={4} className="position-relative">
        <div className="position-relative h-100">
          <UpdateBG user={FetchedUser.user} reFetch={reFetch} />
          <div
            className="img-avatar"
            style={{
              width: "8rem",
              height: "8rem",
              right: matches ? "-3.5em" : "calc(50% - 4.5rem)",
              top: matches ? "calc(50% - 4rem)" : "calc(100% - 4em)",
            }}
          >
            <UpdateAvatar user={FetchedUser.user} reFetch={reFetch} />
          </div>
        </div>
      </Grid>
      {/*  =============================================================================  USER INFORMATION */}
      <Grid item xs={12} sm={8}>
        <div
          className="user-info"
          style={{
            paddingLeft: matches ? "4rem" : "1rem",
            paddingTop: matches ? "1rem" : "2rem",
          }}
        >
          <div className="d-flex justify-content-between align-items-center w-100">
            <h4 className="font-weight-light mr-auto m-0 text-muted">
              {FetchedUser.user.nickname}
            </h4>
            {user._id === FetchedUser.user._id ? (
              <EditProfile userInfo={FetchedUser.user} reFetch={reFetch} />
            ) : (
              <>
                {FetchedUser.followers.followers.some(
                  (F: any) => F._id == user._id,
                ) ? (
                  <Button color="warning" onClick={() => unfollowUser()}>
                    Unfollow
                  </Button>
                ) : (
                  <Button onClick={() => followUser()}>Follow</Button>
                )}
              </>
            )}
          </div>
          {/*  ============================================================================= NAME BIO  */}
          {FetchedCreator && (
            <div className="mb-2">
              <small className="font-weight-bold text-muted">
                {FetchedCreator.creatorType}
              </small>
            </div>
          )}
          <div className="mr-auto">
            <h4 className="font-weight-light">
              {FetchedUser.user.firstname + " " + FetchedUser.user.lastname}
            </h4>
          </div>

          <div className="mr-auto">
            <p className="m-0 font-weight-light">{FetchedUser.user.bio}</p>
          </div>
          {/* ============================================================================= FOLLOWERS */}
          <FollowCard FetchedUser={FetchedUser} reFetch={reFetch} />
        </div>
      </Grid>
    </div>
  );
}

export default MainCard;
