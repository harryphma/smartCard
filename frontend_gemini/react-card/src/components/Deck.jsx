import { useRef, useState } from "react";
import Modal from "./Modal.jsx";

export default function Deck({ showButton = false }) {
    const modal = useRef();
    const nameDeck = useRef();
    const numberCards = useRef();
    const fileUpload = useRef();

    const [nameIsValid, setNameIsValid] = useState(true);
    const [fileIsValid, setFileIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleModal() {
        modal.current.open();
        setIsSubmitted(false);
    }

    function handleClose() {
        // Reset form fields
        nameDeck.current.value = "";
        fileUpload.current.value = null;
        numberCards.current.value = "1";

        setNameIsValid(true);
        setFileIsValid(true);
        setIsSubmitted(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitted(true);

        const enteredNameDeck = nameDeck.current.value.trim();
        const enteredFileUpload = fileUpload.current.files[0];

        const isNameValid = enteredNameDeck !== "";
        const isFileValid = !!enteredFileUpload;

        setNameIsValid(isNameValid);
        setFileIsValid(isFileValid);

        if (isNameValid && isFileValid) {
            console.log("Form submitted!");
            modal.current.close();
        }
    }

    return (
        <>
            <h2 className="text-black">Hello</h2>
            {showButton && (
                <button onClick={handleModal} className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">+</button>
            )}
            <Modal ref={modal} buttonCaption="Generate" onSubmit={handleSubmit} onCancel={handleClose}>
                <h2>Create Deck</h2>
                <div className="text-left text-black">
                    <div>
                        <label htmlFor="nameDeck">Name of the deck</label>
                        <input
                            type="text"
                            id="nameDeck"
                            ref={nameDeck}
                            className={`bg-white border p-2 rounded-md w-full ${!nameIsValid ? "border-blue-500" : "border-gray-300"}`}
                        />
                        {!nameIsValid && isSubmitted && <p className="text-blue-500">Please enter a name</p>}
                    </div>
                    <div>
                        <label htmlFor="numberCards">Number of cards</label>
                        <select id="numberCards" ref={numberCards} className="bg-white border border-gray-300 p-2 rounded-md w-full">
                            {[...Array(10).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fileUpload">File Upload</label>
                        <input
                            type="file"
                            id="fileUpload"
                            accept=".pdf"
                            ref={fileUpload}
                            className={`bg-white border p-2 rounded-md w-full ${!fileIsValid ? "border-blue-500" : "border-gray-300"}`}
                        />
                        {!fileIsValid && isSubmitted && <p className="text-blue-500">Please upload a file</p>}
                    </div>
                </div>
            </Modal>
        </>
    );
}
