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
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => textToDates(text, year), [text, year]);
  const previewCells = useMemo(() => createContributionGrid(year, result.bitmap), [result.bitmap, year]);
  const displayDates = useMemo(() => result.dates.map((date) => date.display).join(", "), [result.dates]);
  const valueDates = useMemo(() => result.dates.map((date) => date.value).join("\n"), [result.dates]);

  async function copyText(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const element = document.createElement("textarea");
      element.value = value;
      document.body.appendChild(element);
      element.select();
      document.execCommand("copy");
      document.body.removeChild(element);
    }
  }

  async function handleCopyIso() {
    if (!valueDates) {
      return;
    }

    await copyText(valueDates);

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopyDisplay() {
    if (!displayDates) {
      return;
    }

    await copyText(displayDates);
  }

  return (
    <main className="page-shell">
      <div className="app-frame stack-lg">
        <TextInputPanel
          text={text}
          year={year}
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
        />

        <div className="content-grid">
          <ContributionPreview cells={previewCells} filledCount={result.dates.length} />
          <DateList
            dates={result.dates}
            displayDates={displayDates}
            copied={copied}
            onCopyIso={handleCopyIso}
            onCopyDisplay={handleCopyDisplay}
          />
        </div>
      </div>
    </main>
  );
}
