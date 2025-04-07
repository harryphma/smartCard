import { useState } from "react";
import DeckModal from "./DeckModal.jsx";
import Button from "./Button.jsx";

export default function Deck({ showButton = false }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <h2 className="text-black">Hello</h2>

            {showButton && (
                <Button
                    onClick={handleOpenModal}
                    className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                >
                +
                </Button>
            )}

            {/* Our new shared deck modal */}
            <DeckModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                buttonCaption="Generate"
            />
        </>
    );
}
