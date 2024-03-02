const Modal = ({ isOpen, onClose, onConfirm, headline, subheadline, button1, button2 }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center bg-gray-500">
            <div className="bg-white p-4 rounded text-black border">
                <h3 className="font-bold pb-2 text-[24px]">{headline}</h3>
                <p className="pb-4">{subheadline}</p>
                <button className="bg-red-500 text-white p-2 rounded mr-4" onClick={onConfirm}>{button1}</button>
                <button className="bg-gray-300 text-black p-2 rounded" onClick={onClose}>{button2}</button>
            </div>
        </div>
    );
};

export default Modal;