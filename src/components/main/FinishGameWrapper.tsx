"use client";

import { Button } from "../common/Button";
export type Result = {
    wpm: string;
    accuracy: string;
    time: string;
    source: string;
};

type Props = {
    children: React.ReactNode;
    isGameFinished: boolean;
    onTryAgain: () => void;
    result?: Result;
};
export const FinishGameWrapper = ({
    children,
    isGameFinished,
    result,
    onTryAgain,
}: Props) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        console.log("e finish", e);
        if (e.key === "Space") onTryAgain();
    };
    return (
        <>
            {isGameFinished ? (
                <div onKeyDown={handleKeyDown}>
                    {/* <div className="mx-auto max-w-fit">
                        You have finished a GAME!
                    </div>
                    <div className="mx-auto max-w-fit">
                        WPM: {wpm.toFixed(2)}
                    </div> */}
                    <div className="grid justify-center grid-cols-[repeat(3,min-content)] gap-5 grid-rows-2">
                        <div className="w-[400px] h-[155px] col-span-2 bg-white rounded-3xl p-4">
                            <div className="flex flex-col justify-between h-full">
                                <span className="font-medium">
                                    Your typing speed
                                </span>
                                <div className="font-medium text-5xl">
                                    {result?.wpm}
                                    <span className="text-xl">wpm</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-[200px] h-[155px] bg-white rounded-3xl p-4">
                            <div className="flex flex-col justify-between h-full">
                                <span className="font-medium">
                                    Typing accuracy
                                </span>
                                <div className="font-medium text-5xl">
                                    {result?.accuracy}
                                    <span className="text-xl">%</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-[200px] h-[155px] bg-white rounded-3xl p-4">
                            <div className="flex flex-col justify-between h-full">
                                <span className="font-medium">Time</span>
                                <div className="font-medium text-5xl">
                                    {result?.time}
                                    <span className="text-xl">s</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-[400px] h-[155px] col-span-2 bg-white rounded-3xl p-4">
                            <div className="flex flex-col justify-between h-full">
                                <span className="font-medium">Text source</span>
                                <div className="font-medium text-3xl">
                                    {result?.source}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="mx-auto max-w-fit mt-14"
                        onClick={onTryAgain}
                    >
                        <Button>
                            <div>Try again</div>
                        </Button>
                        {/* <div className="max-w-fit mx-auto text-xs">
                            (or space)
                        </div> */}
                    </div>
                </div>
            ) : (
                children
            )}
        </>
    );
};
