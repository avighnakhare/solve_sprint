"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-line py-5 sm:py-6">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-tangerine rounded-md p-1"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-body font-bold text-lg sm:text-xl text-ink pr-4">
          {question}
        </span>
        <span className="font-mono text-xl text-tangerine shrink-0" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 text-ink-muted body-standard pr-8 animate-fadeIn">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
