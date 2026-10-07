import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import {
  searchManga,
} from '../services/mangaApi'

import type { Manga } from '../types/manga'

import {
  getMangaCover,
  getMangaTitle,
} from '../utils/manga'

function Hero() {
  const [featuredManga, setFeaturedManga] =
    useState<Manga | null>(null)

  const [featuredLoading, setFeaturedLoading] =
    useState(true)

  useEffect(() => {
    const controller =
      new AbortController()

    async function loadFeaturedManga() {
      try {
        setFeaturedLoading(true)

        const result = await searchManga({
          offset: 0,
          orderBy: 'followedCount',
          orderDirection: 'desc',
          signal: controller.signal,
        })

        if (result.data.length === 0) {
          return
        }

        const randomIndex =
          Math.floor(
            Math.random() *
              result.data.length,
          )

        setFeaturedManga(
          result.data[randomIndex],
        )
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === 'AbortError'
        ) {
          return
        }

        console.error(
          'Failed to load featured manga:',
          error,
        )
      } finally {
        if (!controller.signal.aborted) {
          setFeaturedLoading(false)
        }
      }
    }

    loadFeaturedManga()

    return () => {
      controller.abort()
    }
  }, [])

  const featuredTitle =
    featuredManga
      ? getMangaTitle(featuredManga)
      : ''

  const featuredCover =
    featuredManga
      ? getMangaCover(
          featuredManga,
          '512',
        )
      : null

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden border-b border-slate-800 bg-[#08090d]">
      {/* Large atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[140px]" />

        <div className="absolute right-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-slate-700/10 blur-[160px]" />

        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-[1400px] items-center px-6 py-16 sm:px-10 lg:px-14">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">

          {/* Left content */}
          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-500">
              MangaVerse
            </p>

            <h1 className="mt-7 text-[clamp(4.5rem,10vw,9rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] text-white">
              Find
              <span className="block text-red-500">
                your
              </span>
              story.
            </h1>

            <p className="mt-8 max-w-xl font-serif text-lg leading-8 text-slate-400 sm:text-xl">
              A place to discover manga worth
              getting lost in.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#collection"
                className="border border-red-500 bg-red-500 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-400"
              >
                Explore manga
              </a>

              <Link
                to="/about"
                className="border border-slate-700 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400 transition hover:border-slate-500 hover:text-white"
              >
                About
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-slate-600">
              <span>Search</span>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-slate-700"
              />

              <span>Discover</span>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-slate-700"
              />

              <span>Read</span>
            </div>
          </div>

          {/* Featured artwork */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[75%] w-[55%] -translate-x-1/2 -translate-y-1/2 bg-red-500/10 blur-[100px]"
            />

            {featuredLoading ? (
              <div className="relative w-full max-w-[500px]">
                <div className="aspect-[4/5] animate-pulse bg-slate-900" />
              </div>
            ) : featuredManga ? (
              <Link
                to={`/manga/${featuredManga.id}`}
                aria-label={`View featured manga: ${featuredTitle}`}
                className="group relative block w-full max-w-[500px] focus:outline-none"
              >
                <div className="relative overflow-hidden">
                  {featuredCover ? (
                    <img
                      src={featuredCover}
                      alt={`Cover of ${featuredTitle}`}
                      loading="eager"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover grayscale-[15%] transition duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center bg-slate-900">
                      <span className="text-xs uppercase tracking-widest text-slate-600">
                        No cover
                      </span>
                    </div>
                  )}

                  {/* Image treatment */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-red-500/10"
                  />

                  {/* Featured information */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-red-500" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">
                        Featured story
                      </span>
                    </div>

                    <h2 className="mt-4 max-w-xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl">
                      {featuredTitle}
                    </h2>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                        Open story
                      </span>

                      <span
                        aria-hidden="true"
                        className="text-xl text-white transition-transform duration-300 group-hover:translate-x-2"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Offset frame */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -left-4 -z-10 h-full w-full border border-slate-800"
                />

                {/* Number */}
                <div
                  aria-hidden="true"
                  className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center border border-slate-700 bg-[#08090d] text-xs font-black uppercase tracking-widest text-slate-400"
                >
                  001
                </div>
              </Link>
            ) : (
              <div className="relative w-full max-w-[500px]">
                <div className="flex aspect-[4/5] items-center justify-center bg-slate-900">
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                      Featured story
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                      Unable to load manga.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vertical side text */}
        <div
          aria-hidden="true"
          className="absolute bottom-10 right-6 hidden [writing-mode:vertical-rl] text-[9px] font-bold uppercase tracking-[0.35em] text-slate-700 lg:block"
        >
          Discover something worth reading
        </div>

        {/* Bottom index */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-6 hidden text-[9px] uppercase tracking-[0.25em] text-slate-700 sm:left-10 lg:block"
        >
          01 / 04
        </div>
      </div>
    </section>
  )
}

export default Hero