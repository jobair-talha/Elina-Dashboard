import { useState } from "react";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableBody,
} from "../../components/ui/table";
import Checkbox from "../../components/form/input/Checkbox";
import Switch from "../../components/form/switch/Switch";
import { Link } from "react-router";
import { DeleteIcon, DuplicateIcon, EditIcon, ViewIcon } from "../../icons";
import Pagination from "../../components/pagination";
import { useProducts } from "../../services/queries/product";
import { API_URL } from "../../config";
import Badge from "../../components/ui/badge/Badge";
import Form from "../../components/form/Form";
import { useForm } from "react-hook-form";
import { IBadgeColortype } from "../../types/product";
type FormValues = {
  searchTerm: string;
};
const Products = () => {
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
    data: products,
    isLoading,
    isError,
  } = useProducts({
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
  const colors: IBadgeColortype[] = [
    "success",
    "primary",
    "warning",
    "info",
    "error",
    "dark",
  ] as const;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  if (isError) {
    return <div>Error loading products.</div>;
  }
  if (isLoading) {
    return <div>Loading products...</div>;
  }
  return (
    <>
      <nav className="mb-4">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
            >
              <svg
                className="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.48994 3.61404C7.79216 3.38738 8.20771 3.38738 8.50993 3.61404L12.3433 6.48904C12.5573 6.64957 12.6833 6.9015 12.6833 7.16904V11.8333C12.6833 12.3028 12.3027 12.6833 11.8333 12.6833H8.64993V10.8333C8.64993 10.4744 8.35892 10.1833 7.99993 10.1833C7.64095 10.1833 7.34993 10.4744 7.34993 10.8333V12.6833H4.1666C3.69716 12.6833 3.3166 12.3028 3.3166 11.8333V7.16904C3.3166 6.9015 3.44257 6.64957 3.6566 6.48904L7.48994 3.61404ZM7.99478 13.9833H4.1666C2.97919 13.9833 2.0166 13.0207 2.0166 11.8333V7.16904C2.0166 6.49231 2.33522 5.85508 2.8766 5.44904L6.70994 2.57404C7.47438 2.00071 8.52549 2.00071 9.28993 2.57404L13.1233 5.44904C13.6647 5.85508 13.9833 6.49232 13.9833 7.16904V11.8333C13.9833 13.0207 13.0207 13.9833 11.8333 13.9833H8.00509C8.00337 13.9833 8.00166 13.9833 7.99993 13.9833C7.99821 13.9833 7.9965 13.9833 7.99478 13.9833Z"
                  fill=""
                ></path>
              </svg>
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
            <span>/</span>
            <span>Products</span>
          </li>
        </ol>
      </nav>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        {/* fileters */}
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-200 dark:border-white/[0.05]">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            {/* Icon */}
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.29 5.904H17.707"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M17.708 14.096H2.291"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12.083 3.333c1.42 0 2.571 1.151 2.571 2.571s-1.151 2.571-2.571 2.571-2.571-1.151-2.571-2.571 1.151-2.571 2.571-2.571Z"
                strokeWidth="1.5"
              />
              <path
                d="M7.917 11.525c-1.42 0-2.571 1.151-2.571 2.571s1.151 2.571 2.571 2.571 2.571-1.151 2.571-2.571-1.151-2.571-2.571-2.571Z"
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>

          <Form onSubmit={handleSubmit(onSearch)}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.042 9.374c0-3.497 2.835-6.332 6.333-6.332s6.334 2.835 6.334 6.332-2.836 6.332-6.334 6.332A6.334 6.334 0 0 1 3.042 9.374Zm6.333-7.832c-4.326 0-7.833 3.506-7.833 7.832s3.507 7.832 7.833 7.832c1.892 0 3.628-.671 4.982-1.787l2.82 2.82a.834.834 0 0 0 1.18-1.18l-2.82-2.82a7.799 7.799 0 0 0 1.851-4.865c0-4.326-3.507-7.832-7.833-7.832Z"
                  />
                </svg>
              </span>
              <input
                {...register("searchTerm")}
                type="text"
                placeholder="Search..."
                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-none xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              />
            </div>
          </Form>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  SKU
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Product
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Categories
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Price
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Stock
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Featured
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Published
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {products?.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={isChecked} onChange={setIsChecked} />
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        {product.sku}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded">
                        <img
                          width={40}
                          height={40}
                          src={`${API_URL}/images/products/${product.thumbnail}`}
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {product.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {product.categories.map((cat, idx) => {
                      const color = colors[idx % colors.length];
                      return (
                        <Badge key={cat.slug} variant="light" color={color}>
                          {cat.name}
                        </Badge>
                      );
                    })}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          product.salePrice &&
                          product.salePrice < product.regularPrice
                            ? "line-through text-gray-400 dark:text-gray-500"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      >
                        {product.regularPrice}
                      </span>
                      {product.salePrice &&
                        product.salePrice < product.regularPrice && (
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {product.salePrice}
                          </span>
                        )}
                      <Badge variant="light" color="error">
                        {product.discount.discountValue}{" "}
                        {product.discount.discountType === "percentage"
                          ? "%"
                          : "Off"}
                      </Badge>{" "}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : product.stock <= 0
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Switch
                      label=""
                      defaultChecked={product.isFeatured}
                      // onChange={handleSwitchChange}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Switch
                      label=""
                      defaultChecked={product.isPublished}
                      // onChange={handleSwitchChange}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/products/view/${product.id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                        title="View Product"
                      >
                        <ViewIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/products/edit/${product.id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                        title="Edit Product"
                      >
                        <DuplicateIcon className="w-5 h-5" />
                      </Link>
                      <Link to={`/products/edit/${product.slug}`} title="Edit">
                        <EditIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/products/delete/${product.id}`}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                        title="Delete Product"
                      >
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600">
                          <DeleteIcon className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          total={products?.meta?.total || 0}
          limit={pageSize}
          onPageChange={onPageChange}
          onLimitChange={onPageSizeChange}
        />
      </div>
    </>
  );
};

export default Products;
