const H2 = (props) => {
    const classNames = `text-[60px] lg:text-[100px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold mb-5 ${props.className || ''}`;
    return (
        <h2 className={classNames}>
            {props.children}
        </h2>
    );
};

export default H2;
