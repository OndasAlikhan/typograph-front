import { baseUrl } from "@/config/api";
import { Quote } from "./model";

export async function getRandomParagraphAction() {
    try {
        const response = await fetch(`${baseUrl}/random_paragraph`);

        return (await response.json()).data as Quote;
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}
