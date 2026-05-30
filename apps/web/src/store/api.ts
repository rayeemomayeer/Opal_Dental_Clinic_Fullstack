import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Central RTK Query API slice. Feature endpoints are added with
 * `api.injectEndpoints(...)` so the bundle stays code-split per feature.
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  }),
  tagTypes: ["Appointment", "Service", "Testimonial"],
  endpoints: () => ({}),
});
