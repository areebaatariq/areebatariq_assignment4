import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: ({ city, unit }) => 
        `weather?q=${city}&appid=33b4231e679381472deb7533b484a370&units=${unit}`,
    }),
  }),
});

export const { useLazyGetWeatherByCityQuery } = weatherApi;
