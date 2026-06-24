import test from "node:test";
import assert from "node:assert/strict";

import {
  createContributionGrid,
  formatDisplayDate,
  getContributionDate,
  getFirstVisibleDate,
  mapBitmapToDates,
} from "./contribution-calendar.ts";

test("starts from the week containing january first", () => {
  assert.equal(formatDisplayDate(getFirstVisibleDate(2017)), "1/1");
  assert.equal(formatDisplayDate(getFirstVisibleDate(2016)), "12/27");
});

test("maps bitmap cells to the required 2017 sequence for the character 3", () => {
  const bitmap = Array.from({ length: 7 }, () => Array.from({ length: 53 }, () => false));
  bitmap[1][0] = true;
  bitmap[3][0] = true;
  bitmap[5][0] = true;
  bitmap[1][1] = true;
  bitmap[3][1] = true;
  bitmap[5][1] = true;
  bitmap[1][2] = true;
  bitmap[2][2] = true;
  bitmap[3][2] = true;
  bitmap[4][2] = true;
  bitmap[5][2] = true;

  const dates = mapBitmapToDates(bitmap, 2017);

  assert.deepEqual(
    dates.map((date) => date.display),
    ["1/2", "1/4", "1/6", "1/9", "1/11", "1/13", "1/16", "1/17", "1/18", "1/19", "1/20"],
  );
  assert.deepEqual(
    dates.map((date) => date.value),
    [
      "2017-01-02",
      "2017-01-04",
      "2017-01-06",
      "2017-01-09",
      "2017-01-11",
      "2017-01-13",
      "2017-01-16",
      "2017-01-17",
      "2017-01-18",
      "2017-01-19",
      "2017-01-20",
    ],
  );
});

test("ignores pixels that map outside the selected year", () => {
  const bitmap = Array.from({ length: 7 }, () => Array.from({ length: 53 }, () => false));
  bitmap[0][0] = true;
  bitmap[5][0] = true;

  const dates = mapBitmapToDates(bitmap, 2016);

  assert.deepEqual(dates.map((date) => date.value), ["2016-01-01"]);
  assert.equal(getContributionDate(2016, 0, 0).toISOString().slice(0, 10), "2015-12-27");
});

test("builds a full preview grid with inactive and active cells", () => {
  const bitmap = Array.from({ length: 7 }, () => Array.from({ length: 53 }, () => false));
  bitmap[1][0] = true;

  const grid = createContributionGrid(2017, bitmap);
  const activeCell = grid.find((cell) => cell.row === 1 && cell.column === 0);
  const inactiveCell = grid.find((cell) => cell.row === 0 && cell.column === 0);

  assert.equal(grid.length, 371);
  assert.equal(activeCell?.active, true);
  assert.equal(activeCell?.level, 1);
  assert.equal(inactiveCell?.active, false);
});

test("shifts mapped dates when a start column offset is provided", () => {
  const bitmap = Array.from({ length: 7 }, () => Array.from({ length: 53 }, () => false));
  bitmap[1][0] = true;

  const dates = mapBitmapToDates(bitmap, 2017, 1);

  assert.equal(dates[0]?.display, "1/9");
  assert.equal(dates[0]?.value, "2017-01-09");
});

test("shifts active cells in the preview grid by start column", () => {
  const bitmap = Array.from({ length: 7 }, () => Array.from({ length: 53 }, () => false));
  bitmap[1][0] = true;

  const grid = createContributionGrid(2017, bitmap, 1);
  const shiftedActiveCell = grid.find((cell) => cell.row === 1 && cell.column === 1);
  const originalColumnCell = grid.find((cell) => cell.row === 1 && cell.column === 0);

  assert.equal(shiftedActiveCell?.active, true);
  assert.equal(originalColumnCell?.active, false);
});
