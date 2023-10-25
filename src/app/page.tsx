"use client";

import RenderText from "@/components/RenderText";
import TypeInput from "@/components/TypeInput";
import Image from "next/image";
import { useState } from "react";

const text =
    "A hospital worker almost catches me, but I head him off with a confrontation";
const textArray: LetterObj[][] = text
    .split(" ")
    .map((word) => word.split("").map((letter) => ({ color: "w", letter })));

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [latestKeyEvent, setLatestKeyEvent] = useState("");
    const [isGameFinished, setIsGameFinished] = useState(false);
    return (
        <main className="min-h-screen p-24">
            <RenderText
                text={textArray}
                inputValue={inputValue}
                setInputValue={setInputValue}
                latestKeyEvent={latestKeyEvent}
                gameFinished={() => setIsGameFinished(true)}
            />

            <div className="mt-4 w-1/2 mx-auto ">
                <TypeInput
                    inputValue={inputValue}
                    onInputValueChange={setInputValue}
                    onKeyDown={setLatestKeyEvent}
                />
            </div>
        </main>
    );
}
