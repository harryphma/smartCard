import { act, useRef, useState } from "react";
import Button from "./Button.jsx";
import Modal from "./Modal.jsx";

export default function NoDeckSelected() {

    const modal = useRef();
    const nameDeck = useRef();
    const numberCards = useRef();
    const fileUpload = useRef();

    const [nameIsValid, setNameIsValid] = useState(true);
    const [fileIsValid, setFileIsValid] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    function handleTabChange(tabIndex) {
        setActiveTab(tabIndex);
    }
    
    function handleModal(){
        setIsModalOpen(true);
        setIsSubmitted(false);
        modal.current.open();
    }

    function handleClose(){
        // Reset the refs manually when the modal closes
        nameDeck.current.value = ""; // Reset name field
        fileUpload.current.value = null; // Reset file field
        numberCards.current.value = "1"; // Reset to default number of cards

        // Reset validation states
        setNameIsValid(true);
        setFileIsValid(true);

        setIsModalOpen(false);
        setIsSubmitted(false);

    }

    function handleNameChange(event) {
        const value = event.target.value.trim();
        setNameIsValid(value !== "" || !isSubmitted);
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        setFileIsValid(!!file || !isSubmitted); 
    }

    function handleSubmit(event){
        event.preventDefault();

        setIsSubmitted(true);

        const enteredNameDeck = nameDeck.current.value;
        const enteredFileUpload = fileUpload.current.files[0];

        const enteredNameDeckValid = enteredNameDeck.trim();

        const isNameValid = enteredNameDeckValid !== "";
        const isFileValid = !!enteredFileUpload;

        setNameIsValid(isNameValid);
        setFileIsValid(isFileValid);
    }

    const tabContent = () => {
        switch (activeTab){
            case 0:
                return (
                    <>
                        <div>
                            <label htmlFor="nameDeck">Name of the deck</label>
                            <input 
                                type="text" 
                                id="nameDeck" 
                                ref={nameDeck} 
                                className={`bg-white border p-2 rounded-md w-full ${!nameIsValid ? "border-blue-500" : "border-gray-300"}`}
                                onChange={handleNameChange}
                            />
                            <div>
                                {!nameIsValid && isSubmitted && (<p className="text-blue-500">Please enter name</p>)}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="numberCards">Number of cards</label>
                            <select id="numberCards" ref={numberCards} className="bg-white border border-gray-300 p-2 rounded-md w-full">
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
                                className={`bg-white border p-2 rounded-md w-full ${!fileIsValid ? "border-blue-500" : "border-gray-300"}`}
                                onChange={handleFileChange}
                            />
                            <div>
                                {!fileIsValid && isSubmitted && (<p className="text-blue-500">Please upload file</p>)}
                            </div>
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
                                className={`bg-white border p-2 rounded-md w-full ${!nameIsValid ? "border-blue-500" : "border-gray-300"}`}
                                onChange={handleNameChange}
                            />
                            <div>
                                {!nameIsValid && isSubmitted && (<p className="text-blue-500">Please enter name</p>)}
                            </div>
                        </div>
                    </>
                );

        }
    }

    return (
        <>
            <Modal ref={modal} buttonCaption = "Generate" onSubmit={handleSubmit} onCancel={handleClose} onTabChange={handleTabChange} activeTab={activeTab}>
                <div className="text-left text-black">
                    {tabContent()}
                </div>
            </Modal>
            <div className="w-2/3 h-screen flex flex-col justify-center items-center text-center ml-auto">
                <h2 className="text-xl font-bold text-stone-500 my-4 whitespace-nowrap">Start Learning</h2>
                <p className="mt-8">
                    <button onClick={handleModal} className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 whitespace-nowrap">Create a new deck</button>
                </p>
            </div>
        </>
    );
}