import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button.jsx";

const Modal = forwardRef(({buttonCaption, children, onSubmit, action = () => {}}, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    });

    return (
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 bg-white p-8 w-1/2 h-96 rounded-md shadow-md">
            
            <form method="dialog" className="mt-4 text-right" onSubmit={onSubmit}>
                {children}
                <Button className="absolute bottom-4 right-4 hover:bg-gray-400 hover:text-blue-500">{buttonCaption}</Button>
            </form>
        </dialog>
    );
});

export default Modal;
