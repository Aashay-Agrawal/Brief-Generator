"use client";

import { useState, useRef } from "react";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { usePdfGenerator } from "@/hooks/usePdfGenerator";
import { createEmptyFormData, type DesignBriefFormData, type ScopeType } from "@/types/brief";
import { content, DEFAULT_PDF_FILENAME } from "@/data/content";
import { MILESTONES } from "@/constants/milestones";
import { cn } from "@/lib/utils";

/**
 * Helper component for section wrapper with consistent styling
 */
function SectionWrapper({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <div className="mb-4">
        <h3 className="text-xl font-semibold tracking-tight">
          {number}. {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

/**
 * Main Design Brief Generator Page
 * All sections are consolidated here for easier management
 */
export default function DesignBriefPage() {
  const [formData, setFormData] = useState<DesignBriefFormData>(createEmptyFormData());
  const contentRef = useRef<HTMLDivElement>(null);
  const { generatePDF, isGenerating } = usePdfGenerator();

  const handleChange = (field: keyof DesignBriefFormData, value: string | ScopeType) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Format number with commas (International System format)
   * Example: 1000 -> 1,000, 1000000 -> 1,000,000
   */
  const formatNumberWithCommas = (value: string): string => {
    // Remove all non-digit characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, "");
    
    // Split by decimal point if exists
    const parts = numericValue.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Format integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Combine with decimal part if exists
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  };

  /**
   * Handle budget input change with automatic comma formatting
   */
  const handleBudgetChange = (value: string) => {
    // Remove all non-digit characters except decimal point for processing
    const cleanedValue = value.replace(/[^\d.]/g, "");
    
    // Format with commas
    const formattedValue = formatNumberWithCommas(cleanedValue);
    
    // Update form data with formatted value
    handleChange("budget", formattedValue);
  };

  const handleScheduleChange = (index: number, field: "date" | "notes", value: string) => {
    setFormData((prev) => {
      const newSchedule = [...prev.schedule];
      newSchedule[index] = { ...newSchedule[index], [field]: value };
      return { ...prev, schedule: newSchedule };
    });
  };

  const handleClear = () => {
    if (window.confirm(content.confirmations.clearForm)) {
      setFormData(createEmptyFormData());
      setTimeout(() => {
        const textareas = document.querySelectorAll("textarea");
        textareas.forEach((tx) => {
          (tx as HTMLTextAreaElement).style.height = "auto";
          (tx as HTMLTextAreaElement).style.height = "80px";
        });
      }, 10);
    }
  };

  const handleGeneratePDF = () => {
    generatePDF(contentRef.current, formData.projectName || DEFAULT_PDF_FILENAME);
  };

  const SCOPE_TYPES: ScopeType[] = [
    content.scope.types.newBuild,
    content.scope.types.redesign,
    content.scope.types.landingPage,
  ] as ScopeType[];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Header / Actions */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{content.header.title}</h1>
            <p className="text-muted-foreground mt-1">{content.header.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClear} className="gap-2">
              <Trash2 className="h-4 w-4" />
              {content.buttons.clear}
            </Button>
            <Button onClick={handleGeneratePDF} disabled={isGenerating} className="gap-2 min-w-[140px]">
              {isGenerating ? (
                <>{content.buttons.generating}</>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  {content.buttons.exportPdf}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Document Content */}
        <div className="mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
          <div id="brief-content" ref={contentRef} className="p-8 md:p-12 min-h-screen bg-white overflow-visible">
            
            {/* Brief Header */}
            <div className="space-y-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-100 pb-8">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-gray-800">
                      {content.briefHeader.projectName.label}
                    </Label>
                    <Input
                      name="projectName"
                      value={formData.projectName}
                      onChange={(e) => handleChange("projectName", e.target.value)}
                      placeholder={content.briefHeader.projectName.placeholder}
                      className="text-base font-medium h-auto py-2 px-0 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-gray-800">
                      {content.briefHeader.client.label}
                    </Label>
                    <Input
                      name="clientName"
                      value={formData.clientName}
                      onChange={(e) => handleChange("clientName", e.target.value)}
                      placeholder={content.briefHeader.client.placeholder}
                      className="text-base font-medium h-auto py-2 px-0 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="w-full md:w-64 space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-500">
                      {content.briefHeader.dateSubmitted.label}
                    </Label>
                    <Input
                      type="date"
                      name="dateSubmitted"
                      value={formData.dateSubmitted}
                      onChange={(e) => handleChange("dateSubmitted", e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-500">
                      {content.briefHeader.projectDue.label}
                    </Label>
                    <Input
                      type="date"
                      name="projectDue"
                      value={formData.projectDue}
                      onChange={(e) => handleChange("projectDue", e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* All Sections */}
            <div className="space-y-8">
              
              {/* Section 1: Context & Problem */}
              <SectionWrapper number={1} title={content.context.title}>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea
                      name="context"
                      value={formData.context}
                      onChange={(e) => handleChange("context", e.target.value)}
                      placeholder={content.context.placeholder}
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </SectionWrapper>

              {/* Section 2: Objective */}
              <SectionWrapper number={2} title={content.objective.title}>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea
                      name="objective"
                      value={formData.objective}
                      onChange={(e) => handleChange("objective", e.target.value)}
                      placeholder={content.objective.placeholder}
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </SectionWrapper>

              {/* Section 3: Scope */}
              <SectionWrapper number={3} title={content.scope.title}>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {SCOPE_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleChange("scopeType", type)}
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
                      onChange={(e) => handleChange("scopeDetails", e.target.value)}
                      placeholder={content.scope.placeholder}
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </SectionWrapper>

              {/* Section 4: Deliverables */}
              <SectionWrapper number={4} title={content.deliverables.title}>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea
                      name="deliverables"
                      value={formData.deliverables}
                      onChange={(e) => handleChange("deliverables", e.target.value)}
                      placeholder={content.deliverables.placeholder}
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </SectionWrapper>

              {/* Section 5: Target Audience */}
              <SectionWrapper number={5} title={content.audience.title}>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleChange("targetAudience", e.target.value)}
                      placeholder={content.audience.placeholder}
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[150px]"
                    />
                  </CardContent>
                </Card>
              </SectionWrapper>

              {/* Section 6: Competitors */}
              <SectionWrapper number={6} title={content.competitors.title}>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea
                      name="competitors"
                      value={formData.competitors}
                      onChange={(e) => handleChange("competitors", e.target.value)}
                      placeholder={content.competitors.placeholder}
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[150px]"
                    />
                  </CardContent>
                </Card>
              </SectionWrapper>

              {/* Section 7: Visual Direction */}
              <SectionWrapper number={7} title={content.visualDirection.title}>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">{content.visualDirection.overallStyle.label}</Label>
                        <Input
                          name="visualStyle"
                          value={formData.visualStyle}
                          onChange={(e) => handleChange("visualStyle", e.target.value)}
                          placeholder={content.visualDirection.overallStyle.placeholder}
                          className="bg-white border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">{content.visualDirection.constraints.label}</Label>
                        <Input
                          name="visualConstraints"
                          value={formData.visualConstraints}
                          onChange={(e) => handleChange("visualConstraints", e.target.value)}
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
                        onChange={(e) => handleChange("visualReferences", e.target.value)}
                        placeholder={content.visualDirection.references.placeholder}
                        className="bg-white border-gray-200 min-h-[80px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </SectionWrapper>

              {/* Section 8: Specifications */}
              <SectionWrapper number={8} title={content.specifications.title}>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea
                      name="interactions"
                      value={formData.interactions}
                      onChange={(e) => handleChange("interactions", e.target.value)}
                      placeholder={content.specifications.placeholder}
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </SectionWrapper>

              {/* Section 9: Project Schedule */}
              <SectionWrapper number={9} title={content.schedule.title}>
                <Card className="border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-100 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3">{content.schedule.table.milestone}</th>
                          <th className="px-6 py-3 w-40">{content.schedule.table.dueDate}</th>
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
                                onChange={(e) => handleScheduleChange(i, "date", e.target.value)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </SectionWrapper>

              {/* Section 10 & 11: Budget & Notes Grid */}
              <div className="grid grid-cols-1 gap-8 break-inside-avoid">
                <SectionWrapper number={10} title={content.budget.title}>
                  <Card className="bg-green-50/50 border-green-100 shadow-none">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald-500">$</span>
                        <Input
                          name="budget"
                          type="text"
                          inputMode="decimal"
                          value={formData.budget}
                          onChange={(e) => handleBudgetChange(e.target.value)}
                          placeholder={content.budget.placeholder}
                          className="bg-transparent border-none text-2xl font-bold text-emerald-500 placeholder:text-emerald-500 h-auto py-2 px-0 focus-visible:ring-0 focus:border-none focus:outline-none focus-visible:border-none focus-visible:outline-none flex-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </SectionWrapper>

                <SectionWrapper number={11} title={content.notes.title}>
                  <Card className="bg-gray-50/50 border-gray-100 shadow-none h-full">
                    <CardContent className="pt-6">
                      <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                        placeholder={content.notes.placeholder}
                        className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]"
                      />
                    </CardContent>
                  </Card>
                </SectionWrapper>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
              {content.footer.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
