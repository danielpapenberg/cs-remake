import React from 'react';

// First component: Modal
export const Modal = ({ isOpen, onClose, onConfirm, headline, subheadline, button1, button2 }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center bg-gray-500">
            <div className="bg-white p-4 rounded text-black border">
                <h3 className="font-bold pb-2 text-[24px] uppercase">{headline}</h3>
                <p className="pb-4">{subheadline}</p>
                <button className="bg-green-800 text-white p-2 rounded mr-4" onClick={onConfirm}>{button1}</button>
                {
                    button2 &&
                        <button className="bg-gray-300 text-black p-2 rounded" onClick={onClose}>{button2}</button>
                }
            </div>
        </div>
    );
};

// Second component: ConfirmationModal (example)
export const ConfirmationModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center bg-blue-500">
            <div className="bg-white p-4 rounded text-black border">
                <p className="pb-4">{message}</p>
                <button className="bg-green-500 text-white p-2 rounded mr-4" onClick={onClose}>Confirm</button>
            </div>
        </div>
    );
};

// Additional components can be defined and exported similarly
