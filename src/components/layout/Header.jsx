import React from "react";
import { getStorage } from "../../services/LocalStorage";
import { ASSESTS_URL } from "../../config/api.urls";
import DEFAULT_PROFILE_IMG from "../../assets/images/defaults/default_profile_icon.png";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  const user = getStorage("__user__", "object");

  const getProfileSrc = () => {
    if (user?.photo) {
      return `${ASSESTS_URL}/images/${user?.photo}`;
    }

    return DEFAULT_PROFILE_IMG;
  };
  return (
    <div className="h-18 shadow-xl bg-blue p-1 flex items-center justify-end px-5">
      <div className="flex-end">
        <div className="flex-row-center gap-5">

          <IoIosNotifications size={24} color="white"/>

          <div className="flex-row-center gap-2">
          <span className="text-white uppercase text-sm">{user?.name}</span>
          <img
            src={getProfileSrc()}
            width={38}
            height={38}
            className="rounded-full"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
