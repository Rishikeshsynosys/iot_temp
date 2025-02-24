import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { getMachineMarker } from "./marker/marker.options";
import MachineInfoWindow from "../UI/MarkerInfoWindow";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const defaultCenter = { lat: 25.276987, lng: 55.296249 };

const MachineMap = ({isFullScreen = false}) => {
  const machines = useSelector((state) => state.groups?.machines);
  const activeMachine = useSelector((state) => state.groups?.activeMachine);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && activeMachine) {
      map.panTo({
        lat: activeMachine?.position?.latitude,
        lng: activeMachine?.position?.longitude,
      });
      map.setZoom(15);
    }
  }, [activeMachine?.id, map]);

  // Filter out the active machine from the markers list
  const filteredMachines = machines.filter(
    (machine) => machine.id !== activeMachine?.id && machine?.showInMap
  );

  return (
    <GoogleMap
      mapContainerStyle={isFullScreen ? {...mapContainerStyle, height : "91vh"} : mapContainerStyle}
      center={defaultCenter}
      zoom={10}
      onLoad={(map) => setMap(map)}
    >
      {/* Marker Clustering */}
      <MarkerClusterer>
        {(clusterer) =>
          filteredMachines.map((machine) => (
            <Marker
              key={machine.id}
              position={{
                lat: machine.position.latitude,
                lng: machine.position.longitude,
              }}
              clusterer={clusterer}
              icon={getMachineMarker(machine.position.attributes.state)}
              onClick={() => setSelectedMachine(machine)}
            />
          ))
        }
      </MarkerClusterer>

      {/* Info Window for Selected Machine */}
      {selectedMachine && (
        <MachineInfoWindow
          selectedMachine={selectedMachine}
          setSelectedMachine={setSelectedMachine}
        />
      )}

      {/* Active Machine Marker */}
      {activeMachine && activeMachine?.showInMap && (
        <Marker
          position={{
            lat: activeMachine.position?.latitude,
            lng: activeMachine.position?.longitude,
          }}
          icon={getMachineMarker(activeMachine?.position?.attributes?.state)}
          onClick={() => setSelectedMachine(activeMachine)}
        />
      )}
    </GoogleMap>
  );
};

export default MachineMap;
