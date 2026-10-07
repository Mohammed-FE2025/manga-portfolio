interface ErrorMessageProps {
  message: string
}

function ErrorMessage({
  message,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="border border-red-500/30 bg-red-950/20 p-6"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
        Something went wrong
      </p>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {message}
      </p>
    </div>
  )
}

export default ErrorMessage