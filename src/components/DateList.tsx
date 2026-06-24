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
        <button className="copy-button" type="button" onClick={onCopyIso} disabled={dates.length === 0}>
          {copied ? "Copied" : "Copy YYYY-MM-DD"}
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
