async function generateImage() {
  const prompt = document.getElementById('prompt').value;
  const generateBtn = document.getElementById('generateBtn');
  const spinner = generateBtn.querySelector('.spinner');
  const resultPlaceholder = document.getElementById('resultPlaceholder');
  const loadingContainer = document.getElementById('loadingContainer');
  const imageContainer = document.getElementById('imageContainer');
  const generatedImage = document.getElementById('generatedImage');

  try {
    spinner.style.display = 'inline-block';
    resultPlaceholder.style.display = 'none';
    loadingContainer.style.display = 'block';
    imageContainer.style.display = 'none';

    const response = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();

    if (response.ok) {
      generatedImage.src = data.imageUrl; // Adjust based on OpenRouter API response
      imageContainer.style.display = 'block';
    } else {
      throw new Error(data.error || 'Failed to generate image');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Erro ao forjar a imagem: ' + error.message);
  } finally {
    spinner.style.display = 'none';
    loadingContainer.style.display = 'none';
  }
}

// Placeholder for other functions (e.g., handleImageUpload, editCurrentImage, etc.)
function handleImageUpload(input, previewId, index) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById(previewId).src = e.target.result;
      document.getElementById(previewId).style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function backToEditFunctions() {
  document.getElementById('twoImagesSection').style.display = 'none';
  document.getElementById('editFunctions').style.display = 'block';
}

function editCurrentImage() {
  alert('Função de edição não implementada.');
}

function downloadImage() {
  const generatedImage = document.getElementById('generatedImage');
  const link = document.createElement('a');
  link.href = generatedImage.src;
  link.download = 'forjador_de_herois.png';
  link.click();
}

function editFromModal() {
  alert('Edição a partir do modal não implementada.');
}

function downloadFromModal() {
  const modalImage = document.getElementById('modalImage');
  const link = document.createElement('a');
  link.href = modalImage.src;
  link.download = 'forjador_de_herois.png';
  link.click();
}

function newImageFromModal() {
  document.getElementById('mobileModal').style.display = 'none';
}