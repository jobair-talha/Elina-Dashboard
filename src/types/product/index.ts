export type IProduct = {
    discount: {
        discountType: "percentage" | "fixed";
        discountValue: number;
    };
    _id: string;
    id: string;
    name: string;
    slug: string;
    description: string;
    sku: string;
    categories: { name: string; slug: string }[];
    galleryImages: string[];
    thumbnail: string;
    regularPrice: number;
    salePrice: number;
    flashPrice: number;
    stock: number;
    isInStock: boolean;
    isFeatured: boolean;
    isNewProduct: boolean;
    isFlashSale: boolean;
    isBestSelling: boolean;
    isPublished: boolean;
    purchaseQuantity: number;
    totalPurchased: number;
    sellsQuantity: number;
    totalSales: number;
    totalStock: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type IBadgeColortype =
    | "primary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "light"
    | "dark";