import { MdDashboard } from "react-icons/md";
import { GiWashingMachine } from "react-icons/gi";
import { MdElectricalServices } from "react-icons/md";
import { FcInspection } from "react-icons/fc";
import { TbReportSearch } from "react-icons/tb";
import { MdEvent } from "react-icons/md";
import { lazy } from "react";

const DashBoardPage = lazy(() => import("../pages/DashBoard"));
const IOTPage = lazy(() => import("../pages/IOT"));
const EventsPage = lazy(() => import("../pages/Events"));
const ReportsPage = lazy(() => import("../pages/Reports"));
const InspectionPage = lazy(() => import("../pages/Inspection"));
const ServicesPage = lazy(() => import("../pages/Services"));

export const modules = [
    {
        path: "/dashboard",
        icon: MdDashboard,
        element: DashBoardPage,
        title: "DashBoard"
    },
    {
        path: "/iot-beacon",
        icon: GiWashingMachine,
        element: IOTPage,
        title: "IOT Beacon"
    },
    {
        path: "/events",
        icon: MdEvent,
        element: EventsPage,
        title: "Events"
    },
    {
        path: "/reports",
        icon: TbReportSearch,
        element: ReportsPage,
        title: "Reports"
    },
    {
        path: "/inspection",
        icon: FcInspection,
        element: InspectionPage,
        title: "Inspection"
    },
    {
        path: "/services",
        icon: MdElectricalServices,
        element: ServicesPage,
        title: "Services"
    },
]