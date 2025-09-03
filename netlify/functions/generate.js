const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    console.log('Received event:', event);
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No body provided in the request' })
      };
    }

    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Prompt is required' })
      };
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: API key missing' })
      };
    }

    // Use the correct OpenRouter endpoint for image generation (hypothetical, adjust as per documentation)
    const response = await fetch('https://openrouter.ai/api/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'ImagemMestraAI/1.0.0'
      },
      body: JSON.stringify({ prompt })
    });

    console.log('OpenRouter API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `OpenRouter API error: ${errorText}` })
      };
    }

    const data = await response.json();
    console.log('OpenRouter API response data:', data);

    // Adjust based on actual OpenRouter API response structure
    if (!data.data || !data.data[0] || !data.data[0].url) {
      console.error('Unexpected API response structure:', data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Invalid response from image generation API' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: data.data[0].url })
    };
  } catch (error) {
    console.error('Function error:', error.message, error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Server error: ${error.message}` })
    };
  }
};
