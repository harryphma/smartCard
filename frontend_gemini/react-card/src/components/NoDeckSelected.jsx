import Button from "./Button.jsx";

export default function NoDeckSelected() {
    return (
        <div className="w-2/3 h-screen flex flex-col justify-center items-center text-center ml-auto">
            <h2 className="text-xl font-bold text-stone-500 my-4 whitespace-nowrap">Start Learning</h2>
            <p className="mt-8">
                <Button>Create a new deck</Button>
            </p>
        </div>
    );
}