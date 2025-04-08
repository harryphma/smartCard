import { useState } from "react";
import DeckModal from "./DeckModal.jsx";
import Button from "./Button.jsx";

export default function NoDeckSelected({onAddDeck}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <DeckModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddDeck={onAddDeck}
            />
            <div className="w-2/3 h-screen flex flex-col justify-center items-center text-center ml-auto">
                <h2 className="text-xl font-bold text-stone-500 my-4 whitespace-nowrap">Start Learning</h2>
                <p className="mt-8">
                    <Button
                        onClick={handleOpenModal}
                        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 whitespace-nowrap"
                    >
                        Create a new deck
                    </Button>
                </p>
            </div>
        </>
    );
}
