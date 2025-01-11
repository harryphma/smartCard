import Decks from "./Decks";

export default function SideBar() {
    return (
        <aside className="side-bar h-full flex flex-col">
            <ul className="mt-20 flex flex-col gap-28 ">
                <Decks children="Your Decks"></Decks>
                <Decks children="Shared Decks"></Decks>
                <Decks children="Deleted Decks"></Decks>
            </ul>
        </aside>
    );
}