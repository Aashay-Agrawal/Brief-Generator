# Content Data File

The `content.ts` file is the central location for all website content. Modify this file to change any text, labels, placeholders, or messages throughout the application.

## Location

`/data/content.ts`

## What Can Be Changed

### Header & Navigation
- Page title
- Page description
- Button labels (Clear, Export PDF, etc.)

### Form Sections
- Section titles (Context, Objective, Scope, etc.)
- Field labels
- Input placeholders
- Help text

### Messages
- Confirmation dialogs
- Error messages
- Success messages

### Footer
- Footer text

## How to Modify

1. Open `/data/content.ts`
2. Find the section you want to modify
3. Update the text value
4. Save the file
5. The changes will automatically appear throughout the application

## Example

To change the page title:

```typescript
export const content = {
  header: {
    title: "My Custom Brief Generator", // Change this
    description: "Create comprehensive design briefs with style.",
  },
  // ... rest of content
}
```

## Structure

The content object is organized by section:
- `header` - Page header content
- `buttons` - Button labels
- `briefHeader` - Brief header section fields
- `context` - Context section
- `objective` - Objective section
- `scope` - Scope section (including scope types)
- `deliverables` - Deliverables section
- `audience` - Target audience section
- `competitors` - Competitors section
- `visualDirection` - Visual direction section
- `specifications` - Technical specifications
- `schedule` - Project schedule
- `budget` - Budget section
- `notes` - Additional notes
- `footer` - Footer text
- `confirmations` - Confirmation and error messages

## Notes

- All text is centralized here for easy maintenance
- Changes require a rebuild/restart of the dev server
- TypeScript will catch any typos or missing properties
- The structure matches the component hierarchy for easy navigation

