import React, { useState, useRef, useEffect } from 'react';
import { Download, Trash2, Calendar, Check, Circle, Plus, X, ChevronDown } from 'lucide-react';

/**
 * UTILITIES
 * Simulating the 'cn' utility from shadcn for class merging
 */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * UI COMPONENTS
 * Re-creating Shadcn UI components using Tailwind CSS
 */

const Card = ({ className, ...props }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm bg-white", className)} {...props} />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <div className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);

const CardDescription = ({ className, ...props }) => (
  <div className={cn("text-sm text-muted-foreground text-gray-500", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const Label = ({ className, ...props }) => (
  <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900", className)} {...props} />
);

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 focus-visible:ring-gray-900 placeholder:text-gray-400",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  // Auto-resize logic attached to ref
  const internalRef = useRef(null);
  
  const handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    if(props.onInput) props.onInput(e);
  };

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 focus-visible:ring-gray-900 placeholder:text-gray-400 resize-none overflow-hidden",
        className
      )}
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      onInput={handleInput}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90",
    destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-gray-900 underline-offset-4 hover:underline",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Separator = ({ className, ...props }) => (
  <div className={cn("shrink-0 bg-gray-200 h-[1px] w-full my-6", className)} {...props} />
);

/**
 * MAIN APP COMPONENT
 */
