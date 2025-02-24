export const eventOptions = [
    {
        value: "all",
        title: "All"
    },
    {
        value: "ignition",
        title: "Ignition"
    },
    {
        value: "geozone",
        title: "Geozone"
    },
    {
        value: "speed",
        title: "Speed"
    },
];


export const reportOptions = [
    {
        value : 140,
        title : "Machine Inventory Report"
    },
    {
        value : 141,
        title : "Unutilized Machines Report"
    }
];

export const getReportName = (reportID) => reportOptions?.find((report) => report.value === +reportID).name