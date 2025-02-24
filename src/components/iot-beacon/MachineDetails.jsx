import React from "react";
import { convertISOToLocal } from "../../services/date";
import defaultMachineImage from "../../assets/images/defaults/default_machine.png";
import { getLaravelReqHeaders } from "../../services/requests";
import MiniLoader from "../UI/MiniLoader";
import { useFetchSingleObjectDetailsQuery } from "../../store/api/groups.api";
import { getStatusColors } from "../../services/position";
import { FaPowerOff } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";


const DetailsRow = ({
  label,
  value,
  icon: Icon,
  statusColor = false,
  capitalize = false,
}) => {
  return (
    <div className="flex justify-between items-start text-left w-full">
      <div className="w-[50%] flex items-start gap-1">
        <Icon className="text-gray mt-1" size={14} />
        <label className="text-gray font-14"> {label} </label>
      </div>

      <div className="w-[70%] flex gap-1 text-left text-[14px]">
        <span>:</span>
        <div
          className={`text-gray-600 w-100 line-clamp-3 font-medium ${
            statusColor && (value === "ON" ? 'text-green-400' : 'text-red-400')
          } ${capitalize && "capitalize"}`}
        >
          {" "}{value}
        </div>
      </div>
    </div>
  );
};

const MachineDetails = ({ machine }) => {
  const headers = getLaravelReqHeaders();

  const {
    data: machineDetails,
    isLoading,
    error,
  } = useFetchSingleObjectDetailsQuery({ editMachineId: machine?.id, headers });

  if (isLoading) return <MiniLoader />;

  return (
    <div className="flex flex-col">
      <h4 className="text-lg font-semibold">Asset</h4>
      <div className="flex-col-center gap-2 w-full">
        <div className="flex flex-col items-center gap-2">
          <img
            src={machine?.image || defaultMachineImage}
            alt="Machine"
            className="rounded-md w-20 p-3 object-contain bg-blue-100/30"
          />
          <h3 className="text-gray font-14">{machine?.name || "--"}</h3>
        </div>

        <DetailsRow
          label="Status"
          icon={FaPowerOff}
          value={machine?.position?.attributes?.state === 'running' ? "ON" : "OFF" || "--"}
          statusColor={true}
          capitalize={true}
        />

        <DetailsRow
          label="Battery"
          icon={RiBattery2ChargeLine}
          value={machine?.position?.attributes?.battery?.toFixed(2) || "--"}
        />

        <DetailsRow
          label="Last update"
          icon={FaRegClock}
          value={convertISOToLocal(
            machine?.position?.deviceTime || machine?.lastUpdate
          ) || "----/--/--"}
        />

        <DetailsRow
          label="Installation"
          icon={MdOutlineDateRange}
          value={machineDetails[0]?.createdTime || "----/--/--"}
        />

        <DetailsRow
          label="Location"
          icon={IoLocationOutline}
          value= {machine?.position?.address || "--"}
        />
      </div>
    </div>
  );
};

export default MachineDetails;
