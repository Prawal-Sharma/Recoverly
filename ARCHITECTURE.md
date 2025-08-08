# Recoverly Architecture Overview 🏗️

> A technical deep-dive into how Recoverly is built. This doc is for developers who want to understand the structure, patterns, and decisions behind the platform.

## High-Level Architecture

```
┌──────────────────────────────────────────────────┐
│                   Browser                        │
│  ┌────────────────────────────────────────────┐ │
│  │          Next.js 14 App (React)            │ │
│  │  ┌──────────────────────────────────────┐  │ │
│  │  │   Pages (App Router)                 │  │ │
│  │  │   Components (shadcn/ui)             │  │ │
│  │  │   Hooks (Custom React Hooks)         │  │ │
│  │  └──────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────┐  │ │
│  │  │   Client State (useState, useEffect) │  │ │
│  │  │   Local Storage (Persistence)        │  │ │
│  │  └──────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────┐
│              Vercel Edge Network                 │
│         (CDN, Edge Functions, Analytics)         │
└──────────────────────────────────────────────────┘
```

## Tech Stack Breakdown

### Frontend Framework
**Next.js 14 with App Router**
- Server Components for static content
- Client Components for interactivity
- Automatic code splitting
- Built-in SEO optimization
- Image optimization with next/image

### Language & Type Safety
**TypeScript (Strict Mode)**
```typescript
// Example type definition
interface RecoveryProgram {
  id: string
  name: string
  approach: 'spiritual' | 'secular' | 'religious'
  founded: number
  // ... etc
}
```

### Styling System
**Tailwind CSS + shadcn/ui**
- Utility-first CSS for rapid development
- Component library with accessibility built-in
- Custom design tokens in tailwind.config.js
- CSS-in-JS avoided for performance

### State Management
**Local State + localStorage**
- No external state library (Redux, Zustand, etc)
- React hooks for component state
- localStorage for persistence
- No backend database by design

## Directory Structure

```
recoverly/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Page routes
│   │   ├── programs/        # /programs/* pages
│   │   ├── resources/       # /resources/* pages
│   │   ├── quiz/           # Quiz feature
│   │   └── ...             # Other routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
│
├── components/              # Reusable Components
│   ├── ui/                 # shadcn/ui components
│   ├── navigation.tsx      # Main nav
│   ├── footer.tsx          # Site footer
│   └── ...                 # Feature components
│
├── lib/                     # Utilities & Data
│   ├── programs-data.ts    # Program database
│   ├── quiz-data.ts        # Quiz logic
│   ├── meetings-data.ts    # Meetings database
│   └── utils.ts            # Helper functions
│
├── hooks/                   # Custom React Hooks
│   └── use-local-storage.ts
│
└── public/                  # Static Assets
    └── images/
```

## Key Design Patterns

### 1. Server vs Client Components
```typescript
// Server Component (default)
// app/programs/page.tsx
export default function ProgramsPage() {
  // Runs on server, great for SEO
  return <div>...</div>
}

// Client Component (interactive)
// "use client" directive required
"use client"
export default function SobrietyTracker() {
  const [days, setDays] = useState(0)
  // Runs in browser, handles interactivity
}
```

### 2. Data Management Pattern
```typescript
// Static data in TypeScript files
// lib/programs-data.ts
export const programs: RecoveryProgram[] = [
  {
    id: 'aa',
    name: 'Alcoholics Anonymous',
    // ... comprehensive data
  }
]

// Local storage for user data
const [userData, setUserData] = useLocalStorage('userData', {})
```

### 3. Component Composition
```typescript
// Composable components with shadcn/ui
<Card>
  <CardHeader>
    <CardTitle>Recovery Tool</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Tool content */}
  </CardContent>
</Card>
```

### 4. Responsive Design Pattern
```tsx
// Mobile-first with Tailwind
<div className="
  p-4           // Default (mobile)
  md:p-6        // Tablet and up
  lg:p-8        // Desktop and up
">
```

## Core Features Implementation

### Quiz System Architecture
```typescript
// Scoring algorithm
interface QuizResult {
  recommendedPrograms: string[]
  recommendedTools: string[]
  scores: {
    spiritual: number
    secular: number
    // ... other dimensions
  }
}

// Multi-dimensional scoring
const calculateScore = (answers: Answers): QuizResult => {
  // Weight answers across multiple dimensions
  // Return sorted recommendations
}
```

### Interactive Tools Pattern
Each tool follows this structure:
1. **Page Component** - Route handler
2. **State Management** - useState/useReducer
3. **Persistence** - localStorage integration
4. **Validation** - Input sanitization
5. **Accessibility** - ARIA labels, keyboard nav

Example: Thought Record Tool
```typescript
"use client"
function ThoughtRecordTool() {
  const [entries, setEntries] = useLocalStorage('thoughtRecords', [])
  
  const addEntry = (entry: ThoughtRecord) => {
    // Validation
    if (!entry.thought) return
    
    // State update
    setEntries([...entries, entry])
    
    // Accessibility announcement
    announceToScreenReader('Entry added')
  }
}
```

### Navigation System
- Responsive mega-menu for desktop
- Hamburger menu for mobile
- Keyboard navigation support
- ARIA labels throughout
- Skip links for accessibility

## Performance Optimizations

### Code Splitting
- Automatic with Next.js App Router
- Dynamic imports for heavy components
- Route-based splitting

