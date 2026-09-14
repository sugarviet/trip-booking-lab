const RetryButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick}
    className="rounded-lg border bg-slate-100 px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-700 focus-visible:outline-offset-2">
    Thử lại
  </button>
)
export default RetryButton
