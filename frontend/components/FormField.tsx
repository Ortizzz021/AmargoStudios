import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function FormFieldInput({ label, error, id, ...props }: InputProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="form-group">
      <label htmlFor={fieldId}>{label}</label>
      <input id={fieldId} {...props} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export function FormFieldTextarea({ label, error, id, ...props }: TextareaProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="form-group">
      <label htmlFor={fieldId}>{label}</label>
      <textarea id={fieldId} {...props} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export function FormFieldSelect({ label, error, options, id, ...props }: SelectProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="form-group">
      <label htmlFor={fieldId}>{label}</label>
      <select id={fieldId} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
