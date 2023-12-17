import SecondaryButton from './SecondaryButton';

const PrimaryButton = (props) => {
    const classNames = `glow-on-hover-active ${props.className || ''}`;
    return (
        <SecondaryButton 
            className={classNames}
            href={props.href || '#'} 
            title={props.title || ''}
            target={props.target || ''}
        >
            {props.children}
        </SecondaryButton>
    );
};

export default PrimaryButton;
