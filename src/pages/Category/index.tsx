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
import { DeleteIcon, EditIcon, ViewIcon } from "../../icons";
import { useAllCategories } from "../../services/queries/caregories";
import { API_URL } from "../../config";

// Sample categories
// const categories = [
//   {
//     id: 1,
//     title: "Electronics",
//     image: "/images/categories/electronics.jpg",
//     parent: null,
//     isFeatured: true,
//     isPublished: true,
//   },
//   {
//     id: 2,
//     title: "Laptops",
//     image: "/images/categories/laptops.jpg",
//     parent: "Electronics",
//     isFeatured: false,
//     isPublished: true,
//   },
//   {
//     id: 3,
//     title: "Smartphones",
//     image: "/images/categories/smartphones.jpg",
//     parent: "Electronics",
//     isFeatured: true,
//     isPublished: false,
//   },
// ];

const CategoryList = () => {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const { data, isLoading, isError } = useAllCategories({});
   

      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error loading sliders</div>;

  const handleCheckboxChange = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

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
            <span>Categories</span>
          </li>
        </ol>
      </nav>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Image
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Parent Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Featured
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Published
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-start text-gray-500 dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data?.data?.map((category) => (
                <TableRow key={category._id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={checkedIds.includes(category.__v)}
                        onChange={() => handleCheckboxChange(category.__v)}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                        {category.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <span className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                      {category.name}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <img
                       src={`${API_URL}/images/category/${category?.image}`}
                      alt={category.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                    {category.parentId ?? '—'}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <Switch defaultChecked={category.isFeatured} label="" />
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <Switch defaultChecked={category.isFeatured} label="" />
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/categories/view/${category._id}`}
                        title="View"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                      >
                        <ViewIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/categories/edit/${category._id}`}
                        title="Edit"
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-600"
                      >
                        <EditIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/categories/delete/${category._id}`}
                        title="Delete"
                      >
                        <DeleteIcon className="w-5 h-5" />
                      </Link>
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
};

export default CategoryList;
