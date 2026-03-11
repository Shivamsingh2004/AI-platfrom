"use client";

interface ModelSelectorProps {
  value: string;
  onChange: (model: string) => void;
}

const models = [
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-4-turbo-preview", label: "GPT-4 Turbo" },
];

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 hover:border-gray-600 cursor-pointer"
    >
      {models.map((model) => (
        <option key={model.value} value={model.value}>
          {model.label}
        </option>
      ))}
    </select>
  );
}
