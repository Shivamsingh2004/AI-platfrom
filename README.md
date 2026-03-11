# AI Platform

A modern, full-featured AI platform built with Next.js 14, TypeScript, and Tailwind CSS. Access powerful AI capabilities including chat, image generation, code assistance, and text tools — all in one place.

![AI Platform Dashboard](https://github.com/user-attachments/assets/4bbd6ce7-65e1-43b6-9fa6-13a837cb8820)

## Features

- **🤖 AI Chat** — Multi-turn conversations with GPT-3.5 Turbo, GPT-4, and GPT-4 Turbo
- **🎨 Image Generation** — Text-to-image generation with DALL-E 3
- **💻 Code Playground** — AI-powered code generation, explanation, debugging, and optimization
- **📝 Text Tools** — Summarization, translation, improvement, and reformatting
- **⚙️ Settings** — Securely configure your OpenAI API key and default model

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Configuration

1. Navigate to the **Settings** page
2. Enter your OpenAI API key (starts with `sk-`)
3. Choose your preferred default model
4. Click **Save Settings**

Your API key is stored only in your browser's localStorage and sent exclusively to the server-side API routes, which forward your requests to OpenAI. It is never logged or stored on the server.

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router, Server Components, Route Handlers
- [TypeScript](https://www.typescriptlang.org/) — Type-safe code
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Lucide React](https://lucide.dev/) — Icons
- [OpenAI API](https://platform.openai.com/docs) — AI capabilities

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
