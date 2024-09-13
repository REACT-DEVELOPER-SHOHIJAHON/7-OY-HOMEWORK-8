import { api } from "./index";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signInUser: build.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, ...productData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: productData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateProductMutation, useSignInUserMutation } = authApi;
