const API_URL = 'https://api-inference.huggingface.co/models/onlplab/gpt2-hebrew';
const API_KEY = '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'; // החלף זאת במפתח האמיתי שלך

async function queryModel(input) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: input,
      parameters: {
        max_length: 100,
        num_return_sequences: 1,
        do_sample: true,
        top_k: 50,
        top_p: 0.95,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// שימוש בפונקציה
queryModel("שלום, מה שלומך?")
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
