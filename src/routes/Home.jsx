import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../api/productsApi";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [updateProduct, { isLoading: isUpdating, isError, error }] =
    useUpdateProductMutation();
  const [updatedTitles, setUpdatedTitles] = useState({});
  const [search, setSearch] = useState("");

  const handleTitleChange = (e, productId) => {
    setUpdatedTitles({
      ...updatedTitles,
      [productId]: e.target.value,
    });
  };

  const handleUpdate = async (e, product) => {
    e.preventDefault();
    const newTitle = updatedTitles[product.id] || product.title;

    if (!newTitle.trim()) return;

    try {
      await updateProduct({ id: product.id, title: newTitle }).unwrap();
      setUpdatedTitles({ ...updatedTitles, [product.id]: "" });
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100">
      <nav className="bg-yellow-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-bold text-white hover:text-yellow-300 transition-colors"
          >
            Platzi Products
          </Link>
          <div className="space-x-4">
            <Link
              to="/"
              className="text-lg text-white hover:text-yellow-300 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-lg text-white hover:text-yellow-300 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-yellow-400 p-3 w-full md:w-1/2 lg:w-1/3 mx-auto mb-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {isLoading ? (
          <div className="text-center text-gray-800">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-yellow-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
              >
                <img
                  src={product.category.image}
                  alt={product.title}
                  className="w-full h-64 object-cover mb-4"
                />
                <div className="p-4">
                  <p className="text-xl font-semibold mb-2 text-yellow-800">
                    {product.title}
                  </p>
                  <p className="text-gray-800 mb-4">${product.price}</p>

                  <form onSubmit={(e) => handleUpdate(e, product)}>
                    <input
                      value={updatedTitles[product.id] || ""}
                      onChange={(e) => handleTitleChange(e, product.id)}
                      type="text"
                      placeholder="Update title"
                      className="border border-yellow-300 p-2 w-full mb-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 ease-in-out"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Updating..." : "Update"}
                    </button>
                  </form>
                  {isError && (
                    <p className="text-red-500 mt-2">
                      Update failed: {error.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
