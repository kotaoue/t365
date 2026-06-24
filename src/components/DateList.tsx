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
          <p className="section-copy">Display dates ready to use while the ISO values stay available on copy.</p>
        </div>
        <button className="copy-button" type="button" onClick={onCopy} disabled={dates.length === 0}>
          {copied ? "Copied" : "Copy YYYY-MM-DD"}
        </button>
      </div>

      <div className="stack-sm">
        <p className="field-label">Display</p>
        <div className="date-summary">{displayDates || "No active contribution dates yet."}</div>
      </div>
    </section>
  );
}
