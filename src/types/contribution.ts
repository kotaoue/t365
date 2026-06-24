export type Bitmap = boolean[][];

export type ContributionDate = {
  column: number;
  row: number;
  display: string;
  value: string;
};

export type ContributionCell = ContributionDate & {
  active: boolean;
  inYear: boolean;
  level: 0 | 1 | 2 | 3 | 4;
};

export type TextBitmapResult = {
  bitmap: Bitmap;
  sanitizedText: string;
  truncatedText: string;
  hiddenText: string;
  warning: string | null;
  renderedColumns: number;
  maxCharacters: number;
};
