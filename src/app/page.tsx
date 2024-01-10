import RenderText from "@/components/main/RenderText";
import { getRandomQuote } from "@/types";

export const revalidate = 300;

export default function Home() {
    const randomQuote = getRandomQuote();
    return (
        <>
            <RenderText quote={randomQuote?.Text} />
        </>
    );
}
