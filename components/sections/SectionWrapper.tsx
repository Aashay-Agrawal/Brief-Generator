import * as React from "react";

interface SectionWrapperProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

/**
 * Reusable wrapper component for all brief sections
 * Provides consistent styling and numbering
 */
export function SectionWrapper({ number, title, children }: SectionWrapperProps) {
  return (
    <section className="break-inside-avoid">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">
          {number}
        </span>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </div>
      {children}
    </section>
  );
}

