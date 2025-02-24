import { getDiffInHours } from "./date";


// calculating status of vehicles like running, stopped, and offline
export const getStatus = (position) => {
  var status = "offline";

  if (position.protocol !== "osmand") {
    if (position.livestatus !== "Disconnected") {
      if (
        (position.attributes.di1 === 1 &&
          position.attributes.motion === true &&
          position.attributes.ignition === true) ||
        position.attributes.motion === true ||
        (position.speed > 0 &&
          position.attributes.di1 !== 0 &&
          position.attributes.motion !== false)
      ) {
        status = "running";
      } else if (
        (position.attributes.di1 === 1 ||
          (position.attributes.ignition &&
            position.attributes.ignition === true)) &&
        position.attributes.motion === false
      ) {
        status = "running";
      } else if (
        (position.attributes.di1 === 0 ||
          (position.attributes.ignition &&
            position.attributes.ignition === false)) &&
        position.attributes.motion === false
      ) {
        status = "stopped";
      } else if (
        !position.attributes.di1 &&
        position.attributes.motion === false &&
        !position.attributes.ignition
      ) {
        status = "stopped";
      }
    } else {
      status = "offline";
    }
  }

  return status;
};

// setting ignition di1 and state for each position data
export const __position_filtering = (position) => {
  if (!position.attributes) {
    position.attributes = {};
  }
  if (position.attributes.di1 === undefined) {
    position.attributes.di1 = 0;
    if (
      position.attributes.ignition !== undefined &&
      position.attributes.ignition == "true"
    ) {
      position.attributes.di1 = 1;
    }
  }

  var { hours } = getDiffInHours(position?.deviceTime)

  if (hours > 10) {
    position.livestatus = "No Signal";
  }

  if (position.attributes.status) {
    if (position.attributes.status == "0800") {
      position.attributes.di1 = 1;
      position.attributes.ignition = true;
    } else {
      position.attributes.ignition == false;
      position.attributes.di1 = 0;
    }
  }

  if (position.protocol == "gt06") {
    if (position.attributes.ignition == true) {
      position.attributes.di1 = 1;
      position.attributes.ignition = true;
    } else {
      position.attributes.ignition == false;
      position.attributes.di1 = 0;
    }
  }

  if (position.protocol == "ruptela") {
    if (position.attributes.ignition == true) {
      position.attributes.di1 = 1;
      position.attributes.ignition = true;
    } else {
      position.attributes.ignition == false;
      position.attributes.di1 = 0;
    }
  }

  if (position.protocol == "eelink") {
    if (position.attributes.ignition == true) {
      position.attributes.di1 = 1;
      position.attributes.ignition = true;
    } else {
      position.attributes.ignition == false;
      position.attributes.di1 = 0;
    }
  }

  position.attributes.state = getStatus(position);

  return position;
};


// counting the state of vehicles running, stopped and offline
export const countVehicleState = (vhls) => {
  var running = 0;
  var stopped = 0;
  var offline = 0;

  for (var i = 0; i < vhls.length; i++) {
    try {
      var e = vhls[i];

      if (!e.position) {
        offline++;
        continue;
      }

      let position = e.position;

      //set status of vehicle whose protocol is not 'osmand'
      if (position.protocol !== "osmand") {
        if (position.livestatus !== "Disconnected") {
          // For Online Vehicles
          if (
            (position.attributes.di1 == 1 &&
              position.attributes.motion == true &&
              position.attributes.ignition == true) ||
            position.attributes.motion == true ||
            (position.speed > 0 &&
              position.attributes.di1 != 0 &&
              position.attributes.motion != false)
          ) {
            running++;
          } else if (
            position.attributes.di1 == 1 &&
            position.attributes.motion == false
          ) {
            running++; //idling count
          } else if (
            position.attributes.di1 == 0 &&
            position.attributes.motion == false
          ) {
            stopped++; //stopped count
          } else if (
            position.attributes.di1 === undefined &&
            position.attributes.motion == false &&
            position.attributes.ignition === undefined
          ) {
            stopped++; //stopped count
          }
        } else {
          offline++;
        }
      }

      if (position.protocol == "osmand") {
        //'osmand' protocol vehicle

        try {
          var duration = moment.duration(
            moment().diff(moment(position.deviceTime))
          );
          var hours = parseInt(duration.asHours());

          if (hours !== 0) {
            moving--; //moving count
            offline++;
          }
        } catch (error) {
          moving++;
        }
      }
    } catch (error) { }
  }

  return {
    running, // online
    stopped, // offline
    offline, // no signal
    all: vhls.length,
  };
};

export const getStatusColorBg = (value) => {
  switch (value) {
    case "running":
      return "bg-green-400 ";
    case "stopped":
      return "bg-red-500 ";
    case "offline":
      return "bg-gray-400 ";
    case "all":
      return "bg-orange ";
  }
};

export const getStatusColors = (state) => {
  switch (state) {
    case "running":
      return "text-green-400 ";
    case "stopped":
      return "text-red-500 ";
    case "offline":
      return "text-gray-400 ";
    case "all":
      return "text-orange ";
  }
}


export const getEventColorsBg = (type) => {
  switch (type) {
    case "ignitionOn":
      return "bg-green-400 ";
    case "ignitionOff":
      return "bg-red-500 ";
  }
}