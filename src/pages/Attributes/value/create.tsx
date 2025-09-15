import Input from '../../../components/form/input/InputField';
import Switch from '../../../components/form/switch/Switch';
import Label from '../../../components/form/Label';
import ComponentCard from '../../../components/common/ComponentCard';
import { useState } from 'react';
import PageMeta from '../../../components/common/PageMeta';
import PageBreadcrumb from '../../../components/common/PageBreadCrumb';

const CreateAttributeValue = () => {

  const [selectedAttribute, setSelectedAttribute] = useState('Color');
  const attributes = ['Color', 'Size', 'Material', 'font-weight', 'bg-color', 'shadow'];
  const colors = [
    'White',
    'Black',
    'Ash',
    'Gary',
    'Khaki',
    'Red',
    'Pink',
    'Lime',
    'Olive',
    'Baige',
    'Black&Yellow',
    'Yellow',
  ];

  return (
    <>
      <PageMeta
        title="Create a new Attribute Value"
        description="Create and manage your suppliers with ease using our intuitive form."
      />
      <PageBreadcrumb pageTitle="Create Attribute Value" />
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE FORM */}

        <div className="space-y-3">
          {/* Label */}
          <label className="block text-gray-800 font-medium">
            Attributes Name
          </label>

          {/* Dropdown */}
          <select
            value={selectedAttribute}
            onChange={(e) => setSelectedAttribute(e.target.value)}
            className="w-full cursor-pointer border border-gray-300 rounded-md px-3 py-2  "
          >
            {attributes.map((attr, idx) => (
              <option key={idx} value={attr}>
                {attr}
              </option>
            ))}
          </select>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {colors.map((color, idx) => (
              <span
                key={idx}
                className="px-4 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium cursor-pointer hover:bg-rose-300 hover:text-white transition"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="mb-2">
            <Label htmlFor="name">Attribute Value Name</Label>
            <Input id="name" placeholder="Enter attribute name" />
          </div>

          <ComponentCard title="Flags">
            <div>
              <Switch label="Is Published?" />
            </div>
          </ComponentCard>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Attribute Value
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateAttributeValue;

