"use client";

import { useEffect, useState } from "react";
import { content } from "@/data/content";

/**
 * Custom hook for PDF generation using html2pdf.js
 */
export function usePdfGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load html2pdf script dynamically
    if (typeof window !== "undefined") {
      const checkAndLoad = () => {
        if (window.html2pdf) {
          setIsLoaded(true);
        } else {
          const existingScript = document.querySelector('script[src*="html2pdf"]');
          if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            script.async = true;
            script.onload = () => {
              // Wait a bit for the library to fully initialize
              setTimeout(() => {
                if (window.html2pdf) {
                  setIsLoaded(true);
                }
              }, 100);
            };
            script.onerror = () => {
              console.error("Failed to load html2pdf.js");
            };
            document.body.appendChild(script);
          } else {
            // Script exists but might not be loaded yet
            const checkInterval = setInterval(() => {
              if (window.html2pdf) {
                setIsLoaded(true);
                clearInterval(checkInterval);
              }
            }, 100);
            // Stop checking after 5 seconds
            setTimeout(() => clearInterval(checkInterval), 5000);
          }
        }
      };
      
      checkAndLoad();
    }
  }, []);

  const generatePDF = (element: HTMLElement | null, filename: string) => {
    if (!element) {
      alert(content.confirmations.noContent);
      return;
    }

    if (!window.html2pdf) {
      alert("PDF library is not loaded. Please wait a moment and try again.");
      return;
    }

    setIsGenerating(true);

    try {
      // Ensure all textareas are sized correctly before print
      const textareas = element.querySelectorAll("textarea");
      textareas.forEach((tx) => {
        (tx as HTMLTextAreaElement).style.height = "auto";
        (tx as HTMLTextAreaElement).style.height = `${(tx as HTMLTextAreaElement).scrollHeight}px`;
      });

      // Wait a bit for layout to settle
      setTimeout(() => {
        if (!window.html2pdf) {
          alert("PDF library is not available. Please refresh the page and try again.");
          setIsGenerating(false);
          return;
        }

        const opt = {
          margin: 0.3,
          filename: `${filename || "design-brief"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollY: 0,
          },
          jsPDF: {
            unit: "in",
            format: "letter",
            orientation: "portrait",
          },
          pagebreak: {
            mode: ["avoid-all", "css", "legacy"],
          },
        };

        window.html2pdf()
          .set(opt)
          .from(element)
          .save()
          .then(() => {
            setIsGenerating(false);
          })
          .catch((error: Error) => {
            console.error("PDF generation error:", error);
            alert(`PDF generation failed: ${error.message || "Unknown error"}`);
            setIsGenerating(false);
          });
      }, 300);
    } catch (error) {
      console.error("Error preparing PDF:", error);
      alert("Error preparing PDF for export. Please try again.");
      setIsGenerating(false);
    }
  };

  return { generatePDF, isGenerating, isLoaded };
}

// Extend Window interface for html2pdf
declare global {
  interface Window {
    html2pdf?: () => {
      set: (options: unknown) => {
        from: (element: HTMLElement) => {
          save: () => Promise<void>;
        };
      };
    };
  }
}

