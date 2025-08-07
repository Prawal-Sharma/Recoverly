# Development Documentation

## Overview

Recoverly is built with modern web technologies focusing on performance, accessibility, and user experience. This document outlines our development practices, architecture decisions, and implementation patterns.

## Architecture Decisions

### Why Next.js 14?
- **App Router** for better performance and layouts
- **Server Components** by default for faster page loads
- **Built-in SEO** optimization
- **TypeScript** support out of the box
- **Vercel deployment** integration

### Why Tailwind CSS + shadcn/ui?
- **Utility-first** for rapid development
- **Component library** that we own and can customize
- **Accessibility** built into components
- **Dark mode** support
- **Tree-shakeable** - only ship what we use

### Why Supabase?
- **PostgreSQL** for relational data
- **Real-time** subscriptions if needed
- **Authentication** built-in
- **Row Level Security** for data protection
- **Generous free tier**

## Project Structure

```
recoverly/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth group routes
│   ├── programs/          # Program pages
│   │   ├── page.tsx       # Program listing
│   │   └── [id]/          # Dynamic program pages
│   ├── meetings/          # Meeting finder
│   ├── resources/         # Resource pages
│   │   ├── crisis/        # Crisis resources
│   │   ├── family/        # Family support
│   │   └── coping/        # Coping strategies
│   ├── quiz/              # Assessment quiz
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            
│   ├── ui/                # shadcn/ui components
│   ├── navigation.tsx     # Main nav
│   ├── footer.tsx         # Site footer
│   └── [feature]/         # Feature components
├── lib/                   
│   ├── utils.ts           # Helper functions
│   ├── programs-data.ts   # Program information
│   └── constants.ts       # App constants
├── public/                # Static assets
└── docs/                  # Documentation
```

## Component Patterns

### Server vs Client Components

**Server Components (default):**
- Data fetching
- Static content
- SEO-critical pages

```tsx
// app/programs/page.tsx
export default async function ProgramsPage() {
  const programs = await getPrograms() // Server-side
  return <ProgramList programs={programs} />
}
```

**Client Components:**
- Interactive elements
- Browser APIs
- State management

```tsx
// components/quiz/quiz-form.tsx
"use client"
import { useState } from 'react'

export function QuizForm() {
  const [step, setStep] = useState(0)
  // Interactive logic
}
```

### Data Fetching Patterns

**Static Data:**
```tsx
// lib/programs-data.ts
export const programs: Program[] = [
  // Static program information
]
```

**Dynamic Data (Future):**
```tsx
// When Supabase is configured
import { createClient } from '@/lib/supabase'

export async function getMeetings() {
  const supabase = createClient()
  const { data } = await supabase
    .from('meetings')
    .select('*')
  return data
}
```

## Styling Guidelines

### Tailwind Classes Order
1. Layout (flex, grid)
2. Spacing (p-, m-)
3. Sizing (w-, h-)
4. Typography (text-, font-)
5. Colors (bg-, text-)
6. Borders (border-, rounded-)
7. Effects (shadow-, opacity-)

### Component Styling
```tsx
// Use cn() for conditional classes
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes"
)} />
```

## State Management

### Local State
- useState for component state
- useReducer for complex state
- localStorage for persistence

### Global State (Future)
- Zustand for client state
- Server state via Next.js caching

## API Design

### Route Handlers
```tsx
// app/api/programs/route.ts
export async function GET() {
  // Handle GET requests
}

export async function POST(request: Request) {
  // Handle POST requests
}
```

### API Response Format
```json
{
  "success": true,
  "data": {...},
  "error": null
}
```

## Database Schema (Future)

```sql
-- Programs table
CREATE TABLE programs (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  approach TEXT,
  description TEXT,
  created_at TIMESTAMP
);

-- Meetings table  
CREATE TABLE meetings (
  id UUID PRIMARY KEY,
  program_id UUID REFERENCES programs(id),
  name TEXT,
  location JSONB,
  schedule JSONB,
  online BOOLEAN
);

-- User preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY,
  user_id UUID,
  saved_programs JSONB,
  quiz_results JSONB
);
```

## Testing Strategy

### Unit Tests (Future)
```tsx
// __tests__/components/quiz.test.tsx
import { render, screen } from '@testing-library/react'
import { QuizForm } from '@/components/quiz'

test('renders quiz form', () => {
  render(<QuizForm />)
  expect(screen.getByText('Start Quiz')).toBeInTheDocument()
})
```

### E2E Tests (Future)
- Playwright for critical user paths
- Test quiz flow
- Test meeting search
- Test program comparison

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Lazy loading by default
- WebP format when possible

### Code Splitting
- Dynamic imports for heavy components
- Route-based splitting automatic

### Caching Strategy
- Static pages cached at edge
- API responses cached appropriately
- localStorage for user preferences

## Accessibility Checklist

- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Color contrast (4.5:1 minimum)
- [ ] Screen reader testing
- [ ] Reduced motion support

## Deployment Process

### Local Development
```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # Run linter
```

### Staging (Future)
- Preview deployments on Vercel
- Test with production data copy

### Production
```bash
# Automatic deployment on main branch
git push origin main
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=
```

## Security Considerations

- Input validation on all forms
- SQL injection prevention (Supabase)
- XSS protection (React default)
- HTTPS only in production
- Secure headers via Next.js

## Monitoring & Analytics (Future)

- Vercel Analytics for performance
- Error tracking with Sentry
- User analytics (with consent)
- Uptime monitoring

## Contributing Workflow

1. **Setup:**
   ```bash
   git clone <repo>
   npm install
   npm run dev
   ```

2. **Branch naming:**
   - `feature/quiz-implementation`
   - `fix/navigation-mobile`
   - `docs/update-readme`

3. **Commit messages:**
   - Present tense
   - Descriptive
   - Reference issues

4. **Pull Request:**
   - Clear description
   - Screenshots if UI changes
   - Test on mobile
   - Update docs if needed

## Common Tasks

### Adding a New Program
1. Update `lib/programs-data.ts`
2. Add program details
3. Test program page
4. Update documentation

### Adding a Resource Page
1. Create page in `app/resources/[topic]`
2. Add navigation link
3. Create content component
4. Add to sitemap

### Updating Components
1. Check shadcn/ui for updates
2. Test component changes
3. Update across app
4. Document changes

## Troubleshooting

### Common Issues

**Build fails:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Type errors:**
```bash
npm run typecheck
```

**Linting issues:**
```bash
npm run lint -- --fix
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

Last updated: January 2025