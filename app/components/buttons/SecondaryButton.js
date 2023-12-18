import Link from 'next/link'

const SecondaryButton = (props) => {
    const classNames = `glow-on-hover w-50 py-5 px-5 mt-5 uppercase font-bold flex gap-5 item-center justify-center cursor-pointer select-none ${props.className || ''}`;
    return (
        <Link 
            className={classNames}
            href={props.href || '#'} 
            title={props.title || ''}
            target={props.target || ''}
            rel="noopener noreferrer"
            type="button"
        >
            {props.children}
        </Link>
    );
};

export default SecondaryButton;
