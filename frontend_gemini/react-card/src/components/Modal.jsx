import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button.jsx";

const Modal = forwardRef(({buttonCaption, children, onSubmit}, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    });

    return (
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right" onSubmit={onSubmit}>
                    <Button>{buttonCaption}</Button>
            </form>
        </dialog>
    );
});

export default Modal;
