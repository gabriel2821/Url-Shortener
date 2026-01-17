const API_URL = "http://localhost:8000";

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

