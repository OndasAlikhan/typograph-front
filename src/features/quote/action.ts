import api from "@/api";

export async function getRandomParagraph() {
    try {
        const response = await api.get("/random_paragraph");

        return response.data.data;
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}
