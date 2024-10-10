const API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-11B-Vision';
const API_KEY = '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'; // שים כאן את מפתח ה-API שלך

async function generateGreeting(name) {
  const prompt = `Create a personalized greeting for someone named ${name}.`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt
    })
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error('Error from API:', errorDetails);
    throw new Error(`API returned status: ${response.status}`);
  }

  const result = await response.json();
  console.log('API result:', result); // הדפס את התוצאה המלאה כדי לבדוק את מבנה התגובה

  if (result && result[0] && result[0].generated_text) {
    return result[0].generated_text;
  } else {
    throw new Error("Invalid response structure from API");
  }
}

// תהליך לחיצה על הכפתור
document.getElementById('sendButton').addEventListener('click', async () => {
  const name = document.getElementById('nameInput').value;
  if (!name) {
    alert('Please enter your name.');
    return;
  }

  document.getElementById('result').innerText = 'G
