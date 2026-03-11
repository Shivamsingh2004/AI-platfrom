"use client";
import { useState } from "react";
import { FileText, Loader2, AlertCircle, Copy, Check } from "lucide-react";
import ModelSelector from "@/components/ModelSelector";

const tools = [
  {
    id: "summarize",
    label: "Summarize",
    icon: "📝",
    description: "Condense long text into key points",
    placeholder: "Paste the text you want to summarize...",
    prompt: (text: string, _targetLang?: string) => `Please summarize the following text concisely, highlighting the key points:\n\n${text}`,
  },
  {
    id: "translate",
    label: "Translate",
    icon: "🌍",
    description: "Translate text to another language",
    placeholder: "Enter text to translate...",
    prompt: (text: string, targetLang?: string) => `Translate the following text to ${targetLang ?? "Spanish"}:\n\n${text}`,
  },
  {
    id: "improve",
    label: "Improve Writing",
    icon: "✨",
    description: "Enhance clarity and style",
    placeholder: "Enter text to improve...",
    prompt: (text: string, _targetLang?: string) => `Improve the writing quality of the following text. Make it clearer, more concise, and more professional:\n\n${text}`,
  },
  {
    id: "bullet",
    label: "Bullet Points",
    icon: "•",
    description: "Convert text to bullet points",
    placeholder: "Enter text to convert to bullet points...",
    prompt: (text: string, _targetLang?: string) => `Convert the following text into a well-organized bullet point list:\n\n${text}`,
  },
  {
    id: "formal",
    label: "Make Formal",
    icon: "👔",
    description: "Convert to formal tone",
    placeholder: "Enter casual text to formalize...",
    prompt: (text: string, _targetLang?: string) => `Rewrite the following text in a formal, professional tone:\n\n${text}`,
  },
  {
    id: "casual",
    label: "Make Casual",
    icon: "😊",
    description: "Convert to casual tone",
    placeholder: "Enter formal text to make casual...",
    prompt: (text: string, _targetLang?: string) => `Rewrite the following text in a friendly, casual tone:\n\n${text}`,
  },
];

const languages = [
  "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Hindi"
];

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!input.trim() || isLoading) return;

    const apiKey = localStorage.getItem("openai_api_key") || "";
    setIsLoading(true);
    setError(null);
    setOutput("");

    const promptText = selectedTool.id === "translate"
      ? selectedTool.prompt(input.trim(), targetLang)
      : selectedTool.prompt(input.trim());

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: promptText }],
          model,
          apiKey,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Failed to process text");
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

  const handleToolChange = (tool: typeof tools[0]) => {
    setSelectedTool(tool);
    setOutput("");
    setError(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
        <div>
          <h1 className="text-lg font-semibold text-white">Text Tools</h1>
          <p className="text-xs text-gray-500">Transform and enhance your text with AI</p>
        </div>
        <ModelSelector value={model} onChange={setModel} />
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Tool Selection */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolChange(tool)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-medium transition-colors ${
                  selectedTool.id === tool.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="text-lg">{tool.icon}</span>
                {tool.label}
              </button>
            ))}
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-400">{selectedTool.description}</p>
            {selectedTool.id === "translate" && (
              <div className="mt-3">
                <label className="text-xs font-medium text-gray-400 mb-1 block">Target Language</label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {languages.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Input / Output */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={selectedTool.placeholder}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 min-h-[200px]"
                rows={8}
                disabled={isLoading}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{input.length} characters</span>
                <button
                  onClick={handleProcess}
                  disabled={!input.trim() || isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <span>{selectedTool.icon}</span>}
                  {isLoading ? "Processing..." : selectedTool.label}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Output</label>
                {output && (
                  <button
                    onClick={copyOutput}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
              
              {error ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm min-h-[200px]">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {error}
                </div>
              ) : output ? (
                <div className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 min-h-[200px] whitespace-pre-wrap">
                  {output}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-gray-900 border border-gray-700 rounded-xl min-h-[200px] text-center">
                  {isLoading ? (
                    <Loader2 className="text-blue-400 animate-spin" size={24} />
                  ) : (
                    <>
                      <FileText className="text-gray-600 mb-2" size={24} />
                      <p className="text-gray-500 text-xs">Output will appear here</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
