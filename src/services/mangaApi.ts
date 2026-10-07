import type { Manga } from '../types/manga'

const API_URL = 'https://api.mangadex.org'

export const MANGA_PER_PAGE = 20

export type MangaStatus =
  | ''
  | 'ongoing'
  | 'completed'
  | 'hiatus'
  | 'cancelled'

export type MangaOrder =
  | 'followedCount'
  | 'latestUploadedChapter'
  | 'title'
  | 'year'

export interface MangaTag {
  id: string
  type: 'tag'
  attributes: {
    name: Record<string, string>
    group: string
  }
}

interface MangaResponse {
  data: Manga[]
  limit: number
  offset: number
  total: number
}

interface MangaTagResponse {
  data: MangaTag[]
}

interface MangaDetailsResponse {
  data: Manga
}

interface SearchMangaOptions {
  query?: string
  offset?: number
  status?: MangaStatus
  orderBy?: MangaOrder
  orderDirection?: 'asc' | 'desc'
  includedTags?: string[]
  signal?: AbortSignal
}

async function fetchJson<T>(
  url: string,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(
    url,
    {
      signal,
    },
  )

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(
        'Too many requests. Please wait a moment and try again.',
      )
    }

    if (response.status === 404) {
      throw new Error(
        'The requested manga could not be found.',
      )
    }

    if (response.status >= 500) {
      throw new Error(
        'MangaDex is currently unavailable. Please try again later.',
      )
    }

    throw new Error(
      `MangaDex request failed with status ${response.status}.`,
    )
  }

  return response.json() as Promise<T>
}

export async function searchManga({
  query = '',
  offset = 0,
  status = '',
  orderBy = 'followedCount',
  orderDirection = 'desc',
  includedTags = [],
  signal,
}: SearchMangaOptions = {}): Promise<MangaResponse> {
  const params = new URLSearchParams({
    limit: String(MANGA_PER_PAGE),
    offset: String(offset),
    'includes[]': 'cover_art',
  })

  if (query) {
    params.set('title', query)
  }

  if (status) {
    params.append(
      'status[]',
      status,
    )
  }

  for (const tagId of includedTags) {
    params.append(
      'includedTags[]',
      tagId,
    )
  }

  params.set(
    `order[${orderBy}]`,
    orderDirection,
  )

  return fetchJson<MangaResponse>(
    `${API_URL}/manga?${params.toString()}`,
    signal,
  )
}

export async function getMangaTags(
  signal?: AbortSignal,
): Promise<MangaTag[]> {
  const result =
    await fetchJson<MangaTagResponse>(
      `${API_URL}/manga/tag`,
      signal,
    )

  return result.data
}

export async function getMangaById(
  id: string,
  signal?: AbortSignal,
): Promise<Manga> {
  const params = new URLSearchParams()

  params.append(
    'includes[]',
    'cover_art',
  )

  params.append(
    'includes[]',
    'author',
  )

  params.append(
    'includes[]',
    'artist',
  )

  const result =
    await fetchJson<MangaDetailsResponse>(
      `${API_URL}/manga/${id}?${params.toString()}`,
      signal,
    )

  return result.data
}