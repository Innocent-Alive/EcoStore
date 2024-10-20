import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ConfirmModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-background p-6 rounded-lg w-[500px] relative shadow-lg">
        {" "}
        {children}
        <button
          className="absolute top-2 right-2 text-primary hover:text-secondary"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
