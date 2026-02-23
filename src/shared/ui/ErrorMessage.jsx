function ErrorMessage({ message, onRetry, className = '' }) {
  return (
    <div
      role="alert"
      className={`rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 ${className}`.trim()}
    >
      <p>{message}</p>
      {onRetry && (
        <div className="mt-3">
          <button
            type="button"
            onClick={onRetry}
            className="rounded border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Tekrar dene
          </button>
        </div>
      )}
    </div>
  )
}

export default ErrorMessage
