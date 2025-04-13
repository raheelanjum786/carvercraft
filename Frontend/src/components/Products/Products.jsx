import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import ProductCard from "../../content/ProductsCard/productCard";
import { useSearchParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import api from "../../utils/axios";

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/products/get"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (category) {
      setFilteredProducts(
        products.filter((product) => product.categoryId == category)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <>
      <div className="relative bg-[#310A0B] pb-16 min-h-screen">
        {/* Heading and Description */}
        <div className="relative z-10 text-center pt-24 px-4">
          <h1 className="text-3xl sm:text-4xl text-[#E0A387] font-bold">
            Our Products
          </h1>
          <p className="text-[#E0A387] mt-2 text-sm sm:text-base">
            Explore our exclusive range of products designed just for you.
          </p>
        </div>

        {/* Filter Section */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 gap-4 z-10 relative">
          <h2 className="text-lg sm:text-xl text-[#E0A387]">
            Filter Products:
          </h2>
          <select
            className="bg-[#E0A387] text-[#310A0B] p-2 sm:p-3 rounded w-full sm:w-auto"
            onChange={(e) =>
              (window.location.search = `?category=${e.target.value}`)
            }
          >
            <option value="all">All</option>
            <option value="new">New Arrivals</option>
            <option value="sale">On Sale</option>
          </select>
        </div> */}

        {/* Content Container */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 p-4 sm:p-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
