import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../table";
import Checkbox from "../../../form/input/Checkbox";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CourierModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex  items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 w-auto text-center relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="">
            <Table className="border-collapse">
              <TableHeader className=" bg-gray-200 dark:border-white/[0.05]  ">
                <TableRow className="gap-x-2">
                  <TableCell
                    isHeader
                    className="py-3 px-3 text-theme-xs text-center text-gray-600 dark:text-gray-400"
                  >
                    SERIAL ID
                  </TableCell>

                  <TableCell
                    isHeader
                    className="py-3 px-3 text-theme-xs text-center text-gray-600 dark:text-gray-400"
                  >
                    Courier
                  </TableCell>

                  <TableCell
                    isHeader
                    className="py-3 px-3 text-theme-xs text-center text-gray-600 dark:text-gray-400"
                  >
                    Total
                  </TableCell>

                  <TableCell
                    isHeader
                    className="py-3 px-3 text-theme-xs text-center text-gray-600 dark:text-gray-400"
                  >
                    Success
                  </TableCell>

                  <TableCell
                    isHeader
                    className="py-3 px-3 text-theme-xs text-center text-gray-600 dark:text-gray-400"
                  >
                    Cancel
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-ydivide-gray-100 dark:divide-white/[0.05]">
                <TableRow className="gap-x-2">
                  <TableCell className="whitespace-nowrap py-3 px-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    1
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    REDX
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    10
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    8
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    2
                  </TableCell>
                </TableRow>
                <TableRow className="gap-x-2">
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    2
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    TIGER
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    10
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    8
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    2
                  </TableCell>
                </TableRow>
                <TableRow className="gap-x-2">
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    3
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    SUNDOR BAN
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    10
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    8
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    2
                  </TableCell>
                </TableRow>
                <TableRow className="gap-x-2">
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    4
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    REDX
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    12
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    10
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    2
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="text-start mt-3">
          <button
            className="inline-flex items-center gap-2 rounded-full border  bg-gray-600 px-2 py-1 text-xs font-medium text-white **:hover:bg-gray-700  transition-colors mr-3"
            onClick={onClose}
          >
            Total: 12
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-green-600 bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700 transition-colors mr-3"
            onClick={onClose}
          >
            Success: 12
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full border  bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700  transition-colors mr-3"
            onClick={onClose}
          >
            Cancel: 0
          </button>
        </div>
        <div className="bg-green-600 text-white py-.5 text-center fw-semibold mt-3">
          <p>100% Success/0% Cancel</p>
        </div>
      </div>
    </div>
  );
};
