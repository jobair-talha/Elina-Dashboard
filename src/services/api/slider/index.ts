
import api from "../../../lib/api";
import { ApiResponse } from "../../../types/api";
import { Slider } from "../../../types/slider";

export const getAllSliders = async (query: { [key: string]: string | number }): Promise<ApiResponse<Slider[]>> => {
    const queryString = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (!value) {
            queryString.append(key, String(value));
        }
    });

    const response = await api.get(`/slider?${queryString}`);
    return response.data;
};

export const createSlider = async (data: FormData): Promise<ApiResponse<Slider>> => {
    const response = await api.post("/slider", data);
    return response.data;
};

export const updateSlider = async (id: string, data: FormData | Partial<Slider>): Promise<ApiResponse<Slider>> => {
    const response = await api.put(`/slider/${id}`, data);
    return response.data;
};

export const deleteSlider = async (id: string): Promise<ApiResponse<Slider>> => {
    const response = await api.delete(`/slider/${id}`);
    return response.data;
};

export const getSingleSlider = async (id: string) => {
    return (await api.get<ApiResponse<Slider>>(`/slider/${id}`)).data;
};