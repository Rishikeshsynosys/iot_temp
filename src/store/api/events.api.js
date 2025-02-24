import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LARAVEL_BASE_URL, LARAVEL_ENDPOINT, LOCATORMAIN_ENDPOINT, NODE_BASE_URL, TASKMANAGER_ENDPOINT, TRACCAR_ENDPOINT } from '../../config/api.urls';


export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: async (args, api, extraOptions) => {
        const url = args.url.includes('/gateway') ? LARAVEL_BASE_URL : NODE_BASE_URL;
        return fetchBaseQuery({ baseUrl: url })(args, api, extraOptions);
    },
    tagTypes: ["Events"],
    endpoints: (builder) => ({
        fetchEvents: builder.mutation({
            query: ({ payload: { body, startDate, endDate }, headers }) => ({
                url: `${LARAVEL_ENDPOINT}/event/getAllEvents/${startDate}/${endDate}`,
                method: "POST",
                body: body,
                headers: headers,
                invalidatesTags: ["Events"],
            }),
        }),
    }),
});

export const {
    useFetchEventsMutation,
} = eventsApi;

export default eventsApi;