import React, { useState, forwardRef, useImperativeHandle } from "react";

const ModalWithTabs = forwardRef(({ onSubmit, onCancel }, ref) => {
  const [activeTab, setActiveTab] = useState(0); // 0 for first tab, 1 for second tab
  const [isOpen, setIsOpen] = useState(false);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    onCancel?.();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit?.();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="border-b border-gray-300 mb-4">
          <button
            onClick={() => handleTabChange(0)}
            className={`px-4 py-2 ${
              activeTab === 0 ? "border-b-2 border-blue-500 font-bold" : ""
            }`}
          >
            Tab 1
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`px-4 py-2 ${
              activeTab === 1 ? "border-b-2 border-blue-500 font-bold" : ""
            }`}
          >
            Tab 2
          </button>
        </div>

        <div className="mb-4">
          {activeTab === 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Content for Tab 1</h3>
              <p>This is the content for the first tab.</p>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Content for Tab 2</h3>
              <p>This is the content for the second tab.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleModalClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
});

export default ModalWithTabs;


import React, { useRef } from "react";
import ModalWithTabs from "./components/ModalWithTabs.jsx";

function App() {
  const modalRef = useRef();

  const handleOpenModal = () => {
    modalRef.current.open();
  };

  const handleCloseModal = () => {
    console.log("Modal closed");
  };

  const handleSubmitModal = () => {
    console.log("Form submitted");
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Open Modal
      </button>
      <ModalWithTabs
        ref={modalRef}
        onCancel={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
    </div>
  );
}

export default App;