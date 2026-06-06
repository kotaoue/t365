import type { ContributionDate } from "../types/contribution";

type DateListProps = {
  dates: ContributionDate[];
  displayDates: string;
  copied: boolean;
  onCopy: () => void;
};

export function DateList({ dates, displayDates, copied, onCopy }: DateListProps) {
  return (
    <section className="panel stack-md">
      <div className="panel-heading">
        <div>
          <h2 className="section-title">Dates</h2>
          <p className="section-copy">Display dates plus ISO values ready to use in commit scripts.</p>
        </div>
        <button className="copy-button" type="button" onClick={onCopy} disabled={dates.length === 0}>
          {copied ? "Copied" : "Copy YYYY-MM-DD"}
        </button>
      </div>

      <div className="stack-sm">
        <p className="field-label">Display</p>
        <div className="date-summary">{displayDates || "No active contribution dates yet."}</div>
      </div>

      <div className="date-table" role="list" aria-label="Generated contribution dates">
        {dates.length === 0 ? (
          <p className="empty-state">Add some text to generate dates.</p>
        ) : (
          dates.map((date) => (
            <div key={date.value} className="date-row" role="listitem">
              <span>{date.display}</span>
              <code>{date.value}</code>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
