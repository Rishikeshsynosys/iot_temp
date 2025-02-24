import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import ReportFilter from "../components/reports/reportFilter";
import { useDispatch, useSelector } from "react-redux";
import { getStorage } from "../services/LocalStorage";
import {
  setReportData,
  setReportFilters,
  setReportGroups,
  toggleGroupSelect,
  toggleMachineSelect,
} from "../store/slice/reports.slice";
import { setGroups } from "../store/slice/groups.slice";
import Groups from "../components/UI/Groups";
import ReportMachine from "../components/reports/ReportMachine";
import {NodeRequestHandler} from "../services/Requests";
import {useCreateReportMutation} from "../store/api/reports.api";
import { dummyReports } from "../constants/dummy";
import ReportHeader from "../components/reports/ReportHeader";

const noMachineRequiredReports = [141,140];

const Reports = () => {
  const selectedMachines = useSelector(
    (state) => state.reports.selectedMachines
  );

  const dispatch = useDispatch();

  const [createReport] = useCreateReportMutation();

  const [isLoading, setIsLoading] = useState(false);

  // storing groups in reports reducer
  useEffect(() => {
    const storedGroups = getStorage("__groups__", "object") ?? [];
    dispatch(setReportGroups(storedGroups));
    // for storing in groups slice it will be used globally in Groups component
    dispatch(setGroups(storedGroups));
  }, []);

  const onCreateReport = async (filters) => {
    if (!filters?.reportID) return alert("Please select the report");

    if (selectedMachines?.length === 0 && !noMachineRequiredReports.includes(+filters?.reportID))
      return alert("Please select atleast on machine");

    const vehIDs = selectedMachines?.map((machine) => [
      machine.name,
      machine.uniqueId,
      machine.id,
      machine.category,
    ]);

    const body = {...filters, vehIDs, type : "iotDevices"}
    console.log({body});
    dispatch(setReportFilters(body));

    try {
       setIsLoading(true);
      // pending integration of reports API
        const reportResponse = await NodeRequestHandler(createReport,body);
        if(reportResponse && reportResponse?.statusCode === 200){
          setReportData(reportResponse?.data);
        }
    } catch (error) {
      console.log("Error in report creation : ", error?.message);
    }finally{
      setIsLoading(false);
      // need to remove this later once cors issue is fixed
      setReportData(dummyReports);
    }


  };

  return (
    <>
      <section className="page-container">
        <div className="flex gap-1 h-full">
          <Card className="flex flex-col gap-1.5 xl:w-2/7 min-w-1/3 xl:min-w-2/7 h-full bg-slate-100 p-1">
            <ReportFilter onCreateReport={onCreateReport} isLoading={isLoading} />
            <Groups
              Component={ReportMachine}
              toggleGroupSelect={toggleGroupSelect}
              toggleMachineSelect={toggleMachineSelect}
              parent="reports"
            />
          </Card>
          <Card className="w-full bg-white">
            <ReportHeader/>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Reports;
