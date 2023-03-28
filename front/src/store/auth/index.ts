import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Payload = { login: string; password: string };

type ResponseDTO = { access_token: string };

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
  }),
  endpoints: (build) => ({
    login: build.mutation<ResponseDTO, Payload>({
      query: (body) => ({
        url: "signIn",
        method: "POST",
        body,
      }),
      transformResponse: (response: ResponseDTO) => {
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
