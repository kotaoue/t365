type TextInputPanelProps = {
  text: string;
  year: number;
  years: number[];
  warning: string | null;
  onTextChange: (value: string) => void;
  onYearChange: (value: number) => void;
};

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function TextInputPanel({
  text,
  year,
  years,
  warning,
  onTextChange,
  onYearChange,
}: TextInputPanelProps) {
  const startWeekday = WEEKDAY_NAMES[new Date(Date.UTC(year, 0, 1)).getUTCDay()];

  return (
    <header className="panel stack-lg">
      <div className="stack-sm">
        <h1 className="hero-title">t365</h1>
        <p className="hero-copy">
          Turn text into contribution dates on a 7×53 grid.
        </p>
      </div>

      <div className="stack-sm">
        <textarea
          id="text-input"
          className="text-input"
          rows={3}
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder="HELLO 365"
          aria-label="Text input"
          spellCheck={false}
        />
      </div>

      <div className="control-row">
        <div className="stack-xs">
          <select
            id="year-select"
            className="select-input"
            value={year}
            onChange={(event) => onYearChange(Number(event.target.value))}
            aria-label="Year"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="year-note">starts on {startWeekday}.</span>
        </div>
      </div>

      {warning ? <p className="warning-text">{warning}</p> : null}
    </header>
  );
}
