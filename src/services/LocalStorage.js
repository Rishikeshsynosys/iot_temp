const getStorage = (key, type = "stirng") => {
    var value = localStorage.getItem(key);
    if (type == "object" && value) {
      value = JSON.parse(value);
    }
    return value;
  };
  
  const setStorage = (key, value, type = "string") => {
    if (type == "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  };

  const logout = () => {
    const remberUser = getStorage("saveMember", "object");
    const backgroundImg = getStorage("background", "string");
    const savedServiceCenter = getStorage("savedServiceCenter", "object");
    const serviceCenter = getStorage("__serviceCenter__", "object");
    const vehicleCardSettings = getStorage("vehicleCardSettings", "object");
    const deviceTKN = getStorage("deviceTKN", "string");
    localStorage.clear();
    if (remberUser) setStorage("saveMember", remberUser, "object");
    if (backgroundImg) setStorage("background", backgroundImg, "string");
    if (savedServiceCenter)
      setStorage("savedServiceCenter", savedServiceCenter, "object");
    if (serviceCenter) setStorage("__serviceCenter__", serviceCenter, "object");
    if (vehicleCardSettings)
      setStorage("vehicleCardSettings", vehicleCardSettings, "object");
    if (deviceTKN) setStorage("deviceTKN", deviceTKN, "string");
  };

  export {getStorage, setStorage, logout}