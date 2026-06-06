import type { ContributionDate, TextBitmapResult } from "../types/contribution.ts";
import { mapBitmapToDates } from "./contribution-calendar.ts";
import { renderTextToBitmap } from "./font5x7.ts";

export type TextToDatesResult = TextBitmapResult & {
  dates: ContributionDate[];
};

export function textToDates(text: string, year: number): TextToDatesResult {
  const bitmapResult = renderTextToBitmap(text);

  return {
    ...bitmapResult,
    dates: mapBitmapToDates(bitmapResult.bitmap, year),
  };
}
