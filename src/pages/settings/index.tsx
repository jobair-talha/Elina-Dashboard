// @ts-nocheck
import  { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Dropzone, { useDropzone } from "react-dropzone";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import Switch from "../../components/form/switch/Switch";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Select from "../../components/form/Select";

type SocialLink = {
  platform: string;
  url: string;
};

type FormValues = {
  siteName: string;
  siteTagline: string;
  address: string;
  email: string;
  phone: string;
  primaryColor: string;
  secondaryColor: string;
  maintenanceMode: boolean;
  newsletterEnabled: boolean;
  metaTitle: string;
  metaDescription: string;
  footerText: string;
  logo: FileList | null;
  favicon: FileList | null;
  socialLinks: SocialLink[];
};

const defaultSocialLinks = [
  { platform: "Facebook", url: "" },
  { platform: "Twitter", url: "" },
  { platform: "Instagram", url: "" },
];

const SiteSettings = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      siteName: "",
      siteTagline: "",
      address: "",
      email: "",
      phone: "",
      primaryColor: "#2563eb",
      secondaryColor: "#d97706",
      maintenanceMode: false,
      newsletterEnabled: true,
      metaTitle: "",
      metaDescription: "",
      footerText: "",
      logo: null,
      favicon: null,
      socialLinks: defaultSocialLinks,
      categories: [],
    },
  });

  // Manage social links array (add/remove)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const {
    fields: categoryFields,
    append: categoryAppend,
    remove: categoryRemove,
  } = useFieldArray({
    control,
    name: "categories",
  });
  const categoriesOptions = [
    { value: "1", label: "Electronics" },
    { value: "2", label: "Apparel" },
    { value: "3", label: "Furniture" },
    { value: "4", label: "Accessories" },
  ];
  // Logo preview
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Favicon preview
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  // Dropzone for logo
  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (files) => {
      setLogoFile(files[0]);
      setValue("logo", files as unknown as FileList, { shouldValidate: true });
    },
  });

  // Dropzone for favicon
  const {
    getRootProps: getFaviconRootProps,
    getInputProps: getFaviconInputProps,
    isDragActive: isFaviconDragActive,
  } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (files) => {
      setFaviconFile(files[0]);
      setValue("favicon", files as unknown as FileList, {
        shouldValidate: true,
      });
    },
  });

  // Preview logo
  useEffect(() => {
    if (!logoFile) {
      setLogoPreview(null);
      return;
    }
    const url = URL.createObjectURL(logoFile);
    setLogoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [logoFile]);

  // Preview favicon
  useEffect(() => {
    if (!faviconFile) {
      setFaviconPreview(null);
      return;
    }
    const url = URL.createObjectURL(faviconFile);
    setFaviconPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [faviconFile]);

  const onSubmit = (data: FormValues) => {
    console.log("Site settings submitted:", data);
    // Upload images & send form data to backend here
  };
 

  return (
    <>
      <PageMeta
        title="Site Settings"
        description="Manage your global site settings."
      />
      <PageBreadcrumb pageTitle="Site Settings" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* LEFT PANEL */}
        <div className="space-y-6">
          <ComponentCard title="General Information">
            <div className="mb-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                {...register("siteName", { required: true })}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="siteEmail">Email</Label>
              <Input
                id="siteEmail"
                {...register("siteEmail", { required: true })}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="sitePhone">Phone</Label>
              <Input id="sitePhone" {...register("sitePhone")} />
            </div>

            <div className="mb-2">
              <Label htmlFor="siteAddress">Address</Label>
              <TextArea id="siteAddress" {...register("siteAddress")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Input
                  type="color"
                  id="primaryColor"
                  {...register("primaryColor")}
                />
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <Input
                  type="color"
                  id="secondaryColor"
                  {...register("secondaryColor")}
                />
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Social Links">
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...register(`socialLinks.${index}.platform` as const)}
                    placeholder="Platform"
                    className="w-1/3"
                  />
                  <Input
                    {...register(`socialLinks.${index}.url` as const)}
                    placeholder="URL"
                    className="w-2/3"
                  />
                  <button
                    type="button"
                    className="text-red-600 font-bold"
                    onClick={() => remove(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 mt-2 hover:underline"
                onClick={() => append({ platform: "", url: "" })}
              >
                + Add Social Link
              </button>
            </div>
          </ComponentCard>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">
          <ComponentCard title="Logo & Favicon">
            <div className="mb-4">
              <Label>Logo</Label>
              <Dropzone
                onDrop={(files) => handleDrop(files, "logo")}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed p-4 rounded-lg text-center"
                  >
                    <input {...getInputProps()} />
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="h-24 mx-auto object-contain"
                      />
                    ) : (
                      <p>Drag & drop logo or click to upload</p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>

            <div>
              <Label>Favicon</Label>
              <Dropzone
                onDrop={(files) => handleDrop(files, "favicon")}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed p-4 rounded-lg text-center"
                  >
                    <input {...getInputProps()} />
                    {faviconPreview ? (
                      <img
                        src={faviconPreview}
                        alt="Favicon Preview"
                        className="h-12 w-12 mx-auto object-contain"
                      />
                    ) : (
                      <p>Drag & drop favicon or click to upload</p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
          </ComponentCard>
          <ComponentCard title="Categories">
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoriesOptions}
                  isMulti
                  onChange={(val) => field.onChange(val)}
                  value={field.value}
                  placeholder="Select categories"
                />
              )}
            />
          </ComponentCard>
          <ComponentCard title="Categories">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-3">
                <Controller
                  name={`categories.${index}.category`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categoriesOptions}
                      placeholder="Select category"
                      isClearable
                      onChange={(val) => field.onChange(val)}
                      value={field.value}
                      className="w-full"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 font-bold px-2"
                  title="Remove category"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ category: null })}
              className="text-blue-600 hover:underline"
            >
              + Add Category
            </button>
          </ComponentCard>
          <ComponentCard title="Footer & Maintenance">
            <div className="mb-2">
              <Label htmlFor="footerText">Footer Text</Label>
              <TextArea id="footerText" {...register("footerText")} />
            </div>

            <div className="mt-4">
              <Switch
                label="Enable Maintenance Mode"
                {...register("maintenanceMode")}
              />
            </div>
          </ComponentCard>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </form>
    </>
  );
};

export default SiteSettings;
