type TextInputPanelProps = {
  text: string;
  year: number;
  years: number[];
  maxCharacters: number;
  warning: string | null;
  onTextChange: (value: string) => void;
  onYearChange: (value: number) => void;
};

export function TextInputPanel({
  text,
  year,
  years,
  maxCharacters,
  warning,
  onTextChange,
  onYearChange,
}: TextInputPanelProps) {
  return (
    <header className="panel stack-lg">
      <div className="stack-sm">
        <p className="eyebrow">GitHub contribution text</p>
        <h1 className="hero-title">t365</h1>
        <p className="hero-copy">
          Type uppercase letters, digits, and spaces to turn text into contribution dates you can commit on.
        </p>
      </div>

      <label className="stack-sm" htmlFor="text-input">
        <span className="field-label">Text</span>
        <textarea
          id="text-input"
          className="text-input"
          rows={3}
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder="HELLO 365"
          spellCheck={false}
        />
      </label>

      <div className="control-row">
        <label className="stack-xs" htmlFor="year-select">
          <span className="field-label">Year</span>
          <select
            id="year-select"
            className="select-input"
            value={year}
            onChange={(event) => onYearChange(Number(event.target.value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="helper-row">
        <span>Up to {maxCharacters} characters fit in 53 weeks.</span>
        <span>{text.length} characters entered</span>
      </div>

      {warning ? <p className="warning-text">{warning}</p> : null}
    </header>
  );
}
