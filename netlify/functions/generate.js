import fetch from "node-fetch";

export async function handler(event, context) {
    try {
        const { prompt } = JSON.parse(event.body);

        // Sua chave fica AQUI, segura no servidor
        const API_KEY = process.env.OPENROUTER_API_KEY;

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await res.json();

        // Retorna apenas o conteúdo da resposta
        return {
            statusCode: 200,
            body: JSON.stringify({ result: data.choices?.[0]?.message?.content || "" })
        };

    } catch (err) {
        console.error("Erro na função Netlify:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro ao gerar imagem/texto" })
        };
    }
}
