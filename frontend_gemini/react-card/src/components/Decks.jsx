export default function Decks({children, onClick, className}) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}