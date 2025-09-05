import api from "../../../lib/api";
import { ApiResponse } from "../../../types/api";
import { Category } from '../../../types/categories';

export const getAllCategory = async (query: {
  [key: string]: string | number;
}): Promise<ApiResponse<Category[]>> => {
  const queryString = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryString.append(key, String(value));
    }
  });

  const response = await api.get(`/categories?${queryString.toString()}`);
  return response.data;
};


export const createCategory = async (
  data: FormData
): Promise<ApiResponse<Category>> => {
  const response = await api.post('/categories', data);
  return response.data;
};

export const updateCategory = async (
  id: string,
  data: FormData | Partial<Category>
): Promise<ApiResponse<Category>> => {
  const response = await api.put(`/categories/${id}`, data);
  console.log(response)
  return response.data;
};

export const deleteCategory = async (id: string): Promise<ApiResponse<Category>> => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

export const getSingleCategory = async (id: string) => {
    return (await api.get<ApiResponse<Category>>(`/categories/${id}`)).data;
};
