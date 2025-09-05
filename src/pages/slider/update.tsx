import { useForm } from "react-hook-form";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useState, useEffect, use } from "react";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import toast from "react-hot-toast";
import {
  useCreateSlider,
  useUpdateSlider,
} from "../../services/mutations/slider/mutations";
import { useSingleSlider } from "../../services/queries/slider";
import { useParams } from "react-router";
import { API_URL } from "../../config";

type FormValues = {
  image: FileList | null;
  linkUrl: string;
};

const UpdateSlider = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      image: null,
      linkUrl: "",
    },
  });

  // Preview state
  const [sliderFiles, setSliderFiles] = useState<File[]>([]);
  const [sliderPreview, setSliderPreview] = useState<string | null>(null);

  const { data: sliderData, isSuccess } = useSingleSlider(id);
  const { mutate: updateSlider, isPending } = useUpdateSlider();
  useEffect(() => {
    if (sliderFiles.length === 0) {
      setSliderPreview(null);
      return;
    }
    const file = sliderFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setSliderPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [sliderFiles]);

  // Handle drop from DropzoneComponent
  const handleDrop = (acceptedFiles: File[]) => {
    setSliderFiles(acceptedFiles);
    setValue("image", acceptedFiles as unknown as FileList, {
      shouldValidate: true,
    });
  };

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    if (sliderFiles.length > 0) {
      formData.append("image", sliderFiles[0]);
    }
    formData.append("linkUrl", data.linkUrl);
    updateSlider({ id, payload: formData });
  };

  useEffect(() => {
    if (isSuccess) {
      setSliderPreview(
        `${API_URL}/images/sliders/${sliderData?.data.imageUrl}`
      );
      setValue("linkUrl", sliderData.data.linkUrl || "");
    }
  }, [isSuccess, sliderData, setValue]);

  return (
    <ComponentCard title="Create Slider" className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Dropzone for image */}
        <div className="mb-6">
          <Label>Slider Image</Label>
          <DropzoneComponent onDrop={handleDrop} preview={sliderPreview} />
        </div>

        {/* Link URL */}
        <div className="mb-6">
          <Label htmlFor="linkUrl">Link URL</Label>
          <Input
            id="linkUrl"
            {...register("linkUrl", {
              required: "Link URL is required",
            })}
            placeholder="Enter link URL"
            min="2"
            max="255"
          />
          {errors.linkUrl && (
            <p className="mt-1 text-sm text-red-600">
              {errors.linkUrl.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button
            disabled={isPending}
            type="submit"
            className="rounded bg-brand-500 px-6 py-3 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500 transition"
          >
            {isPending ? "Updating..." : "Update Slider"}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
};

export default UpdateSlider;
