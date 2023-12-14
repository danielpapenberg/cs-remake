import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const PrimaryButton = (props) => {
    const classNames = `glow-on-hover w-50 py-5 px-5 lg:px-10 mt-5 uppercase font-bold flex gap-5 item-center justify-center cursor-pointer select-none ${props.className || ''}`;

    return (
        <a 
            className={classNames}
            href={props.href || '#'} 
            title={props.title || ''}
            target={props.target || ''}
            rel="noopener noreferrer"
            type="button"
        >
            {props.children}
        </a>
    );
};

export default PrimaryButton;
