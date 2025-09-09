import { useForm, Controller } from "react-hook-form";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import ComponentCard from "../../components/common/ComponentCard";
import Switch from "../../components/form/switch/Switch";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAllCategories } from "../../services/queries/caregories";
import toast from "react-hot-toast";
import { useCreateCategory } from "../../services/mutations/categories/categories";
import { Option } from "../../types/global";
import { Category } from "../../types/categories";

type FormValues = {
  parentCategory: string | null;
  categoryName: string;
  categoryImage: FileList | null;
  adsBannerImage: FileList | null;
  isFeatured: boolean;
  isPublished: boolean;
  metaTitle: string;
  metaDescription: string;
};

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      parentCategory: null,
      isFeatured: false,
      isPublished: true,
      metaTitle: "",
      metaDescription: "",
    },
  });

  const { data: category, isSuccess: categorySuccess } = useAllCategories({});
  const { mutate: createCategory } = useCreateCategory();

  // State to store the files and preview URLs for Category Image
  const [categoryImageFiles, setCategoryImageFiles] = useState<File[]>([]);
  const [categoryImagePreview, setCategoryImagePreview] = useState<
    string | null
  >(null);

  // State for Ads Banner Image files & preview
  const [adsBannerFiles, setAdsBannerFiles] = useState<File[]>([]);
  const [adsBannerPreview, setAdsBannerPreview] = useState<string | null>(null);

  // Update preview URL when categoryImageFiles changes
  useEffect(() => {
    if (categoryImageFiles.length === 0) {
      setCategoryImagePreview(null);
      return;
    }
    const file = categoryImageFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setCategoryImagePreview(objectUrl);

    // Clean up on unmount or when file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [categoryImageFiles]);

  // Update preview URL for adsBannerFiles
  useEffect(() => {
    if (adsBannerFiles.length === 0) {
      setAdsBannerPreview(null);
      return;
    }
    const file = adsBannerFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setAdsBannerPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [adsBannerFiles]);

  // Dropzone for Category Image
  const {
    getRootProps: getCategoryRootProps,
    getInputProps: getCategoryInputProps,
    isDragActive: isCategoryDragActive,
  } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    multiple: false,
    onDrop: (files) => {
      setCategoryImageFiles(files);
      setValue("categoryImage", files as unknown as FileList, {
        shouldValidate: true,
      });
    },
  });

  // Dropzone for Ads Banner Image
  const {
    getRootProps: getAdsRootProps,
    getInputProps: getAdsInputProps,
    isDragActive: isAdsDragActive,
  } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    multiple: false,
    onDrop: (files) => {
      setAdsBannerFiles(files);
      setValue("adsBannerImage", files as unknown as FileList, {
        shouldValidate: true,
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    if (categoryImageFiles.length === 0) {
      toast.error("No files selected");
      return;
    }
    if (adsBannerFiles.length > 0) {
      formData.append("adsBanner", adsBannerFiles[0]);
    }
    if (categoryImageFiles.length > 0) {
      formData.append("image", categoryImageFiles[0]);
    }

    formData.append("name", data.categoryName);
    formData.append("isFeatured", data.isFeatured as unknown as string);
    formData.append("isPublished", data.isPublished as unknown as string);
    formData.append(
      "slug",
      data.categoryName.toLowerCase().replace(/\s+/g, "-")
    );
    if (data.parentCategory) {
      formData.append("parentId", data.parentCategory);
    }
    createCategory(formData);
  };

  const buildCategoryOptions = (
    categories: Category[],
    prefix = ""
  ): Option[] => {
    return categories.flatMap((cat) => {
      const label = prefix ? `${prefix} > ${cat.name}` : cat.name;
      const current = { value: cat._id, label };

      // If has children, recursively add them
      const children = cat.children
        ? buildCategoryOptions(cat.children, label)
        : [];

      return [current, ...children];
    });
  };

  const categoryOptions = useCallback(() => {
    return category?.data ? buildCategoryOptions(category.data) : [];
  }, [category, categorySuccess]);

  return (
    <ComponentCard title="Create Category" className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Left side - dropzones with previews */}
          <div>
            <div className="mb-4">
              <Label htmlFor="parentCategory">Parent Category</Label>
              <Controller
                name="parentCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categoryOptions()}
                    placeholder="Select parent category"
                    value={field.value as unknown as string}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="categoryName">Category Name</Label>

              <Controller
                control={control}
                name="categoryName"
                rules={{ required: "Category name is required" }}
                render={({ field }) => (
                  <Input
                    id="categoryName"
                    {...field}
                    min="3"
                    max="100"
                    placeholder="Enter category name"
                  />
                )}
              />

              {errors.categoryName && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.categoryName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="Is Featured"
                    defaultChecked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="Is Published"
                    defaultChecked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                minLength={3}
                maxLength={100}
                {...register("metaTitle")}
                placeholder="Enter meta title"
              />
            </div>

            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Controller
                name="metaDescription"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    rows={4}
                    placeholder="Enter meta description"
                  />
                )}
              />
            </div>
          </div>

          {/* Right side - form inputs */}
          <div>
            {/* Category Image Dropzone */}
            <div className="mb-2">
              <Label>Category Image</Label>
              <div
                {...getCategoryRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
                ${
                  isCategoryDragActive
                    ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                    : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                }`}
                style={{ minHeight: "220px" }}
              >
                <input {...getCategoryInputProps()} />
                {categoryImagePreview ? (
                  <img
                    src={categoryImagePreview}
                    alt="Category preview"
                    className="max-h-48 object-contain rounded-md"
                  />
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Drag & drop category image here, or click to select file
                  </p>
                )}
              </div>
            </div>

            {/* Ads Banner Image Dropzone */}
            <div>
              <Label>Ads Banner Image</Label>
              <div
                {...getAdsRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
                ${
                  isAdsDragActive
                    ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                    : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                }`}
                style={{ minHeight: "220px" }}
              >
                <input {...getAdsInputProps()} />
                {adsBannerPreview ? (
                  <img
                    src={adsBannerPreview}
                    alt="Ads banner preview"
                    className="max-h-48 object-contain rounded-md"
                  />
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Drag & drop ads banner image here, or click to select file
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button (full width under form on mobile) */}
        <div className="w-full mt-6 lg:mt-0 lg:w-auto lg:self-start text-center">
          <button
            type="submit"
            className="w-full lg:w-auto rounded bg-brand-500 px-6 py-3 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500 transition"
          >
            Create Category
          </button>
        </div>
      </form>
    </ComponentCard>
  );
};

export default CreateCategory;
