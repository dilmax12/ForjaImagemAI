import fetch from "node-fetch";

export async function handler(event) {
  try {
    // Se o body não existir, retorna erro
    if (!event.body) {
      return { statusCode: 400, body: "Body ausente" };
    }

    const body = JSON.parse(event.body);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.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}`, // 🔒 API KEY protegida no Netlify
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
