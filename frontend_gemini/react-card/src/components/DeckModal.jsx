// DeckModal.jsx
import { useRef, useState, useEffect } from "react";
import Modal from "./Modal.jsx";

export default function DeckModal({ isOpen, onClose, buttonCaption = "Generate" }) {
    const modalRef = useRef();
    const nameDeck = useRef();
    const numberCards = useRef();
    const fileUpload = useRef();

    const [nameIsValid, setNameIsValid] = useState(true);
    const [fileIsValid, setFileIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

  // Keep the <dialog> open/closed in sync with parent’s isOpen
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
        // Reset all refs and state whenever user switches tabs
        if (nameDeck.current) {
            nameDeck.current.value = "";
        }
        if (fileUpload.current) {
            fileUpload.current.value = null;
        }
        if (numberCards.current) {
            numberCards.current.value = "1";
        }

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
        // Notify parent
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
            const enteredNameDeck = nameDeck.current.value.trim();
            const enteredFile = fileUpload.current.files[0];
            setNameIsValid(enteredNameDeck !== "");
            setFileIsValid(!!enteredFile);
        // If desired, do something with the validated data
        } else {
            const enteredNameDeck = nameDeck.current.value.trim();
            setNameIsValid(enteredNameDeck !== "");
        // If desired, do something else for “manual” tab
        }
        // If everything is valid, you could close here or leave it open
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
        <Modal
            ref={modalRef}
            buttonCaption={buttonCaption}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            onTabChange={handleTabChange}
            activeTab={activeTab}
        >
            <div className="text-left text-black">
                {renderTabContent()}
            </div>
        </Modal>
    );
}
