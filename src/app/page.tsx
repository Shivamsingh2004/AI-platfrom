import Link from "next/link";
import { MessageSquare, Image, Code, FileText, Zap, ArrowRight, Sparkles, Shield, Globe } from "lucide-react";

const features = [
  {
    href: "/chat",
    icon: MessageSquare,
    title: "AI Chat",
    description: "Have multi-turn conversations with powerful AI models. Ask questions, get explanations, and brainstorm ideas.",
    color: "blue",
    gradient: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    href: "/image",
    icon: Image,
    title: "Image Generation",
    description: "Transform your text descriptions into stunning images using state-of-the-art AI image generation.",
    color: "purple",
    gradient: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    href: "/code",
    icon: Code,
    title: "Code Playground",
    description: "Generate, explain, and debug code with AI assistance. Supports all major programming languages.",
    color: "green",
    gradient: "from-green-500/10 to-green-600/5",
    border: "border-green-500/20",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
  },
  {
    href: "/tools",
    icon: FileText,
    title: "Text Tools",
    description: "Summarize documents, translate languages, and transform text with powerful AI capabilities.",
    color: "orange",
    gradient: "from-orange-500/10 to-orange-600/5",
    border: "border-orange-500/20",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
  },
];

const highlights = [
  { icon: Zap, title: "Lightning Fast", description: "Optimized for speed with real-time streaming responses" },
  { icon: Shield, title: "Secure & Private", description: "Your API keys are stored locally, never on our servers" },
  { icon: Globe, title: "Multiple Models", description: "Support for GPT-4, GPT-3.5-turbo, and more models" },
  { icon: Sparkles, title: "Modern UI", description: "Clean, intuitive interface designed for productivity" },
];

export default function HomePage() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
        <div className="relative px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Sparkles size={14} />
              AI-Powered Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your All-in-One{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                AI Platform
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Access powerful AI capabilities including chat, image generation, code assistance, 
              and text tools — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors border border-gray-700"
              >
                Configure API Key
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-2">AI Tools</h2>
        <p className="text-gray-400 mb-8">Everything you need to harness the power of AI</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(({ href, icon: Icon, title, description, gradient, border, iconBg, iconColor }) => (
            <Link
              key={href}
              href={href}
              className={`group p-6 rounded-xl bg-gradient-to-br ${gradient} border ${border} hover:border-opacity-50 transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className={`inline-flex p-3 rounded-lg ${iconBg} mb-4`}>
                <Icon className={iconColor} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Open {title}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="px-8 py-8 border-t border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="inline-flex p-3 rounded-lg bg-gray-800 mb-3">
                <Icon className="text-blue-400" size={20} />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
              <p className="text-gray-500 text-xs">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
