"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface CompetitorsSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Competitors Section Component
 */
export function CompetitorsSection({ formData, onChange }: CompetitorsSectionProps) {
  return (
    <SectionWrapper number={6} title={content.competitors.title}>
      <Card className="bg-gray-50/50 border-gray-100 shadow-none h-full">
        <CardContent className="pt-6">
          <Textarea
            name="competitors"
            value={formData.competitors}
            onChange={(e) => onChange("competitors", e.target.value)}
            placeholder={content.competitors.placeholder}
            className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[150px]"
          />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

