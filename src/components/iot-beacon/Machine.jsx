import React from "react";
import { convertISOToLocal } from "../../services/date";
import { TbCurrentLocation } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMachine } from "../../store/slice/groups.slice";
import { FaPowerOff } from "react-icons/fa6";
import { getStatusColors } from "../../services/position";
import { RiBattery2ChargeLine } from "react-icons/ri";

const Machine = ({ machine, setEdit }) => {
  const dispatch = useDispatch();

  const handleMachineClick = () => {
    dispatch(setActiveMachine(machine));
  };

  const activeMachine = useSelector((state) => state.groups.activeMachine);

  return (
    <div
      className={`border ${
        activeMachine?.id === machine?.id
          ? "bg-blue-50 border-blue-300"
          : "bg-white border-gray-100"
      }  mt-1 rounded-[4px] px-3 py-2 hover:bg-gray-50 cursor-pointer`}
      onClick={() => handleMachineClick()}
    >
      {/* Header */}
      <div className="flex-row-between">
        {/* Machine Name */}
        <span className="text-light-blue font-14">{machine?.name}</span>
        {/* Last Update */}
        <span className="text-light-blue font-12">
          {convertISOToLocal(
            machine?.position?.deviceTime || machine?.lastUpdate
          ) || "----/--/--"}
        </span>
      </div>

      {/* Address */}
      <div className="text-gray-600 text-sm mt-1">
        <span className="text-gray font-12 text-wrap line-clamp-2">
          {machine?.position?.address || "--"}
        </span>
      </div>
      <div className="flex-row-between mt-1">
        {/* Ignition */}
        <div
          className={`flex-row-center items-center font-12 gap-1 ${getStatusColors(
            machine?.position?.attributes?.state
          )}`}
        >
          <FaPowerOff size={14} />
          <span className={``}>
            {machine?.position?.attributes?.state === "running" ? "On" : "Off"}
          </span>
        </div>

        {/* Battery */}
        <div className={`flex-row-center items-center font-12 gap-1`}>
          <RiBattery2ChargeLine size={16} className="text-orange" />
          <span className="text-gray">
            {machine?.position?.attributes?.battery?.toFixed(2) || "--"}
          </span>
        </div>

        {/* location and edit */}
        <div className="flex items-center gap-2">
          <TbCurrentLocation
            title="status"
            color={
              machine?.position?.attributes?.state === "running"
                ? "rgba(12, 235, 12, 0.926)"
                : "red"
            }
            size={18}
          />
          <FaRegEdit
            className="text-light-blue"
            size={18}
            title="edit"
            onClick={() => setEdit(machine?.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Machine);
