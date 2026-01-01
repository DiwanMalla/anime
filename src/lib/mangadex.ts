const MANGADEX_API_URL = "https://api.mangadex.org";

export async function searchMangaDex(titles: string[], aniListId?: number) {
  const allResults: any[] = [];

  // Try searching by titles
  for (const title of titles) {
    if (!title) continue;
    try {
      const response = await fetch(
        `${MANGADEX_API_URL}/manga?title=${encodeURIComponent(
          title
        )}&limit=20&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`
      );
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        allResults.push(...data.data);

        // If we have an AniList ID, try to find an exact match immediately
        if (aniListId) {
          const exactMatch = data.data.find((m: any) => {
            const links = m.attributes.links;
            return (
              links &&
              (links.al === aniListId.toString() || links.al === aniListId)
            );
          });
          if (exactMatch) return exactMatch;
        }
      }
    } catch (error) {
      console.error(`Error searching MangaDex for title "${title}":`, error);
    }
  }

  // If we didn't find an exact match but have results, return the first one from the first successful search
  return allResults.length > 0 ? allResults[0] : null;
}

export async function getMangaChapters(mangaId: string) {
  try {
    let allChapters: any[] = [];
    let offset = 0;
    let total = 0;

    do {
      const response = await fetch(
        `${MANGADEX_API_URL}/manga/${mangaId}/feed?translatedLanguage[]=en&order[chapter]=desc&limit=500&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic&includes[]=scanlation_group`
      );
      const data = await response.json();

      if (data.data) {
        allChapters = [...allChapters, ...data.data];
      }

      total = data.total || 0;
      offset += 500;
    } while (offset < total);

    return allChapters;
  } catch (error) {
    console.error("Error fetching MangaDex chapters:", error);
    return [];
  }
}

export async function getChapterPages(chapterId: string) {
  try {
    const response = await fetch(
      `${MANGADEX_API_URL}/at-home/server/${chapterId}`
    );
    const data = await response.json();

    const hash = data.chapter.hash;
    const files = data.chapter.data;
    const baseUrl = data.baseUrl;

    return files.map((file: string) => `${baseUrl}/data/${hash}/${file}`);
  } catch (error) {
    console.error("Error fetching chapter pages:", error);
    return [];
  }
}
