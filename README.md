# Screen Time Reality Check

An AI-powered web app that analyzes your phone screen time and delivers a personalized "reality check" to help you reclaim your time.

## What It Does

Upload a screenshot of your Screen Time → Answer 8 quick questions → Get an AI-generated reality check showing:

- **The Big Number**: How many days per year you spend on your phone
- **Translation to Life**: What you could have done with that time instead
- **The Gut Punch**: Personalized wake-up call based on your stated goals
- **Pattern Recognition**: AI-spotted insights about your usage
- **Opportunity Cost**: What you could accomplish by cutting back
- **Reclaim Plan**: 3 concrete action steps tailored to you

## Why This Exists

Everyone knows they're on their phone too much. But raw numbers like "3.5 hours/day" don't create change. This tool makes it **visceral** and **personal** by:

1. Connecting screen time to your specific life goals
2. Using AI to generate personalized insights (not generic advice)
3. Making it shareable (social accountability)
4. Requiring no app installation (frictionless)

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for build tooling

### Backend
- **Node.js + Express** server
- **Anthropic Claude API** for AI analysis
- **Tesseract.js** for OCR (screenshot text extraction)
- **Multer** for file uploads

## Project Structure

\`\`\`
screen-time-reality-check/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── steps/   # Questionnaire step components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Questionnaire.tsx
│   │   │   └── Results.tsx
│   │   ├── types/       # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Claude & OCR services
│   │   ├── prompts/     # AI prompts
│   │   └── types/       # TypeScript types
│   └── package.json
└── package.json         # Root workspace
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Anthropic API key ([get one here](https://console.anthropic.com))

### Installation

1. **Clone the repo**
   \`\`\`bash
   git clone <your-repo-url>
   cd screen-time-reality-check
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp server/.env.example server/.env
   \`\`\`
   
   Edit \`server/.env\` and add your Anthropic API key:
   \`\`\`
   ANTHROPIC_API_KEY=your_api_key_here
   \`\`\`

4. **Run the app**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   This starts:
   - Frontend at http://localhost:5173
   - Backend at http://localhost:3001

### Individual Services

\`\`\`bash
# Run only frontend
npm run dev:client

# Run only backend
npm run dev:server
\`\`\`

## How It Works

### User Flow

1. **Landing Page** → Hook: "You don't have a time problem. You have a time awareness problem."
2. **Upload Screenshot** → OCR extracts screen time data
3. **8-Step Questionnaire**:
   - Verify extracted data
   - What would you do with 10 extra hours?
   - Work context (hours, role)
   - Which app do you regret most?
   - When do you want time back?
   - Your relationship with your phone
   - How serious are you about change?
   - What does success look like?
4. **Loading Screen** → AI analyzes (10-15 seconds)
5. **Results Page** → Personalized reality check

### AI Analysis

The prompt sends Claude:
- Screen time data (daily avg, top apps)
- User's stated goals and context
- Their "regret app" and time patterns
- Change readiness level

Claude returns:
- Visceral numbers (days per year on phone)
- Personalized comparisons to their goals
- Specific pattern insights
- Actionable reclaim plan

**Tone calibration**: The AI adjusts tone based on user's seriousness level (direct vs. playful vs. analytical)

## API Endpoints

### POST /api/ocr
Upload screenshot for text extraction.

**Request**: 
- Form data with file upload

**Response**:
\`\`\`json
{
  "dailyAverage": 5.5,
  "weeklyTotal": 38.5,
  "topApps": [
    { "name": "Instagram", "hours": 2.1 },
    { "name": "TikTok", "hours": 1.4 }
  ],
  "timePeriod": "Last 7 days"
}
\`\`\`

### POST /api/analyze
Submit questionnaire data for AI analysis.

**Request**:
\`\`\`json
{
  "screenTimeData": { ... },
  "dreamGoal": "Launch my side project",
  "workHours": "40-50",
  "role": "manager",
  "regretApp": "instagram",
  "wantTimeBack": ["evenings", "weekends"],
  "phoneRelationship": "crutch",
  "changeSeriousness": "serious",
  "successDefinition": "Under 3 hours/day"
}
\`\`\`

**Response**: See \`AnalysisResult\` type in types/index.ts

## Building for Production

\`\`\`bash
npm run build
\`\`\`

This builds both client and server.

## Deployment

### Frontend (Vercel)
1. Connect repo to Vercel
2. Set root directory to \`client\`
3. Add env var: \`VITE_API_URL=<your-backend-url>\`

### Backend (Railway/Render/Fly.io)
1. Connect repo
2. Set root directory to \`server\`
3. Add env vars:
   - \`ANTHROPIC_API_KEY\`
   - \`NODE_ENV=production\`

## Future Enhancements

- [ ] Save results to local storage
- [ ] Weekly check-in reminders
- [ ] Meeting time + screen time combined analysis
- [ ] Android screenshot support
- [ ] PDF export
- [ ] Social sharing cards

## Privacy

- Screenshots are processed server-side and immediately deleted
- No user data is stored in a database
- All analysis happens in real-time
- Results are shown once, not saved

## License

MIT

## Credits

Built with Claude Code by @johnnyrauh as a demonstration of:
- AI-assisted development
- Product management thinking
- Full-stack TypeScript
- Practical AI integration

---

**The meta-point**: This entire app was built using Claude Code in a few hours. What used to take weeks of debugging syntax errors now takes days. We're all becoming AI bionic.
