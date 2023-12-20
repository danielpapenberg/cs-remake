const FormButton = (props) => {
    const classNames = `glow-on-hover w-50 py-5 px-5 mt-5 uppercase font-bold flex gap-5 item-center justify-center cursor-pointer select-none ${props.className || ''}`;
    return (
        <button 
            className={classNames}
            type={'submit'}
        >
            {props.children}
        </button>
    );
};

export default FormButton;
