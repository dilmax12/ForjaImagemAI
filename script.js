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
    const prompt = document.getElementById("prompt").value.trim();

    if (!prompt) {
        alert("Digite algo para gerar a imagem/texto!");
        return;
    }

    spinner.style.display = "inline-block";
    btnText.textContent = "Gerando...";

    try {
        // Chamando a função Netlify, que vai usar a API Key segura
        const response = await fetch("/.netlify/functions/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error("Falha na função do servidor.");

        const data = await response.json();
        console.log("Resposta:", data);

        // Exibir no painel direito
        const resultContainer = document.getElementById("resultPlaceholder");
        if (resultContainer) {
            resultContainer.innerHTML = `<p>${data.result || "Nenhum resultado"}</p>`;
        }

    } catch (err) {
        console.error("Erro:", err);
        alert("Erro ao gerar imagem/texto. Verifique o console.");
    } finally {
        spinner.style.display = "none";
        btnText.textContent = "🚀 Gerar Imagem";
    }
}
