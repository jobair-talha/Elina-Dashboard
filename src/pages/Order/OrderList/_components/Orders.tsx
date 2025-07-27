import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import Badge from "../../../../components/ui/badge/Badge";
import Form from "../../../../components/form/Form";
import Checkbox from "../../../../components/form/input/Checkbox";
import { Link } from "react-router";

// Product type
interface Product {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
}

// Table data
const tableData: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 13”",
    variants: "2 Variants",
    category: "Laptop",
    price: "$2399.00",
    status: "Delivered",
    image: "/images/product/product-01.jpg",
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    variants: "1 Variant",
    category: "Watch",
    price: "$879.00",
    status: "Pending",
    image: "/images/product/product-02.jpg",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    variants: "2 Variants",
    category: "SmartPhone",
    price: "$1869.00",
    status: "Delivered",
    image: "/images/product/product-03.jpg",
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    variants: "2 Variants",
    category: "Electronics",
    price: "$1699.00",
    status: "Canceled",
    image: "/images/product/product-04.jpg",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    variants: "1 Variant",
    category: "Accessories",
    price: "$240.00",
    status: "Delivered",
    image: "/images/product/product-05.jpg",
  },
];

export default function Orders() {
  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
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

        <Form>
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
              type="text"
              placeholder="Search..."
              className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-none xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
        </Form>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] custom-scrollbar">
        <div className="overflow-x-auto max-w-full">
          <Table className="min-w-full border-collapse">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow className="gap-x-2">
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  <Checkbox checked={true} onChange={() => {}} />
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Products
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Customer Info
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Order Info
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Payment Info
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Courier
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((product) => (
                <TableRow key={product.id} className="gap-x-2">
                  <TableCell className="py-3 px-3">
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      id={`checkbox-${product.id}`}
                    />
                  </TableCell>
                  <TableCell className="py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    #{product.id}
                  </TableCell>
                  <TableCell className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] overflow-hidden rounded-md">
                        <img
                          src={product.image}
                          className="h-full w-full object-cover"
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {product.name}
                        </p>
                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                          {product.variants}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    <p className="text-gray-800 dark:text-white/90">John Doe</p>
                    <Link
                      to="#"
                      className="text-theme-xs font-medium text-black dark:text-gray-400"
                    >
                      01724721383
                    </Link>
                    <p className="text-theme-xs">
                      House: 123, Road: 456, City: Dhaka
                    </p>
                  </TableCell>
                  <TableCell className="py-3 px-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    <p className="text-gray-800 dark:text-white/90">
                      Price: 120৳
                    </p>
                    <p>Discount: 120৳</p>
                    <p>Shipping: 120৳</p>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      Total: 360৳
                    </p>
                    <p>Pay: {product.price}</p>
                    <p>Due: 120৳</p>
                  </TableCell>
                  <TableCell className="py-3 px-3">
                    <Badge
                      size="sm"
                      color={
                        product.status === "Delivered"
                          ? "success"
                          : product.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-3">
                    <Badge
                      size="sm"
                      color={
                        product.status === "Delivered"
                          ? "success"
                          : product.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-3">
                    <Badge
                      size="sm"
                      color={
                        product.status === "Delivered"
                          ? "success"
                          : product.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col gap-3">
                      {/* Note Icon */}
                      <Link
                        to="#"
                        title="Note"
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-[14px] h-[14px]"
                        >
                          <path d="M5 2a2 2 0 0 0-2 2v16c0 1.104.896 2 2 2h14a2 2 0 0 0 2-2V8l-6-6H5zm7 7V3.5L18.5 9H12zM7 14h10v2H7v-2zm0-4h10v2H7v-2z" />
                        </svg>
                      </Link>

                      {/* Edit Icon */}
                      <Link
                        to="#"
                        title="Edit"
                        className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[14px] h-[14px]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536M4 20h4l10.293-10.293a1 1 0 000-1.414l-3.586-3.586a1 1 0 00-1.414 0L4 16v4z"
                          />
                        </svg>
                      </Link>

                      {/* Delete Icon */}
                      <Link
                        to="#"
                        title="Delete"
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[14px] h-[14px]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.755 20.283 4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717zM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z" />
                        </svg>
                      </Link>

                      {/* Dropdown Menu (3 Dots) */}
                      <div className="relative group">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                          title="More options"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[16px] h-[16px]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <circle cx="10" cy="3.5" r="1.5" />
                            <circle cx="10" cy="10" r="1.5" />
                            <circle cx="10" cy="16.5" r="1.5" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 z-10 hidden w-32 mt-2 bg-white border rounded-md shadow-lg group-hover:block dark:bg-gray-800 dark:border-gray-700">
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            View Details
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            Archive
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Remove
                          </Link>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
