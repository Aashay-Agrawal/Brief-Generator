"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface ObjectiveSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Objective Section Component
 */
export function ObjectiveSection({ formData, onChange }: ObjectiveSectionProps) {
  return (
    <SectionWrapper number={2} title={content.objective.title}>
      <Card className="bg-gray-50/50 border-gray-100 shadow-none">
        <CardContent className="pt-6">
          <Textarea
            name="objective"
            value={formData.objective}
            onChange={(e) => onChange("objective", e.target.value)}
            placeholder={content.objective.placeholder}
            className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
          />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

