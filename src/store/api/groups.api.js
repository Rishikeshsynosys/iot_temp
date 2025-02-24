import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LARAVEL_BASE_URL, LARAVEL_ENDPOINT, LOCATORMAIN_ENDPOINT, NODE_BASE_URL, TASKMANAGER_ENDPOINT, TRACCAR_ENDPOINT } from '../../config/api.urls';


export const groupsApi = createApi({
    reducerPath: 'groupsApi',
    baseQuery: async (args, api, extraOptions) => {
        const url = args.url.includes('/gateway') ? LARAVEL_BASE_URL : NODE_BASE_URL;
        return fetchBaseQuery({ baseUrl: url })(args, api, extraOptions);
    },
    tagTypes: ["Machines"],
    endpoints: (builder) => ({
        fetchSingleObjectDetails: builder.query({
            query: ({ editMachineId, headers }) => ({
                url: `${LARAVEL_ENDPOINT}/user/getSingleObjectDetails/${editMachineId}`,
                method: "GET",
                headers: headers,
            }),
            providesTags:["Machines"]
        }),

        editObject: builder.mutation({
            query:({payload:{body, editMachineId}, headers}) => ({
                url: `${LARAVEL_ENDPOINT}/user/editObject/${editMachineId}`,
                method: "POST",
                body : body,
                headers: headers,
            }),
            invalidatesTags:["Machines"]
        })
    }),
});

export const {
    useFetchSingleObjectDetailsQuery,
    useEditObjectMutation
} = groupsApi;

export default groupsApi;