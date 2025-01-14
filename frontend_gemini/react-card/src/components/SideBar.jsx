import Decks from "./Decks";

export default function SideBar({ activeDeck, onSelectDeck }) {
    const deckTypes = ["Your Decks", "Shared Decks", "Deleted Decks"];
    
    return (
        <aside className="side-bar h-full flex flex-col">
            <ul className="mt-20 flex flex-col gap-28">
                {deckTypes.map((deckType, index) => {
                    // Base classes that are always applied
                    const baseClasses = "px-6 py-4 rounded-md transition duration-300 flex items-center justify-center w-full";

                    
                    // Determine if this deck is active
                    const isActive = activeDeck === index;
                    
                    // Conditional classes based on active state
                    const stateClasses = isActive ? "bg-black text-white" : "text-black bg-white hover:text-white hover:bg-black"; 
                    
                    // Combine all classes
                    const cssClasses = `${baseClasses} ${stateClasses}`;

                    return (
                        <li key={index}>
                            {/* Pass the CSS classes correctly */}
                            <Decks
                                onClick={() => onSelectDeck(index)}
                                className={cssClasses}
                            >
                                {deckType}
                            </Decks>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
