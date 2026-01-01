"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Auto-resize functionality
    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const handleInput = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      textarea.addEventListener("input", handleInput);
      // Initial resize
      handleInput();

      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }, []);

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-gray-200 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 placeholder:text-gray-400 resize-none overflow-hidden",
          className
        )}
        ref={(node) => {
          textareaRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
          }
        }}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

