export default function Decks({children}) {
    return (
        <button className="text-black bg-white  hover:text-white hover:bg-black px-4 py-2 rounded-md transition duration-300">
            {children}
        </button>
    );
}