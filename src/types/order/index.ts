export interface IOrderProduct {
    product: {
        _id: string;
        id: string;
        name: string;
        sku: string;
        thumbnail: string;
    };
    quantity: number;
    price: number;
    returns: number;
    _id: string;
    id: string;
}

export interface ICustomerInfo {
    name: string;
    address: string;
    mobile: string;
    email?: string;
}

export interface IShippingInfo {
    name: string;
    address: string;
    mobile: string;
    email?: string;
}

export interface IOrder {
    _id: string;
    id: string;
    serial: string;
    user: string; // ObjectId as string
    customerInfo: ICustomerInfo;
    shippingInfo: IShippingInfo;
    products: IOrderProduct[];
    totalAmount: number;
    shippingAmount: number;
    discountAmount: number;
    totalProductsPrice: number;
    paymentMethod: string;
    paymentStatus: "pending" | "paid" | "failed" | "refunded";
    payAmount: number;
    remainingPayableAmount: number;
    deliveryStatus: "pending" | "shipped" | "delivered" | "returned";
    orderStatus:
    | "pending"
    | "processing"
    | "completed"
    | "cancelled"
    | "hold"
    | "shipped"
    | "delivered"
    | "courier_delivered"
    | "returned"
    | "persial_delivered"
    | "refunded"
    | "courier_cancelled";
    createdAt: string;
    updatedAt: string;
    __v: number;
}
