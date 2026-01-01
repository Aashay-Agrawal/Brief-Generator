"use client";

import { Card } from "@/components/ui/card";
import { SectionWrapper } from "./SectionWrapper";
import { MILESTONES } from "@/constants/milestones";
import type { DesignBriefFormData } from "@/types/brief";
import { content } from "@/data/content";

interface ScheduleSectionProps {
  formData: DesignBriefFormData;
  onScheduleChange: (index: number, field: "date" | "notes", value: string) => void;
}

/**
 * Project Schedule Section Component
 * Displays a table of milestones with dates and notes
 */
export function ScheduleSection({ formData, onScheduleChange }: ScheduleSectionProps) {
  return (
    <SectionWrapper number={9} title={content.schedule.title}>
      <Card className="border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 w-1/3">{content.schedule.table.milestone}</th>
                <th className="px-6 py-3 w-40">{content.schedule.table.dueDate}</th>
                <th className="px-6 py-3">{content.schedule.table.notes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {MILESTONES.map((milestone, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-6 py-3 font-medium text-gray-900">{milestone}</td>
                  <td className="px-6 py-3">
                    <input
                      type="date"
                      className="bg-transparent outline-none w-full text-gray-600 font-mono text-xs"
                      value={formData.schedule[i]?.date || ""}
                      onChange={(e) => onScheduleChange(i, "date", e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      placeholder="-"
                      className="bg-transparent outline-none w-full text-gray-600"
                      value={formData.schedule[i]?.notes || ""}
                      onChange={(e) => onScheduleChange(i, "notes", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </SectionWrapper>
  );
}

