import type { ContributionCell } from "../types/contribution";

const EMPTY_CELL_COLOR = "#161b22";
const LEVEL_COLORS = ["#0e4429", "#006d32", "#26a641", "#39d353"];

function getCellColor(cell: ContributionCell): string {
  if (!cell.inYear) {
    return "rgba(22, 27, 34, 0.4)";
  }

  if (!cell.active) {
    return EMPTY_CELL_COLOR;
  }

  return LEVEL_COLORS[cell.level - 1];
}

type ContributionPreviewProps = {
  cells: ContributionCell[];
  filledCount: number;
};

export function ContributionPreview({ cells, filledCount }: ContributionPreviewProps) {
  return (
    <section className="panel stack-md">
      <div className="panel-heading">
        <div>
          <h2 className="section-title">Preview</h2>
          <p className="section-copy">A 7×53 GitHub-like grid showing where commits will land.</p>
        </div>
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

      <div className="legend-row" aria-hidden="true">
        <span>Less</span>
        <div className="legend-scale">
          <span className="legend-swatch" style={{ backgroundColor: EMPTY_CELL_COLOR }} />
          {LEVEL_COLORS.map((color) => (
            <span key={color} className="legend-swatch" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span>More</span>
      </div>
    </section>
  );
}
