import React, { useEffect, useState } from "react";
import { getStorage } from "../../services/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../form/SearchInput";

const Groups = ({
  Component,
  selectedCategory = "all",
  toggleMachineSelect,
  setEdit = () => {},
  toggleGroupSelect = () => {},
  parent = "iot",
}) => {
  const _groups = useSelector((state) => state.groups?.groups);

  const [searchInput, setSearchInput] = useState("");
  const [machineGroups, setMachineGroups] = useState([..._groups]);

  const groups_info = getStorage("groups_info", "object");
  const [openGroups, setOpenGroups] = useState(
    groups_info?.map((group) => group?.name)
  );

  const dispatch = useDispatch();

  const toggleGroupOpen = (groupName) => {
    const index = openGroups.findIndex((group) => group === groupName);
    if (index > -1) return setOpenGroups((prev) => prev.splice(index, 1));

    setOpenGroups((prev) => [...prev, groupName]);
  };

  const toggleMarkers = (event, groupId) => {
    event.stopPropagation();
    dispatch(toggleGroupSelect({ id: groupId, checked: event.target?.checked }));
  };

  const toggleMachine = (machine) => {
    if (!toggleMachineSelect) return;
    dispatch(toggleMachineSelect({machine}));
  };

  const onChangeFilter = () => {
    const _g = [..._groups]?.map((group) => {
      let filteredVehicles = {};
      Object.entries(group?.__vehicles__)?.forEach(([key, vehicle]) => {
        if (
          selectedCategory === "running" &&
          vehicle?.position?.attributes?.state === "running"
        )
          filteredVehicles[key] = vehicle;
        else if (
          selectedCategory === "stopped" &&
          vehicle?.position?.attributes?.state === "stopped"
        )
          filteredVehicles[key] = vehicle;
        else if (
          selectedCategory === "offline" &&
          vehicle?.position?.attributes?.state === "offline"
        )
          filteredVehicles[key] = vehicle;
        else if (selectedCategory === "all") filteredVehicles[key] = vehicle;
      });

      if (searchInput !== "" && Object.keys(filteredVehicles)?.length) {
        filteredVehicles = Object.fromEntries(
          Object.entries(filteredVehicles).filter(([_, vehicle]) =>
            vehicle?.name?.toLowerCase().includes(searchInput?.toLowerCase())
          )
        );
      }

      return {
        ...group,
        __vehicles__: filteredVehicles,
      };
    });

    return _g;
  };

  useEffect(() => {
    setMachineGroups(onChangeFilter());
  }, [_groups, searchInput, selectedCategory]);

  return (
    <div className="relative h-full">
      <div className="flex flex-col gap-2 w-full h-[95%] overflow-y-auto">
        {machineGroups.length === 0 ? (
          <span className="text-sm text-gray">No Machines to display</span>
        ) : (
          machineGroups.map((group) => (
            <div key={group.name} className="rounded-sm overflow-hidden shadow">
              {/* Accordion Header */}
              <button
                className="w-full flex-row-between p-2 bg-gray text-white text-sm font-semibold cursor-pointer"
                onClick={() => toggleGroupOpen(group.name)}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    onClick={(event) => toggleMarkers(event, group.id)}
                    checked={
                      parent === "iot" ? group?.selected ?? true : undefined
                    }
                  />
                  {group.name} ({group?.vehiclesIds?.length})
                </span>
                <span>{openGroups.includes(group.name) ? "▲" : "▼"}</span>
              </button>

              {/* Accordion Content */}
              {openGroups?.includes(group.name) && (
                <div className="bg-slate-100 overflow-y-auto">
                  {Object.keys(group.__vehicles__).length > 0 &&
                    Object.entries(group.__vehicles__).map(([key, vehicle]) => (
                      <Component
                        key={key}
                        machine={vehicle}
                        setEdit={setEdit}
                        onChecked={toggleMachine}
                      />
                    ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <SearchInput
        value={searchInput}
        handleChange={(e) => setSearchInput(e?.target?.value)}
        className="absolute bottom-0 w-full"
      />
    </div>
  );
};

export default Groups;
