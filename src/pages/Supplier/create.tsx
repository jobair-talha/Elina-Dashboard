
import Input from "../../components/form/input/InputField";
import Switch from "../../components/form/switch/Switch";
import Label from "../../components/form/Label";
import ComponentCard from "../../components/common/ComponentCard";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DropzoneComponent from "../../components/form/form-elements/DropZone";





export default function CreateSupplier() {
  
 

  return (
    <>
      <PageMeta
        title="Create a new Supplier"
        description="Create and manage your suppliers with ease using our intuitive form."
      />
      <PageBreadcrumb pageTitle="New Supplier" />
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE FORM */}
        <div className="space-y-3">
          <div className="mb-2">
            <Label htmlFor="name">Supplier Name</Label>
            <Input id="name" placeholder="Enter supplier name" />
          </div>
          <div className="mb-2">
            <Label htmlFor="name">Supplier Phone Number</Label>

            <Input id="name" placeholder="Enter phone number" />
          </div>

          <div className="mb-2">
            <Label htmlFor="name"> Supplier Address</Label>

            <Input id="name" placeholder="Enter address" />
          </div>
          <ComponentCard title="Flags">
            <div className="space-y-2">
              <Switch label="Is Published?" />
            </div>
          </ComponentCard>
        </div>

        {/* RIGHT SIDE CONTROLS */}
        <div className="space-y-2">
          <ComponentCard title="Supplier Image">
            <DropzoneComponent />
          </ComponentCard>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Supplier
          </button>
        </div>
      </form>
    </>
  );
}
