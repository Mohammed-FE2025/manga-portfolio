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

  if (!cover?.attributes?.fileName) {
    return null
  }

  return `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.${size}.jpg`
}