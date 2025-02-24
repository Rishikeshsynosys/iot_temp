import React from "react";
import { useSelector } from "react-redux";

const ReportMachine = ({ machine, onChecked }) => {
  const selectedMachines = useSelector(
    (state) => state.reports.selectedMachines
  );

  return (
    <span className="bg-white flex items-center gap-2 p-3 text-light-blue mt-1 font-14">
      <input
        type="checkbox"
        className="checkbox-input"
        onClick={() => onChecked(machine)}
        checked={
          selectedMachines?.some((selected) => selected?.id === machine?.id) ??
          false
        }
      />
      {machine?.name}
    </span>
  );
};

export default ReportMachine;
