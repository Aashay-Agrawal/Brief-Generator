"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface VisualDirectionSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Visual Direction Section Component
 */
export function VisualDirectionSection({ formData, onChange }: VisualDirectionSectionProps) {
  return (
    <SectionWrapper number={7} title={content.visualDirection.title}>
      <Card className="bg-gray-50/50 border-gray-100 shadow-none">
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">{content.visualDirection.overallStyle.label}</Label>
              <Input
                name="visualStyle"
                value={formData.visualStyle}
                onChange={(e) => onChange("visualStyle", e.target.value)}
                placeholder={content.visualDirection.overallStyle.placeholder}
                className="bg-white border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">{content.visualDirection.constraints.label}</Label>
              <Input
                name="visualConstraints"
                value={formData.visualConstraints}
                onChange={(e) => onChange("visualConstraints", e.target.value)}
                placeholder={content.visualDirection.constraints.placeholder}
                className="bg-white border-gray-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">{content.visualDirection.references.label}</Label>
            <Textarea
              name="visualReferences"
              value={formData.visualReferences}
              onChange={(e) => onChange("visualReferences", e.target.value)}
              placeholder={content.visualDirection.references.placeholder}
              className="bg-white border-gray-200 min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

