import { forwardRef, useImperativeHandle, useRef } from "react";

/**
 * A generic Modal that simply:
 * - Renders a <dialog> with a <form method="dialog">,
 * - Exposes .open() and .close() methods via ref,
 * - Calls onSubmit() when the form is submitted,
 * - Renders whatever children you pass it inside the form.
 */
const Modal = forwardRef(({ onSubmit, children, className }, ref) => {
    const dialogRef = useRef(null);

    // Expose open() / close() to parent
    useImperativeHandle(ref, () => ({
        open() {
            dialogRef.current?.showModal();
        },
        close() {
            dialogRef.current?.close();
        }
    }));

    return (
        <dialog
        ref={dialogRef}
        // You can customize classes as you like
        className={`backdrop:bg-stone-900/90 p-0 w-1/2 h-96 rounded-md shadow-md overflow-hidden ${className || ""}`}
        >
            <form method="dialog" onSubmit={onSubmit} className="h-full flex flex-col">
                {children}
            </form>
        </dialog>
    );
});

export default Modal;
