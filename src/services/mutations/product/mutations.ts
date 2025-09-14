import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/api";
import { createProduct, deleteProduct, updateProduct } from "../../api/product";
import { IProduct } from "../../../types/product";


export function useCreateProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: FormData) => createProduct(data),
    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/product-list");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
  });
}
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData | Partial<IProduct> }) =>
      updateProduct(id, payload),
    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/product-list");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
  });
}
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: string) => deleteProduct(data),
    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
  });
}