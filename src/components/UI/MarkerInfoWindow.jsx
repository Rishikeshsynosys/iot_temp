import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import defaultMachineImage from "../../assets/images/defaults/default_machine.png";
import { convertISOToLocal } from "../../services/date";
import WindowRow from "./WindowRow";

const MachineInfoWindow = ({ selectedMachine, setSelectedMachine }) => {
  if (!selectedMachine) return null;

  return (
    <InfoWindow
      position={{
        lat: selectedMachine.position.latitude,
        lng: selectedMachine.position.longitude,
      }}
      onCloseClick={() => setSelectedMachine(null)}
      options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
    >
      <div className="w-full max-w-[260px] max-h-[500px] z-20">
        <div className="flex items-center">
          <img
            src={selectedMachine?.image || defaultMachineImage}
            alt="Machine Icon"
            className="w-8 h-8 mr-2"
          />
          <h3 className="font-bold text-lg text-gray">
            {selectedMachine.name}
          </h3>
        </div>
        <div className="mt-2 space-y-2">
          <WindowRow
            label="Status"
            title="Machine Status"
            value={selectedMachine?.position?.attributes?.state}
            capitalize={true}
          />
          <WindowRow
            label="Latitude"
            title="Latitude"
            value={selectedMachine?.position?.latitude}
          />
          <WindowRow
            label="Longitude"
            title="Longitude"
            value={selectedMachine?.position?.longitude}
          />
          <WindowRow
            label="Last Update"
            title="Last Update"
            value={convertISOToLocal(selectedMachine?.position?.deviceTime)}
          />
          <span className="text-gray-600 font-medium">
            {selectedMachine.position.address || "Address not available"}
          </span>
        </div>
      </div>
    </InfoWindow>
  );
};

export default MachineInfoWindow;
