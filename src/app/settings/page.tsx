"use client";
import { useState, useEffect } from "react";
import { Settings, Key, CheckCircle, AlertCircle, Eye, EyeOff, Save, Trash2, Info } from "lucide-react";

const models = [
  { value: "gpt-4", label: "GPT-4", description: "Most capable, best for complex tasks" },
  { value: "gpt-4-turbo-preview", label: "GPT-4 Turbo", description: "Faster GPT-4 with longer context" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", description: "Fast and cost-effective" },
];

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [defaultModel, setDefaultModel] = useState("gpt-3.5-turbo");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key") || "";
    const storedModel = localStorage.getItem("default_model") || "gpt-3.5-turbo";
    if (storedKey) {
      setApiKey(storedKey);
      setHasKey(true);
    }
    setDefaultModel(storedModel);
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
    } else {
      localStorage.removeItem("openai_api_key");
    }
    localStorage.setItem("default_model", defaultModel);
    setHasKey(!!apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClear = () => {
    localStorage.removeItem("openai_api_key");
    localStorage.removeItem("default_model");
    setApiKey("");
    setDefaultModel("gpt-3.5-turbo");
    setHasKey(false);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
        <h1 className="text-lg font-semibold text-white">Settings</h1>
        <p className="text-xs text-gray-500">Configure your AI platform preferences</p>
      </div>

      <div className="p-6">
        <div className="max-w-2xl space-y-6">
          {/* Connection Status */}
          <div className={`flex items-center gap-3 p-4 rounded-xl border ${
            hasKey
              ? "bg-green-500/5 border-green-500/20"
              : "bg-yellow-500/5 border-yellow-500/20"
          }`}>
            {hasKey ? (
              <>
                <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-medium text-green-400">API Key Configured</p>
                  <p className="text-xs text-gray-400">Your API key is stored locally and ready to use</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="text-yellow-400 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-medium text-yellow-400">No API Key</p>
                  <p className="text-xs text-gray-400">Configure your OpenAI API key to use AI features</p>
                </div>
              </>
            )}
          </div>

          {/* API Key Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Key className="text-blue-400" size={18} />
              <h2 className="text-base font-semibold text-white">API Key</h2>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                OpenAI API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  autoComplete="off"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </form>

            <div className="flex items-start gap-2 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
              <Info size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400">
                Your API key is stored only in your browser&apos;s localStorage. It is sent to this
                application&apos;s server-side API routes, which use it exclusively to forward your
                requests to OpenAI. It is never logged or stored on the server.
              </p>
            </div>
          </div>

          {/* Model Selection */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="text-purple-400" size={18} />
              <h2 className="text-base font-semibold text-white">Default Model</h2>
            </div>

            <div className="space-y-2">
              {models.map((m) => (
                <label
                  key={m.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    defaultModel === m.value
                      ? "border-blue-500/50 bg-blue-500/5"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="model"
                    value={m.value}
                    checked={defaultModel === m.value}
                    onChange={(e) => setDefaultModel(e.target.value)}
                    className="mt-0.5 accent-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{m.label}</p>
                    <p className="text-xs text-gray-400">{m.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              {saved ? (
                <>
                  <CheckCircle size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Settings
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-red-900/30 text-gray-400 hover:text-red-400 font-medium rounded-lg transition-colors text-sm border border-gray-700 hover:border-red-500/30"
            >
              <Trash2 size={16} />
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
