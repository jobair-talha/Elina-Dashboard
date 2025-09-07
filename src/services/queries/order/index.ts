import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllOrders, getSingleOrder } from "../../api/order";

export const useOrders = (query: { [key: string]: string | number }) => {
    return useQuery({
        queryKey: ["orders", query],
        queryFn: () => getAllOrders(query),
        placeholderData: keepPreviousData,
    });
};

export function useSingleOrder(id: string) {
    return useQuery({
        queryKey: ["single-order", id],
        queryFn: () => getSingleOrder(id),
        placeholderData: keepPreviousData,
    });
}