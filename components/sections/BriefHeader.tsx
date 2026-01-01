"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface BriefHeaderProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Brief Header Section Component
 * Displays project name, client name, and date fields
 */
export function BriefHeader({ formData, onChange }: BriefHeaderProps) {
  return (
    <div className="space-y-8 mb-12">
      <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-100 pb-8">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-gray-400">
              {content.briefHeader.projectName.label}
            </Label>
            <Input
              name="projectName"
              value={formData.projectName}
              onChange={(e) => onChange("projectName", e.target.value)}
              placeholder={content.briefHeader.projectName.placeholder}
              className="text-3xl font-bold h-auto py-2 px-0 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-gray-900 placeholder:text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-gray-400">
              {content.briefHeader.client.label}
            </Label>
            <Input
              name="clientName"
              value={formData.clientName}
              onChange={(e) => onChange("clientName", e.target.value)}
              placeholder={content.briefHeader.client.placeholder}
              className="text-lg h-auto py-2 px-0 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-gray-900 placeholder:text-gray-200"
            />
          </div>
        </div>

        <div className="w-full md:w-64 space-y-4 bg-gray-50 p-6 rounded-lg">
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-500">
              {content.briefHeader.dateSubmitted.label}
            </Label>
            <Input
              type="date"
              name="dateSubmitted"
              value={formData.dateSubmitted}
              onChange={(e) => onChange("dateSubmitted", e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-500">
              {content.briefHeader.projectDue.label}
            </Label>
            <Input
              type="date"
              name="projectDue"
              value={formData.projectDue}
              onChange={(e) => onChange("projectDue", e.target.value)}
              className="bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

