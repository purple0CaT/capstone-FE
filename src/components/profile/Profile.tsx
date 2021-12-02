import React from "react";
import { useSelector } from "react-redux";
import "./style.css";

function Profile() {
  const user = useSelector((state: any) => state.user);
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
