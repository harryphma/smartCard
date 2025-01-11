import { useRef, useState } from "react";
import Button from "./Button.jsx";
import Modal from "./Modal.jsx";

export default function NoDeckSelected() {

    const modal = useRef();

    function handleModal(){
        modal.current.open();
    }
    const [nameIsValid, setNameIsValid] = useState(true);
    const nameDeck = useRef();
    const numberCards = useRef();

    function handleSubmit(event){
        event.preventDefault();

        const enteredNameDeck = nameDeck.current.value;
        const enteredNumberCards = numberCards.current.value;

        if (enteredNameDeck.trim() === ''){
            setNameIsValid(false);
            return;
        }

        setNameIsValid(true);
    }

    return (
        <>
            <Modal ref={modal} buttonCaption = "Generate">
                <form onSubmit={handleSubmit}>
                    <h2>User Input</h2>
                    <div>
                        <label htmlFor="nameDeck">Name of the deck</label>
                        <input type="text" id="nameDeck" ref={nameDeck} />
                        <div>
                            {!nameIsValid && <p>Please enter name</p>}
                        </div>

                        <label htmlFor="numberCards">Number of cards</label>
                        <input type="number" id="numberCards" ref={numberCards} />
                    </div>
                    <button type="submit">Generate</button>
                </form>

            </Modal>
            <div className="w-2/3 h-screen flex flex-col justify-center items-center text-center ml-auto">
                <h2 className="text-xl font-bold text-stone-500 my-4 whitespace-nowrap">Start Learning</h2>
                <p className="mt-8">
                    <Button onClick={handleModal}>Create a new deck</Button>
                </p>
            </div>
        </>
    );
}