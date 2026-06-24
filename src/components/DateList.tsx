import type { ContributionDate } from "../types/contribution";

type DateListProps = {
  dates: ContributionDate[];
  displayDates: string;
  copied: boolean;
  onCopyIso: () => void;
  onCopyDisplay: () => void;
};

export function DateList({ dates, displayDates, copied, onCopyIso, onCopyDisplay }: DateListProps) {
  return (
    <section className="panel stack-md">
      <div className="panel-heading">
        <h2 className="section-title">Dates</h2>
        <button
          className="copy-button copy-icon-button"
          type="button"
          onClick={onCopyIso}
          disabled={dates.length === 0}
          title={copied ? "Copied" : "Copy YYYY-MM-DD"}
          aria-label={copied ? "Copied" : "Copy YYYY-MM-DD"}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 9h9v11H9z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M6 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      </div>

      {dates.length === 0 ? (
        <div className="date-summary">No active contribution dates yet.</div>
      ) : (
        <button
          className="date-copy-block"
          type="button"
          onClick={onCopyDisplay}
          title="Click to copy display dates"
          aria-label="Copy display dates"
        >
          {displayDates}
        </button>
      )}
    </section>
  );
}
