import { AutoTokenizer } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0';

const API_URL = 'https://api-inference.huggingface.co/models/onlplab/gpt2-hebrew';
const API_KEY = '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'; 

let tokenizer;

async function initTokenizer() {
  tokenizer = await AutoTokenizer.from_pretrained('Xenova/gpt-4o');
}

async function generateGreeting(name) {
  if (!tokenizer) {
    await initTokenizer();
  }

  const prompt = `צור ברכה ידידותית בעברית עבור ${name}:`;
  const encodedPrompt = await tokenizer.encode(prompt);
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt,
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

  const result = await response.json();
  console.log('API result:', result);

  if (Array.isArray(result) && result[0] && result[0].generated_text) {
    return result[0].generated_text.trim();
  } else {
    throw new Error("מבנה תגובה לא תקין מה-API");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTokenizer();
  document.getElementById('sendButton').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value;
    if (!name) {
      alert('אנא הכנס את שמך.');
      return;
    }
    document.getElementById('result').innerText = 'מייצר ברכה...';
    try {
      const greeting = await generateGreeting(name);
      document.getElementById('result').innerText = greeting;
    } catch (error) {
      document.getElementById('result').innerText = 'שגיאה בייצור הברכה.';
      console.error('שגיאה:', error);
    }
  });
});
