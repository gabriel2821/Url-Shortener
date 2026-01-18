const API_URL = "https://url-shortener-backend-m6t9.onrender.com";

export async function shortenUrl(originalUrl: string) {
  const response = await fetch(`${API_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      original_url: originalUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to shorten URL");
  }

  return response.json();
}

