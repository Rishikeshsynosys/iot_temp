import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LARAVEL_BASE_URL, LARAVEL_ENDPOINT, LOCATORMAIN_ENDPOINT, NODE_BASE_URL, TASKMANAGER_ENDPOINT, TRACCAR_ENDPOINT } from '../../config/api.urls';


export const inspectionsApi = createApi({
    reducerPath: 'inspectionsApi',
    baseQuery: async (args, api, extraOptions) => {
        const url = args.url.includes('/gateway') ? LARAVEL_BASE_URL : NODE_BASE_URL;
        return fetchBaseQuery({ baseUrl: url })(args, api, extraOptions);
    },
    tagTypes: ["Inspections"],
    endpoints: (builder) => ({
        fetchInspectionRecordsByTraccardId: builder.mutation({
            query: ({ payload: { body, traccarId }, headers }) => ({
                url: `${TASKMANAGER_ENDPOINT}/inspection/iot/records/${traccarId}`,
                method: "POST",
                body: body,
                headers: headers,
                invalidatesTags: ["Events"],
            }),
        }),
    }),
});

export const {
    useFetchInspectionRecordsByTraccardIdMutation,
} = inspectionsApi;

export default inspectionsApi;