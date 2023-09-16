'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"

const colorClassNameMap = {
    'w': "text-white",
    'g': "text-green-400",
    'r': "text-red-400",
}

export default function RenderText({text, inputValue, setInputValue, latestKeyEvent}: 
    {
        text: LetterObj[][],
        inputValue: string,
        setInputValue: Dispatch<SetStateAction<string>>,
        latestKeyEvent: string,
    }) {
    console.log('---RENDER---')
    const [textArray, setTextArray] = useState(text)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0)

    // if (latestKeyEvent === 'Backspace' && currentLetterIndex > 0)  setCurrentLetterIndex(currentLetterIndex - 1)
    // if (latestKeyEvent === 'Backspace')

    useEffect(() => {
        const word = textArray[currentWordIndex]

        if (!word.some(item => item.color === 'w') && inputValue[inputValue.length - 1] === ' ') {
            setInputValue('')
            setCurrentLetterIndex(0)
            setCurrentWordIndex(currentWordIndex + 1)
            return
        }
        console.log('calling useEffect')
        console.log('latestKeyEvent', latestKeyEvent)
        
        const changedWord = word.map<LetterObj>((item, index) => {
            if (inputValue[index] === item.letter) return ({ color: 'g', letter: item.letter })
            else if (inputValue[index] && inputValue[index] !== item.letter) return ({ color: 'r', letter: item.letter })

            return ({ color: 'w', letter: item.letter })
        })
        const newTextArray = textArray.map((value, index) => index === currentWordIndex ? changedWord : value)
        setTextArray(newTextArray)
    }, [inputValue])
    
    const renderCursor = (letter:string, wordIndex:number, letterIndex:number) => {
        if (wordIndex === currentWordIndex && letterIndex === inputValue.length) {
            return <>
                <span className="before:content-[''] w-1 h-4 inline-block bg-white"></span>
                {letter}
            </>
        }
        else return letter
    }

    const renderWord = (word: LetterObj[], wordIndex: number) => 
        word.map((item, letterIndex) =>
            <span key={letterIndex} className={colorClassNameMap[item.color]}>
                {renderCursor(item.letter, wordIndex, letterIndex)}
            </span>
        )
    
    
    const renderedText = textArray.map((word, wordIndex) => {
        return (
            <span key={wordIndex}>{renderWord(word, wordIndex)} </span>
        )
    })

    return (
        <p className="font-mono">
            {renderedText}
        </p>
    )
}