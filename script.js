// Função para gerar imagem usando a Netlify Function
async function generateImage() {
    const btn = document.getElementById("generateBtn");
    const spinner = btn.querySelector(".spinner");
    const btnText = btn.querySelector(".btn-text");
    const prompt = document.getElementById("prompt").value.trim();

    if (!prompt) {
        alert("Por favor, digite uma descrição para gerar a imagem.");
        return;
    }

    spinner.style.display = "inline-block";
    btnText.textContent = "Gerando...";

    const resultContainer = document.getElementById("resultPlaceholder");
    resultContainer.innerHTML = `<div class="result-placeholder-icon">🎨</div><div>Gerando...</div>`;

    try {
        const response = await fetch("/.netlify/functions/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error("Erro na geração da imagem");

        const data = await response.json();

        // Exibe a imagem gerada
        if (data.imageUrl) {
            resultContainer.innerHTML = `<img class="generated-image" src="${data.imageUrl}" alt="Imagem Gerada">`;
        } else {
            resultContainer.innerHTML = `<div class="result-placeholder-icon">❌</div><div>Não foi possível gerar a imagem.</div>`;
        }
    } catch (err) {
        console.error(err);
        resultContainer.innerHTML = `<div class="result-placeholder-icon">❌</div><div>Erro ao gerar a imagem.</div>`;
    } finally {
        spinner.style.display = "none";
        btnText.textContent = "🚀 Gerar Imagem";
    }
}
