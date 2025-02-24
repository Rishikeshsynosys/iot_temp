import React from "react";
import MiniLoader from "../UI/MiniLoader";
import { getEventColorsBg } from "../../services/position";

const EventTable = ({ events, isLoading, setActiveEvent }) => {
  if (isLoading) return <MiniLoader />;

  if (!events || events.length === 0) {
    return (
      <div className="flex-row-center items-center w-full h-full max-h-[calc(100vh-11.5rem)] my-auto">
        <div className="p-10 outline-2 outline-dotted outline-offset-8 outline-gray-300">
          No Events available to Display
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto max-h-[calc(100vh-11.5rem)] rounded-sm mt-5">
      <table className="min-w-full">
        {events.map((device, deviceIndex) => (
          <React.Fragment key={deviceIndex}>
            <thead>
              <tr>
                <th
                  className="bg-blue-100 text-blue font-semibold px-2 py-2 font-12"
                  colSpan={6}
                >
                  <div className="flex items-center">{device?.name}</div>
                </th>
              </tr>
              <tr className="bg-gray">
                <th className="px-6 py-2 text-left font-12 font-semibold text-white uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-2 text-left font-12 font-semibold text-white uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-2 text-left font-12 font-semibold text-white uppercase tracking-wider">
                  Latitude
                </th>
                <th className="px-6 py-2 text-left font-12 font-semibold text-white uppercase tracking-wider">
                  Longitude
                </th>
                <th className="px-6 py-2 text-left font-12 font-semibold text-white uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-2 text-left font-12 font-semibold text-white uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <React.Fragment key={deviceIndex}>
                {device?.events?.length > 0 ? (
                  device.events.map((event, eventIndex) => (
                    <tr
                      key={eventIndex}
                      className="hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                      onClick={() =>
                        setActiveEvent({ ...event, machineName: device?.name })
                      }
                    >
                      <td className="px-6 py-2 whitespace-nowrap font-12 font-medium text-gray-900">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${getEventColorsBg(
                            event?.type
                          )}`}
                        >
                          {event?.type}
                        </span>
                      </td>
                      <td className="px-6 py-2  font-12 text-gray">
                        {event?.date || "--"}
                      </td>
                      <td className="px-6 py-2 font-12 text-gray">
                        {event?.latitude || "--"}
                      </td>
                      <td className="px-6 py-2  font-12 text-gray">
                        {event?.longitude || "--"}
                      </td>
                      <td className="px-6 py-2 break-words font-12 text-gray">
                        {event?.content || "--"}
                      </td>
                      <td className="px-6 py-2 font-12 text-gray text-wrap max-w-[300px] break-words">
                        {event?.address || "No address found"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-6 py-2 break-words font-12 text-gray"
                      colSpan={6}
                    >
                      No Events Found
                    </td>
                  </tr>
                )}

                {}
              </React.Fragment>
            </tbody>
          </React.Fragment>
        ))}
      </table>
    </div>
  );
};

export default EventTable;
