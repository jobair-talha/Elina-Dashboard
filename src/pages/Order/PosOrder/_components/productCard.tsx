import { API_URL } from "../../../../config";
import { IProduct } from "../../../../types/product";

type IProps = {
  product: IProduct;
};
const ProductCard = ({ product }: IProps) => {
  return (
    <div
      key={product.id}
      className="mx-auto transform overflow-hidden rounded-lg bg-white shadow-md hover:scale-105 hover:shadow-lg dark:bg-white/[0.03] duration-300 cursor-pointer"
    >
      <div className="p-1">
        <div className="relative  flex overflow-hidden rounded-xl">
          <img
            src={`${API_URL}/images/products/${product.thumbnail}`}
            alt={product.name}
            className="w-full object-cover object-center"
          />
          <span className="absolute left-0 top-0 m-2 rounded-full bg-black px-2 text-sm font-medium text-white">
            {product.discount.discountType === "percentage"
              ? `${product.discount.discountValue}% OFF`
              : `৳ ${product.discount.discountValue} OFF`}
          </span>
        </div>
      </div>
      <div className="p-2">
        <h5 className="text-xs font-medium mb-2 text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <div className="flex items-center">
          <p className="text-xs font-semibold text-gray-900 dark:text-white mr-2">
            {product.salePrice}
          </p>
          <p className="text-xs font-medium line-through text-gray-500 dark:text-gray-300">
            {product.regularPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
