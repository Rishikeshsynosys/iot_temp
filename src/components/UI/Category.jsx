import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getStatusColorBg } from "../../services/position";

const Category = ({ selectedCategory, handleCategoryChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const counts = useSelector((state) => state?.groups?.counts);

  const categories = [
    {
      title: "All",
      value: "all",
    },
    {
      title: "Online",
      value: "running",
    },
    {
      title: "Offline",
      value: "stopped",
    },
    {
      title: "No Signal",
      value: "offline",
    },
  ];

  const handleTabClick = (value, index) => {
    setActiveIndex(index);
    handleCategoryChange(value);
  };

  return (
    <div className="relative w-full">
      <ul className="flex-row-center border-b-2 border-gray-200">
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300"
          style={{
            width: `calc(100% / ${categories.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        ></div>
        {categories?.map(({ title, value }, index) => (
          <li
            className={`relative cursor-pointer px-3 text-sm py-2 transition-all text-center w-full
          ${
            value === selectedCategory ? "font-semibold text-blue" : "text-gray"
          }`}
            key={value}
            onClick={() => handleTabClick(value, index)}
          >
            {title}
            <span className={`${getStatusColorBg(value)} absolute rounded-full w-5 h-5 p-0.5 text-xs top-0 text-white`}>
              {counts[value]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
