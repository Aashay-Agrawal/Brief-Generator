"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface SpecificationsSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Technical Specifications Section Component
 */
export function SpecificationsSection({ formData, onChange }: SpecificationsSectionProps) {
  return (
    <SectionWrapper number={8} title={content.specifications.title}>
      <Card className="bg-gray-50/50 border-gray-100 shadow-none">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">{content.specifications.interactions.label}</Label>
              <Input
                name="interactions"
                value={formData.interactions}
                onChange={(e) => onChange("interactions", e.target.value)}
                placeholder={content.specifications.interactions.placeholder}
                className="bg-white border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">{content.specifications.cta.label}</Label>
              <Input
                name="cta"
                value={formData.cta}
                onChange={(e) => onChange("cta", e.target.value)}
                placeholder={content.specifications.cta.placeholder}
                className="bg-white border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">{content.specifications.pageCount.label}</Label>
              <Input
                name="pageCount"
                value={formData.pageCount}
                onChange={(e) => onChange("pageCount", e.target.value)}
                placeholder={content.specifications.pageCount.placeholder}
                className="bg-white border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">{content.specifications.cms.label}</Label>
              <Input
                name="cms"
                value={formData.cms}
                onChange={(e) => onChange("cms", e.target.value)}
                placeholder={content.specifications.cms.placeholder}
                className="bg-white border-gray-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

