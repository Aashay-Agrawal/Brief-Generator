"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface BudgetSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Project Budget Section Component
 */
export function BudgetSection({ formData, onChange }: BudgetSectionProps) {
  return (
    <SectionWrapper number={10} title={content.budget.title}>
      <Card className="bg-green-50/50 border-green-100 shadow-none">
        <CardContent className="pt-6">
          <Input
            name="budget"
            value={formData.budget}
            onChange={(e) => onChange("budget", e.target.value)}
            placeholder={content.budget.placeholder}
            className="bg-transparent border-none text-2xl font-bold text-green-700 placeholder:text-green-300 h-auto py-2 px-0 focus-visible:ring-0"
          />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

