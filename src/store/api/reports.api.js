import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LARAVEL_BASE_URL, LARAVEL_ENDPOINT, LOCATORMAIN_ENDPOINT, NODE_BASE_URL, REPORTS_ENDPOINT, TASKMANAGER_ENDPOINT, TRACCAR_ENDPOINT } from '../../config/api.urls';


export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: async (args, api, extraOptions) => {
        const url = args.url.includes('/gateway') ? LARAVEL_BASE_URL : NODE_BASE_URL;
        return fetchBaseQuery({ baseUrl: url, credentials: 'include' })(args, api, extraOptions);
    },
    tagTypes: ["Reports"],
    endpoints: (builder) => ({
        createReport: builder.mutation({
            query: ({ payload: { body }, headers }) => ({
                url: `${REPORTS_ENDPOINT}/create/`,
                method: "POST",
                body: body,
                headers: headers,
                invalidatesTags: ["Reports"],
            }),
        }),
    }),
});

export const {
    useCreateReportMutation,
} = reportsApi;

export default reportsApi;