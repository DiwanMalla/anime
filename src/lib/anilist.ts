export const SEARCH_ANIME_QUERY = `
  query ($search: String, $page: Int, $perPage: Int, $genre: String, $tag: String, $year: Int, $status: MediaStatus, $format: MediaFormat, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      media(search: $search, type: ANIME, genre: $genre, tag: $tag, seasonYear: $year, status: $status, format: $format, sort: $sort) {
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
          color
        }
        description
        averageScore
        genres
        format
        seasonYear
        status
        episodes
      }
    }
  }
`;
const ANILIST_API_URL = "https://graphql.anilist.co";

// Export all queries for use in other modules

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
        status
        seasonYear
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
        status
        seasonYear
      }
    }
  }
`;

export const SEASONAL_ANIME_QUERY = `
  query ($season: MediaSeason, $year: Int, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        total
      }
      media(season: $season, seasonYear: $year, type: ANIME, sort: POPULARITY_DESC) {
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
          color
        }
        description
        averageScore
        genres
        format
        seasonYear
        status
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
        status
        seasonYear
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
          color
        }
        averageScore
        popularity
        genres
        format
        episodes
        season
        seasonYear
        status
      }
    }
  }
`;

export const SEARCH_MANGA_QUERY = `
  query ($search: String, $page: Int, $perPage: Int, $genre: String, $year: Int, $status: MediaStatus, $format: MediaFormat, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      media(search: $search, type: MANGA, genre: $genre, startDate_like: $year, status: $status, format: $format, sort: $sort) {
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
          color
        }
        description
        averageScore
        genres
        format
        status
        chapters
        volumes
      }
    }
  }
`;

export const TOP_RATED_MANGA_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: SCORE_DESC, type: MANGA) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
          color
        }
        averageScore
        popularity
        genres
        format
        chapters
        volumes
        status
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
      }
    }
  }
`;

export const TRENDING_MANGA_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: MANGA) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
          color
        }
        bannerImage
        description
        averageScore
        genres
        format
        chapters
      }
    }
  }
`;

export const POPULAR_MANGA_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: POPULARITY_DESC, type: MANGA) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
          color
        }
        averageScore
        genres
        format
        chapters
      }
    }
  }
`;

export const MANGA_DETAILS_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: MANGA) {
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
      popularity
      favourites
      genres
      status
      format
      chapters
      volumes
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
      studios {
        nodes {
          name
        }
      }
      externalLinks {
        id
        site
        url
        type
        icon
        color
      }
      tags {
        id
        name
        description
        rank
        isMediaSpoiler
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
          }
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
          }
        }
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
              native
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

export const AIRING_SCHEDULE_QUERY = `
  query ($page: Int, $perPage: Int, $airingAtGreater: Int, $airingAtLesser: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        total
      }
      airingSchedules(airingAt_greater: $airingAtGreater, airingAt_lesser: $airingAtLesser, sort: TIME) {
        id
        airingAt
        episode
        media {
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
            color
          }
          averageScore
          genres
          format
          episodes
          isAdult
        }
      }
    }
  }
`;

export const CHARACTER_DETAILS_QUERY = `
  query ($id: Int) {
    Character(id: $id) {
      id
      name {
        full
        native
        alternative
      }
      image {
        large
      }
      description
      gender
      dateOfBirth {
        year
        month
        day
      }
      age
      bloodType
      media(sort: START_DATE_DESC, perPage: 25) {
        edges {
          node {
            id
            title {
              romaji
              english
              userPreferred
            }
            coverImage {
              large
            }
            type
            format
          }
          characterRole
        }
      }
    }
  }
`;

export const STAFF_DETAILS_QUERY = `
  query ($id: Int) {
    Staff(id: $id) {
      id
      name {
        full
        native
        alternativeNames
      }
      image {
        large
      }
      description
      primaryOccupations
      gender
      dateOfBirth {
        year
        month
        day
      }
      dateOfDeath {
        year
        month
        day
      }
      age
      yearsActive
      homeTown
      bloodType
      staffMedia(sort: START_DATE_DESC, perPage: 25) {
        edges {
          node {
            id
            title {
              romaji
              english
              userPreferred
            }
            coverImage {
              large
            }
            type
            format
          }
          staffRole
        }
      }
      characters(sort: FAVOURITES_DESC, perPage: 25) {
        edges {
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
          role
        }
      }
    }
  }
`;

export const GENRES_QUERY = `
  query {
    GenreCollection
    MediaTagCollection {
      name
      description
      category
      isAdult
    }
  }
`;

export async function getRandomAnime() {
  const randomPage = Math.floor(Math.random() * 20) + 1; // Top 400 anime
  const data = await fetchAniList(TOP_RATED_ANIME_QUERY, {
    page: randomPage,
    perPage: 20,
  });
  const randomIndex = Math.floor(Math.random() * data.Page.media.length);
  return data.Page.media[randomIndex];
}
