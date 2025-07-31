import { Controller, useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { useState, useEffect } from "react";
import Input from "../../components/form/input/InputField";
import Switch from "../../components/form/switch/Switch";
import Label from "../../components/form/Label";
import ComponentCard from "../../components/common/ComponentCard";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

type DiscountType = "flat" | "percent";

interface FormValues {
  name: string;
  category: string;
  unit: string;
  stockAlert: number;
  regularPrice: number;
  discountType: DiscountType;
  discountAmount: number;
  salesPrice: number;
  description: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  isFeatured: boolean;
  isPosSuggestion: boolean;
  isPublished: boolean;
  galleryImages: File[];
  thumbnailImage: File | null;
}

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      discountType: "flat",
      isFeatured: false,
      isPosSuggestion: false,
      isPublished: true,
    },
  });
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const regularPrice = watch("regularPrice") || 0;
  const discountAmount = watch("discountAmount") || 0;
  const discountType = watch("discountType");

  const calculateSalesPrice = () => {
    if (discountType === "flat") {
      return Math.max(0, regularPrice - discountAmount);
    } else {
      return Math.max(0, regularPrice - (regularPrice * discountAmount) / 100);
    }
  };

  useEffect(() => {
    setValue("salesPrice", calculateSalesPrice());
  }, [regularPrice, discountAmount, discountType]);

  const onSubmit = (data: FormValues) => {
    console.log("Form Data", data);
  };

  const handleGalleryDrop = (acceptedFiles: File[]) => {
    setValue("galleryImages", acceptedFiles);
    setGalleryPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleThumbnailDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue("thumbnailImage", file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const categories = [
    { label: "Electronics", value: "1" },
    { label: "Apparel", value: "2" },
    { label: "Furniture", value: "3" },
  ];

  const units = [
    { label: "Pieces", value: "pcs" },
    { label: "Kilograms", value: "kg" },
    { label: "Liters", value: "ltr" },
  ];
  const discountTypes = [
    { label: "Flat", value: "flat" },
    { label: "Percent", value: "percent" },
  ];

  return (
    <>
      <PageMeta
        title="Create a new product"
        description="Create and manage your products with ease using our intuitive form."
      />
      <PageBreadcrumb pageTitle="Create a new product" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE FORM */}
        <div className="space-y-3">
          <ComponentCard title="Basic Information">
            <div className="mb-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                label="Product Name"
                {...register("name", { required: "Product Name is required" })}
              />
              {errors?.name && (
                <p className="text-red-500 text-xs">{errors?.name?.message}</p>
              )}
            </div>
            <div className="mb-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categories}
                    placeholder="Select a category"
                  />
                )}
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="unit">Unit</Label>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={units}
                    placeholder="Select a unit"
                  />
                )}
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="stockAlert">Stock Alert</Label>
              <Input
                type="number"
                label="Stock Alert"
                {...register("stockAlert")}
              />
            </div>
          </ComponentCard>

          <ComponentCard title="Pricing" className="space-y-3">
            <div className="mb-2">
              <Label htmlFor="regularPrice">Regular Price</Label>
              <Input
                id="regularPrice"
                type="number"
                {...register("regularPrice", { valueAsNumber: true })}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="discountType">Discount Type</Label>
              <Controller
                name="discountType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={discountTypes}
                    placeholder="Select discount type"
                    id="discountType"
                  />
                )}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="discountAmount">Discount Amount</Label>
              <Input
                id="discountAmount"
                type="number"
                {...register("discountAmount", { valueAsNumber: true })}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="salesPrice">Sales Price</Label>
              <Input
                id="salesPrice"
                type="number"
                readOnly
                value={calculateSalesPrice()}
              />
            </div>
          </ComponentCard>

          <ComponentCard title="Descriptions" className="space-y-3">
            <div className="mb-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <TextArea
                id="shortDescription"
                {...register("shortDescription")}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="description">Description</Label>
              <TextArea id="description" {...register("description")} />
            </div>
          </ComponentCard>
        </div>

        {/* RIGHT SIDE CONTROLS */}
        <div className="space-y-6">
          <ComponentCard title="Thumbnail Image">
            <Dropzone
              onDrop={handleThumbnailDrop}
              accept={{ "image/*": [] }}
              multiple={false}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-gray-400 dark:border-gray-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail"
                      className="h-40 w-full object-cover rounded-lg shadow"
                    />
                  ) : (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-300">
                      <svg
                        className="mx-auto mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 16l4-4a3 3 0 014.24 0L17 16m-1 4h-4a1 1 0 01-1-1v-4m-6 5h14a2 2 0 002-2V7a2 2 0 00-2-2h-3.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0013.586 3H10.414a1 1 0 00-.707.293L8.293 4.707A1 1 0 017.586 5H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="font-medium">
                        Drop thumbnail here or click to upload
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </ComponentCard>

          <ComponentCard title="Gallery Images">
            <Dropzone
              onDrop={handleGalleryDrop}
              accept={{ "image/*": [] }}
              multiple
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-4 transition ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-gray-400 dark:border-gray-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  {galleryPreviews.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {galleryPreviews.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`Gallery ${idx}`}
                          className="h-24 w-full object-cover rounded-lg shadow"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-300">
                      <svg
                        className="mx-auto mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 16l4-4a3 3 0 014.24 0L17 16m-1 4h-4a1 1 0 01-1-1v-4m-6 5h14a2 2 0 002-2V7a2 2 0 00-2-2h-3.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0013.586 3H10.414a1 1 0 00-.707.293L8.293 4.707A1 1 0 017.586 5H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="font-medium">
                        Drop gallery images here or click to upload
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </ComponentCard>

          <ComponentCard title="SEO Meta Data" className="space-y-3">
            <div className="mb-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input id="metaTitle" {...register("metaTitle")} />
            </div>

            <div className="mb-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <TextArea id="metaDescription" {...register("metaDescription")} />
            </div>

            <div className="mb-2">
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input id="metaKeywords" {...register("metaKeywords")} />
            </div>
          </ComponentCard>

          <ComponentCard title="Flags">
            <div className="space-y-2">
              <Switch label="Is Featured?" {...register("isFeatured")} />
              <Switch
                label="POS Suggestion?"
                {...register("isPosSuggestion")}
              />
              <Switch label="Is Published?" {...register("isPublished")} />
            </div>
          </ComponentCard>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Product
          </button>
        </div>
      </form>
    </>
  );
}
