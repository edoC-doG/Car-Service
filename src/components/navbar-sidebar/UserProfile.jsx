import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import Button from "../ButtonClose";
import { userProfileData } from "../../data/data";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/userProfile.scss";

const UserProfile = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="nav-item absolute right-1 w-96 frame-user">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center info-user">
        <img
          className="rounded-full h-24 w-24"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl"> Michael Roberts </p>
          <p className="text-gray-500 text-sm"> Administrator </p>
          <p className="text-gray-500 text-sm font-semibold"> info@shop.com </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 cursor-pointer list-info ">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-xl hover:bg-light-gray icon"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-500 text-sm"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1.25rem" }}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        
        />
      </div>
    </div>
  );
};

export default UserProfile;
