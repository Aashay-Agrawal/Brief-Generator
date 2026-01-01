/**
 * Type definitions for the Design Brief form data
 */

export interface ScheduleItem {
  date: string;
  notes: string;
}

export type ScopeType = "New Build" | "Redesign" | "Landing Page";

export interface DesignBriefFormData {
  dateSubmitted: string;
  projectDue: string;
  projectName: string;
  clientName: string;
  context: string;
  objective: string;
  scopeType: ScopeType;
  scopeDetails: string;
  deliverables: string;
  targetAudience: string;
  competitors: string;
  visualStyle: string;
  visualReferences: string;
  visualConstraints: string;
  interactions: string;
  cta: string;
  pageCount: string;
  cms: string;
  schedule: ScheduleItem[];
  budget: string;
  notes: string;
}

/**
 * Creates a new empty form data object with default values
 * Note: Default scopeType matches content.scope.types.newBuild
 */
export function createEmptyFormData(): DesignBriefFormData {
  return {
    dateSubmitted: new Date().toISOString().split("T")[0],
    projectDue: "",
    projectName: "",
    clientName: "",
    context: "",
    objective: "",
    scopeType: "New Build", // Must match content.scope.types.newBuild
    scopeDetails: "",
    deliverables: "",
    targetAudience: "",
    competitors: "",
    visualStyle: "",
    visualReferences: "",
    visualConstraints: "",
    interactions: "",
    cta: "",
    pageCount: "",
    cms: "",
    schedule: Array(9).fill(null).map(() => ({ date: "", notes: "" })),
    budget: "",
    notes: "",
  };
}

