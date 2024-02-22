import RenderText from "@/components/main/RenderText";
import { getRandomParagraphAction } from "@/features/quotes/action";

export const dynamic = "force-dynamic";

export default async function Home() {
    const randomQuote = await getRandomParagraphAction();

    return (
        <>
            <RenderText quote={randomQuote!} />
        </>
    );
}
