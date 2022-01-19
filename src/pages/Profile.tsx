import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import MainCard from "../components/profile/ProfileCard/MainCard";
import "../components/profile/style.css";
import SecondCard from "../components/profile/Tabs/SecondCard";
import { setUser } from "../redux/actions/action";
import { ReduxStore } from "../types/reduxStore";

function Profile() {
  const history = useHistory();
  const params: any = useParams();
  const { user, tokens } = useSelector((state: ReduxStore) => state);
  const dispatch = useDispatch();
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
        // document.title = `${data.user.firstname} ${data.user.lastname}`;
        if (data.user.creator) {
          fetchCreator(data.user.creator);
        } else {
          setLoading(false);
        }
        if (data.user._id === user._id) {
          dispatch(setUser(data.user));
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
    if (user._id === "") {
      history.push("/login");
    }
    fetchProfile();
  }, [params.id]);
  //
  return (
    <>
      {Loading && <LinearProgress />}
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
