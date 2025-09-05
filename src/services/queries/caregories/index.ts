import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllCategory, getSingleCategory } from '../../api/categories';

export const useAllCategories = (query: { [key: string]: string | number }) => {
  return useQuery({
    queryKey: ['category', query],
    queryFn: () => getAllCategory(query),
    placeholderData: keepPreviousData,
  });
};

export function useSingleCategory(id: string) {
  return useQuery({
    queryKey: ['single-category', id],
    queryFn: () => getSingleCategory(id),
    placeholderData: keepPreviousData,
  });
}
