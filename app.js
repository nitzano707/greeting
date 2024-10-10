const API_URL = 'https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B';
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
    // הצג שגיאה מפורטת אם הבקשה לא הצליחה
    const errorDetails = await response.json();
    console.error('Error from API:', errorDetails);
    throw new Error(`API returned status: ${response.status}`);
  }

  const result = await response.json();

  // נוודא שהתוצאה מכילה את מה שאנחנו מצפים לו
  if (result && result.length > 0 && result[0].generated_text) {
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

  document.getElementById('result').innerText = 'Generating greeting...';

  try {
    const greeting = await generateGreeting(name);
    document.getElementById('result').innerText = greeting;
  } catch (error) {
    document.getElementById('result').innerText = 'Error generating greeting.';
    console.error('Error:', error);
  }
});
