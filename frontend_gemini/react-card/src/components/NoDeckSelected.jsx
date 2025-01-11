import { useRef } from "react";
import Button from "./Button.jsx";
import Modal from "./Modal.jsx";

export default function NoDeckSelected() {

    const modal = useRef();

    function handleModal(){
        modal.current.open();
    }
    return (
        <>
            <Modal ref={modal} buttonCaption = "Generate">
                <h2 className="text-xl font-bold text-stone-700 my-4" >Invalid Input</h2>
                <p className="text-stone-600 mb-4">Forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Make sure to double check</p>
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