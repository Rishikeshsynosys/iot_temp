import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import EventFilter from "../components/events/EventFilter";
import EventTable from "../components/events/EventTable";
import { useDispatch } from "react-redux";
import { setGroups } from "../store/slice/groups.slice";
import { getStorage } from "../services/LocalStorage";
import { useFetchEventsMutation } from "../store/api/events.api";
import { LaravelRequestHandler } from "../services/requests";
import { dummyEvents100 } from "../constants/dummy";
import EventMap from "../components/events/EventMap";
// import Pagination from "../components/UI/Pagination";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  const [fetchEvents] = useFetchEventsMutation();
  const dispatch = useDispatch();

  const handleFilterSubmit = async (payload = {}) => {
    setIsLoading(true);
    try {
      const body = {
        eventtype: payload?.eventType || "ignition",
        vehicles: payload?.selectedVehicles || [],
      };

      const events = await LaravelRequestHandler(fetchEvents, {
        body,
        startDate: payload?.startDate,
        endDate: payload?.endDate,
      });

      if (events && events?.length > 0) {
        console.log("original");
        setEvents(events[0]);
      }
      // Need to comment this later
      else {
        console.log("dummy");
        setEvents(dummyEvents100);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedGroups = getStorage("__groups__", "object") ?? [];
    dispatch(setGroups(storedGroups));
  }, []);

  return (
    <div className="page-container">
      <div className="grid grid-cols-3 gap-2 h-full w-full">
        {/* filters & Table */}
        <Card className="col-span-2 p-4">
          {/* Filters */}
          <EventFilter handleFilterSubmit={handleFilterSubmit} />
          {/* Table */}
          <EventTable
            events={events}
            isLoading={isLoading}
            setActiveEvent={setActiveEvent}
          />
          {/* <Pagination/> */}
        </Card>
        {/* Map */}
        <Card className="col-span-1 p-1">
          <EventMap activeEvent={activeEvent} setActiveEvent={setActiveEvent} />
        </Card>
      </div>
    </div>
  );
};

export default Events;
