/**
 * Centralized content data for the Design Brief Generator
 * Modify this file to change all website content
 */

export const content = {
  // Header
  header: {
    title: "Landing Page Brief",
    description: "Please fill out the form below. Thank you!",
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
      placeholder: "",
    },
    client: {
      label: "Client Name",
      placeholder: "",
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
    title: "Product Information",
    placeholder: "About the product, service or brand ",
  },

  // Section 2: Objective
  objective: {
    title: "Objective",
    placeholder: "Please provide a brief overview of this landing page project",
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
    title: "Brand and Visual Identity",
    overallStyle: {
      label: "Brand Personality",
      placeholder: "Minimal, Brutalist, Playful...",
    },
    constraints: {
      label: "Tone of Voice",
      placeholder: "How should the copy sound?",
    },
    references: {
      label: "Visual Style Preferences",
      placeholder: "Links to websites or inspiration...",
    },
  },

  // Section 8: Specifications
  specifications: {
    title: "Specifications",
    placeholder: "Headline and Content Sections...",
  },

  // Section 9: Project Schedule
  schedule: {
    title: "Project Schedule (Optional)",
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

