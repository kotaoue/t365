import type { Bitmap, ContributionCell, ContributionDate } from "../types/contribution.ts";
import { CHARACTER_HEIGHT, MAX_CONTRIBUTION_COLUMNS } from "./font5x7.ts";

export function getFirstVisibleDate(year: number): Date {
  const januaryFirst = new Date(Date.UTC(year, 0, 1));
  januaryFirst.setUTCDate(januaryFirst.getUTCDate() - januaryFirst.getUTCDay());
  return januaryFirst;
}

export function getContributionDate(year: number, column: number, row: number): Date {
  const date = getFirstVisibleDate(year);
  date.setUTCDate(date.getUTCDate() + column * CHARACTER_HEIGHT + row);
  return date;
}

export function formatDisplayDate(date: Date): string {
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
}

export function formatValueDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function mapBitmapToDates(bitmap: Bitmap, year: number, startColumn = 0): ContributionDate[] {
  const dates: ContributionDate[] = [];
  const maxColumns = bitmap[0]?.length ?? 0;

  for (let column = 0; column < maxColumns; column += 1) {
    const shiftedColumn = startColumn + column;
    if (shiftedColumn >= MAX_CONTRIBUTION_COLUMNS) {
      continue;
    }

    for (let row = 0; row < CHARACTER_HEIGHT; row += 1) {
      if (!bitmap[row]?.[column]) {
        continue;
      }

      const date = getContributionDate(year, shiftedColumn, row);
      if (date.getUTCFullYear() !== year) {
        continue;
      }

      dates.push({
        column: shiftedColumn,
        row,
        display: formatDisplayDate(date),
        value: formatValueDate(date),
      });
    }
  }

  return dates;
}

export function createContributionGrid(
  year: number,
  bitmap: Bitmap,
  startColumn = 0,
): ContributionCell[] {
  const cells: ContributionCell[] = [];

  for (let row = 0; row < CHARACTER_HEIGHT; row += 1) {
    for (let column = 0; column < MAX_CONTRIBUTION_COLUMNS; column += 1) {
      const date = getContributionDate(year, column, row);
      const inYear = date.getUTCFullYear() === year;
      const sourceColumn = column - startColumn;
      const active = inYear && sourceColumn >= 0 && Boolean(bitmap[row]?.[sourceColumn]);

      cells.push({
        row,
        column,
        active,
        inYear,
        level: active ? 1 : 0,
        display: formatDisplayDate(date),
        value: formatValueDate(date),
      });
    }
  }

  return cells;
}
