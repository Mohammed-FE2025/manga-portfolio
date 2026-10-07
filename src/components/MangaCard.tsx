import { Link } from 'react-router'

import type { Manga } from '../types/manga'

import {
  getMangaCover,
  getMangaTitle,
} from '../utils/manga'

interface MangaCardProps {
  manga: Manga
}

function MangaCard({
  manga,
}: MangaCardProps) {
  const title = getMangaTitle(manga)

 const cover = getMangaCover(
  manga,
  '256',
)

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
    .slice(0, 2)

  return (
    <article className="group relative">
      <Link
        to={`/manga/${manga.id}`}
        aria-label={`View details for ${title}`}
        className="block focus:outline-none"
      >
        <div
          className="
            relative
            overflow-hidden
            border
            border-slate-800
            bg-slate-900
            transition
            duration-300
            group-hover:-translate-y-1
            group-hover:border-slate-600
            group-hover:shadow-2xl
            group-hover:shadow-black/40
            focus-visible:ring-2
            focus-visible:ring-red-500
            focus-visible:ring-offset-2
            focus-visible:ring-offset-slate-950
          "
        >
          {/* Manga panel number */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 z-20 flex h-7 w-7 items-center justify-center border-b border-r border-slate-700 bg-slate-950 text-[10px] font-black text-slate-500"
          >
            {String(
              (parseInt(manga.id.slice(-2), 36) %
                99) +
                1,
            ).padStart(2, '0')}
          </div>

          {/* Cover */}
          <div className="relative overflow-hidden bg-slate-800">
            {cover ? (
              <img
  src={cover}
  alt={`Cover of ${title}`}
  loading="lazy"
  decoding="async"
  className="
    aspect-2/3
    w-full
    object-cover
    transition
    duration-700
    ease-out
    group-hover:scale-105
  "
/>
            ) : (
              <div className="flex aspect-2/3 items-center justify-center bg-slate-800 text-sm text-slate-500">
                No cover available
              </div>
            )}

            {/* Dark gradient */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"
            />

            {/* Subtle halftone */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-0
                transition
                duration-500
                group-hover:opacity-20
                [background-image:radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)]
                [background-size:12px_12px]
              "
            />

            {/* Status */}
            <span
              className="
                absolute
                right-3
                top-3
                border
                border-slate-700
                bg-slate-950/85
                px-2.5
                py-1
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-slate-200
                backdrop-blur
              "
            >
              {manga.attributes.status}
            </span>

            {/* Red accent */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-0
                h-1
                w-0
                bg-red-500
                transition-all
                duration-500
                group-hover:w-1/3
              "
            />
          </div>

          {/* Content */}
          <div className="relative p-5">
            {/* Editorial label */}
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-px w-5 bg-red-500"
              />

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                Manga Archive
              </span>
            </div>

            {/* Title */}
            <h2
              className="
                mt-3
                line-clamp-2
                min-h-14
                text-lg
                font-black
                leading-7
                tracking-tight
                text-white
                transition-colors
                duration-300
                group-hover:text-red-400
              "
            >
              {title}
            </h2>

            {/* Metadata */}
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wider text-slate-500">
              {manga.attributes.year && (
                <span>
                  {manga.attributes.year}
                </span>
              )}

              {manga.attributes.year && (
                <span aria-hidden="true">
                  /
                </span>
              )}

              <span>
                {manga.attributes.contentRating}
              </span>
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="
                      border
                      border-slate-800
                      bg-slate-950
                      px-2
                      py-1
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom row */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-slate-300">
                Read more
              </span>

              <span
                aria-hidden="true"
                className="
                  text-lg
                  text-red-500
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default MangaCard