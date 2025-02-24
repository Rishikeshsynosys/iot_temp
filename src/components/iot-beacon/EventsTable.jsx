import React, { useEffect, useState } from "react";
import { formatDate } from "../../services/date";
import { addDays, setHours, setMinutes, setSeconds } from "date-fns";
import { useFetchEventsMutation } from "../../store/api/events.api";
import { dummyEvents } from "../../constants/dummy";
import { LaravelRequestHandler } from "../../services/requests";
import MiniLoader from "../UI/MiniLoader";

const EventsTable = ({ activeMachine }) => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [fetchEvents] = useFetchEventsMutation();

  useEffect(() => {
    if (!activeMachine?.id) return;
    setIsLoading(true);
    try {
      const loadEvents = async () => {
        const startDate = formatDate(
          setHours(setMinutes(setSeconds(new Date(), 0), 0), 0)
        );
        const endDate = formatDate(
          setHours(setMinutes(setSeconds(addDays(new Date(), 1), 0), 0), 0)
        );

        const body = {
          eventtype: "ignition",
          vehicles: [{ id: activeMachine?.id }],
        };
        const events = await LaravelRequestHandler(fetchEvents, {
          body,
          startDate,
          endDate,
        });

        if (events && events?.length > 0) {
          setTodayEvents(events[0]);
        }
        // Need to comment this later
        else {
          setTodayEvents(dummyEvents);
        }
      };
      loadEvents();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [activeMachine?.id]);

  if (isLoading) return <MiniLoader />;

  return (
    <>
      <h4 className="text-lg font-semibold mb-2">Latest Events</h4>
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-2 text-left font-12 text-gray">Type</th>
              <th className="p-2 text-left font-12 text-gray">Date</th>
              <th className="p-2 text-left font-12 text-gray">Address</th>
            </tr>
          </thead>
          <tbody>
            {!todayEvents ||
              (todayEvents?.length === 0 && (
                <tr>
                  <td className="p-2 font-12 text-gray bg-blue-50" colSpan={3}>
                    No Events To Display
                  </td>
                </tr>
              ))}
            {todayEvents.map((event, index) => (
              <tr
                key={index}
                className={`
                  border-b border-gray-200 
                  hover:bg-gray-50 transition-colors duration-150 ease-in-out
                  ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                `}
              >
                <td
                  className={`p-2 font-12 font-medium ${
                    event.type === "ignitionOn"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {event.type}
                </td>
                <td className="p-2 font-12 text-gray">
                  {formatDate(event?.date, "dd-MM-yyyy hh:mm:ss a")}
                </td>
                <td
                  title={event?.address}
                  className="p-2 font-12 text-gray text-wrap cursor-pointer"
                >
                  <span className="line-clamp-2">{event?.address}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EventsTable;
