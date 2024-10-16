const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  console.log('Function invoked');
  
  const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/onlplab/gpt2-hebrew';
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    console.log('Sending request to Hugging Face API');
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: event.body
    });

    const data = await response.json();
    console.log('Received response from Hugging Face API');

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from Hugging Face API' })
    };
  }
};
