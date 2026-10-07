import { useEffect, useState } from 'react'

import {
  MANGA_PER_PAGE,
  searchManga,
  getMangaTags,
  type MangaOrder,
  type MangaStatus,
  type MangaTag,
} from '../services/mangaApi'

import type { Manga } from '../types/manga'
let cachedGenres: MangaTag[] | null = null

function useManga() {
  // -----------------------------
  // Manga state
  // -----------------------------

  const [manga, setManga] = useState<Manga[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // -----------------------------
  // Search state
  // -----------------------------

  // What the user is currently typing
  const [search, setSearch] = useState('')

  // What has actually been submitted
  const [searchQuery, setSearchQuery] = useState('')

  // -----------------------------
  // Pagination state
  // -----------------------------

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  // -----------------------------
  // Status filter state
  // -----------------------------

  const [status, setStatus] =
    useState<MangaStatus>('')

  // -----------------------------
  // Sorting state
  // -----------------------------

  const [orderBy, setOrderBy] =
    useState<MangaOrder>('followedCount')

  // -----------------------------
  // Genre state
  // -----------------------------

const [genres, setGenres] =
  useState<MangaTag[]>(
    () => cachedGenres ?? [],
  )

  const [genreId, setGenreId] =
    useState('')

  // ==================================================
  // Load genres once when the application starts
  // ==================================================

  useEffect(() => {
  if (cachedGenres) {
    return
  }

  const controller = new AbortController()

  async function loadGenres() {
    try {
      const tags = await getMangaTags(
        controller.signal,
      )

      const genreTags = tags
        .filter(
          (tag) =>
            tag.attributes.group === 'genre',
        )
        .sort((a, b) => {
          const nameA =
            a.attributes.name.en ??
            Object.values(
              a.attributes.name,
            )[0] ??
            ''

          const nameB =
            b.attributes.name.en ??
            Object.values(
              b.attributes.name,
            )[0] ??
            ''

          return nameA.localeCompare(nameB)
        })

      cachedGenres = genreTags

      setGenres(genreTags)
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === 'AbortError'
      ) {
        return
      }

      console.error(
        'Failed to load genres:',
        error,
      )
    }
  }

  loadGenres()

  return () => {
    controller.abort()
  }
}, [])

  // ==================================================
  // Load manga whenever search/filter/page changes
  // ==================================================

  useEffect(() => {
    const controller = new AbortController()

    async function loadManga() {
      try {
        setLoading(true)
        setError(null)

        const offset =
          (page - 1) * MANGA_PER_PAGE

      const orderDirection =
  orderBy === 'title'
    ? 'asc'
    : 'desc'

const result = await searchManga({
  query: searchQuery,
  offset,
  status,
  orderBy,
  orderDirection,
  includedTags: genreId
    ? [genreId]
    : [],
  signal: controller.signal,
})

        setManga(result.data)
        setTotal(result.total)
      } catch (error) {
        // Ignore intentional request cancellation
        if (
          error instanceof DOMException &&
          error.name === 'AbortError'
        ) {
          return
        }

        console.error(error)

       setError(
  error instanceof Error
    ? error.message
    : 'Unable to load manga. Please try again later.',
)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadManga()

    return () => {
      controller.abort()
    }
  }, [
    searchQuery,
    page,
    status,
    orderBy,
    genreId,
  ])

  // ==================================================
  // Pagination
  // ==================================================

  const totalPages = Math.ceil(
    total / MANGA_PER_PAGE,
  )

  // ==================================================
  // Search
  // ==================================================

  function submitSearch(query: string) {
    const trimmedQuery = query.trim()

    setSearch(trimmedQuery)
    setSearchQuery(trimmedQuery)
    setPage(1)
  }

  // ==================================================
  // Status filter
  // ==================================================

  function changeStatus(
    newStatus: MangaStatus,
  ) {
    setStatus(newStatus)
    setPage(1)
  }

  // ==================================================
  // Sorting
  // ==================================================

  function changeOrder(
    newOrder: MangaOrder,
  ) {
    setOrderBy(newOrder)
    setPage(1)
  }

  // ==================================================
  // Genre filter
  // ==================================================

  function changeGenre(
    newGenreId: string,
  ) {
    setGenreId(newGenreId)
    setPage(1)
  }

  // ==================================================
  // Pagination navigation
  // ==================================================

  function goToPage(newPage: number) {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return
    }

    setPage(newPage)
  }

  // ==================================================
  // Public hook API
  // ==================================================

  return {
    // Manga
    manga,
    loading,
    error,

    // Search
    search,
    setSearch,
    submitSearch,

    // Pagination
    page,
    totalPages,
    goToPage,

    // Status
    status,
    changeStatus,

    // Sorting
    orderBy,
    changeOrder,

    // Genres
    genres,
    genreId,
    changeGenre,
  }
}

export default useManga