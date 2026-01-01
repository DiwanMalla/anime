export interface AniGenieParams {
  genre?: string;
  tag?: string;
  year?: number;
  status?: string;
  format?: string;
  search?: string;
}

export interface AniGenieResponse {
  message: string;
  filters?: AniGenieParams;
  suggestions?: string[];
}

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function askAniGenie(prompt: string, history: { role: string; content: string }[] = []): Promise<AniGenieResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001";

  // Quick local response for greetings to save API calls
  const lowerPrompt = prompt.toLowerCase().trim();
  const greetings = ["hi", "hello", "hey", "hola", "yo"];
  if (greetings.includes(lowerPrompt)) {
    return {
      message: "Hello! I am your AniGenie. Tell me what kind of anime you're in the mood for, and I'll find it for you! ✨",
      suggestions: ["One Piece", "Spy x Family", "Jujutsu Kaisen"]
    };
  }

  const systemPrompt = `You are AniGenie, a helpful and enthusiastic anime discovery assistant. 
Your goal is to help users find anime based on their preferences.
You can understand natural language and translate it into search filters.

AVAILABLE GENRES: Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Horror, Mahou Shoujo, Mecha, Music, Mystery, Psychological, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller.

AVAILABLE FORMATS: TV, MOVIE, OVA, ONA, SPECIAL, MUSIC.

AVAILABLE STATUSES: RELEASING, FINISHED, NOT_YET_RELEASED, CANCELLED, HIATUS.

RESPONSE FORMAT:
You MUST respond ONLY with a valid JSON object. Do not include any markdown blocks or extra text.
{
  "message": "Your natural language response to the user",
  "filters": {
    "genre": "Optional genre match",
    "tag": "Optional specific tag like 'Space' or 'Cyberpunk'",
    "year": 1998,
    "status": "FINISHED",
    "format": "TV",
    "search": "Optional text search string"
  },
  "suggestions": ["3-5 specific anime titles as recommendations"]
}

If the user asks for something specific like "90s space cowboys", set the filters accordingly.
CRITICAL: Always be positive and use emojis! ✨`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: prompt }
  ];

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "X-Title": "AniNexus",
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter Error:", errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Clean JSON response (strip markdown if present)
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(content) as AniGenieResponse;
  } catch (error) {
    console.error("AniGenie Error:", error);
    return {
      message: "Oh no! My magic lamp is flickering. Can you try again in a moment? (I might be out of mana! 🧙‍♂️)",
      suggestions: ["Cowboy Bebop", "Neon Genesis Evangelion", "Spirited Away"]
    };
  }
}
