import React, { useRef, useEffect, useState, useCallback } from "react";
import { getMachineMarker } from "./marker/marker.options";
import MarkerInfoWindow from "../UI/MarkerInfoWindow";
import ReactDOMServer from "react-dom/server";
import { useSelector } from "react-redux";

const MachineMap = () => {
  const machines = useSelector((state) => state.groups.machines);
  const ref = useRef();
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState({});
  const infoWindowRef = useRef(null);

  const handleMarkerBuild = useCallback(
    (machine) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: machine.position.latitude,
          lng: machine.position.longitude,
        },
        map: map,
        title: machine.name,
        icon: {
          url: getMachineMarker(machine.position.attributes.state),
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });

      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        const popupHtml = ReactDOMServer.renderToString(
          <MarkerInfoWindow
            machine={machine}
            popupSettings={null}
            driverInfo={null}
            geozone={"Not in Geozone"}
          />
        );

        infoWindowRef.current = new window.google.maps.InfoWindow({
          content: popupHtml,
          maxWidth: 300,
        });

        infoWindowRef.current.open(map, marker);
      });

      return marker;
    },
    [map]
  );

  const loadScript = useCallback(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry`;
      document.head.append(script);

      script.onload = () => {
        const m = new window.google.maps.Map(ref.current, {
          center: { lat: 25.276987, lng: 55.296249 },
          zoom: 8,
          keyboardShortcuts: false,
          mapTypeControl: false,
        });
        setMap(m);
      };
    } else {
      const m = new window.google.maps.Map(ref.current, {
        center: { lat: 25.276987, lng: 55.296249 },
        zoom: 8,
        keyboardShortcuts: false,
        mapTypeControl: false,
      });
      setMap(m);
    }
  }, []);

  useEffect(() => {
    loadScript();
  }, [loadScript]);

  useEffect(() => {
    if (!map || !machines.length) return;

    map.setZoom(machines.length > 100 ? 7 : 12);

    const _markers = {};
    machines.forEach((machine) => {
      if (machine.position) {
        _markers[machine.id] = handleMarkerBuild(machine);
      }
    });

    setMarkers(_markers);
  }, [machines, map, handleMarkerBuild]);

  return (
    <div
      ref={ref}
      style={{ height: `400px`, width: "100%", borderRadius: "0 3px 3px 0" }}
    />
  );
};

export default React.memo(MachineMap);
