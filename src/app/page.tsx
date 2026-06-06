"use client";

import { useMemo, useState } from "react";
import { ContributionPreview } from "../components/ContributionPreview";
import { DateList } from "../components/DateList";
import { TextInputPanel } from "../components/TextInputPanel";
import { createContributionGrid } from "../lib/contribution-calendar";
import { normalizeInputText } from "../lib/font5x7";
import { textToDates } from "../lib/text-to-dates";

const CURRENT_YEAR = new Date().getUTCFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2015 + 1 }, (_, index) => 2015 + index);

export default function Home() {
  const [text, setText] = useState("HELLO");
  const [year, setYear] = useState(CURRENT_YEAR);
  const [density, setDensity] = useState<1 | 2 | 3 | 4>(4);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => textToDates(text, year), [text, year]);
  const previewCells = useMemo(
    () => createContributionGrid(year, result.bitmap, density),
    [density, result.bitmap, year],
  );
  const displayDates = useMemo(() => result.dates.map((date) => date.display).join(", "), [result.dates]);
  const valueDates = useMemo(() => result.dates.map((date) => date.value).join("\n"), [result.dates]);


  async function handleCopy() {
    if (!valueDates) {
      return;
    }

    try {
      await navigator.clipboard.writeText(valueDates);
    } catch {
      const element = document.createElement("textarea");
      element.value = valueDates;
      document.body.appendChild(element);
      element.select();
      document.execCommand("copy");
      document.body.removeChild(element);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="page-shell">
      <div className="app-frame stack-lg">
        <TextInputPanel
          text={text}
          year={year}
          density={density}
          years={YEARS}
          maxCharacters={result.maxCharacters}
          warning={result.warning}
          onTextChange={(value) => {
            setCopied(false);
            setText(normalizeInputText(value));
          }}
          onYearChange={(nextYear) => {
            setCopied(false);
            setYear(nextYear);
          }}
          onDensityChange={setDensity}
        />

        <div className="content-grid">
          <ContributionPreview cells={previewCells} filledCount={result.dates.length} />
          <DateList dates={result.dates} displayDates={displayDates} copied={copied} onCopy={handleCopy} />
        </div>
      </div>
    </main>
  );
}