### Image Optimization
```tsx
import Image from 'next/image'

<Image 
  src="/hero.jpg"
  alt="Recovery journey"
  width={1200}
  height={600}
  priority // Load immediately for above-fold
/>
```

### Bundle Size Management
- Tree shaking with Next.js
- No unnecessary dependencies
- shadcn/ui copies only used components
- Tailwind purges unused CSS

### Loading Strategy
1. Server-side render static content
2. Progressive enhancement for interactivity
3. Lazy load below-fold content
4. Prefetch likely navigation targets

## Accessibility Architecture

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader announcements

### Implementation Examples
```tsx
// Skip link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>

// Live regions for announcements
<div role="status" aria-live="polite" aria-atomic="true">
  {announcement}
</div>

// Proper form labels
<label htmlFor="days-sober">Days Sober</label>
<input id="days-sober" type="number" />
```

### Mobile Accessibility
- 44px minimum touch targets
- Proper spacing between interactive elements
- Large, readable fonts (min 16px)
- High contrast ratios (4.5:1 minimum)

## Security Considerations

### Data Privacy
- **No backend database** - All data stays local
- **No analytics tracking** - Complete privacy
- **No cookies** - Except functional localStorage
- **No user accounts** - Anonymous by design

### Input Validation
```typescript
// Sanitize all user inputs
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script>/gi, '') // Remove scripts
    .slice(0, MAX_LENGTH)       // Limit length
}
```

### Content Security Policy
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'"
  }
]
```

## Development Workflow

### Local Development
```bash
npm run dev     # Start Next.js dev server
npm run build   # Production build
npm run lint    # ESLint checks
npm run type-check # TypeScript validation
```

### Git Workflow
```
main (production)
  ├── feature/new-tool
  ├── fix/accessibility-issue
  └── docs/update-readme
```

### Testing Strategy
- Manual testing for UI/UX
- TypeScript for type safety
- ESLint for code quality
- Lighthouse for performance/accessibility
- Real device testing for mobile

## Deployment Architecture

### Vercel Platform
- Automatic deployments from GitHub
- Edge network distribution
- Serverless functions (if needed)
- Automatic HTTPS
- Preview deployments for PRs

### Environment Configuration
```bash
# .env.local (not used currently)
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Build Process
1. GitHub push triggers webhook
2. Vercel builds Next.js app
3. Static assets deployed to CDN
4. Edge functions deployed globally
5. Domain routing updated

## Monitoring & Maintenance

### Performance Monitoring
- Vercel Analytics (optional)
- Lighthouse CI (could add)
- Real User Monitoring (privacy-preserving)

### Error Handling
```typescript
// Error boundary for React
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error) {
    // Log error (locally only)
    console.error('App error:', error)
  }
}
```

### Update Strategy
- Dependabot for dependency updates
- Manual review of major updates
- Staged rollouts for big changes
- User feedback via GitHub issues

## Scaling Considerations

### Current Scale
- ~100s of daily users
- ~10MB total bundle size
- ~2 second load time
- 100% client-side processing

### Future Scale Planning
If we hit 10,000+ daily users:
1. Add CDN caching headers
2. Implement service worker for offline
3. Consider edge functions for API
4. Add database for shared features
5. Implement request rate limiting

## Architecture Decisions Record

### Why Next.js?
- **Chosen**: Best-in-class React framework
- **Alternative considered**: Plain React
- **Reason**: SEO, performance, developer experience

### Why No Backend?
- **Chosen**: Client-only with localStorage
- **Alternative considered**: Supabase, Firebase
- **Reason**: Privacy, simplicity, no maintenance

### Why shadcn/ui?
- **Chosen**: Copy-paste component library
- **Alternative considered**: Material-UI, Chakra
- **Reason**: Accessibility, customization, no lock-in

### Why Tailwind?
- **Chosen**: Utility-first CSS
- **Alternative considered**: CSS Modules, Emotion
- **Reason**: Speed, consistency, small bundle

## Contributing Architecture

### Adding a New Feature
1. Design data structure
2. Create TypeScript types
3. Build server component for display
4. Add client component for interaction
5. Integrate with existing navigation
6. Test accessibility
7. Verify mobile experience

### Code Standards
```typescript
// Use functional components
const Component: FC<Props> = ({ prop }) => { }

// Prefer composition
<Card><CardContent>...</CardContent></Card>

// Handle loading states
if (loading) return <Skeleton />

// Always handle errors
try { } catch (error) { }
```

## Future Architecture Considerations

### Progressive Web App
- Service worker for offline
- Web app manifest
- Push notifications (optional)
- Background sync

### Internationalization
- next-i18next integration
- Locale-based routing
- RTL support
- Translation management

### API Development
```typescript
// Potential API structure
/api/
  /programs    GET - List programs
  /quiz        POST - Get recommendations
  /meetings    GET - Find meetings
```

## Conclusion

Recoverly's architecture prioritizes:
1. **Simplicity** - No unnecessary complexity
2. **Privacy** - Data stays with the user
3. **Performance** - Fast loads, smooth interactions
4. **Accessibility** - Everyone can use it
5. **Maintainability** - Clear patterns, good docs

The architecture has proven scalable and maintainable through the development of 17 programs and 11 interactive tools. It's ready for future growth while maintaining its core values.

---

*For implementation details, see `/DEVELOPMENT.md`*  
*For future plans, see `/FUTURE-IDEAS.md`*  
*Last updated: August 2025*