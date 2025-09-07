
import api from "../../../lib/api";
import { ApiResponse } from "../../../types/api";
import { IProduct } from "../../../types/product";

export const getAllProducts = async (query: { [key: string]: string | number }): Promise<ApiResponse<IProduct[]>> => {
    const queryString = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            queryString.append(key, String(value));
        }
    });
    const response = await api.get(`/products?${queryString}`);
    return response.data;
};

export const createProduct = async (data: FormData): Promise<ApiResponse<IProduct>> => {
    const response = await api.post("/products", data);
    return response.data;
};

export const updateProduct = async (id: string, data: FormData | Partial<IProduct>): Promise<ApiResponse<IProduct>> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id: string): Promise<ApiResponse<IProduct>> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const getSingleProduct = async (id: string) => {
    return (await api.get<ApiResponse<IProduct>>(`/products/${id}`)).data;
};