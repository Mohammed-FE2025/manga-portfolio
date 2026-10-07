import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import {
  getMangaById,
} from '../services/mangaApi'

import type { Manga } from '../types/manga'

import {
  getMangaCover,
  getMangaTitle,
} from '../utils/manga'

function MangaDetails() {
  const { id } = useParams()

  if (!id) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-500">
            Manga not found
          </p>

          <h1 className="mt-3 text-3xl font-black text-white">
            No manga ID was provided.
          </h1>

          <Link
            to="/"
            className="mt-6 inline-block text-sm font-bold uppercase tracking-wider text-slate-400 transition hover:text-white"
          >
            ← Back to Discover
          </Link>
        </div>
      </main>
    )
  }

  return (
    <MangaDetailsContent id={id} />
  )
}

interface MangaDetailsContentProps {
  id: string
}

function MangaDetailsContent({
  id,
}: MangaDetailsContentProps) {
  const [manga, setManga] =
    useState<Manga | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    const controller =
      new AbortController()

    async function loadManga() {
      try {
        setLoading(true)
        setError(null)

        const result =
          await getMangaById(
            id,
            controller.signal,
          )

        setManga(result)
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === 'AbortError'
        ) {
          return
        }

        console.error(error)

        setError(
          'Unable to load manga details.',
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
  }, [id])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="animate-pulse">
          <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
            <div className="aspect-[2/3] bg-slate-900" />

            <div>
              <div className="h-4 w-32 bg-slate-900" />

              <div className="mt-6 h-12 max-w-2xl bg-slate-900" />

              <div className="mt-3 h-12 max-w-xl bg-slate-900" />

              <div className="mt-8 h-24 max-w-2xl bg-slate-900" />

              <div className="mt-8 h-12 w-48 bg-slate-900" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !manga) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="border border-red-500/20 bg-red-950/10 p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-red-500">
            Error
          </p>

          <p className="mt-3 text-lg text-slate-300">
            {error ??
              'Manga could not be found.'}
          </p>

          <Link
            to="/"
            className="mt-6 inline-block text-sm font-bold uppercase tracking-wider text-slate-400 transition hover:text-white"
          >
            ← Back to Discover
          </Link>
        </div>
      </main>
    )
  }

  const title =
    getMangaTitle(manga)

  const cover =
    getMangaCover(manga, '512')

  const description =
    manga.attributes.description?.en ??
    Object.values(
      manga.attributes.description ?? {},
    )[0] ??
    'No synopsis is available for this manga.'

  const author =
    manga.relationships.find(
      (relationship) =>
        relationship.type === 'author',
    )?.attributes?.name ??
    'Unknown'

  const artist =
    manga.relationships.find(
      (relationship) =>
        relationship.type === 'artist',
    )?.attributes?.name ??
    'Unknown'

  const genres = manga.attributes.tags
    .filter(
      (tag) =>
        tag.attributes.group === 'genre',
    )
    .map(
      (tag) =>
        tag.attributes.name.en ??
        Object.values(
          tag.attributes.name,
        )[0] ??
        'Unknown',
    )

  return (
    <main className="relative overflow-hidden">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-3xl" />

        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 transition hover:text-white"
        >
          <span className="text-red-500">
            ←
          </span>

          Discover
        </Link>
      </div>

      {/* Main editorial section */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
          {/* Cover */}
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="absolute -bottom-4 -left-4 h-24 w-24 border border-red-500/30" />

            <div className="absolute -right-4 -top-4 h-16 w-16 bg-red-500/10" />

            <div className="relative border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/50">
              <div className="overflow-hidden bg-slate-800">
                {cover ? (
                  <img
                    src={cover}
                    alt={`Cover of ${title}`}
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center text-sm text-slate-500">
                    No cover available
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-700 px-3 py-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  MangaVerse / Archive
                </span>

                <span
                  aria-hidden="true"
                  className="text-xs text-red-500"
                >
                  ●
                </span>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-red-500"
              />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                Manga Archive
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            {/* Metadata */}
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400">
                {manga.attributes.status}
              </span>

              {manga.attributes.year && (
                <span className="border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {manga.attributes.year}
                </span>
              )}

              <span className="border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                {manga.attributes.contentRating}
              </span>
            </div>

            {/* Credits */}
            <div className="mt-8 grid gap-5 border-y border-slate-800 py-6 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  Author
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-300">
                  {author}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  Artist
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-300">
                  {artist}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  Last chapter
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-300">
                  {manga.attributes.lastChapter ??
                    '—'}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  Last volume
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-300">
                  {manga.attributes.lastVolume ??
                    '—'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                Synopsis
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                {description}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://mangadex.org/title/${manga.id}`}
                target="_blank"
                rel="noreferrer"
                className="border border-red-500 bg-red-500 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-red-400"
              >
                Open on MangaDex ↗
              </a>

              <Link
                to="/"
                className="border border-slate-700 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-slate-400 transition hover:border-slate-500 hover:text-white"
              >
                Back to collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Genres */}
      {genres.length > 0 && (
        <section className="border-y border-slate-800 bg-slate-950/60">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                  Classification
                </p>

                <h2 className="mt-2 text-xl font-black uppercase tracking-tight text-white">
                  Genres
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default MangaDetails