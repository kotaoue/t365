import test from "node:test";
import assert from "node:assert/strict";

import { textToDates } from "./text-to-dates.ts";

test("combines bitmap rendering and date mapping", () => {
  const result = textToDates("3", 2017);

  assert.equal(result.truncatedText, "3");
  assert.deepEqual(
    result.dates.map((date) => date.display),
    ["1/2", "1/4", "1/6", "1/9", "1/11", "1/13", "1/16", "1/17", "1/18", "1/19", "1/20"],
  );
});
