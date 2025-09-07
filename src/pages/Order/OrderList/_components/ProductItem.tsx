import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IOrderProduct } from "../../../../types/order";
import { API_URL } from "../../../../config";
type IProps = {
  orderProducts: IOrderProduct[];
};
const ProductItem = ({ orderProducts }: IProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };
  return (
    <div className="w-32 sm:w-48">
      <Slider {...settings}>
        {orderProducts.map((product, index) => (
          <div key={index} className="p-1">
            <div className="flex gap-2">
              <div className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] overflow-hidden rounded-md">
                <img
                  src={`${API_URL}/images/products/${product.product.thumbnail}`}
                  className="h-full w-full object-cover"
                  alt={product.product.name}
                />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {product.product.name}
                </p>
                <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                  {product.price} x {product.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductItem;
