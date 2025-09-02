// Função de upload de imagem
function handleImageUpload(input, previewId) {
    const file = input.files[0];
    if (!file) return;

    const preview = document.getElementById(previewId);
    if (preview) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
        preview.style.height = "auto"; // evita erro de height
    }
}

// Botão gerar imagem
async function generateImage() {
    const btn = document.getElementById("generateBtn");
    const spinner = btn.querySelector(".spinner");
    const btnText = btn.querySelector(".btn-text");
    const prompt = document.getElementById("prompt").value;

    spinner.style.display = "inline-block";
    btnText.textContent = "Gerando...";

    try {
        const response = await fetch("/.netlify/functions/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            }),
        });

        const data = await response.json();

        // Exibir no console por enquanto
        console.log("Resposta:", data);

        // Aqui você poderia pegar a saída gerada pela IA e renderizar na tela
        // Exemplo:
        const resultContainer = document.getElementById("resultPlaceholder");
        if (resultContainer) {
            resultContainer.innerHTML = `<p>${data.choices?.[0]?.message?.content || "Nenhum resultado"}</p>`;
        }

    } catch (err) {
        console.error("Erro:", err);
        alert("Erro ao gerar imagem/texto.");
    } finally {
        spinner.style.display = "none";
        btnText.textContent = "🚀 Gerar Imagem";
    }
}
