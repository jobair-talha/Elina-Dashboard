import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { createSlider, deleteSlider, updateSlider } from "../../api/slider";
import { ErrorResponse } from "../../../types/api";
import { Slider } from "../../../types/slider";


export function useCreateSlider() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: FormData) => createSlider(data),
    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/slider-list");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["slider"] });
      }
    },
  });
}
export function useUpdateSlider() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData | Partial<Slider> }) =>
      updateSlider(id, payload),
    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/slider-list");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["slider"] });
      }
    },
  });
}
export function useDeleteSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: string) => deleteSlider(data),
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
        await queryClient.invalidateQueries({ queryKey: ["slider"] });
      }
    },
  });
}