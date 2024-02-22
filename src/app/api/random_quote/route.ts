import { getRandomParagraphAction } from "@/features/quotes/action";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
    return Response.json(await getRandomParagraphAction());
}
