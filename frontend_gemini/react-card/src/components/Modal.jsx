import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Button from "./Button.jsx";

const Modal = forwardRef(({buttonCaption, children, onSubmit, onCancel, action = () => {}, onTabChange, activeTab}, ref) => {
    const dialog = useRef();

    
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        }
    });

    

    return (
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-0 w-1/2 h-96 rounded-md shadow-md overflow-hidden">
            <form method="dialog" onSubmit={onSubmit} className="h-full flex flex-col">
                {/* Tabs container takes full width and removes padding */}
                <div className="w-full bg-white">
                    <div className="flex w-full border-b border-gray-300">
                        <button 
                            type="button" 
                            onClick={() => onTabChange(0)} 
                            className={`rounded-l-md flex-1 px-4 py-3 text-center transition-colors bg-white text-black
                                ${activeTab === 0 
                                    ? "border-gray-500 font-bold" 
                                    : "hover:bg-gray-300"}`}
                        >
                            AI-Generated
                        </button>
                        <button 
                            type="button" 
                            onClick={() => onTabChange(1)} 
                            className={`rounded-r-md flex-1 px-4 py-3 text-center transition-colors bg-white text-black
                                ${activeTab === 1 
                                    ? "border-gray-500 font-bold" 
                                    : "hover:bg-gray-300"}`}
                        >
                            Manually
                        </button>
                    </div>
                </div>

                {/* Content container with padding */}
                <div className="flex-1 p-8 bg-white overflow-y-auto">
                    {children}
                </div>

                {/* Footer with buttons */}
                <div className="p-4 bg-white border-t border-gray-300 flex justify-end space-x-4">
                    <Button 
                        onClick={() => {
                            dialog.current.close();
                            onCancel();
                        }}
                        className="hover:bg-gray-400 hover:text-blue-500"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="hover:bg-gray-400 hover:text-blue-500">
                        {buttonCaption}
                    </Button>
                </div>
            </form>
        </dialog>
    );
});

export default Modal;