export default function DesignBriefApp() {
  const [formData, setFormData] = useState({
    dateSubmitted: new Date().toISOString().split('T')[0],
    projectDue: '',
    projectName: '',
    clientName: '',
    context: '',
    objective: '',
    scopeType: 'New Build', // New Build, Redesign, Landing Page
    scopeDetails: '',
    deliverables: '',
    targetAudience: '',
    competitors: '',
    visualStyle: '',
    visualReferences: '',
    visualConstraints: '',
    interactions: '',
    cta: '',
    pageCount: '',
    cms: '',
    schedule: Array(9).fill({ date: '', notes: '' }),
    budget: '',
    notes: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef(null);

  // Load html2pdf script dynamically
  useEffect(() => {
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setFormData(prev => ({ ...prev, schedule: newSchedule }));
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the entire form?")) {
      setFormData({
        dateSubmitted: new Date().toISOString().split('T')[0],
        projectDue: '',
        projectName: '',
        clientName: '',
        context: '',
        objective: '',
        scopeType: 'New Build',
        scopeDetails: '',
        deliverables: '',
        targetAudience: '',
        competitors: '',
        visualStyle: '',
        visualReferences: '',
        visualConstraints: '',
        interactions: '',
        cta: '',
        pageCount: '',
        cms: '',
        schedule: Array(9).fill({ date: '', notes: '' }),
        budget: '',
        notes: ''
      });
      // Reset textarea heights
      setTimeout(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(tx => {
           tx.style.height = 'auto';
           tx.style.height = '80px'; // Reset to min-height
        });
      }, 10);
    }
  };

  const generatePDF = () => {
    if (!window.html2pdf) {
      alert("PDF Generator is still loading, please try again in a moment.");
      return;
    }
    
    setIsGenerating(true);
    const element = contentRef.current;
    
    // Ensure all textareas are sized correctly before print
    const textareas = element.querySelectorAll('textarea');
    textareas.forEach(tx => {
        tx.style.height = 'auto';
        tx.style.height = tx.scrollHeight + 'px';
    });

    const opt = {
      margin: 0.5,
      filename: `${formData.projectName || 'design-brief'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    window.html2pdf().set(opt).from(element).save().then(() => {
      setIsGenerating(false);
    });
  };

  const milestones = [
    "Kickoff meeting",
    "Final creative brief due",
    "Copy, first draft",
    "Copy review and feedback",
    "Copy, final draft",
    "Design, first layout",
    "Layout review and feedback",
    "Final layout review",
    "Final delivery"
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        
        {/* Header / Intro */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Design Brief Generator</h1>
            <p className="text-muted-foreground mt-1">Create comprehensive design briefs with style.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClear} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
            <Button onClick={generatePDF} disabled={isGenerating} className="gap-2 min-w-[140px]">
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Document Content */}
        <div className="mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
          <div id="brief-content" ref={contentRef} className="p-8 md:p-12 min-h-screen bg-white">
            
            {/* Brief Header */}
            <div className="space-y-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-100 pb-8">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-gray-400">Project Name</Label>
                    <Input 
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      placeholder="e.g. Website Redesign 2024" 
                      className="text-3xl font-bold h-auto py-2 px-0 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-gray-900 placeholder:text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-gray-400">Client</Label>
                    <Input 
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="Client Name & Contact Info" 
                      className="text-lg h-auto py-2 px-0 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-gray-900 placeholder:text-gray-200"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-64 space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-500">Date Submitted</Label>
                    <Input 
                      type="date" 
                      name="dateSubmitted"
                      value={formData.dateSubmitted}
                      onChange={handleChange}
                      className="bg-white" 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-500">Project Due</Label>
                    <Input 
                      type="date" 
                      name="projectDue"
                      value={formData.projectDue}
                      onChange={handleChange}
                      className="bg-white" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              
              {/* Context */}
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">1</span>
                  <h3 className="text-xl font-semibold tracking-tight">Context & Problem</h3>
                </div>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea 
                      name="context"
                      value={formData.context}
                      onChange={handleChange}
                      placeholder="Briefly describe the market situation and opportunity. What are we trying to achieve?" 
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]" 
                    />
                  </CardContent>
                </Card>
              </section>

              {/* Objective */}
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">2</span>
                  <h3 className="text-xl font-semibold tracking-tight">Objective</h3>
                </div>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea 
                      name="objective"
                      value={formData.objective}
                      onChange={handleChange}
                      placeholder="What exactly should this website achieve? (e.g., generate leads, build credibility)" 
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]" 
                    />
                  </CardContent>
                </Card>
              </section>

              {/* Scope */}
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">3</span>
                  <h3 className="text-xl font-semibold tracking-tight">Scope</h3>
                </div>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {['New Build', 'Redesign', 'Landing Page'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData(prev => ({ ...prev, scopeType: type }))}
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
                      onChange={handleChange}
                      placeholder="Details: Key issues to fix, elements to retain, or specific landing page requirements..." 
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]" 
                    />
                  </CardContent>
                </Card>
              </section>

              {/* Deliverables */}
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">4</span>
                  <h3 className="text-xl font-semibold tracking-tight">Deliverables</h3>
                </div>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6">
                    <Textarea 
                      name="deliverables"
                      value={formData.deliverables}
                      onChange={handleChange}
                      placeholder="List exact outputs (e.g., Pages, Design System, Assets)..." 
                      className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]" 
                    />
                  </CardContent>
                </Card>
              </section>

              {/* Audience & Competitors Grid */}
              <div className="grid grid-cols-1 gap-8 break-inside-avoid">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">5</span>
                    <h3 className="text-xl font-semibold tracking-tight">Target Audience</h3>
                  </div>
                  <Card className="bg-gray-50/50 border-gray-100 shadow-none h-full">
                    <CardContent className="pt-6">
                      <Textarea 
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleChange}
                        placeholder="Who are we talking to?" 
                        className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[150px]" 
                      />
                    </CardContent>
                  </Card>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">6</span>
                    <h3 className="text-xl font-semibold tracking-tight">Competitors</h3>
                  </div>
                  <Card className="bg-gray-50/50 border-gray-100 shadow-none h-full">
                    <CardContent className="pt-6">
                      <Textarea 
                        name="competitors"
                        value={formData.competitors}
                        onChange={handleChange}
                        placeholder="List 3-5 competitors..." 
                        className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[150px]" 
                      />
                    </CardContent>
                  </Card>
                </section>
              </div>

              {/* Visual Direction */}
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">7</span>
                  <h3 className="text-xl font-semibold tracking-tight">Visual Direction</h3>
                </div>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-muted-foreground">Overall Style</Label>
                            <Input 
                                name="visualStyle"
                                value={formData.visualStyle}
                                onChange={handleChange}
                                placeholder="Minimal, Brutalist, Playful..." 
                                className="bg-white border-gray-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-muted-foreground">Constraints</Label>
                            <Input 
                                name="visualConstraints"
                                value={formData.visualConstraints}
                                onChange={handleChange}
                                placeholder="Brand guides, specific colors..." 
                                className="bg-white border-gray-200"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-muted-foreground">References</Label>
                        <Textarea 
                            name="visualReferences"
                            value={formData.visualReferences}
                            onChange={handleChange}
                            placeholder="Links to websites or inspiration..." 
                            className="bg-white border-gray-200 min-h-[80px]" 
                        />
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Technical Specifications */}
              <section className="break-inside-avoid">
                 <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">8</span>
                  <h3 className="text-xl font-semibold tracking-tight">Specifications</h3>
                </div>
                <Card className="bg-gray-50/50 border-gray-100 shadow-none">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Interactions & Motion</Label>
                                <Input 
                                    name="interactions"
                                    value={formData.interactions}
                                    onChange={handleChange}
                                    placeholder="Smooth scroll, Rive, Hover states..." 
                                    className="bg-white border-gray-200"
                                />
                            </div>
                             <div className="space-y-2">
                                <Label className="text-muted-foreground">Call to Action</Label>
                                <Input 
                                    name="cta"
                                    value={formData.cta}
                                    onChange={handleChange}
                                    placeholder="Book demo, Buy now..." 
                                    className="bg-white border-gray-200"
                                />
                            </div>
                             <div className="space-y-2">
                                <Label className="text-muted-foreground">Page Count (Est.)</Label>
                                <Input 
                                    name="pageCount"
                                    value={formData.pageCount}
                                    onChange={handleChange}
                                    placeholder="5-10 pages" 
                                    className="bg-white border-gray-200"
                                />
                            </div>
                             <div className="space-y-2">
                                <Label className="text-muted-foreground">CMS Platform</Label>
                                <Input 
                                    name="cms"
                                    value={formData.cms}
                                    onChange={handleChange}
                                    placeholder="Webflow, WordPress, Custom..." 
                                    className="bg-white border-gray-200"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
              </section>

              {/* Schedule */}
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">9</span>
                  <h3 className="text-xl font-semibold tracking-tight">Project Schedule</h3>
                </div>
                <Card className="border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-500 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 w-1/3">Milestone</th>
                                    <th className="px-6 py-3 w-40">Due Date</th>
                                    <th className="px-6 py-3">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {milestones.map((milestone, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-3 font-medium text-gray-900">{milestone}</td>
                                        <td className="px-6 py-3">
                                            <input 
                                                type="date" 
                                                className="bg-transparent outline-none w-full text-gray-600 font-mono text-xs"
                                                value={formData.schedule[i]?.date || ''}
                                                onChange={(e) => handleScheduleChange(i, 'date', e.target.value)}
                                            />
                                        </td>
                                        <td className="px-6 py-3">
                                            <input 
                                                type="text" 
                                                placeholder="-"
                                                className="bg-transparent outline-none w-full text-gray-600"
                                                value={formData.schedule[i]?.notes || ''}
                                                onChange={(e) => handleScheduleChange(i, 'notes', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
              </section>

              {/* Budget & Notes */}
              <div className="grid grid-cols-1 gap-8 break-inside-avoid">
                 <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">10</span>
                        <h3 className="text-xl font-semibold tracking-tight">Project Budget</h3>
                    </div>
                    <Card className="bg-green-50/50 border-green-100 shadow-none">
                        <CardContent className="pt-6">
                            <Input 
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="$0.00" 
                                className="bg-transparent border-none text-2xl font-bold text-green-700 placeholder:text-green-300 h-auto py-2 px-0 focus-visible:ring-0"
                            />
                        </CardContent>
                    </Card>
                </section>
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">11</span>
                        <h3 className="text-xl font-semibold tracking-tight">Additional Notes</h3>
                    </div>
                    <Card className="bg-yellow-50/50 border-yellow-100 shadow-none h-full">
                         <CardContent className="pt-6">
                            <Textarea 
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Any other details..." 
                                className="bg-transparent border-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[100px]" 
                            />
                        </CardContent>
                    </Card>
                </section>
              </div>

            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
                Generated via Shadcn Design Brief Tool
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}