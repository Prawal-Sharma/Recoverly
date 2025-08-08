# Quick Context for Working on Recoverly 🚀

## What is Recoverly?
A complete recovery support platform that helps people find their path to healing. No judgment, just tools and resources that actually work. Built with love for the recovery community.

## Current State: ✅ Feature Complete!
The platform is fully built and optimized with:
- **17 Recovery Programs** - From AA to SMART Recovery to Recovery Dharma
- **11 Interactive Tools** - CBT, DBT, mindfulness, tracking, and planning tools
- **Smart Quiz** - Recommends both programs AND tools based on preferences
- **Meeting Finder** - Browse real meetings happening today
- **Crisis Resources** - Emergency help always one click away
- **Mobile-First Design** - 65% of users are on phones
- **Full Accessibility** - WCAG 2.1 AA compliant

## The 11 Interactive Tools (All Working!)

### CBT Tools 🧠
1. **Thought Record** (`/resources/cbt/thought-record`) - Challenge negative thoughts
2. **Distortion Quiz** (`/resources/cbt/distortion-quiz`) - Test thinking patterns  
3. **Trigger Mapper** (`/resources/cbt/trigger-map`) - Map triggers & coping strategies

### DBT Tools 🛡️
4. **TIPP Crisis Skills** (`/resources/dbt/tipp`) - Emergency emotion regulation
5. **Daily Diary Card** (`/resources/dbt/diary-card`) - Track emotions & skills

### Mindfulness Tools 🧘
6. **Meditation Timer** (`/resources/mindfulness/meditation-timer`) - Multiple techniques
7. **Body Scan Guide** (`/resources/mindfulness/body-scan`) - Visual body awareness
8. **Breathing Exercises** (`/resources/mindfulness/breathing`) - Interactive techniques

### Daily Support Tools 📊
9. **Sobriety Tracker** (`/tracker`) - Milestones & progress
10. **Daily Check-in** (`/checkin`) - Quick wellness assessment
11. **Recovery Plan Builder** (`/recovery-plan`) - 8-section personal roadmap

## Tech Stack That Works
```typescript
const stack = {
  framework: "Next.js 14",      // App router is smooth
  language: "TypeScript",        // Catches bugs early
  styling: "Tailwind CSS",       // Rapid development
  components: "shadcn/ui",       // Accessible out of the box
  database: "localStorage",      // Privacy first!
  deployment: "Vercel",          // Zero-config deploys
  domain: "recoverly.net"        // Live and kicking!
}
```

## Quick Commands
```bash
npm run dev     # Start local development
npm run build   # Check for build errors
npm run lint    # Check code quality
```

## Working on the Code? Here's What You Need

### Project Structure
```
recoverly/
├── app/                # All the pages live here
│   ├── programs/      # 17 recovery program pages
│   ├── resources/     # CBT, DBT, mindfulness tools
│   │   ├── cbt/      # Thought records, distortions, triggers
│   │   ├── dbt/      # TIPP, diary cards
│   │   └── mindfulness/ # Meditation, breathing, body scan
│   ├── tracker/       # Sobriety tracking
│   ├── checkin/       # Daily check-ins
│   ├── recovery-plan/ # Plan builder
│   ├── quiz/          # Smart recommendation quiz
│   └── meetings/      # Meeting finder
├── components/        # Reusable pieces (nav, footer, etc)
├── lib/              # Data files and utilities
│   ├── programs-data.ts  # All 17 programs info
│   ├── quiz-data.ts      # Quiz questions & scoring
│   └── meetings-data.ts  # Meeting listings
└── public/           # Images and static files
```

### Key Files to Know
- `/lib/programs-data.ts` - All recovery program info (17 programs)
- `/lib/quiz-data.ts` - Quiz logic that recommends programs AND tools
- `/components/navigation.tsx` - Main nav with all 11 tools listed
- `/app/page.tsx` - Homepage showcasing everything

## Development Guidelines

### Core Principles
✅ **Privacy First** - Everything stays local unless user chooses otherwise  
✅ **Accessibility Always** - WCAG 2.1 AA is our baseline  
✅ **Mobile First** - Most users are on phones (65%!)  
✅ **No Judgment** - Every recovery path is valid  
✅ **Crisis Accessible** - Emergency help always visible  

### Code Style Tips
- Follow existing patterns (check neighboring files)
- Use shadcn/ui components when available
- Keep TypeScript strict (it catches bugs!)
- Test on mobile before committing
- Make touch targets at least 44px

### Common Tasks

**Adding a new interactive tool:**
```bash
1. Create page in /app/resources/[category]/[tool-name]/page.tsx
2. Add to navigation.tsx under resourceCategories
3. Add Related Tools section
4. Update quiz-data.ts to recommend it
5. Test on mobile!
```

**Adding a recovery program:**
```bash
1. Add to /lib/programs-data.ts
2. Create page in /app/programs/[program-id]/page.tsx  
3. Update quiz scoring logic
4. Check program count references (currently 17)
```

**Updating the quiz:**
```bash
1. Edit /lib/quiz-data.ts
2. Test scoring algorithm
3. Verify recommendations make sense
4. Check completion rate (currently 70%+)
```

## Testing & Deployment

### Local Development
```bash
npm install        # First time setup
npm run dev        # Start dev server (localhost:3000)
npm run build      # Check for errors before pushing
npm run lint       # Check code quality
```

### Before Pushing
1. ✅ Run `npm run build` - no errors
2. ✅ Test on mobile viewport  
3. ✅ Check accessibility (keyboard nav works?)
4. ✅ Verify crisis resources visible
5. ✅ Test any new interactive features

### Deployment
- Push to main → Vercel auto-deploys
- Site goes live at recoverly.net
- Usually takes ~45 seconds

## Performance Targets
- Page load: < 2 seconds ✅
- Lighthouse: 90+ ✅  
- Mobile traffic: 65% ✅
- Quiz completion: 70%+ ✅
- Zero tracking cookies ✅

## Need Help?
- **Issues**: Open on [GitHub](https://github.com/Prawal-Sharma/Recoverly)
- **Docs**: Check `/DEVELOPMENT.md` for full journey
- **Future Ideas**: See `/FUTURE-IDEAS.md` (coming soon)

## Remember
This project helps real people in real recovery. Every feature should support that mission. Keep it simple, keep it accessible, keep it helpful.

---
*Last updated: August 2025 - Platform is feature complete!* 🎉