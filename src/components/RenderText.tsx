"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const colorClassNameMap = {
    w: "text-white",
    g: "text-green-400",
    r: "text-red-400",
};

export default function RenderText({
    text,
    inputValue,
    setInputValue,
    latestKeyEvent,
    gameFinished,
}: {
    text: LetterObj[][];
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    latestKeyEvent: string;
    gameFinished: () => void;
}) {
    console.log("---RENDER---");
    const [textArray, setTextArray] = useState(text);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

    // if (latestKeyEvent === 'Backspace' && currentLetterIndex > 0)  setCurrentLetterIndex(currentLetterIndex - 1)
    if (
        latestKeyEvent === "Backspace" &&
        inputValue.length === 0 &&
        textArray[currentWordIndex - 1]?.some((item) => item.color === "r")
    ) {
        setCurrentWordIndex((prev) => prev - 1);

        // const word = textArray[currentWordIndex]
        // setCurrentLetterIndex(word.length - 1)
    }
    // if (latestKeyEvent !== 'Backspace')
    //     setCurrentWordIndex(prev => prev + 1)

    useEffect(() => {
        if (currentWordIndex >= textArray.length) {
            gameFinished();
            return;
        }
        const word = textArray[currentWordIndex];

        if (
            !word.some((item) => item.color === "w") &&
            inputValue[inputValue.length - 1] === " "
        ) {
            setInputValue("");
            setCurrentLetterIndex(0);
            setCurrentWordIndex(currentWordIndex + 1);
            return;
        }
        console.log("calling useEffect");
        console.log("latestKeyEvent", latestKeyEvent);

        const changedWord = word.map<LetterObj>((item, index) => {
            if (inputValue[index] === item.letter)
                return { color: "g", letter: item.letter };
            else if (inputValue[index] && inputValue[index] !== item.letter)
                return { color: "r", letter: item.letter };

            return { color: "w", letter: item.letter };
        });
        const newTextArray = textArray.map((value, index) =>
            index === currentWordIndex ? changedWord : value,
        );
        setTextArray(newTextArray);
    }, [inputValue]);

    const renderCursor = (
        letter: string,
        wordIndex: number,
        letterIndex: number,
        wordLength: number,
    ) => {
        console.log("letterIndex", letterIndex);
        console.log("inputValue.length", inputValue.length);
        if (wordIndex === currentWordIndex && letterIndex === wordLength) {
            return (
                <>
                    <span className="before:content-[''] w-[1px] h-[20px] inline-block bg-white absolute"></span>
                    {letter}
                </>
            );
        } else return letter;
    };

    const renderWord = (word: LetterObj[], wordIndex: number) =>
        word.map((item, letterIndex) => (
            <span key={letterIndex} className={colorClassNameMap[item.color]}>
                {renderCursor(item.letter, wordIndex, letterIndex, word.length)}
            </span>
        ));

    const renderedText = textArray.map((word, wordIndex) => {
        return <span key={wordIndex}>{renderWord(word, wordIndex)} </span>;
    });

    return <p className="font-mono">{renderedText}</p>;
}
