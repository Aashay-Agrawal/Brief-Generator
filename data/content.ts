/**
 * Centralized content data for the Design Brief Generator
 * Modify this file to change all website content
 */

export const content = {
  // Header
  header: {
    title: "Design Brief Generator",
    description: "Create comprehensive design briefs with style.",
  },

  // Action buttons
  buttons: {
    clear: "Clear",
    exportPdf: "Export PDF",
    generating: "Generating...",
  },

  // Brief Header Section
  briefHeader: {
    projectName: {
      label: "Project Name",
      placeholder: "e.g. Website Redesign 2024",
    },
    client: {
      label: "Client",
      placeholder: "Client Name & Contact Info",
    },
    dateSubmitted: {
      label: "Date Submitted",
    },
    projectDue: {
      label: "Project Due",
    },
  },

  // Section 1: Context & Problem
  context: {
    title: "Context & Problem",
    placeholder: "Briefly describe the market situation and opportunity. What are we trying to achieve?",
  },

  // Section 2: Objective
  objective: {
    title: "Objective",
    placeholder: "What exactly should this website achieve? (e.g., generate leads, build credibility)",
  },

  // Section 3: Scope
  scope: {
    title: "Scope",
    types: {
      newBuild: "Landing Page Design",
      redesign: "Redesign",
      landingPage: "Template Customisation",
    },
    placeholder: "Details: Key issues to fix, elements to retain, or specific landing page requirements...",
  },

  // Section 4: Deliverables
  deliverables: {
    title: "Deliverables",
    placeholder: "List exact outputs (e.g., Pages, Design System, Assets)...",
  },

  // Section 5: Target Audience
  audience: {
    title: "Target Audience",
    placeholder: "Who are we talking to?",
  },

  // Section 6: Competitors
  competitors: {
    title: "Competitors",
    placeholder: "List 3-5 competitors...",
  },

  // Section 7: Visual Direction
  visualDirection: {
    title: "Visual Direction",
    overallStyle: {
      label: "Overall Style",
      placeholder: "Minimal, Brutalist, Playful...",
    },
    constraints: {
      label: "Constraints",
      placeholder: "Brand guides, specific colors...",
    },
    references: {
      label: "References",
      placeholder: "Links to websites or inspiration...",
    },
  },

  // Section 8: Specifications
  specifications: {
    title: "Specifications",
    interactions: {
      label: "Interactions & Motion",
      placeholder: "Smooth scroll, Rive, Hover states...",
    },
    cta: {
      label: "Call to Action",
      placeholder: "Book demo, Buy now...",
    },
    pageCount: {
      label: "Page Count (Est.)",
      placeholder: "5-10 pages",
    },
    cms: {
      label: "CMS Platform",
      placeholder: "Framer, Notion, Excel",
    },
  },

  // Section 9: Project Schedule
  schedule: {
    title: "Project Schedule",
    table: {
      milestone: "Milestone",
      dueDate: "Due Date",
      notes: "Notes",
    },
  },

  // Section 10: Project Budget
  budget: {
    title: "Project Budget",
    placeholder: "0.00",
  },

  // Section 11: Additional Notes
  notes: {
    title: "Additional Notes",
    placeholder: "Any other details...",
  },

  // Footer
  footer: {
    text: "",
  },

  // Confirmation messages
  confirmations: {
    clearForm: "Are you sure you want to clear the entire form?",
    pdfLoading: "PDF Generator is still loading, please try again in a moment.",
    pdfError: "Failed to generate PDF. Please try again.",
    noContent: "No content to export.",
  },
} as const;

/**
 * Default filename for PDF export
 */
export const DEFAULT_PDF_FILENAME = "design-brief";

