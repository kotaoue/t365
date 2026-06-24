import type { ContributionCell } from "../types/contribution";

const EMPTY_CELL_COLOR = "#161b22";
const ACTIVE_CELL_COLOR = "#39d353";

function getCellColor(cell: ContributionCell): string {
  if (!cell.inYear) {
    return "rgba(22, 27, 34, 0.4)";
  }

  if (!cell.active) {
    return EMPTY_CELL_COLOR;
  }

  return ACTIVE_CELL_COLOR;
}

type ContributionPreviewProps = {
  cells: ContributionCell[];
  filledCount: number;
};

export function ContributionPreview({ cells, filledCount }: ContributionPreviewProps) {
  return (
    <section className="panel stack-md">
      <div className="panel-heading">
        <span className="pill">{filledCount} dates</span>
      </div>

      <div className="preview-scroll">
        <div className="contribution-grid" aria-label="Contribution preview grid">
          {cells.map((cell) => (
            <span
              key={`${cell.row}-${cell.column}`}
              className="contribution-cell"
              style={{ backgroundColor: getCellColor(cell) }}
              title={cell.inYear ? `${cell.value}${cell.active ? " • active" : ""}` : "Outside selected year"}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
