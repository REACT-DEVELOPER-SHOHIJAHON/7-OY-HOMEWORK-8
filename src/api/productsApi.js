import { api } from "./index"; // Asosiy API konfiguratsiyasi import qilinmoqda

// Asosiy API ga oxirgi nuqtalarni kiritish
const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Mahsulotlar roʻyxatini olish uchun oxirgi nuqta
    getProducts: build.query({
      query: () => ({
        url: "/products", // Mahsulotlarni olish uchun API so'nggi nuqtasi
      }),
      providesTags: ["PRODUCTS"],
    }),

    updateProduct: build.mutation({
      query: ({ id, title }) => ({
        url: `/products/${id}`, // Mahsulotni yangilash uchun API so'nggi nuqtasi
        method: "PUT", // Yangilash uchun HTTP usuli
        body: { title }, // Yangilangan sarlavhani o'z ichiga olgan
      }),
      invalidatesTags: ["PRODUCTS"], // Ma'lumotlarni yangilash uchun keshni bekor qiladi
    }),
  }),
});

// Ushbu so'nggi nuqtalardan foydalanish uchun komponentlar uchun eksport qilinmoqda
export const { useUpdateProductMutation, useGetProductsQuery } = productsApi;

export default productsApi;
