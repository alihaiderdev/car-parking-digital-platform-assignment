import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../constants';
import { IArea, IAreas } from '../../models/area.model';
import { IParking, IParkings } from '../../models/parking.model';
import { IBooking, IBookings } from '../../models/booking.model';

// credentials: 'include', // This allows server to set cookies

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: constants.SERVER_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, globalSettings) => {
      const { getState, extra, endpoint, type, forced } = globalSettings;
      // const token = getState().auth.token;
      const token = JSON.parse(localStorage.getItem('user')!)?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    validateStatus: (response, body) => {
      console.log({ response, body });
      if (body?.isUnAuthorized) {
        localStorage.setItem('user', JSON.stringify({}));
        // location.replace('/sign-in');
        console.log('isUnAuthorized', body?.isUnAuthorized);
        // redirect('/sign-in');
        return false;
      } else {
        return true;
      }
    }
  }),
  tagTypes: ['User', 'Area', 'Parking', 'Booking'],
  endpoints: (builder) => ({
    // user related queries and mutations
    register: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/register`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['User']
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/login`,
          method: 'POST',
          body: data
        };
      }
    }),

    // user related queries and mutations
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ['User']
    }),
    getUsers: builder.query({
      query: (params) => `/users${params}`,
      providesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['User']
    }),

    // area related queries and mutations
    createArea: builder.mutation({
      query: (data) => {
        return {
          url: `/areas`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Area']
    }),
    getArea: builder.query<IArea, string>({
      query: (id) => `/areas/${id}`,
      providesTags: ['Area']
    }),
    getAreas: builder.query<IAreas, void>({
      query: () => `/areas`,
      providesTags: ['Area']
    }),
    updateArea: builder.mutation({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/areas/${id}`,
          method: 'PATCH',
          body: rest
        };
      },
      invalidatesTags: ['Area']
    }),
    deleteArea: builder.mutation({
      query: (id) => {
        return {
          url: `/areas/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Area']
    }),

    // parking related queries and mutations
    createParking: builder.mutation({
      query: (data) => {
        return {
          url: `/parkings`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Parking']
    }),
    getParking: builder.query<IParking, string>({
      query: (id) => `/parkings/${id}`,
      providesTags: ['Parking']
    }),
    getParkings: builder.query<IParkings, string>({
      query: (areaId) => `/parkings?area=${areaId}`,
      providesTags: ['Parking']
    }),
    updateParking: builder.mutation({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/parkings/${id}`,
          method: 'PATCH',
          body: rest
        };
      },
      invalidatesTags: ['Parking']
    }),
    deleteParking: builder.mutation({
      query: (id) => {
        return {
          url: `/parkings/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Parking']
    }),

    // booking related queries and mutations
    createBooking: builder.mutation({
      query: (data) => {
        return {
          url: `/bookings`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Booking', 'Parking']
    }),
    getBooking: builder.query<IBooking, string>({
      query: (id) => `/bookings/${id}`,
      providesTags: ['Booking']
    }),
    getBookings: builder.query<IBookings, void>({
      query: () => `/bookings`,
      providesTags: ['Booking']
    }),
    updateBooking: builder.mutation({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/bookings/${id}`,
          method: 'PATCH',
          body: rest
        };
      },
      invalidatesTags: ['Booking']
    }),
    deleteBooking: builder.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Booking']
    })
  })
});

export const {
  // auth related queries and mutations
  useRegisterMutation,
  useLoginMutation,

  // auth related queries and mutations
  useGetUserQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useDeleteUserMutation,

  // area related queries and mutations
  useCreateAreaMutation,
  useGetAreaQuery,
  useGetAreasQuery,
  useLazyGetAreasQuery,
  useUpdateAreaMutation,
  useDeleteAreaMutation,

  // parking related queries and mutations
  useCreateParkingMutation,
  useGetParkingQuery,
  useGetParkingsQuery,
  useLazyGetParkingsQuery,
  useUpdateParkingMutation,
  useDeleteParkingMutation,

  // booking related queries and mutations
  useCreateBookingMutation,
  useGetBookingQuery,
  useGetBookingsQuery,
  useLazyGetBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation
} = api;
