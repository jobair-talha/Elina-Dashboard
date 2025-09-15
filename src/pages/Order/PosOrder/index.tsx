import { use, useEffect, useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import { useProducts } from "../../../services/queries/product";
import ProductCard from "./_components/productCard";
import SmallPagination from "../../../components/pagination/smallPagination";

export default function PosOrderPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 9;
  const { data: products } = useProducts({
    searchTerm: search,
    limit,
    page: currentPage,
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <PageMeta
        title="Pos Order"
        description="Manage your point of sale orders."
      />
      <PageBreadcrumb pageTitle="Pos Order" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
        {/* Left Section - Product Search & List */}
        <div>
          <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-6.5 py-4 dark:border-gray-800">
              <h3 className="font-medium text-black dark:text-white">
                Product Information
              </h3>
            </div>
            <div className="my-4.5 px-3">
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search products by name or SKU"
                className="w-full rounded border border-gray-200 dark:border-gray-800 px-5 py-3 dark:bg-form-input dark:text-white"
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 px-2 pb-4">
              {products?.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="my-4.5 px-3 text-center">
              <SmallPagination
                totalItems={products?.meta?.total || 0}
                currentPage={currentPage}
                limit={limit}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>

        {/* Middle Section - Customer Info */}
        <div>
          <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-6.5 py-4 dark:border-gray-800">
              <h3 className="font-medium text-black dark:text-white">
                Customer Information
              </h3>
            </div>
            <form className="p-6.5">
              <div className="mb-4.5">
                <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                  Phone <span className="text-meta-1">*</span>
                </label>
                <Input type="number" placeholder="Your Mobile" />
              </div>
              <div className="mb-4.5">
                <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                  Name <span className="text-meta-1">*</span>
                </label>
                <Input type="text" placeholder="Your Name" />
              </div>
              <div className="mb-4.5">
                <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                  Address <span className="text-meta-1">*</span>
                </label>
                <TextArea rows={3} placeholder="Address"></TextArea>
              </div>
              <div className="mb-4.5">
                <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                  Notes (Optional)
                </label>
                <TextArea rows={3} placeholder="Notes (Optional)"></TextArea>
              </div>

              <div className="flex gap-5.5 py-2">
                <div className="w-full">
                  <label className="flex items-center cursor-pointer dark:text-white">
                    <input type="radio" name="location" className="hidden" />
                    <div className="mr-2 h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent"></span>
                    </div>
                    Dhaka City
                  </label>
                </div>
                <div className="w-full">
                  <label className="flex items-center cursor-pointer dark:text-white">
                    <input
                      type="radio"
                      name="location"
                      className="hidden"
                      defaultChecked
                    />
                    <div className="mr-2 h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                    </div>
                    Outside Dhaka
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - Cart Info */}
        <div>
          <div className="rounded-sm border  bg-white shadow-default dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b  px-6.5 py-4 dark:border-gray-800">
              <h3 className="font-medium text-black dark:text-white">
                Cart Information
              </h3>
            </div>
            <div className="px-6 py-4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-1 py-3">Product</th>
                    <th className="px-1 py-3 text-center">Price</th>
                    <th className="px-1 py-3 text-center">Qty</th>
                    <th className="px-1 py-3 text-center">SubTotal</th>
                    <th className="px-1 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>{/* Cart items go here */}</tbody>
              </table>

              <div className="mt-4 py-6 space-y-4">
                {/*  {[
                  { label: "Subtotal", value: 0 },
                  { label: "Delivery Charge", value: 0 },
                  { label: "Advanced Pay", value: 0 },
                  { label: "Customer Pay Amount", value: 0 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-6">
                    <label className="block w-30 text-sm font-medium text-black dark:text-white">
                      {item.label}
                    </label>
                    <Input
                      type="number"
                      value={item.value}
                      readOnly={
                        item.label === "Subtotal" ||
                        item.label === "Customer Pay Amount"
                      }
                      className="w-full rounded border px-5 py-3 dark:bg-form-input dark:text-white"
                    />
                  </div>
                ))} */}
                <div className="flex items-center gap-6">
                  <label className="block w-30 text-sm font-medium text-black dark:text-white">
                    Sub Total
                  </label>
                  <Input type="number" />
                </div>
                <div className="flex items-center gap-6">
                  <label className="block w-30 text-sm font-medium text-black dark:text-white">
                    Delivery Charge
                  </label>
                  <Input type="number" />
                </div>
                <div className="flex items-center gap-6">
                  <label className="block w-30 text-sm font-medium text-black dark:text-white">
                    Grand Total
                  </label>
                  <Input type="number" />
                </div>
                <div className="flex items-center gap-6">
                  <label className="block w-30 text-sm font-medium text-black dark:text-white">
                    Discount
                  </label>
                  <Input type="number" />
                </div>
                <div className="flex items-center gap-6">
                  <label className="block w-30 text-sm font-medium text-black dark:text-white">
                    Tatal
                  </label>
                  <Input type="number" />
                </div>
                <div className="flex items-center gap-6">
                  <label className="block w-30 text-sm font-medium text-black dark:text-white">
                    Advanced Pay
                  </label>
                  <Input type="number" />
                </div>

                <p className="font-semibold text-black dark:text-white">
                  Grand Total: <span className="text-lg">0/=</span> (Due: 0)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
