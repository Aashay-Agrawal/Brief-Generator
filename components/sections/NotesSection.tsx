"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "./SectionWrapper";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface NotesSectionProps {
  formData: DesignBriefFormData;
  onChange: (field: keyof DesignBriefFormData, value: string) => void;
}

/**
 * Additional Notes Section Component
 */
export function NotesSection({ formData, onChange }: NotesSectionProps) {
  return (
    <SectionWrapper number={11} title={content.notes.title}>
      <Card className="bg-yellow-50/50 border-yellow-100 shadow-none h-full">
        <CardContent className="pt-6">
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder={content.notes.placeholder}
            className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
          />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

