import api from "../../../lib/api";
import { ApiResponse } from "../../../types/api";
import { IOrder } from "../../../types/order";

export const getAllOrders = async (query: { [key: string]: string | number }): Promise<ApiResponse<IOrder[]>> => {
    const queryString = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            queryString.append(key, String(value));
        }
    });
    const response = await api.get(`/orders?${queryString}`);
    return response.data;
};

export const createOrder = async (data: FormData | Partial<IOrder>): Promise<ApiResponse<IOrder>> => {
    const response = await api.post("/orders", data);
    return response.data;
};

export const updateOrder = async (id: string, data: FormData | Partial<IOrder>): Promise<ApiResponse<IOrder>> => {
    const response = await api.put(`/orders/${id}`, data);
    return response.data;
};

export const deleteOrder = async (id: string): Promise<ApiResponse<IOrder>> => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
};

export const getSingleOrder = async (id: string) => {
    return (await api.get<ApiResponse<IOrder>>(`/orders/${id}`)).data;
};
