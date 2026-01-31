# Quick Start Guide

## Get This Running in 5 Minutes

### Step 1: Install Dependencies
\`\`\`bash
cd screen-time-reality-check
npm install
\`\`\`

### Step 2: Set Up Your API Key
\`\`\`bash
cp server/.env.example server/.env
\`\`\`

Then edit \`server/.env\` and paste your Anthropic API key:
\`\`\`
ANTHROPIC_API_KEY=sk-ant-...
\`\`\`

### Step 3: Run It
\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:5173 in your browser. Done!

---

## What You Just Built

✅ Full-stack TypeScript app  
✅ React + Tailwind UI  
✅ Claude AI integration  
✅ OCR for screenshot processing  
✅ 8-step personalized questionnaire  
✅ AI-generated reality checks  

## Key Files to Understand

### Frontend
- \`client/src/App.tsx\` - Main app with routing
- \`client/src/components/Questionnaire.tsx\` - 8-step flow
- \`client/src/components/steps/\` - Individual question components
- \`client/src/components/Results.tsx\` - Results display

### Backend
- \`server/src/index.ts\` - Express server
- \`server/src/routes/api.ts\` - API endpoints
- \`server/src/services/claude.ts\` - Claude API integration
- \`server/src/prompts/analysis.ts\` - **THE MAGIC** - This is where the AI prompt lives

## Customize the Prompt

Want to change how the AI analyzes? Edit:
\`\`\`
server/src/prompts/analysis.ts
\`\`\`

This file controls:
- Tone (serious vs. playful)
- What insights to extract
- How to structure the response
- Personalization logic

## Next Steps

1. **Test it**: Upload a screenshot, go through the flow
2. **Tweak the prompt**: Adjust tone/format in \`analysis.ts\`
3. **Deploy it**: 
   - Frontend → Vercel
   - Backend → Railway/Render
4. **Share it**: Get feedback, iterate

## Troubleshooting

**OCR not working?**
- Make sure the screenshot is clear
- Try the demo data (it auto-fills if OCR fails)

**API errors?**
- Check your Anthropic API key in \`.env\`
- Make sure you have API credits

**Can't see the results?**
- Check browser console for errors
- Verify backend is running on port 3001

## The Point

This took **hours to build**, not weeks, because of AI assistance. You focused on:
- What problem to solve
- How to structure the experience
- What questions to ask

AI handled:
- Boilerplate code
- Component structure
- API integration
- Styling consistency

**That's the future.**

---

Built with Claude Code. Now go share this on LinkedIn and tag me @johnnyrauh 🚀
