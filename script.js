async function generateImage() {
  const prompt = document.getElementById('prompt').value;
  const generateBtn = document.getElementById('generateBtn');
  const spinner = generateBtn.querySelector('.spinner');
  const resultPlaceholder = document.getElementById('resultPlaceholder');
  const loadingContainer = document.getElementById('loadingContainer');
  const imageContainer = document.getElementById('imageContainer');
  const generatedImage = document.getElementById('generatedImage');
  const modalImage = document.getElementById('modalImage');

  if (!prompt) {
    alert('Por favor, descreva sua ideia no campo de prompt para forjar sua obra!');
    return;
  }

  try {
    spinner.style.display = 'inline-block';
    resultPlaceholder.style.display = 'none';
    loadingContainer.style.display = 'block';
    imageContainer.style.display = 'none';

    const response = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Erro na forja: ${response.status} ${response.statusText}`);
    }

    // Adjust based on actual OpenRouter API response structure
    const imageUrl = data.imageUrl;
    if (!imageUrl) {
      throw new Error('Nenhuma imagem foi forjada. Verifique o prompt ou tente novamente.');
    }

    generatedImage.src = imageUrl;
    modalImage.src = imageUrl;
    imageContainer.style.display = 'block';
  } catch (error) {
    console.error('Erro ao forjar a imagem:', error);
    alert(`Falha na forja: ${error.message}. Tente novamente ou contate o mestre ferreiro!`);
  } finally {
    spinner.style.display = 'none';
    loadingContainer.style.display = 'none';
  }
}

function handleImageUpload(input, previewId, index) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById(previewId);
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function backToEditFunctions() {
  document.getElementById('twoImagesSection').style.display = 'none';
  document.getElementById('editFunctions').style.display = 'block';
}

function editCurrentImage() {
  document.getElementById('resultPlaceholder').style.display = 'none';
  document.getElementById('imageContainer').style.display = 'none';
  document.getElementById('editFunctions').style.display = 'block';
  alert('Selecione uma função de edição para refinar sua obra!');
}

function downloadImage() {
  const generatedImage = document.getElementById('generatedImage');
  if (generatedImage.src) {
    const link = document.createElement('a');
    link.href = generatedImage.src;
    link.download = 'forjador_de_herois.png';
    link.click();
  } else {
    alert('Nenhuma imagem para baixar!');
  }
}

function editFromModal() {
  document.getElementById('mobileModal').style.display = 'none';
  document.getElementById('resultPlaceholder').style.display = 'none';
  document.getElementById('imageContainer').style.display = 'none';
  document.getElementById('editFunctions').style.display = 'block';
  alert('Selecione uma função de edição para refinar sua obra!');
}

function downloadFromModal() {
  const modalImage = document.getElementById('modalImage');
  if (modalImage.src) {
    const link = document.createElement('a');
    link.href = modalImage.src;
    link.download = 'forjador_de_herois.png';
    link.click();
  } else {
    alert('Nenhuma imagem para baixar!');
  }
}

function newImageFromModal() {
  document.getElementById('mobileModal').style.display = 'none';
  document.getElementById('resultPlaceholder').style.display = 'block';
  document.getElementById('imageContainer').style.display = 'none';
  document.getElementById('prompt').value = '';
}

// Handle mode toggle (Criar/Editar)
document.querySelectorAll('.mode-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const mode = button.getAttribute('data-mode');
    document.getElementById('createFunctions').style.display = mode === 'create' ? 'block' : 'none';
    document.getElementById('editFunctions').style.display = mode === 'edit' ? 'block' : 'none';
    document.getElementById('twoImagesSection').style.display = 'none';
  });
});

// Handle function cards
document.querySelectorAll('.function-card').forEach(card => {
  card.addEventListener('click', () => {
    const section = card.closest('.functions-section');
    section.querySelectorAll('.function-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const requiresTwo = card.getAttribute('data-requires-two') === 'true';
    if (requiresTwo) {
      document.getElementById('editFunctions').style.display = 'none';
      document.getElementById('twoImagesSection').style.display = 'block';
    }
  });
});
