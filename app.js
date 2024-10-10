import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0';

const API_URL = 'https://api-inference.huggingface.co/models/onlplab/gpt2-hebrew';
const API_KEY = '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'; 

let generator;

async function initGenerator() {
  generator = await pipeline('text-generation', 'Xenova/gpt2-hebrew');
}

async function generateGreeting(name) {
  if (!generator) {
    await initGenerator();
  }

  const prompt = `צור ברכה ידידותית בעברית עבור ${name}:`;
  
  try {
    const result = await generator(prompt, {
      max_length: 100,
      num_return_sequences: 1,
    });
    
    return result[0].generated_text.trim();
  } catch (error) {
    console.error('שגיאה בייצור הברכה:', error);
    throw new Error('שגיאה בייצור הברכה');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initGenerator();
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
