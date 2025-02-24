import React, { useEffect, useState } from "react";
import Category from "../components/UI/Category";
import Groups from "../components/UI/Groups";
import Card from "../components/UI/Card";
import Machine from "../components/iot-beacon/Machine";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMachine, setGroups, toggleGroupMarkers } from "../store/slice/groups.slice";
import { getStorage } from "../services/LocalStorage";
import SearchInput from "../components/form/SearchInput";
import WebSocket from "../components/Websocket";
import MachineMap from "../components/iot-beacon/MachineMap";
import MachineDetails from "../components/iot-beacon/MachineDetails";
import EventsTable from "../components/iot-beacon/EventsTable";
import InspectionTable from "../components/iot-beacon/InspectionTable";
import Modal from "../components/UI/Modal";
import MachineEditForm from "../components/iot-beacon/MachineEditForm";
import FullPageLoader from "../components/UI/Loader";
import ServicesTable from "../components/iot-beacon/ServicesTable";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";

const IOT = () => {
  
  const isSocketConnected = useSelector(
    (state) => state.groups?.isSocketConnected
  );
  const activeMachine =
    useSelector((state) => state.groups.activeMachine) || {};

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [editModal, setEditModal] = useState(false);
  const [editMachineId, setEditMachineId] = useState(0);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const dispatch = useDispatch();

  const handleCategoryChange = (category = "all") => {
    setSelectedCategory(category);
  };

  // storing the groups and machines in store (Groups)
  useEffect(() => {
    const storedGroups = getStorage("__groups__", "object") ?? [];
    dispatch(setGroups(storedGroups));

    return () => setActiveMachine({});
  }, []);

  const toggleEditModal = (machineId) => {
    if (editModal) {
      setEditModal(false);
      setEditMachineId(0);
      return;
    }
    setEditModal(true);
    setEditMachineId(machineId);
  };

  const toggleFullScreen = () => {
    // case : false to true
    if(!isFullScreen){
      setActiveMachine({});
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <section className="page-container">
        <div className="flex gap-1 h-full">
          {/* left cards */}
          <Card className="relative flex flex-col gap-3 xl:w-3/7 min-w-1/3 xl:min-w-2/7 h-full bg-white p-4">
            <Category
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
            <div className="w-full h-full overflow-auto">
              <Groups
                Component={Machine}
                setEdit={toggleEditModal}
                toggleGroupSelect={toggleGroupMarkers}
                selectedCategory={selectedCategory}
              />
            </div>
          </Card>

          {/* right maps */}
          {isSocketConnected ? (
            <div className="relative flex flex-col gap-1 w-full h-full overflow-y-auto">
              {/* Fullscreen Mode: Only Show the Map */}
              {isFullScreen ? (
                <div className="absolute inset-0 bg-white z-50 flex flex-col">
                  <btn
                    className="absolute top-[10px] right-2 z-50 bg-white text-white px-4 py-2.5 rounded-sm"
                    onClick={toggleFullScreen}
                  >
                    <AiOutlineFullscreenExit size={20} className="text-gray" />
                  </btn>
                  <Card className={`bg-white p-0`}>
                    <MachineMap isFullScreen={isFullScreen} />
                  </Card>
                </div>
              ) : (
                // normal mode show everything
                <>
                  <div className="grid grid-cols-[400px_auto] gap-1">
                    <Card className="bg-white p-4">
                      <MachineDetails machine={activeMachine} />
                    </Card>
                    <Card className="bg-white p-2 relative">
                      <btn
                        className="absolute top-[18px] right-16 z-50 bg-white text-white px-4 py-2.5 rounded-sm"
                        onClick={toggleFullScreen}
                      >
                        <AiOutlineFullscreen size={20} className="text-gray" />
                      </btn>
                      <MachineMap />
                    </Card>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    <Card className="bg-white max-h-[400px] overflow-y-auto p-4">
                      <EventsTable activeMachine={activeMachine} />
                    </Card>
                    <Card className="bg-white p-4">
                      <InspectionTable activeMachine={activeMachine} />
                    </Card>
                  </div>

                  <Card className="bg-white p-4">
                    <ServicesTable />
                  </Card>
                </>
              )}
            </div>
          ) : (
            <FullPageLoader />
          )}
        </div>
      </section>
      <WebSocket />
      <Modal
        modalIsOpen={editModal}
        toggleModal={toggleEditModal}
        heading="Edit Machine"
        className="lg:w-[80%]"
      >
        <MachineEditForm
          editMachineId={editMachineId}
          toggleModal={toggleEditModal}
        />
      </Modal>
    </>
  );
};

export default IOT;
