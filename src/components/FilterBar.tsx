import type {
  MangaOrder,
  MangaStatus,
} from '../services/mangaApi'

interface FilterBarProps {
  status: MangaStatus
  orderBy: MangaOrder
  onStatusChange: (
    status: MangaStatus,
  ) => void
  onOrderChange: (
    order: MangaOrder,
  ) => void
}

function FilterBar({
  status,
  orderBy,
  onStatusChange,
  onOrderChange,
}: FilterBarProps) {
  return (
    <>
      <div>
        <label
          htmlFor="status-filter"
          className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-red-500"
          />
          Status
        </label>

        <select
          id="status-filter"
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target
                .value as MangaStatus,
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
            All statuses
          </option>

          <option value="ongoing">
            Ongoing
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="hiatus">
            Hiatus
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>
      </div>

      <div>
        <label
          htmlFor="sort-filter"
          className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-red-500"
          />
          Sort by
        </label>

        <select
          id="sort-filter"
          value={orderBy}
          onChange={(event) =>
            onOrderChange(
              event.target
                .value as MangaOrder,
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
          <option value="followedCount">
            Popularity
          </option>

          <option value="latestUploadedChapter">
            Recently Updated
          </option>

          <option value="title">
            Title
          </option>

          <option value="year">
            Release Year
          </option>
        </select>
      </div>
    </>
  )
}

export default FilterBar