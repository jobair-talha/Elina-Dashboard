import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className="mx-auto transform overflow-hidden rounded-lg bg-white shadow-md hover:scale-105 hover:shadow-lg dark:bg-white/[0.03] duration-300"
    >
      <div className="p-2">
        <div className="relative mx-3 mt-3 flex overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover object-center"
          />
          <span className="absolute left-0 top-0 m-2 rounded-full bg-black px-2 text-sm font-medium text-white">
            {product.discount} OFF
          </span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
          {product.name}
        </h2>
        <div className="flex items-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mr-2">
            ৳ {product.price}
          </p>
          <p className="text-sm font-medium line-through text-gray-500 dark:text-gray-300">
            ৳ {product.originalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
