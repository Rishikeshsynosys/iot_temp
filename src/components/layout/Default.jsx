import React, { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";

const Default = ({ children }) => {

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSideBar = () => setShowSidebar(!showSidebar);


  return (
    <div className="min-h-screen max-h-screen min-w-screen flex">
      {/* Sidebar */}
      <SideBar showSidebar={showSidebar}/>
      <div className="flex flex-col w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Default;
