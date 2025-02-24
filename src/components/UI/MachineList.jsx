import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SearchInput from "../form/SearchInput";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const MachineList = ({ selectedVehicles, setSelectedVehicles }) => {
  const [search, setSearch] = useState("");
  const [showMachineList, setShowMachineList] = useState(false);

  const machineListRef = useRef({});

  const groups = useSelector((state) => state.groups.groups);

  const handleSelect = (vehicleId) => {
    setSelectedVehicles((prev) =>
      prev.some((v) => v.id === vehicleId)
        ? prev.filter((v) => v.id !== vehicleId)
        : [...prev, { id: vehicleId }]
    );
  };

  const isChecked = (vehicleId) =>
    selectedVehicles.some((v) => v.id === vehicleId);

  const handleCheckAll = () => {
    const allMachines = groups.flatMap((group) =>
      Object.values(group.__vehicles__).map((vehicle) => ({ id: vehicle.id }))
    );
    setSelectedVehicles(allMachines);
  };

  const handleUncheckAll = () => {
    setSelectedVehicles([]);
  };

  const getCount = () => selectedVehicles?.length;

  // handle out side click to close the select
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!machineListRef.current.contains(event?.target)) {
        setShowMachineList(false);
      }
    };
    document.addEventListener("click", handleOutSideClick);

    return () => document.removeEventListener("click", handleOutSideClick);
  }, []);

  return (
    <div ref={machineListRef} className="relative w-[200px]">
      {/* select trigger */}
      <div
        className="cursor-pointer p-2 bg-white text-gray-700 rounded-sm flex-row-between items-center text-[13px]"
        onClick={() => setShowMachineList(!showMachineList)}
      >
        <span className="">
          {getCount() === 0 ? "Select Machines" : `${getCount()} checked`}{" "}
        </span>
        <span>{showMachineList ? "▲" : "▼"}</span>
      </div>

      {/* machine select list */}
      {showMachineList && (
        <div style={styles.container} className="py-3 px-4">
          <div className="flex flex-col gap-2 mb-2">
            <button
              onClick={handleCheckAll}
              className="text-gray text-sm flex items-center text-[13px] cursor-pointer"
            >
              <FaCheck className="text-green-400 mr-1" size={18}/>
               Check All
            </button>
            <button
              onClick={handleUncheckAll}
              className="text-gray text-sm flex items-center text-[13px] cursor-pointer"
            >
              <IoCloseSharp className="text-red-400 mr-1" size={20}/> Uncheck All
            </button>
          </div>

          <SearchInput
            value={search}
            handleChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded my-3"
          />

          <div className="rounded overflow-auto max-h-60">
            {groups.map((group) => (
              <div key={group.id}>
                <p className="bg-gray-200/70 font-14 p-1">{group.name}</p>
                {Object.values(group?.__vehicles__)
                  .filter((vehicle) =>
                    vehicle.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((vehicle) => (
                    <div
                      onClick={() => handleSelect(vehicle?.id)}
                      key={vehicle.id}
                      className="py-2 px-3 flex items-center hover:bg-gray-100 cursor-pointer"
                    >
                      {}
                      <span className="font-12">
                        {isChecked(vehicle?.id)
                          ? (<span className="flex items-center"><FaCheck className="text-green-400 mr-1" size={14}/> {vehicle.name}</span>)
                          : vehicle?.name}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "absolute",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    maxHeight: "50vh",
    marginTop: "7px",
    border: "1px solid rgba(0, 0, 0, 0.1",
    borderRadius: "4px",
    width: "400px",
  },
};

export default MachineList;
