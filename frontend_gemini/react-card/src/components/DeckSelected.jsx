import { useState } from "react";
import DeckModal from "./DeckModal.jsx";
import Button from "./Button.jsx";

export default function DeckSelected({ showButton = false, selectedDeckType, decks = [], onAddDeck }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    const getCategoryTitle = () => {
        switch(selectedDeckType) {
            case 0:
                return "Your Decks";
            case 1:
                return "Shared Decks";
            case 2:
                return "Deleted Decks";
            default:
                return "Decks";
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">{getCategoryTitle()}</h2>
            
            {decks.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                    <p>No decks in this category yet.</p>
                    {showButton && (
                        <p className="mt-2">Click the + button to create a new deck!</p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {decks.map(deck => (
                        <div 
                            key={deck.id}
                            className="aspect-square bg-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center p-4 cursor-pointer"
                        >
                            <div className="text-center">
                                <h3 className="font-semibold text-lg text-white">{deck.name}</h3>
                                <p className="text-sm text-gray-300 mt-2">
                                    Created for testing
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showButton && (
                <Button
                    onClick={handleOpenModal}
                    className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    +
                </Button>
            )}

            <DeckModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddDeck={onAddDeck}
            />
        </div>
    );
}
