import type { MangaTag } from '../services/mangaApi'

interface GenreFilterProps {
  genres: MangaTag[]
  genreId: string
  onGenreChange: (
    genreId: string,
  ) => void
}

function GenreFilter({
  genres,
  genreId,
  onGenreChange,
}: GenreFilterProps) {
  return (
    <div>
      <label
        htmlFor="genre-filter"
        className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 bg-red-500"
        />
        Genre
      </label>

      <select
        id="genre-filter"
        value={genreId}
        onChange={(event) =>
          onGenreChange(
            event.target.value,
          )
        }
        className="
          w-full
          appearance-none
          border
          border-slate-700
          bg-slate-950
          px-4
          py-3.5
          text-sm
          text-white
          outline-none
          transition
          hover:border-slate-600
          focus:border-red-500
          focus:ring-2
          focus:ring-red-500/10
        "
      >
        <option value="">
          All genres
        </option>

        {genres.map((genre) => {
          const name =
            genre.attributes.name.en ??
            Object.values(
              genre.attributes.name,
            )[0] ??
            'Unknown genre'

          return (
            <option
              key={genre.id}
              value={genre.id}
            >
              {name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default GenreFilter