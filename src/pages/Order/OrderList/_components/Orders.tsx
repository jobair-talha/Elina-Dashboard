import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import Badge from '../../../../components/ui/badge/Badge';
import Form from '../../../../components/form/Form';
import Checkbox from '../../../../components/form/input/Checkbox';
import { Link } from 'react-router';
import { IOrder } from '../../../../types/order';
import ProductItem from './ProductItem';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Iprops {
  orders: IOrder[];
}

export default function Orders({ orders }: Iprops) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
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

          {/* Dropdown Menu */}
          {filterOpen && (
            <div className="absolute mt-2 w-52 rounded-lg border border-gray-200 bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 z-20">
              <button
                onClick={() => {
                  setCalendarOpen(true);
                  setFilterOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Filter by Calendar
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700"></div>

              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                <p className="mb-2 font-medium">Filter by Payment Info</p>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-xs">
                    <Checkbox checked={false} onChange={() => {}} /> Paid
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <Checkbox checked={false} onChange={() => {}} /> Unpaid
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <Checkbox checked={false} onChange={() => {}} /> Partial
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700"></div>

              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                <p className="mb-2 font-medium">Filter by Status</p>
                <select className="w-full rounded-md border px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  <option>Applied</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Declined</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Search */}
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

      {/* Calendar Modal */}
      {calendarOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl">
            <Calendar
              selectRange={true}
              onChange={(range) => setDateRange(range as [Date, Date])}
              value={dateRange}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setCalendarOpen(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  console.log('Apply filter');
                  setCalendarOpen(false);
                }}
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] custom-scrollbar">
        <div className="overflow-scroll max-w-screen max-h-screen">
          <Table className="min-w-full border-collapse">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow className="gap-x-2">
                <TableCell
                  isHeader
                  className="py-3 px-2 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  <Checkbox checked={true} onChange={() => {}} />
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-2 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-1 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Products
                </TableCell>
                <TableCell
                  isHeader
                  className="whitespace-nowrap py-3 px-2 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Customer Info
                </TableCell>
                <TableCell
                  isHeader
                  className="whitespace-nowrap py-3 px-2 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Shipping Info
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-2 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Order Info
                </TableCell>
                <TableCell
                  isHeader
                  className="whitespace-nowrap py-3 px-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Payment Info
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-1 text-theme-xs text-center text-gray-500 dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-1 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Courier
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-1 text-theme-xs text-center text-gray-500 dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {orders.map((order) => (
                <TableRow key={order.id} className="gap-x-2">
                  <TableCell className="py-3 px-2">
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      id={`checkbox-${order.id}`}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-2 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.serial}
                  </TableCell>
                  <TableCell className="py-3 px-">
                    <ProductItem orderProducts={order.products} />
                  </TableCell>
                  <TableCell className="py-3 px-2 text-theme-sm text-gray-500 dark:text-gray-400">
                    <p className="text-gray-800 dark:text-white/90">
                      {order.customerInfo.name}
                    </p>
                    <Link
                      to={`tel:${
                        order.customerInfo.mobile.startsWith('+880')
                          ? order.customerInfo.mobile
                          : `+880${order.customerInfo.mobile}`
                      }`}
                      className="text-theme-xs font-medium text-black dark:text-gray-400"
                    >
                      {order.customerInfo.mobile}
                    </Link>
                    <p className="text-theme-xs">
                      {order.customerInfo.address}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 px-2 text-theme-sm text-gray-500 dark:text-gray-400">
                    <p className="text-gray-800 dark:text-white/90">
                      {order.shippingInfo.name}
                    </p>
                    <Link
                      to={`tel:${
                        order.shippingInfo.mobile.startsWith('+88')
                          ? order.shippingInfo.mobile
                          : `+88${order.shippingInfo.mobile}`
                      }`}
                      className="text-theme-xs font-medium text-black dark:text-gray-400"
                    >
                      {order.shippingInfo.mobile}
                    </Link>
                    <p className="text-theme-xs">
                      {order.shippingInfo.address}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-2 text-theme-sm text-gray-500 dark:text-gray-400">
                    <p className="text-gray-800 dark:text-white/90">
                      Price: {order.totalProductsPrice}৳
                    </p>
                    <p>Discount: {order.discountAmount}৳</p>
                    <p>Shipping: {order.shippingAmount}৳</p>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      Total: {order.totalAmount}৳
                    </p>
                    <p>Pay: {order.payAmount}৳</p>
                    <p>Due: {order.remainingPayableAmount}৳</p>
                  </TableCell>
                  <TableCell className="py-3 px-1">
                    <Badge
                      size="sm"
                      color={
                        order.orderStatus === 'delivered'
                          ? 'success'
                          : order.orderStatus === 'pending'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-1">
                    <div>
                      <select className="text-xs text-gray-600 uppercase outline-0 cursor-pointer bg-transparent dark:text-gray-400">
                        <option
                          value="applied"
                          className="text-xs cursor-pointer"
                        >
                          Applied
                        </option>
                        <option
                          value="pending"
                          className="text-xs cursor-pointer"
                        >
                          Pending
                        </option>
                        <option
                          value="approved"
                          className="text-xs cursor-pointer"
                        >
                          Approved
                        </option>
                        <option
                          value="declined"
                          className="text-xs cursor-pointer"
                        >
                          Declined
                        </option>
                      </select>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-1 text-center">
                    <Badge
                      size="sm"
                      color={
                        order.status === 'Delivered'
                          ? 'success'
                          : order.status === 'Pending'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-1 flex justify-center items-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {' '}
                    <div className="flex flex-col gap-3">
                      {' '}
                      {/* Note Icon */}{' '}
                      <Link
                        to="#"
                        title="Note"
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        {' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-[14px] h-[14px]"
                        >
                          {' '}
                          <path d="M5 2a2 2 0 0 0-2 2v16c0 1.104.896 2 2 2h14a2 2 0 0 0 2-2V8l-6-6H5zm7 7V3.5L18.5 9H12zM7 14h10v2H7v-2zm0-4h10v2H7v-2z" />{' '}
                        </svg>{' '}
                      </Link>{' '}
                      {/* Edit Icon */}{' '}
                      <Link
                        to="#"
                        title="Edit"
                        className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        {' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[14px] h-[14px]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          {' '}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536M4 20h4l10.293-10.293a1 1 0 000-1.414l-3.586-3.586a1 1 0 00-1.414 0L4 16v4z"
                          />{' '}
                        </svg>{' '}
                      </Link>{' '}
                      {/* Delete Icon */}{' '}
                      <Link
                        to="#"
                        title="Delete"
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        {' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[14px] h-[14px]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {' '}
                          <path d="M5.755 20.283 4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717zM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z" />{' '}
                        </svg>{' '}
                      </Link>{' '}
                      {/* Dropdown Menu (3 Dots) */}{' '}
                      <div className="relative group">
                        {' '}
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                          title="More options"
                        >
                          {' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[16px] h-[16px]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            {' '}
                            <circle cx="10" cy="3.5" r="1.5" />{' '}
                            <circle cx="10" cy="10" r="1.5" />{' '}
                            <circle cx="10" cy="16.5" r="1.5" />{' '}
                          </svg>{' '}
                        </button>{' '}
                        {/* Dropdown Menu */}{' '}
                        <div className="absolute right-0 z-10 hidden w-32 mt-2 bg-white border rounded-md shadow-lg group-hover:block dark:bg-gray-800 dark:border-gray-700">
                          {' '}
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            {' '}
                            View Details{' '}
                          </Link>{' '}
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            {' '}
                            Archive{' '}
                          </Link>{' '}
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {' '}
                            Remove{' '}
                          </Link>{' '}
                        </div>{' '}
                      </div>{' '}
                    </div>{' '}
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
