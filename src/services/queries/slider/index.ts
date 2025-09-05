import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllSliders, getSingleSlider } from "../../api/slider";

export const useSliders = (query: { [key: string]: string | number }) => {
    return useQuery({
        queryKey: ["slider", query],
        queryFn: () => getAllSliders(query),
        placeholderData: keepPreviousData
    });
};

export function useSingleSlider(id: string) {
    return useQuery({
        queryKey: ["single-slider", id],
        queryFn: () => getSingleSlider(id),
        placeholderData: keepPreviousData,
    });
}