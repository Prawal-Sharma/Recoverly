# CLAUDE.md - AI Assistant Context for Recoverly

## Project Overview
Recoverly is a comprehensive recovery resources website that provides tools, education, and support for individuals in recovery from addiction and their families. The platform is built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## Key Features
- Recovery program comparison and information
- Interactive quiz for personalized program recommendations
- Meeting finder with 20+ online meetings
- Crisis resources and emergency contacts
- Educational content on recovery topics
- CBT/DBT/Mindfulness education hub
- Sobriety tracking tools (in development)
- Community features (in development)

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel
- **Domain**: recoverly.net

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow existing component patterns
- Keep components modular and reusable
- Use shadcn/ui components when available
- Maintain accessibility standards (WCAG 2.1 Level AA)

### Git Commits
- Write casual, self-written style commit messages
- Make incremental commits for each feature
- Use present tense ("add feature" not "added feature")
- Keep commits focused and atomic

### Testing Commands
```bash
npm run build   # Build the application
npm run lint    # Run ESLint
npm run dev     # Start development server
```

### File Structure
```
/app              # Next.js app directory
  /resources      # Educational content pages
  /programs       # Recovery program information
  /meetings       # Meeting finder
  /quiz           # Interactive quiz
/components       # Reusable React components
/lib              # Utility functions and data
/public           # Static assets
```

## Current Development Phase
We are implementing Phase 1-3 of the enhancement plan:
1. CBT/DBT/Mindfulness education hub (priority)
2. Expanded recovery programs database
3. Documentation and progress tracking

## Important Considerations
- Privacy-first approach (local storage, no required accounts)
- Accessibility for all users
- Evidence-based recovery support
- Non-judgmental, inclusive language
- Mobile-responsive design
- Performance optimization

## Common Tasks

### Adding a New Page
1. Create the page in `/app/[path]/page.tsx`
2. Add metadata for SEO
3. Update navigation if needed
4. Add to sitemap.ts

### Adding a New Recovery Program
1. Update `/lib/programs-data.ts`
2. Add program details with pros/cons
3. Update quiz scoring if applicable
4. Add related meetings to meetings-data.ts

### Updating Meeting Data
1. Edit `/lib/meetings-data.ts`
2. Include all required fields
3. Verify meeting URLs are current
4. Test filtering/search functionality

## Deployment
- Automatic deployment on push to main branch
- Vercel handles builds and hosting
- Domain: recoverly.net (via GoDaddy nameservers)

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Contact
GitHub Repository: https://github.com/Prawal-Sharma/Recoverly