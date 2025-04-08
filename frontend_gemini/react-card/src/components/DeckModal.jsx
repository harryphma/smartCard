import { useRef, useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx"; // your existing Button component

export default function DeckModal({ isOpen, onClose, onAddDeck }) {
    const modalRef = useRef();

    const nameDeck = useRef();
    const numberCards = useRef();
    const fileUpload = useRef();

    const [nameIsValid, setNameIsValid] = useState(true);
    const [fileIsValid, setFileIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // Show/hide dialog based on isOpen
    useEffect(() => {
        if (!modalRef.current) return;
        if (isOpen) {
            modalRef.current.open();
        } else {
            modalRef.current.close();
        }
    }, [isOpen]);

    function handleTabChange(tabIndex) {
        setActiveTab(tabIndex);
        // Reset all fields and validation
        if (nameDeck.current) nameDeck.current.value = "";
        if (fileUpload.current) fileUpload.current.value = null;
        if (numberCards.current) numberCards.current.value = "1";
        setNameIsValid(true);
        setFileIsValid(true);
        setIsSubmitted(false);
    }

    function handleClose() {
        // Reset fields
        if (nameDeck.current) nameDeck.current.value = "";
        if (fileUpload.current) fileUpload.current.value = null;
        if (numberCards.current) numberCards.current.value = "1";

        // Reset validation
        setNameIsValid(true);
        setFileIsValid(true);
        setIsSubmitted(false);
        setActiveTab(0);

        // Notify parent that we're done
        onClose?.();
    }

    function handleNameChange(e) {
        const value = e.target.value.trim();
        setNameIsValid(value !== "" || !isSubmitted);
    }

    function handleFileChange(e) {
        const file = e.target.files?.[0];
        setFileIsValid(!!file || !isSubmitted);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitted(true);

        if (activeTab === 0) {
            // AI tab
            const enteredName = nameDeck.current.value.trim();
            const enteredFile = fileUpload.current.files[0];
            setNameIsValid(enteredName !== "");
            setFileIsValid(!!enteredFile);
        } else {
            // Manual tab
            const enteredName = nameDeck.current.value.trim();
            setNameIsValid(enteredName !== "");
            
            if (enteredName !== "") {
                // Create new deck
                onAddDeck?.(enteredName);
                // Close the modal
                handleClose();
                if (modalRef.current) {
                    modalRef.current.close();
                }
            }
        }
    }

    function renderTabContent() {
        switch (activeTab) {
            case 0:
                return (
                    <>
                        <div>
                            <label htmlFor="nameDeck">Name of the deck</label>
                            <input
                                type="text"
                                id="nameDeck"
                                ref={nameDeck}
                                className={`bg-white border p-2 rounded-md w-full ${
                                !nameIsValid ? "border-blue-500" : "border-gray-300"
                                }`}
                                onChange={handleNameChange}
                            />
                            {!nameIsValid && isSubmitted && (
                                <p className="text-blue-500">Please enter name</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="numberCards">Number of cards</label>
                            <select
                                id="numberCards"
                                ref={numberCards}
                                className="bg-white border border-gray-300 p-2 rounded-md w-full"
                            >
                                {[...Array(10).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="fileUpload">File Upload</label>
                            <input
                                type="file"
                                id="fileUpload"
                                accept=".pdf"
                                ref={fileUpload}
                                className={`bg-white border p-2 rounded-md w-full ${
                                !fileIsValid ? "border-blue-500" : "border-gray-300"
                                }`}
                                onChange={handleFileChange}
                            />
                            {!fileIsValid && isSubmitted && (
                                <p className="text-blue-500">Please upload file</p>
                            )}
                        </div>
                    </>
                );

            case 1:
                return (
                    <>
                        <div>
                            <label htmlFor="nameDeck">Name of the deck</label>
                            <input
                                type="text"
                                id="nameDeck"
                                ref={nameDeck}
                                className={`bg-white border p-2 rounded-md w-full ${
                                !nameIsValid ? "border-blue-500" : "border-gray-300"
                                }`}
                                onChange={handleNameChange}
                            />
                            {!nameIsValid && isSubmitted && (
                                <p className="text-blue-500">Please enter name</p>
                            )}
                        </div>
                    </>
                );

            default:
                return null;
        }
    }

    return (
        <Modal ref={modalRef} onSubmit={handleSubmit}>
        {/* Header with tab buttons */}
            <div className="w-full bg-white">
                <div className="flex w-full border-b border-gray-300">
                    <Button
                        type="button"
                        onClick={() => handleTabChange(0)}
                        className={`rounded-l-md flex-1 px-4 py-3 text-center transition-colors bg-white text-black
                        ${activeTab === 0 ? "border-gray-500 font-bold" : "hover:bg-gray-300"}
                        `}
                    >
                        AI-Generated
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleTabChange(1)}
                        className={`rounded-r-md flex-1 px-4 py-3 text-center transition-colors bg-white text-black
                        ${activeTab === 1 ? "border-gray-500 font-bold" : "hover:bg-gray-300"}
                        `}
                    >
                        Manually
                    </Button>
                </div>
            </div>

        {/* Main content */}
            <div className="flex-1 p-8 bg-white overflow-y-auto text-left text-black">
                {renderTabContent()}
            </div>

        {/* Footer with Cancel and Submit buttons */}
            <div className="p-4 bg-white border-t border-gray-300 flex justify-end space-x-4">
                <Button
                    type="button"
                    onClick={() => {
                        // We call handleClose() to reset state,
                        // then also .close() the dialog on the ref
                        if (modalRef.current) {
                        modalRef.current.close();
                        }
                        handleClose();
                    }}
                    className="hover:bg-gray-400 hover:text-blue-500"
                >
                    Cancel
                </Button>
                <Button type="submit" className="hover:bg-gray-400 hover:text-blue-500">
                    Generate
                </Button>
            </div>
        </Modal>
    );
}
