import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProducts, getSingleProduct } from "../../api/product";

export const useProducts = (query: { [key: string]: string | number }) => {
    return useQuery({
        queryKey: ["products", query],
        queryFn: () => getAllProducts(query),
        placeholderData: keepPreviousData
    });
};

export function useSingleProduct(id: string) {
    return useQuery({
        queryKey: ["single-product", id],
        queryFn: () => getSingleProduct(id),
        placeholderData: keepPreviousData,
    });
}