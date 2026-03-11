"use client";
import { useState } from "react";
import { Code, Loader2, AlertCircle, Copy, Check, Play } from "lucide-react";
import ModelSelector from "@/components/ModelSelector";

const actions = [
  { value: "generate", label: "Generate Code" },
  { value: "explain", label: "Explain Code" },
  { value: "debug", label: "Debug Code" },
  { value: "optimize", label: "Optimize Code" },
  { value: "convert", label: "Convert Language" },
];

const languages = [
  "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin"
];

export default function CodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [action, setAction] = useState("generate");
  const [language, setLanguage] = useState("Python");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const buildPrompt = () => {
    switch (action) {
      case "generate":
        return `Generate ${language} code for the following requirement:\n\n${input}\n\nProvide clean, well-commented code with a brief explanation.`;
      case "explain":
        return `Explain the following code in detail:\n\n${input}\n\nProvide a clear explanation of what the code does.`;
      case "debug":
        return `Debug the following code and identify any issues:\n\n${input}\n\nProvide the fixed code and explain the bugs found.`;
      case "optimize":
        return `Optimize the following code for better performance and readability:\n\n${input}\n\nProvide the optimized code and explain the improvements.`;
      case "convert":
        return `Convert the following code to ${language}:\n\n${input}\n\nProvide the converted code with any necessary explanations.`;
      default:
        return input;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const apiKey = localStorage.getItem("openai_api_key") || "";
    setIsLoading(true);
    setError(null);
    setOutput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: buildPrompt() }],
          model,
          apiKey,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Failed to process code");
      } else {
        setOutput(data.choices[0].message.content);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
        <div>
          <h1 className="text-lg font-semibold text-white">Code Playground</h1>
          <p className="text-xs text-gray-500">AI-powered code generation and assistance</p>
        </div>
        <ModelSelector value={model} onChange={setModel} />
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-400 mb-1">Action</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {actions.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-medium text-gray-400 mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {languages.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {action === "generate" ? "Describe what you want to build" : "Paste your code here"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                action === "generate"
                  ? "E.g., A function that sorts a list of objects by a given property..."
                  : "Paste your code here..."
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 font-mono min-h-[160px]"
              rows={6}
              disabled={isLoading}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-xl transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play size={18} />
                {actions.find((a) => a.value === action)?.label}
              </>
            )}
          </button>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Output */}
          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Result</label>
                <button
                  onClick={copyOutput}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-sm text-gray-100 overflow-auto whitespace-pre-wrap font-mono">
                {output}
              </pre>
            </div>
          )}

          {!output && !error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-green-500/10 rounded-full mb-4">
                <Code className="text-green-400" size={32} />
              </div>
              <p className="text-gray-400">Your AI-generated code will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
