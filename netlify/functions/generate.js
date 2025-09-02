import fetch from "node-fetch";

export async function handler(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { prompt } = JSON.parse(event.body);

        if (!prompt) {
            return { statusCode: 400, body: "Prompt é obrigatório" };
        }

        const response = await fetch("https://openrouter.ai/api/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-image-1",
                prompt,
                size: "1024x1024"
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ imageUrl: data.data?.[0]?.url })
        };

    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Erro ao gerar imagem" };
    }
}
