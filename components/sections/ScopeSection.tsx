"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SectionWrapper } from "./SectionWrapper";
import { cn } from "@/lib/utils";
import type { DesignBriefFormData, ScopeType } from "@/types/brief";
import { content } from "@/data/content";

interface ScopeSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string | ScopeType) => void;
}

const SCOPE_TYPES: ScopeType[] = [
  content.scope.types.newBuild,
  content.scope.types.redesign,
  content.scope.types.landingPage,
] as ScopeType[];

/**
 * Scope Section Component
 * Allows selection of scope type and details
 */
export function ScopeSection({ formData, onChange }: ScopeSectionProps) {
  return (
    <SectionWrapper number={3} title={content.scope.title}>
      <Card className="bg-gray-50/50 border-gray-100 shadow-none">
        <CardContent className="pt-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            {SCOPE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onChange("scopeType", type)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  formData.scopeType === type
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <Separator className="bg-gray-200" />
          <Textarea
            name="scopeDetails"
            value={formData.scopeDetails}
            onChange={(e) => onChange("scopeDetails", e.target.value)}
            placeholder={content.scope.placeholder}
            className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
          />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

