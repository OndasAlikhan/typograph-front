"use client";

import { useEffect, useRef, useState } from "react";
import TypeInput from "./TypeInput";
import Timer from "@/utils/timer";
import { SecondsElapsed } from "./SecondsElapsed";
import { FinishGameWrapper } from "./FinishGameWrapper";
import { Card } from "../common/Card";
import { LetterObj, getRandomQuote } from "@/types";

type Props = {
    quote?: string;
};

const colorClassNameMap = {
    w: "text-default-color",
    g: "text-green-700",
    r: "text-red-700",
};

const mapUnusualLetters = (letter: string) => {
    if (letter === `‘`) return `'`;
    return letter;
};

const getLetterObjArray = (text?: string): LetterObj[][] => {
    if (text)
        return text
            .split(" ")
            .map((word) =>
                word.split("").map((letter) => ({ color: "w", letter })),
            );
    else return [];
};

const timer = new Timer();

export default function RenderText({ quote }: Props) {
    const textRef = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);

    const [textArray, setTextArray] = useState(getLetterObjArray(quote));

    // an array of already typed words
    const [filledArray, setFilledArray] = useState<string[]>(
        new Array(textArray.length).fill(""),
    );
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [wpm, setWpm] = useState(0);

    const [inputValue, setInputValue] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(true);
    const [isGameFinished, setIsGameFinished] = useState(false);

    // runs on every key stroke
    useEffect(() => {
        setCurrentLetterIndex(inputValue.length);

        /* Starting game */
        if (!timer.isRunning && inputValue.length > 0) {
            timer.startTimer();
            setIsTimerStarted(true);
        }

        /* Finished game */
        if (
            currentWordIndex >= textArray.length - 1 &&
            inputValue.length === textArray[currentWordIndex].length
        ) {
            setIsGameFinished(true);
            const minutes = timer.stopTimer();
            const wpm = textArray.length / minutes;
            setWpm(wpm);
            setIsTimerStarted(false);
            return;
        }

        const word = textArray[currentWordIndex];

        /* Next word */
        if (
            !word?.some((item) => item.color === "w") &&
            inputValue?.[inputValue.length - 1] === " "
        ) {
            setInputValue("");
            setCurrentLetterIndex(0);
            setCurrentWordIndex((prev) => prev + 1);
            setFilledArray((prev) => {
                return prev.map((item, i) =>
                    i === currentWordIndex
                        ? inputValue.slice(0, word.length).trim()
                        : item,
                );
            });
            return;
        }

        /* Check if inputted letter is correct */
        const changedWord = word.map<LetterObj>((item, index) => {
            const inputtedLetter = mapUnusualLetters(inputValue[index]);

            if (inputtedLetter === item.letter)
                return { color: "g", letter: item.letter };
            else if (inputtedLetter && inputtedLetter !== item.letter)
                return { color: "r", letter: item.letter };
            return { color: "w", letter: item.letter };
        });
        const newTextArray = textArray.map((value, index) =>
            index === currentWordIndex ? changedWord : value,
        );

        /* Update state of the whole text */
        setTextArray(newTextArray);
    }, [inputValue]);

    useEffect(() => {
        // on first render, show caret
        if (
            currentLetterIndex === 0 &&
            currentWordIndex === 0 &&
            caretRef.current
        )
            caretRef.current.style.display = "block";

        const wordNode = textRef.current?.children?.[currentWordIndex];

        let letterNode: Element;
        if (wordNode?.children.length === currentLetterIndex) {
            // last letter in word
            letterNode = wordNode?.children?.[
                currentLetterIndex - 1
            ] as Element;
            const rect = letterNode?.getBoundingClientRect?.() || {};
            if (caretRef.current) caretRef.current.style.top = rect.y + "px";
            if (caretRef.current)
                caretRef.current.style.left = Number(rect.x + 12) + "px";
        } else {
            letterNode = wordNode?.children?.[currentLetterIndex] as Element;
            const rect = letterNode?.getBoundingClientRect?.() || {};
            if (caretRef.current) caretRef.current.style.top = rect.y + "px";
            if (caretRef.current)
                caretRef.current.style.left = Number(rect.x - 1) + "px";
        }

        // console.log("letterNode", letterNode);
    }, [currentLetterIndex, currentWordIndex]);

    const handleInputValueChange = (value: string) => {
        if (
            value.slice(-1) !== " " &&
            value.length > textArray[currentWordIndex].length
        ) {
            return;
        }

        setInputValue(() => value);
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (
            currentWordIndex > 0 &&
            event.key === "Backspace" &&
            inputValue === ""
        ) {
            event.preventDefault(); // to stop setting a empty string to inputValue

            setFilledArray((prev) =>
                prev.map((item, i) => (i === currentWordIndex - 1 ? "" : item)),
            );
            setCurrentWordIndex((prev) => prev - 1);
            setInputValue(() => filledArray[currentWordIndex - 1]);
        }
    };
    const handleFocusChange = (isFocused: boolean) => {
        setIsInputFocused(isFocused);
    };
    const handleTryAgain = () => {
        setTextArray(getLetterObjArray(getRandomQuote()?.Text));
        setFilledArray(new Array(textArray.length).fill(""));
        setCurrentWordIndex(0);
        setIsTimerStarted(false);
        setWpm(0);
        setInputValue("");
        setIsGameFinished(false);
    };

    const renderWord = (word: LetterObj[], wordIndex: number) =>
        word.map((item, letterIndex) => (
            <span key={letterIndex} className={colorClassNameMap[item.color]}>
                {item.letter}
            </span>
        ));

    const renderedText = textArray.map((word, wordIndex) => (
        <span key={wordIndex}>{renderWord(word, wordIndex)} </span>
    ));

    return (
        <FinishGameWrapper
            isGameFinished={isGameFinished}
            wpm={wpm}
            onTryAgain={handleTryAgain}
        >
            <Card>
                <span
                    ref={caretRef}
                    className="before:content-[''] w-[2px] h-[21px] hidden transition-all bg-black absolute"
                ></span>
                <div
                    className="relative"
                    onClick={() => {
                        setIsInputFocused(true);
                    }}
                >
                    <SecondsElapsed running={isTimerStarted} />

                    <div
                        id="text"
                        ref={textRef}
                        className={`font-mono text-xl min-h-[200px] ${
                            !isInputFocused && "blur-sm"
                        }`}
                    >
                        {renderedText}
                    </div>
                    {!isInputFocused && (
                        <span className="absolute text-lg font-mono left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            Click to focus
                        </span>
                    )}
                </div>
            </Card>
            <div className="mt-4 w-1/2 mx-auto absolute top-0">
                <TypeInput
                    inputValue={inputValue}
                    isFocused={isInputFocused}
                    onInputValueChange={handleInputValueChange}
                    onKeyDown={handleKeyDown}
                    onFocusChange={handleFocusChange}
                />
            </div>
            {/* <div className="max-w-fit transition-all flex gap-10 mt-10">
                <div className="w-[240px] h-[110px] flex flex-col justify-between">
                    <div className="text-sm">
                        Compete with players from all around the world to prove
                        your skills
                    </div>

                    <div className="border-b-2 border-black text-xl w-fit cursor-pointer">
                        ENTER A COMPETITION
                    </div>
                </div>
                <div className="w-[240px] h-[110px] flex flex-col justify-between">
                    <div className="text-sm">
                        Have a friendly match or a battle that defines your
                        destiny
                    </div>
                    <div className="border-b-2 border-black text-xl w-fit cursor-pointer">
                        CREATE A LOBBY
                    </div>
                </div>
            </div> */}
        </FinishGameWrapper>
    );
}
