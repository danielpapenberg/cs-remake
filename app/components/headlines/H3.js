const H3 = (props) => {
    const classNames = `text-[40px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold mb-5 ${props.className || ''}`;
    return (
        <h3 className={classNames}>
            {props.children}
        </h3>
    );
};

export default H3;
