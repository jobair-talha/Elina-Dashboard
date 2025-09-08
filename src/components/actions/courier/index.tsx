import {  useState } from "react";
import { CourierModal } from "../../ui/courier/modal";


const CourierAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(!isOpen);
  return (
    <>
      <button
        className="inline-flex items-center gap-2 rounded-full border border-blue-500 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
        onClick={onClose}
      >
        Courier Info
      </button>
      <CourierModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CourierAction;
