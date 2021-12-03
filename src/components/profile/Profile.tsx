import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import "./style.css";

function Profile() {
  const user = useSelector((state: any) => state.user);
  const params: any = useParams();
  console.log(params);
  //
  useEffect(() => {
    if (params !== {}) {
      alert("Id true");
    }
  }, []);
  return (
    <div className="profile-page">
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <img src={user.avatar} className="image-profile" alt="" />
        </div>
      </div>
      <div className="p-1">TEXT</div>
    </div>
  );
}

export default Profile;
