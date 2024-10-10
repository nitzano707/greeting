const API_URL = 'https://api-inference.huggingface.co/models/onlplab/gpt2-hebrew';
const API_KEY = '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'; 

async function generateGreeting(name) {
  const prompt = `צור ברכה ידידותית בעברית עבור ${name}:`;
  
  try {
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
  } catch (error) {
    console.error('שגיאה בייצור הברכה:', error);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', () => {
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
      document.getElementById('result').innerText = 'שגיאה בייצור הברכה. אנא נסה שוב מאוחר יותר.';
      console.error('שגיאה:', error);
    }
  });
});
