# Design Brief Generator

A modern, comprehensive design brief generator built with Next.js, TypeScript, and shadcn/ui.

## Features

- ✨ Clean, modular component architecture
- 🎨 Beautiful UI with shadcn/ui components
- 📄 PDF export functionality
- 📝 11 editable sections for comprehensive briefs
- 🔄 Auto-resizing textareas
- 💾 Form state management

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind setup
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── sections/            # Individual section components
│   │   ├── BriefHeader.tsx
│   │   ├── ContextSection.tsx
│   │   ├── ObjectiveSection.tsx
│   │   ├── ScopeSection.tsx
│   │   ├── DeliverablesSection.tsx
│   │   ├── AudienceSection.tsx
│   │   ├── CompetitorsSection.tsx
│   │   ├── VisualDirectionSection.tsx
│   │   ├── SpecificationsSection.tsx
│   │   ├── ScheduleSection.tsx
│   │   ├── BudgetSection.tsx
│   │   ├── NotesSection.tsx
│   │   └── SectionWrapper.tsx
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── separator.tsx
│       └── textarea.tsx
├── hooks/
│   └── usePdfGenerator.ts   # PDF generation hook
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── brief.ts             # TypeScript type definitions
└── constants/
    └── milestones.ts        # Project milestones

```

## Component Architecture

Each section is a self-contained, editable component that:
- Receives form data and onChange handlers as props
- Maintains consistent styling through `SectionWrapper`
- Is fully typed with TypeScript
- Follows clean code principles

## Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **lucide-react** - Icons
- **html2pdf.js** - PDF generation

## License

ISC

