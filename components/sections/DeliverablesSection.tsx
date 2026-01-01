"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface DeliverablesSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Deliverables Section Component
 */
export function DeliverablesSection({ formData, onChange }: DeliverablesSectionProps) {
  return (
    <SectionWrapper number={4} title={content.deliverables.title}>
      <Card className="bg-gray-50/50 border-gray-100 shadow-none">
        <CardContent className="pt-6">
          <Textarea
            name="deliverables"
            value={formData.deliverables}
            onChange={(e) => onChange("deliverables", e.target.value)}
            placeholder={content.deliverables.placeholder}
            className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
          />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

