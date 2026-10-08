import type { Manga } from '../types/manga'

export function getMangaTitle(
  manga: Manga,
): string {
  return (
    manga.attributes.title.en ??
    Object.values(
      manga.attributes.title,
    )[0] ??
    'Unknown title'
  )
}

export function getMangaCover(
  manga: Manga,
  size: '256' | '512' = '256',
): string | null {
  const cover = manga.relationships.find(
    (relationship) =>
      relationship.type === 'cover_art',
  )

  const fileName =
    cover?.attributes?.fileName

  if (!fileName) {
    return null
  }

  const params = new URLSearchParams({
    mangaId: manga.id,
    fileName,
    size,
  })

  return `/api/cover?${params.toString()}`
}