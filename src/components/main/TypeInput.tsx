"use client";

import { useEffect, useRef } from "react";

type Props = {
    inputValue: string;
    isFocused: boolean;
    onInputValueChange: (value: string) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onFocusChange: (isFocused: boolean) => void;
};

export default function TypeInput({
    inputValue,
    isFocused,
    onInputValueChange,
    onKeyDown,
    onFocusChange,
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, [isFocused]);

    const handleOnBlur = () => {
        onFocusChange(false);
    };

    return (
        <input
            ref={inputRef}
            className="h-8 text-black w-full opacity-0 pointer-events-none"
            autoFocus
            onFocus={() => onFocusChange(true)}
            onBlur={() => handleOnBlur()}
            value={inputValue}
            onChange={(e) => {
                onInputValueChange(e.target.value);
            }}
            onKeyDown={(e) => onKeyDown(e)}
        />
    );
}
