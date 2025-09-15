
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableBody,
} from '../../../components/ui/table';

import Switch from '../../../components/form/switch/Switch';
import { Link } from 'react-router';
import { DeleteIcon, DuplicateIcon, EditIcon, ViewIcon } from '../../../icons';
import Pagination from '../../../components/pagination';

import Badge from '../../../components/ui/badge/Badge';

import { FaPlus } from 'react-icons/fa';

const AttributeValueList = () => {
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
            <span>Attribute Value List</span>
          </li>
        </ol>
      </nav>
      <div className="flex justify-end mb-5">
        <button className="flex items-center gap-2 bg-rose-400 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-rose-500 transition duration-300 ease-in-out">
          <FaPlus
            className="text-white text-sm bg-white/20 p-1 rounded-full"
            size={20}
          />
          <span className="font-medium">Add Attribute Value</span>
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <p className="bg-[#5978ad] text-2xl text-white py-2 pl-5">
          Attribute Value List
        </p>

        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Serial
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Attribute
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Value Name
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
              <TableRow>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-2">
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      1
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                 Color Ok
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm">
                Khaki
                </TableCell>

                
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="grid grid-cols-1 items-center gap-2">
                   
                    <p title="Edit">
                      <EditIcon className="w-5 h-5" />
                    </p>
                    <p
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                      title="Delete Product"
                    >
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600">
                        <DeleteIcon className="w-5 h-5" />
                      </button>
                    </p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-2">
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      2
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  bg color ok
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm">
                  green
                </TableCell>

               

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="grid grid-cols-1 items-center justify-center gap-2">
                    <p title="Edit">
                      <EditIcon className="w-5 h-5" />
                    </p>
                    <p
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                      title="Delete Product"
                    >
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600">
                        <DeleteIcon className="w-5 h-5" />
                      </button>
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <Pagination currentPage={1} total={10} limit={15} />
      </div>
    </>
  );
};

export default AttributeValueList;

