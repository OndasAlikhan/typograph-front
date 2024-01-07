"use client";

import { Button } from "../common/Button";

type Props = {
    children: React.ReactNode;
    isGameFinished: boolean;
    onTryAgain: () => void;
    wpm: number;
};
export const FinishGameWrapper = ({
    children,
    isGameFinished,
    wpm,
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
                    <div className="mx-auto max-w-fit">
                        You have finished a GAME!
                    </div>
                    <div className="mx-auto max-w-fit">
                        WPM: {wpm.toFixed(2)}
                    </div>
                    <div
                        className="mx-auto max-w-fit mt-5"
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
