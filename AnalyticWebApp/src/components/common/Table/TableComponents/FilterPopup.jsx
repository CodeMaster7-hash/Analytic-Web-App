import React from "react";
import { X, CheckCircle, RotateCcw, Save } from "lucide-react";

export default function FilterPopup({
  isOpen,
  onClose,
  filters,
  onChange,
  onApply,
  onClear,
  onSave,
  fields = [],
  title = "",
  useLiveFilter = false,
  onCheckboxToggle = () => {},
}) {
  if (!isOpen) return null;

  const renderField = ({ type, name, label, options, fromName, toName, min, max, step }) => {
    switch (type) {
      case "text":
        return <TextInput key={name} label={label} name={name} value={filters[name]} onChange={onChange} />;
      case "select":
        return <SelectInput key={name} label={label} name={name} value={filters[name]} onChange={onChange} options={options} />;
      case "date":
        return <DateInput key={name} label={label} name={name} value={filters[name]} onChange={onChange} />;
      case "range":
      case "number":
        return <NumberInput key={name} label={label} name={name} value={filters[name]} min={min} max={max} step={step} onChange={onChange} />;
      case "dateRange":
        return <DateRange key={label} label={label} fromName={fromName} toName={toName} filters={filters} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-18 left-34 z-50 rounded-lg border-2 border-green-400">
      <div className="absolute top-16 -left-2 w-4 h-4 bg-white border-4 border-green-400 border-t transform -rotate-45 z-40" />
      <div className="relative bg-white border border-gray-300 shadow-lg rounded-lg w-[620px] p-5 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 z-50"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col space-y-4">{fields.map(renderField)}</div>

        {/* Checkbox & Note */}
        {title === "Analytic Report" && (
          <div className="text-xs text-gray-600 mt-4 px-1 flex flex-col gap-2">
            <div className="flex items-center gap-2 mt-2">
              <span>
                <strong>Note:</strong> Analytic report fetching last 30 days data with threshold 200. If you need to fetch data with different <strong>date</strong> and <strong>threshold</strong> then change both or any and <strong>click on checkbox.</strong>
              </span>
              <input
                type="checkbox"
                checked={useLiveFilter}
                onChange={onCheckboxToggle}
                className="ml-1"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button onClick={onSave} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
            <Save size={14} /> Save Filter
          </button>
          <div className="flex gap-2">
            <button onClick={onApply} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-400 text-gray-700 rounded hover:bg-gray-300">
              <CheckCircle size={14} /> Apply
            </button>
            <button onClick={onClear} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// INPUT COMPONENTS (unchanged)
const TextInput = ({ label, name, value, onChange }) => (
  <div className="flex items-center gap-2">
    <label className="w-32 text-md font-bold text-gray-700">{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm" />
  </div>
);

// (Add other inputs below: DateInput, NumberInput, SelectInput, DateRange) -- same as before

const DateInput = ({ label, name, value, onChange }) => (
  <div className="flex items-center gap-2">
    <label className="w-32 text-md font-bold text-gray-700">{label}</label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const NumberInput = ({ label, name, value, onChange, min = 0, max = 100, step = 1 }) => (
  <div className="flex items-center gap-2">
    <label className="w-32 text-md font-bold text-gray-700">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const DateRange = ({ label, fromName, toName, filters, onChange }) => (
  <div className="flex items-center gap-4">
    <label className="w-32 text-md font-bold text-gray-700">{label}</label>
    <div className="flex items-center gap-2 w-full">
      <input
        type="date"
        name={fromName}
        value={filters[fromName]}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        name={toName}
        value={filters[toName]}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  </div>
);

const SelectInput = ({ label, name, value, onChange, options }) => (
  <div className="flex items-center gap-2">
    <label className="w-32 text-md font-bold text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      <option value="">Select</option>
      {options.map((opt, index) => (
        <option key={`${name}-${index}-${opt}`} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
