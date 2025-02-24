import React, { useState } from "react";

const DateInterval = ({ onChange }) => {
  const [selected, setSelected] = useState("today");

  const tabs = [
    { id: "today", label: "Today", color: "blue" },
    { id: "yesterday", label: "Yesterday", color: "green" },
    { id: "lastWeek", label: "Last Week", color: "orange" },
  ];

  const handleTabClick = (id) => {
    setSelected(id);
    onChange(id);
  };

  return (
    <div className="flex-row-center w-full">
      <div className="flex rounded-sm shadow w-full">
        {tabs.map((tab) => {
          const isSelected = selected === tab.id;
          let bgColor = "bg-gray-50";
          let textColor = "text-gray-600";
          let hoverColor = "hover:bg-gray-100";
          let borderColor = "border-t-[#fc7417]";

          if (isSelected) {
            if (tab.color === "blue") {
              bgColor = "bg-blue";
              textColor = "text-white";
              borderColor = "border-t-[#004cf4]";
            } else if (tab.color === "green") {
              bgColor = "bg-green-600";
              textColor = "text-white";
              borderColor = "border-t-green-600";
            } else if (tab.color === "orange") {
              bgColor = "bg-orange";
              textColor = "text-white";
              borderColor = "border-t-[#fc7417]";
            }
            hoverColor = "";
          } else {
            if (tab.color === "blue") {
              bgColor = "bg-blue-100";
              textColor = "text-blue-800";
            } else if (tab.color === "green") {
              bgColor = "bg-green-100";
              textColor = "text-green-800";
            } else if (tab.color === "orange") {
              bgColor = "bg-orange-100";
              textColor = "text-orange-800";
            }
          }

          return (
            <button
              key={tab.id}
              className={`relative flex-1 p-1.5 text-[13px] ${bgColor} ${textColor} ${hoverColor} transition-colors duration-200 
                ${tab.id === "today" ? "rounded-l-sm" : ""} 
                ${tab.id === "lastWeek" ? "rounded-r-sm" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {isSelected && (
                <div className="absolute left-0 right-0 flex justify-center -bottom-2">
                  <div
                    className={`w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${borderColor}`}
                  ></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateInterval;
