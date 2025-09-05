import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { createCategory, deleteCategory, updateCategory } from '../../api/categories';
import { ErrorResponse } from '../../../types/api';
import { Category } from '../../../types/categories';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: FormData) => createCategory(data),
    onMutate: () => {
      console.log('mutate');
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message); 
      navigate('/category-list');
    },

    onSettled: async (_, error) => {
      console.log('settled');
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['category'] });
      }
    },
  });
}
export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: FormData | Partial<Category>;
    }) => updateCategory(id, payload),
    onMutate: () => {
      console.log('mutate');
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/category-list');
    },

    onSettled: async (_, error) => {
      console.log('settled');
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['category'] });
      }
    },
  });
}
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: string) => deleteCategory(data),
    onMutate: () => {
      console.log('mutate');
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onSettled: async (_, error) => {
      console.log('settled');
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['category'] });
      }
    },
  });
}
