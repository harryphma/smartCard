import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button.jsx";

const Modal = forwardRef(({buttonCaption, children, onSubmit, onCancel, action = () => {}}, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            },
            close(){
                dialog.current.close();
            }
        }
    });

    return (
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 bg-white p-8 w-1/2 h-96 rounded-md shadow-md">
            <form method="dialog" className="mt-4 text-right" onSubmit={onSubmit}>
                {children}
                <div className="absolute bottom-4 right-4 flex space-x-4">
                    <Button onClick={() => {dialog.current.close(); onCancel();}} className="hover:bg-gray-400 hover:text-blue-500">Cancel</Button>
                    <Button className="hover:bg-gray-400 hover:text-blue-500">{buttonCaption}</Button>
                </div>
            </form>
        </dialog>
    );
});

export default Modal;
