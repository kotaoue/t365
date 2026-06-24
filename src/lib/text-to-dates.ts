import type { ContributionDate, TextBitmapResult } from "../types/contribution.ts";
import { mapBitmapToDates } from "./contribution-calendar.ts";
import { MAX_CONTRIBUTION_COLUMNS, renderTextToBitmap } from "./font5x7.ts";

export type TextToDatesResult = TextBitmapResult & {
  dates: ContributionDate[];
};

export function textToDates(text: string, year: number, startWeek = 1): TextToDatesResult {
  const startColumn = Math.max(0, startWeek - 1);
  const availableColumns = Math.max(0, MAX_CONTRIBUTION_COLUMNS - startColumn);
  const bitmapResult = renderTextToBitmap(text, availableColumns);

  return {
    ...bitmapResult,
    dates: mapBitmapToDates(bitmapResult.bitmap, year, startColumn),
  };
}
