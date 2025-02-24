import React, { useState } from "react";
import LocatorWhiteLogo from "../../assets/images/logo/locator_white.svg";
import { modules } from "../../constants/modules";
import { NavLink } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"; // Import arrow icons

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`relative bg-blue shadow-xl h-screen transition-all duration-500 ${
        isCollapsed ? "w-20" : "w-56"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-5 right-[-16px] bg-white/20 text-white py-1 shadow-md"
      >
        {isCollapsed ? <FaAngleRight size={18} /> : <FaAngleLeft size={18} />}
      </button>

      {/* LOGO (Hide when collapsed) */}
      <div
        className={`flex-row-center h-18 mx-auto transition-opacity duration-300 ${
          isCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
      >
        <img src={LocatorWhiteLogo} height={40} width={130} />
      </div>

      {/* <hr className="text-slate-400" /> */}

      {/* Navigation */}
      <nav className="w-full text-white py-8">
        <ul className="space-y-1">
          {modules?.map(({ path, icon: Icon, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-6 py-4 hover:bg-blue-50/10 transition-all duration-100 ${
                    isActive ? "active-menu" : "text-white"
                  } ${isCollapsed ? "justify-center" : ""}`
                }
              >
                <Icon className={`${isCollapsed ? "flex-1" : ""} w-6 h-6`} />

                {/* Smooth text transition */}
                <span
                  className={`overflow-hidden whitespace-nowrap transition-transform duration-300 text-sm ${
                    isCollapsed
                      ? "w-0 scale-x-0 opacity-0"
                      : "w-auto scale-x-100 opacity-100"
                  }`}
                >
                  {title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
