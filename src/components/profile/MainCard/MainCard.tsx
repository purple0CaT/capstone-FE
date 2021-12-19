import { Grid, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import FollowCard from "./FollowCard";
import UpdateAvatar from "./UpdateAvatar";
import UpdateBG from "./UpdateBG";
//
function MainCard({ FetchedUser, reFetch, FetchedCreator }: any) {
  const matches = useMediaQuery("(min-width:599px)");
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  //
  const followUser = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/follow/${FetchedUser.user._id}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        reFetch();
      } else {
        alert(data.message);
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
            paddingTop: matches ? "1rem" : "3rem",
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
                  (F: any) => F._id === user._id,
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
          <br />
          {/*  ============================================================================= NAME BIO  */}
          {FetchedCreator && (
            <div className="mb-2">
              <small className="font-weight-bold text-muted">
                {FetchedCreator.creatorType}
              </small>
            </div>
          )}
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="mr-auto">
              <h4 className="font-weight-light">
                {FetchedUser.user.firstname + " " + FetchedUser.user.lastname}
              </h4>
            </div>
            <div>
              {FetchedUser.user._id !== user._id && (
                <Button disabled color="info">
                  Message
                </Button>
              )}
            </div>
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
