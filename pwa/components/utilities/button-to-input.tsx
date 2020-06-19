import React from 'react';

export type ButtonToInputProps = {
    children?: React.ReactNode
    value: string;
    className?: string;
    placeholder?: string;
    onChange?: (value: string) => void,
    onIsActive?: (isActive: boolean) => void
}

export const ButtonToInput = (props: ButtonToInputProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [isActive, setIsActive] = React.useState(false);
    const [transientValue, setTransientValue] = React.useState(props.value);
    const [width, setWidth] = React.useState<number>();
    React.useEffect(() => {
        setIsActive(false);
    }, [props.value])
    React.useEffect(() => {
        setTransientValue(props.value)
    }, [isActive])
    React.useEffect(() => {
        if (!isActive) setWidth(buttonRef.current?.getBoundingClientRect().width)
    }, [isActive]);
    return (
        <div ref={containerRef} onBlur={onBlur}>
            {isActive ? (
                <input className={props.className}
                    style={{width: width ? width+'px' : 'auto'}}
                    value={transientValue}
                    onChange={ev=>setTransientValue(ev.target.value)}
                    onKeyDown={respondToKey}
                    autoFocus={true}
                    placeholder={props.placeholder}
                />
            ) : (
                <button ref={buttonRef}
                    className={props.className}
                    onClick={() => setIsActive(true)}
                >
                    {props.value || props.placeholder || ''}
                </button>
            )}
            {props.children}
        </div>
    );
    function respondToKey(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.key === 'Enter') {
            if (props.onChange) props.onChange(transientValue);
            setIsActive(false);
        }
        else if (ev.key === 'Escape') {
            setIsActive(false);
        }
    }
    function onBlur(this: Document, ev: React.FocusEvent) {
        const focusInContainer = containerRef.current?.contains(ev.relatedTarget as Node)
        if (!focusInContainer) {
            if (props.onChange && props.value != transientValue) {
                props.onChange(transientValue)
            }
            setIsActive(false);
        }
    }
}

