'use client'

import { Dispatch, SetStateAction } from "react"

export default function TypeInput({ inputValue, onInputValueChange, onKeyDown }: 
    { 
        inputValue: string, 
        onInputValueChange: Dispatch<SetStateAction<string>>,
        onKeyDown: Dispatch<SetStateAction<string>>,
    }) {
    return (
        <input className="h-8 text-black w-full" value={inputValue} onChange={e => onInputValueChange(e.target.value)} onKeyDown={e => onKeyDown(e.key)} />
    )
}