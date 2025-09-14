// @ts-nocheck
import { Controller, useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import ReactSelect from "react-select";
import { useState, useEffect, useCallback } from "react";
import Input from "../../components/form/input/InputField";
import Switch from "../../components/form/switch/Switch";
import Label from "../../components/form/Label";
import ComponentCard from "../../components/common/ComponentCard";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import { useAllCategories } from "../../services/queries/caregories";
import { Category } from "../../types/categories";
import InputEditor from "../../components/form/input/InputEditor";
import { useUpdateProduct } from "../../services/mutations/product/mutations";
import { useParams } from "react-router";
import { useSingleProduct } from "../../services/queries/product";
import { API_URL } from "../../config";

type DiscountType = "fixed" | "percent";

interface FormValues {
  name: string;
  sku: string;
  categories: string[];
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
  isNewProduct: boolean;
  isPosSuggestion: boolean;
  isPublished: boolean;
  galleryImages: File[];
  thumbnailImage: File | null;
}

export default function UpdateProductPage() {
  const { slug } = useParams();
  const { data: product, isSuccess: productSuccess } = useSingleProduct(
    slug || ""
  );
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      discountType: "fixed",
      discountAmount: 0,
      isFeatured: false,
      isPosSuggestion: false,
      isPublished: true,
      isNewProduct: true,
      shortDescription: "",
    },
  });
  const { data: categories, isSuccess: categorySuccess } = useAllCategories({
    page: 1,
    limit: 100,
  });
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const regularPrice = watch("regularPrice") || 0;
  const discountAmount = watch("discountAmount") || 0;
  const discountType = watch("discountType");
  const calculateSalesPrice = () => {
    if (discountType === "fixed") {
      return Math.max(0, regularPrice - discountAmount);
    } else {
      return Math.max(0, regularPrice - (regularPrice * discountAmount) / 100);
    }
  };

  useEffect(() => {
    setValue("salesPrice", calculateSalesPrice());
  }, [regularPrice, discountAmount, discountType]);

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

  const flattenCategories = (
    categories: Category[]
  ): { label: string; value: string }[] => {
    const result: { label: string; value: string }[] = [];

    const traverse = (cats: Category[], prefix = "") => {
      cats.forEach((cat) => {
        // Add prefix to show hierarchy (optional)
        result.push({
          label: prefix ? `${prefix} > ${cat.name}` : cat.name,
          value: cat._id,
        });

        // Recurse into children
        if (cat.children && cat.children.length > 0) {
          traverse(cat.children, prefix ? `${prefix} > ${cat.name}` : cat.name);
        }
      });
    };

    traverse(categories);

    return result;
  };

  const categoriesOptions = useCallback(() => {
    if (categorySuccess && categories) {
      return flattenCategories(categories.data);
    }
    return [];
  }, [categories, categorySuccess]);

  const discountTypes = [
    { label: "Flat", value: "fixed" },
    { label: "Percent", value: "percentage" },
  ];
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sku", data.sku);
    formData.append(
      "categories",
      JSON.stringify(data.categories.map((cat) => cat.value as string))
    );
    formData.append("stockAlert", data.stockAlert?.toString() || "0");
    formData.append("regularPrice", data.regularPrice?.toString() || "0");
    const discount = {
      discountType: data.discountType || "fixed",
      discountValue: data.discountAmount?.toString() || "0",
    };
    formData.append("discount", JSON.stringify(discount));
    formData.append("salesPrice", data.salesPrice?.toString() || "0");
    formData.append("description", data.description || "");
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("metaTitle", data.metaTitle || "");
    formData.append("metaDescription", data.metaDescription || "");
    formData.append("metaKeywords", data.metaKeywords || "");
    formData.append("isFeatured", data.isFeatured ? "true" : "false");
    formData.append("isPosSuggestion", data.isPosSuggestion ? "true" : "false");
    formData.append("isPublished", data.isPublished ? "true" : "false");
    formData.append("isNewProduct", data.isNewProduct ? "true" : "false");
    if (data.thumbnailImage) {
      formData.append("thumbnail", data.thumbnailImage);
    }
    if (data.galleryImages && data.galleryImages.length > 0) {
      data.galleryImages.forEach((file) => {
        formData.append("galleryImages", file);
      });
    }

    updateProduct({ id: slug, payload: formData });
  };

  useEffect(() => {
    if (productSuccess) {
      setValue("name", product?.data?.name || "");
      setValue("sku", product?.data?.sku || "");
      // Map product categories to flattened options (preserving hierarchy if available)
      (() => {
        const productCats = product?.data?.categories || [];
        let selected: { label: string; value: string }[] = [];
        if (Array.isArray(productCats)) {
          if (categorySuccess && categories?.data) {
            const flattened = flattenCategories(categories.data);
            selected = productCats
              .map((pc: any) => {
                const id = pc?._id || pc?.id || pc?.value;
                if (!id) return null;
                const match = flattened.find((opt) => opt.value === id);
                return (
                  match || {
                    label: pc?.name || String(id),
                    value: String(id),
                  }
                );
              })
              .filter(Boolean) as { label: string; value: string }[];
          } else {
            selected = productCats.map((pc: any) => ({
              label: pc?.name || pc?.label || "",
              value: String(pc?._id || pc?.id || pc?.value || ""),
            }));
          }
        }
        setValue("categories", selected);
      })();
      setValue("stockAlert", product?.data?.stockAlert || 0);
      setValue("regularPrice", product?.data?.regularPrice || 0);
      setValue(
        "discountType",
        product?.data?.discount?.discountType || "fixed"
      );
      setValue("discountAmount", product?.data?.discount?.discountValue || 0);
      setValue("salesPrice", product?.data?.salePrice || 0);
      setValue("description", product?.data?.description || "");
      setValue("shortDescription", product?.data?.shortDescription || "");
      setValue("metaTitle", product?.data?.metaTitle || "");
      setValue("metaDescription", product?.data?.metaDescription || "");
      setValue("metaKeywords", product?.data?.metaKeywords || "");
      setValue("isFeatured", product?.data?.isFeatured || false);
      setValue("isPosSuggestion", product?.data?.isPosSuggestion || false);
      setValue("isPublished", product?.data?.isPublished || false);
      setValue("isNewProduct", product?.data?.isNewProduct || false);
      setThumbnailPreview(
        `${API_URL}/images/products/${product?.data?.thumbnail}` || null
      );
      setGalleryPreviews(
        product?.data?.galleryImages.map(
          (img) => `${API_URL}/images/products/${img}`
        ) || []
      );
    }
  }, [productSuccess]);
  return (
    <>
      <PageMeta
        title="Update a product"
        description="Update and manage your products with ease using our intuitive form."
      />
      <PageBreadcrumb pageTitle="Update Product" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE FORM */}
        <div className="space-y-3">
          <ComponentCard title="Basic Information">
            <div className="mb-2">
              <Label htmlFor="name">Product Name</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Product Name is required" }}
                render={({ field }) => (
                  <Input
                    id="name"
                    {...field}
                    placeholder="Enter product name"
                  />
                )}
              />
              {errors?.name && (
                <p className="text-red-500 text-xs">{errors?.name?.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Controller
                name="sku"
                control={control}
                rules={{ required: "SKU is required" }}
                render={({ field }) => (
                  <Input id="sku" {...field} placeholder="Enter SKU" />
                )}
              />
              {errors?.sku && (
                <p className="text-red-500 text-xs">{errors?.sku?.message}</p>
              )}
            </div>
            <div className="mb-2">
              <Label htmlFor="categories">Categories</Label>
              <Controller
                name="categories"
                control={control}
                rules={{ required: "Categories are required" }}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={categoriesOptions()}
                    placeholder="Select categories"
                    isMulti
                    closeMenuOnSelect={false}
                    getOptionLabel={(option: { label: string }) =>
                      option.label as string
                    }
                    onChange={(selected) => field.onChange(selected)}
                    value={field.value}
                  />
                )}
              />
              {errors?.category && (
                <p className="text-red-500 text-xs">
                  {errors?.category?.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="stockAlert">Stock Alert</Label>
              <Controller
                name="stockAlert"
                control={control}
                rules={{
                  required: "Stock Alert is required",
                  pattern: /^[0-9]+$/,
                  min: 0,
                  max: 1000000,
                }}
                render={({ field }) => (
                  <Input
                    id="stockAlert"
                    type="number"
                    {...field}
                    placeholder="Enter stock alert"
                  />
                )}
              />
              {errors?.stockAlert && (
                <p className="text-red-500 text-xs">
                  {errors?.stockAlert?.message}
                </p>
              )}
            </div>
          </ComponentCard>

          <ComponentCard title="Pricing" className="space-y-3">
            <div className="mb-2">
              <Label htmlFor="regularPrice">Regular Price</Label>
              <Controller
                name="regularPrice"
                control={control}
                rules={{
                  required: "Regular Price is required",
                  pattern: /^[0-9]+$/,
                  min: 0,
                  max: 1000000,
                }}
                render={({ field }) => (
                  <Input
                    id="regularPrice"
                    type="number"
                    {...field}
                    placeholder="Enter regular price"
                  />
                )}
              />
              {errors?.regularPrice && (
                <p className="text-red-500 text-xs">
                  {errors?.regularPrice?.message}
                </p>
              )}
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
                  />
                )}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="discountAmount">Discount Amount</Label>
              <Controller
                name="discountAmount"
                control={control}
                render={({ field }) => (
                  <Input
                    id="discountAmount"
                    type="number"
                    {...field}
                    placeholder="Enter discount amount"
                  />
                )}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="salesPrice">Sales Price</Label>
              <Controller
                name="salesPrice"
                control={control}
                render={({ field }) => (
                  <Input
                    id="salesPrice"
                    type="number"
                    readOnly
                    {...field}
                    value={field.value || 0}
                  />
                )}
              />
            </div>
          </ComponentCard>

          <ComponentCard title="Descriptions" className="space-y-3">
            <div className="mb-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <TextArea
                rows={4}
                placeholder="Write a brief description about the product"
                {...register("shortDescription", {
                  required: "Short Description is required",
                })}
              />

              {errors?.shortDescription && (
                <p className="text-red-500 text-xs">
                  {errors?.shortDescription?.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="description">Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <InputEditor
                    {...field}
                    value={field.value}
                    setValue={field.onChange}
                  />
                )}
              />
            </div>
          </ComponentCard>
        </div>

        {/* RIGHT SIDE CONTROLS */}
        <div className="space-y-6">
          <ComponentCard title="Thumbnail Image">
            <DropzoneComponent
              onDrop={handleThumbnailDrop}
              preview={thumbnailPreview}
            />
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
              <Controller
                name="metaTitle"
                control={control}
                render={({ field }) => <Input id="metaTitle" {...field} />}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Controller
                name="metaDescription"
                control={control}
                render={({ field }) => (
                  <TextArea id="metaDescription" {...field} />
                )}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Controller
                name="metaKeywords"
                control={control}
                render={({ field }) => <Input id="metaKeywords" {...field} />}
              />
            </div>
          </ComponentCard>

          <ComponentCard title="Flags">
            <div className="space-y-2">
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="Is Featured"
                    defaultChecked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="isPosSuggestion"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="POS Suggestion?"
                    defaultChecked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="Is Published?"
                    defaultChecked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="isNewProduct"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="Is New Product?"
                    defaultChecked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </ComponentCard>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {isPending ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </>
  );
}
