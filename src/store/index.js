import { configureStore } from "@reduxjs/toolkit";
import loginApi from "./api/login.api";
import groupsReducer from "./slice/groups.slice";
import eventsReducer from "./slice/events.slice";
import reportsReducer from "./slice/reports.slice"
import eventsApi from "./api/events.api";
import groupsApi from "./api/groups.api";
import inspectionsApi from "./api/inspection.api";
import reportsApi from "./api/reports.api";

const apiMiddlewares = [
    loginApi.middleware,
    eventsApi.middleware,
    groupsApi.middleware,
    inspectionsApi.middleware,
    reportsApi.middleware
]

const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
        [groupsApi.reducerPath]: groupsApi.reducer,
        [inspectionsApi.reducerPath]: inspectionsApi.reducer,
        [reportsApi.reducerPath]: reportsApi.reducer,
        groups: groupsReducer,
        events: eventsReducer,
        reports: reportsReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiMiddlewares),

    devTools: true,
});

export default store;