import { useEffect, useState } from "react";

type Props = {
    running: boolean;
};

const parseSeconds = (seconds: number) => {
    if (seconds < 10) return `0:0${seconds}`;
    // else if (seconds < 60) return `0:${seconds}`;

    const mm = Math.floor(seconds / 60);
    const _ss = seconds % 60;
    const ss = _ss < 10 ? `0${_ss}` : _ss;
    return `${mm}:${ss}`;
};

export const SecondsElapsed = ({ running }: Props) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (running) {
            interval = setInterval(() => {
                setSecondsElapsed((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [running]);

    return (
        <>
            {running && (
                <span className="absolute -top-6 text-gray-600 font-mono font-light text-xs bg-white px-1">
                    {parseSeconds(secondsElapsed)}
                </span>
            )}
        </>
    );
};
