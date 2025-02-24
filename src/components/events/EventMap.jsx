import { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { getMachineMarker } from "../iot-beacon/marker/marker.options";
import WindowRow from "../UI/WindowRow";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const defaultCenter = { lat: 25.276987, lng: 55.296249 };

const EventMap = ({ activeEvent, setActiveEvent }) => {
  const [map, setMap] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(() => {
    if (map && activeEvent) {
      map.panTo({
        lat: activeEvent?.latitude,
        lng: activeEvent?.longitude,
      });
      map.setZoom(15);
    }
  }, [activeEvent, map]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={10}
      onLoad={(map) => setMap(map)}
    >
      {activeEvent && (
        <>
          <Marker
            position={{
              lat: activeEvent?.latitude,
              lng: activeEvent?.longitude,
            }}
            icon={getMachineMarker("running")} // for green color
            onClick={() => setSelectedMachine(activeEvent)}
          />
          {selectedMachine && (
            <InfoWindow
              position={{
                lat: selectedMachine.latitude,
                lng: selectedMachine.longitude,
              }}
              onCloseClick={() => setSelectedMachine(null)}
              options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
            >
              <div className="mt-2 space-y-2 px-2 max-w-[240px]">
                <WindowRow
                  label="Machine"
                  title="Machine Name"
                  value={activeEvent?.machineName}
                  capitalize={true}
                />
                <WindowRow
                  label="Event"
                  title="Event Type"
                  value={activeEvent?.type}
                  capitalize={true}
                />
                <span className="text-gray">
                  {activeEvent?.address || "Address not available"}
                </span>
              </div>
            </InfoWindow>
          )}
        </>
      )}
    </GoogleMap>
  );
};

export default EventMap;
