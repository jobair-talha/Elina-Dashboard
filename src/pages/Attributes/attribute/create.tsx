

import Input from '../../../components/form/input/InputField';
import Switch from '../../../components/form/switch/Switch';
import Label from '../../../components/form/Label';
import ComponentCard from '../../../components/common/ComponentCard';

import PageMeta from '../../../components/common/PageMeta';
import PageBreadcrumb from '../../../components/common/PageBreadCrumb';


const CreateAttribute = () => {
  return (
    <>
      <PageMeta
        title="Create a new Attribute"
        description="Create and manage your suppliers with ease using our intuitive form."
      />
      <PageBreadcrumb pageTitle="Create Attribute" />
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE FORM */}
        <div className="space-y-3">
          <div className="mb-2">
            <Label htmlFor="name">Attribute Name</Label>
            <Input id="name" placeholder="Enter attribute name" />
          </div>

          <ComponentCard title="Flags">
            <div className="space-y-2">
              <Switch label="Is Published?" />
            </div>
          </ComponentCard>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Attribute
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateAttribute;
