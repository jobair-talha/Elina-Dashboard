import React, { useState } from "react";
import Orders from "./_components/Orders";
import PageMeta from "../../../components/common/PageMeta";
import { useForm } from "react-hook-form";
import { FormValues } from "../../../types/global";
import Pagination from "../../../components/pagination";
import { useOrders } from "../../../services/queries/order";

const OrderList = () => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<FormValues>({
    defaultValues: {
      searchTerm: "",
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: orders,
    isLoading,
    isError,
  } = useOrders({
    page: currentPage,
    limit: pageSize,
    searchTerm,
  });
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const onPageSizeChange = (limit: number) => {
    setPageSize(limit);
    setCurrentPage(1);
  };

  const onSearch = (data: FormValues) => {
    setSearchTerm(data.searchTerm);
    setCurrentPage(1);
  };
  const statusOptions = [
    { value: "all", label: "All", count: 40, selected: true },
    { value: "pending", label: "Pending", count: 10, selected: false },
    { value: "processing", label: "Processing", count: 15, selected: false },
    { value: "shipped", label: "Shipped", count: 5, selected: false },
    { value: "delivered", label: "Delivered", count: 25, selected: false },
    { value: "completed", label: "Completed", count: 20, selected: false },
    { value: "cancelled", label: "Cancelled", count: 10, selected: false },
    { value: "refunded", label: "Refunded", count: 5, selected: false },
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading orders.</div>;
  }

  return (
    <>
      <PageMeta
        title="Order List | Eliana Dashboard"
        description="This is the Order List page for the Eliana Dashboard"
      />
      {/* order status filter */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 mb-4">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-theme-sm font-medium ${
              option.selected
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <Orders orders={orders?.data || []} />
        <Pagination
          currentPage={currentPage}
          total={orders?.meta?.total || 0}
          limit={pageSize}
          onPageChange={onPageChange}
          onLimitChange={onPageSizeChange}
        />
      </div>
    </>
  );
};

export default OrderList;
