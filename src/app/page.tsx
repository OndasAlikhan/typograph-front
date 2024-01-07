import RenderText from "@/components/main/RenderText";
import { getRandomQuote } from "@/types";
import _sample from "lodash/sample";

export default function Home() {
    const randomQuote = getRandomQuote();
    return (
        <>
            <RenderText quote={randomQuote?.Text} />
        </>
    );
}
