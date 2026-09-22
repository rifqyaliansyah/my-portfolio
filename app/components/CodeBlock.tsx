"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-brand-border-container bg-[#1E1E1E] text-[#D4D4D4] shadow-lg">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-[#333333] text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
          </div>
          {filename && <span className="ml-2 text-gray-300 font-medium">{filename}</span>}
        </div>

        <div className="flex items-center gap-3">
          {language && <span className="uppercase text-[11px] font-semibold tracking-wider text-gray-400">{language}</span>}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#333333] hover:bg-[#444444] text-gray-200 text-xs transition-colors cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#27C93F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[#27C93F]">Copied!</span>
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <pre className="p-4 overflow-x-auto text-[13px] md:text-[14px] leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
