const API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-11B-Vision-Instruct';
const API_KEY = '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'; 

async function generateGreeting(name) {
  const messages = [
    {
      "role": "user",
      "content": `Create a personalized greeting for someone named ${name}.`
    }
  ];

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "messages": messages
    })
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error('Error from API:', errorDetails);
    throw new Error(`API returned status: ${response.status}`);
  }

  const result = await response.json();
  console.log('API result:', result);

  if (result.choices && result.choices[0] && result.choices[0].message.content) {
    return result.choices[0].message.content;
  } else {
    throw new Error("Invalid response structure from API");
  }
}

// לחיצה על הכפתור
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

