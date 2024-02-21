import RenderText from "@/components/main/RenderText";
import { getRandomParagraph } from "@/features/quote/action";

export default async function Home() {
    const randomQuote = await getRandomParagraph();

    return (
        <>
            <RenderText quote={randomQuote} />
        </>
    );
}
