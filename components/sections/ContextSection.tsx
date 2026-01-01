"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface ContextSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Context & Problem Section Component
 */
export function ContextSection({ formData, onChange }: ContextSectionProps) {
  return (
    <SectionWrapper number={1} title={content.context.title}>
      <Card className="bg-gray-50/50 border-gray-100 shadow-none">
        <CardContent className="pt-6">
          <Textarea
            name="context"
            value={formData.context}
            onChange={(e) => onChange("context", e.target.value)}
            placeholder={content.context.placeholder}
            className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
          />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

