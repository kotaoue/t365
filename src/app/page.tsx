"use client";

import { useMemo, useState } from "react";
import { ContributionPreview } from "../components/ContributionPreview";
import { DateList } from "../components/DateList";
import { TextInputPanel } from "../components/TextInputPanel";
import { createContributionGrid } from "../lib/contribution-calendar";
import { normalizeInputText } from "../lib/font5x7";
import { textToDates } from "../lib/text-to-dates";

const CURRENT_YEAR = new Date().getUTCFullYear();
const YEARS = Array.from({ length: 16 }, (_, index) => CURRENT_YEAR - 10 + index);
const START_WEEKS = Array.from({ length: 53 }, (_, index) => index + 1);

export default function Home() {
  const [text, setText] = useState("HELLO");
  const [year, setYear] = useState(CURRENT_YEAR);
  const [startWeek, setStartWeek] = useState(1);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => textToDates(text, year, startWeek), [text, year, startWeek]);
  const previewCells = useMemo(
    () => createContributionGrid(year, result.bitmap, startWeek - 1),
    [result.bitmap, startWeek, year],
  );
  const displayDates = useMemo(() => result.dates.map((date) => date.display).join(", "), [result.dates]);

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

  async function handleCopyDisplay() {
    if (!displayDates) {
      return;
    }

    await copyText(displayDates);

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="page-shell">
      <div className="app-frame stack-lg">
        <TextInputPanel
          text={text}
          year={year}
          years={YEARS}
          startWeek={startWeek}
          startWeeks={START_WEEKS}
          warning={result.warning}
          onTextChange={(value) => {
            setCopied(false);
            setText(normalizeInputText(value));
          }}
          onYearChange={(nextYear) => {
            setCopied(false);
            setYear(nextYear);
          }}
          onStartWeekChange={(nextStartWeek) => {
            setCopied(false);
            setStartWeek(nextStartWeek);
          }}
        />

        <div className="content-grid">
          <ContributionPreview cells={previewCells} filledCount={result.dates.length} />
          <DateList
            dates={result.dates}
            displayDates={displayDates}
            copied={copied}
            onCopyDisplay={handleCopyDisplay}
          />
        </div>
      </div>
    </main>
  );
}
