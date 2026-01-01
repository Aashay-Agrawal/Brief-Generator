"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface AudienceSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Target Audience Section Component
 */
export function AudienceSection({ formData, onChange }: AudienceSectionProps) {
  return (
    <SectionWrapper number={5} title={content.audience.title}>
      <Card className="bg-gray-50/50 border-gray-100 shadow-none h-full">
        <CardContent className="pt-6">
          <Textarea
            name="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => onChange("targetAudience", e.target.value)}
            placeholder={content.audience.placeholder}
            className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[150px]"
          />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

