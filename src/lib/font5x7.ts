import type { Bitmap, TextBitmapResult } from "../types/contribution.ts";

export const CHARACTER_WIDTH = 5;
export const CHARACTER_HEIGHT = 7;
export const CHARACTER_SPACING = 1;
export const MAX_CONTRIBUTION_COLUMNS = 53;

export type Glyph = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

const GLYPHS: Record<string, Glyph> = {
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00001", "00001", "00001", "00001", "10001", "10001", "01110"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "10001", "11001", "10101", "10011", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  0: ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  2: ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  3: ["00000", "11100", "00100", "11100", "00100", "11100", "00000"],
  4: ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  5: ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  6: ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  7: ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  8: ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  9: ["01110", "10001", "10001", "01111", "00001", "00010", "11100"],
};

export function normalizeInputText(text: string): string {
  return text.toUpperCase().replace(/[^A-Z0-9 ]+/g, "");
}

export function getMaximumCharacters(maxColumns = MAX_CONTRIBUTION_COLUMNS): number {
  return Math.floor((maxColumns + CHARACTER_SPACING) / (CHARACTER_WIDTH + CHARACTER_SPACING));
}

export function getCharacterBitmap(character: string): Bitmap {
  const glyph = GLYPHS[character] ?? GLYPHS[" "];
  return glyph.map((row) => [...row].map((pixel) => pixel === "1"));
}

export function renderTextToBitmap(
  text: string,
  maxColumns = MAX_CONTRIBUTION_COLUMNS,
): TextBitmapResult {
  const sanitizedText = normalizeInputText(text);
  const bitmap = Array.from({ length: CHARACTER_HEIGHT }, () =>
    Array.from({ length: maxColumns }, () => false),
  );

  let renderedColumns = 0;
  let truncatedText = "";

  for (const character of sanitizedText) {
    const needsSpacing = truncatedText.length > 0;
    const requiredColumns = CHARACTER_WIDTH + (needsSpacing ? CHARACTER_SPACING : 0);

    if (renderedColumns + requiredColumns > maxColumns) {
      break;
    }

    if (needsSpacing) {
      renderedColumns += CHARACTER_SPACING;
    }

    const glyph = getCharacterBitmap(character);

    for (let row = 0; row < CHARACTER_HEIGHT; row += 1) {
      for (let column = 0; column < CHARACTER_WIDTH; column += 1) {
        if (glyph[row][column]) {
          bitmap[row][renderedColumns + column] = true;
        }
      }
    }

    renderedColumns += CHARACTER_WIDTH;
    truncatedText += character;
  }

  const hiddenText = sanitizedText.slice(truncatedText.length);
  const warning =
    hiddenText.length > 0
      ? `Text was truncated to fit the 53-week contribution grid. Showing the first ${truncatedText.length} characters.`
      : null;

  return {
    bitmap,
    sanitizedText,
    truncatedText,
    hiddenText,
    warning,
    renderedColumns,
    maxCharacters: getMaximumCharacters(maxColumns),
  };
}
