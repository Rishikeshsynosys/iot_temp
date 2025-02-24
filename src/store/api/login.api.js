import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LARAVEL_BASE_URL, LARAVEL_ENDPOINT, LOCATORMAIN_ENDPOINT, NODE_BASE_URL, TASKMANAGER_ENDPOINT, TRACCAR_ENDPOINT } from '../../config/api.urls';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: async (args, api, extraOptions) => {
    const url = args.url.includes('/gateway') ? LARAVEL_BASE_URL : NODE_BASE_URL;
    return fetchBaseQuery({ baseUrl: url })(args, api, extraOptions);
  },
  endpoints: (builder) => ({
    validateUser: builder.mutation({
      query: ({ payload, headers }) => ({
        url: `${TASKMANAGER_ENDPOINT}/iot/user/valid`,
        method: 'POST',
        body: payload,
        headers: headers,
      }),
    }),
    postLogin: builder.mutation({
      query: ({ payload, headers }) => ({
        url: `${LARAVEL_ENDPOINT}/user/postlogin`,
        method: 'POST',
        body: payload,
        headers: headers,
      }),
    }),
    manageUser: builder.mutation({
      query: ({ payload, headers }) => ({
        url: `${LOCATORMAIN_ENDPOINT}/user/manage`,
        method: 'POST',
        body: payload,
        headers: headers,
      })
    }),
    manageVehicles: builder.mutation(({
      query : ({payload, headers}) => ({
        url : `${TASKMANAGER_ENDPOINT}/vehicles/manage`,
        method : 'POST',
        body : payload,
        headers : headers
      })
    })),
  }),
});

export const { 
  useValidateUserMutation, 
  usePostLoginMutation, 
  useManageUserMutation,
  useManageVehiclesMutation,
 } = loginApi;

export default loginApi;
