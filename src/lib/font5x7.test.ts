import test from "node:test";
import assert from "node:assert/strict";

import {
  MAX_CONTRIBUTION_COLUMNS,
  getCharacterBitmap,
  getMaximumCharacters,
  normalizeInputText,
  renderTextToBitmap,
} from "./font5x7.ts";

test("normalizes lowercase and strips unsupported characters", () => {
  assert.equal(normalizeInputText("ab! 3?"), "AB 3");
});

test("renders the required bitmap for character 3", () => {
  assert.deepEqual(getCharacterBitmap("3"), [
    [false, false, false, false, false],
    [true, true, true, false, false],
    [false, false, true, false, false],
    [true, true, true, false, false],
    [false, false, true, false, false],
    [true, true, true, false, false],
    [false, false, false, false, false],
  ]);
});

test("truncates text safely to the available contribution columns", () => {
  const result = renderTextToBitmap("ABCDEFGHIJ");

  assert.equal(result.truncatedText.length, getMaximumCharacters());
  assert.equal(result.hiddenText, "J");
  assert.equal(result.renderedColumns, MAX_CONTRIBUTION_COLUMNS);
  assert.match(result.warning ?? "", /truncated/i);
});
