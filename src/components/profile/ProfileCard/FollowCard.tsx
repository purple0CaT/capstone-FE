import { Avatar, Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FetchedUserType } from "../ProfileInterface";
//
function FollowCard({ FetchedUser, reFetch }: FetchedUserType) {
  const tokens = useSelector((state: any) => state.tokens);
  const user = useSelector((state: any) => state.user);
  //
  const [OpenFollowers, setOpenFollowers] = useState(false);
  const [OpenFollowing, setOpenFollowing] = useState(false);
  const [OpenLinks, setOpenLinks] = useState(false);
  const [Following, setFollowing]: any = useState([]);
  const [Followers, setFollowers]: any = useState([]);
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
  //
  useEffect(() => {
    FetchedUser.followers?.youFollow &&
      setFollowing(FetchedUser.followers.youFollow);
    FetchedUser.followers?.followers &&
      setFollowers(FetchedUser.followers.followers);
  }, [FetchedUser]);
  return (
    <>
      <div
        className="d-flex w-100 align-items-center justify-content-center mt-2"
        style={{ gap: "2rem" }}
      >
        <Button
          disabled={Followers.length > 0 ? false : true}
          color="primary"
          onClick={handleFollowers}
        >
          {" "}
          <h6 className="font-weight-light m-0">
            Followers {Followers.length}
          </h6>
        </Button>
        <Button
          disabled={Following.length > 0 ? false : true}
          color="info"
          onClick={handleFollowing}
        >
          {" "}
          <h6 className="font-weight-light m-0">
            Following {Following.length}
          </h6>
        </Button>
      </div>
      {/* Dialogs */}
      <div>
        <Dialog
          open={OpenFollowers}
          //   TransitionComponent={Transition}
          keepMounted
          onClose={handleFollowers}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="d-flex flex-column p-3">
            {Followers.length > 0 &&
              Followers.map((F: any) => (
                <div
                  className="d-flex align-items-center justify-content-between p-1 mb-1"
                  key={F._id + 131}
                >
                  <Link
                    to={`/profile/${F._id}`}
                    className="d-flex align-items-center"
                    style={{ minWidth: "13rem" }}
                  >
                    <Avatar
                      alt={F.firstname + " " + F.lastname}
                      src={F.avatar}
                      sx={{ width: "2rem", height: "2rem" }}
                    />
                    <p className="m-0 ml-2">{F.firstname + " " + F.lastname}</p>
                  </Link>
                  <div></div>
                </div>
              ))}
          </div>
        </Dialog>
        <Dialog
          open={OpenFollowing}
          //   TransitionComponent={Transition}
          keepMounted
          onClose={handleFollowing}
        >
          <div className="d-flex flex-column p-3">
            {Following.length > 0 &&
              Following.map((F: any) => (
                <div
                  className="d-flex align-items-center justify-content-between p-1"
                  key={F._id + 321}
                >
                  <Link
                    to={`/profile/${F._id}`}
                    className="d-flex align-items-center"
                    style={{ minWidth: "13rem" }}
                  >
                    <Avatar
                      alt={F.firstname + " " + F.lastname}
                      src={F.avatar}
                      sx={{ width: "2rem", height: "2rem" }}
                    />
                    <p className="m-0 ml-2">{F.firstname + " " + F.lastname}</p>
                  </Link>
                  {FetchedUser.user._id === user._id && (
                    <div>
                      <Button color="warning" onClick={() => unFollow(F._id)}>
                        Unfollow
                      </Button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </Dialog>
      </div>
      <div className="mt-2">
        <Button size="small" color="info" onClick={() => setOpenLinks(true)}>
          {" "}
          Contact links
        </Button>
        <Dialog open={OpenLinks} onClose={() => setOpenLinks(false)}>
          <div className="p-3 d-flex flex-column align-items-center">
            <span className="d-flex align-items-baseline">
              Email: -
              {/* <h5 className="m-0 ml-2 font-weight-light">
                {FetchedUser.user.email}
              </h5> */}
            </span>
            {FetchedUser.user.links.length > 0 &&
              FetchedUser.user.links.map((Li: any) => (
                <a
                  target="_blank"
                  href={Li.link}
                  key={Li + "z13"}
                  className="my-1"
                >
                  <h5 className="m-0 ml-2 font-weight-light">{Li.title}</h5>
                </a>
              ))}
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default FollowCard;
