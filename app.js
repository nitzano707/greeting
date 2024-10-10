const API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const API_KEY = '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'; 

async function generateGreeting(name) {
  const prompt = `צור ברכה ידידותית עבור ${name}:`;
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_length: 50,
        num_return_sequences: 1
      }
    })
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('שגיאה מה-API:', errorDetails);
    throw new Error(`ה-API החזיר סטטוס: ${response.status}`);
  }

  const result = await response.json();
  console.log('תוצאת ה-API:', result);

  if (Array.isArray(result) && result[0] && result[0].generated_text) {
    return result[0].generated_text.trim();
  } else {
    throw new Error("מבנה תגובה לא תקין מה-API");
  }
}

// לחיצה על הכפתור
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
