import React, { useEffect, useState } from "react";
import { formatDate } from "../../services/date";
import { useFetchInspectionRecordsByTraccardIdMutation } from "../../store/api/inspection.api";
import { NodeRequestHandler } from "../../services/requests";
import { HiComputerDesktop } from "react-icons/hi2";
import { MdOutlinePhoneIphone } from "react-icons/md";

const InspectionTable = ({ activeMachine }) => {
  const [latestInspections, setLatestInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [fetchInspectionRecordsByTraccarId] =
    useFetchInspectionRecordsByTraccardIdMutation();

  useEffect(() => {
    if (!activeMachine?.id) return;

    setIsLoading(true)
    try {
      const loadInspections = async () => {
        const body = {
          machine: activeMachine,
        };
        const inspections = await NodeRequestHandler(
          fetchInspectionRecordsByTraccarId,
          {
            body,
            traccarId: activeMachine?.id,
          }
        );

        if (
          inspections?.inspectionRecords &&
          inspections?.inspectionRecords?.length > 0
        ) {
          setLatestInspections(inspections?.inspectionRecords);
        }
      };

      loadInspections();
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }, [activeMachine?.id]);

  if (isLoading) return <MiniLoader />;

  return (
    <>
      <h4 className="text-lg font-semibold mb-2">Recent Inspections</h4>
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-2 text-left font-12 text-gray">Date</th>
              <th className="p-2 text-left font-12 text-gray">Inspected By</th>
              <th className="p-2 text-left font-12 text-gray">Score</th>
            </tr>
          </thead>
          <tbody>
            {!latestInspections ||
              (latestInspections?.length === 0 && (
                <tr>
                  <td className="p-2 font-12 text-gray bg-blue-50" colSpan={3}>
                    No Inspections To Display
                  </td>
                </tr>
              ))}
            {latestInspections.map((inspection, index) => (
              <tr
                key={index}
                className={`
                  border-b border-gray-200 
                  hover:bg-gray-50 transition-colors duration-150 ease-in-out
                  ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                `}
              >
                <td className={`p-2 font-12 text-gray`}>
                  {formatDate(inspection?.createdAt, "dd-MM-yyyy hh:mm:ss a")}
                </td>
                <td className="p-2 font-12 text-gray flex items-center gap-1">
                  {inspection?.uploadedFrom === "web" ? (
                    <HiComputerDesktop className="text-gray" size={18} title="Inspected from web" />
                  ) : (
                    <MdOutlinePhoneIphone className="text-gray" size={18} title="Inspected from app"/>
                  )}
                  {inspection?.inspectorSignature?.name || "--"}
                </td>
                <td className="p-2 font-12 text-gray text-wrap cursor-pointer">
                  <span className="line-clamp-2">{inspection?.score ?? 0}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InspectionTable;
