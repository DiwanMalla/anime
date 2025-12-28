export const SEARCH_ANIME_QUERY = `
  query ($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          large
          medium
        }
        description
        averageScore
        genres
        format
        seasonYear
        status
      }
    }
  }
`;
const ANILIST_API_URL = "https://graphql.anilist.co";

export async function fetchAniList(query: string, variables: any = {}) {
  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Failed to fetch from AniList"
    );
  }

  return json.data;
}

export const TRENDING_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        bannerImage
        description
        averageScore
        genres
        format
        episodes
      }
    }
  }
`;

export const POPULAR_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        averageScore
        genres
        format
        episodes
      }
    }
  }
`;

export const UPCOMING_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        averageScore
        genres
        format
        episodes
      }
    }
  }
`;

export const TOP_RATED_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: SCORE_DESC, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        averageScore
        genres
        format
        episodes
      }
    }
  }
`;

export const ANIME_DETAILS_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
      }
      bannerImage
      description
      averageScore
      meanScore
      popularity
      favourites
      genres
      synonyms
      status
      format
      source
      episodes
      duration
      season
      seasonYear
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      studios(isMain: true) {
        nodes {
          name
        }
      }
      trailer {
        id
        site
        thumbnail
      }
      tags {
        id
        name
        description
        rank
        isMediaSpoiler
      }
      externalLinks {
        id
        site
        url
        type
        icon
        color
      }
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
      relations {
        edges {
          relationType
          node {
            id
            title {
              userPreferred
            }
            coverImage {
              large
            }
            type
            format
            status
          }
        }
      }
      stats {
        statusDistribution {
          status
          amount
        }
        scoreDistribution {
          score
          amount
        }
      }
      characters(sort: [ROLE, RELEVANCE], perPage: 12) {
        edges {
          role
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
          voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
      staff(perPage: 8, sort: [RELEVANCE, ID]) {
        edges {
          role
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
      recommendations(sort: RATING_DESC, perPage: 10) {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            averageScore
            genres
          }
        }
      }
    }
  }
`;
