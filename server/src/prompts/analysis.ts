import { QuestionnaireData } from '../types/index.js';

export function createAnalysisPrompt(data: QuestionnaireData): string {
  const { screenTimeData, dreamGoal, workHours, role, regretApp, regretReason, wantTimeBack, phoneRelationship, changeSeriousness, successDefinition } = data;

  return `You are analyzing someone's screen time to give them a reality check that motivates change without being preachy.

SCREEN TIME DATA:
- Daily average: ${screenTimeData.dailyAverage} hours
- Weekly total: ${screenTimeData.weeklyTotal} hours
- Top apps: ${screenTimeData.topApps.map(app => `${app.name} (${app.hours} hrs/day)`).join(', ')}
- Time period: ${screenTimeData.timePeriod}

USER CONTEXT:
- Their dream: "${dreamGoal}"
- Work context: ${workHours} hours/week as a ${role}
- Biggest regret app: ${regretApp}${regretReason ? ` (reason: "${regretReason}")` : ''}
- When they want time back: ${wantTimeBack.join(', ')}
- Phone relationship: ${phoneRelationship}
- Change readiness: ${changeSeriousness}
- Their success metric: "${successDefinition}"

GENERATE a JSON object with the following structure (respond ONLY with valid JSON, no other text):

{
  "bigNumber": {
    "yearlyDays": <number of days per year spent on phone>,
    "percentOfWakingLife": <percentage of waking hours>,
    "comparisonToWork": "<comparison to their work schedule>"
  },
  "translation": [
    {
      "app": "<app name>",
      "hours": <monthly hours>,
      "equivalent": "<what they could have done instead>"
    }
  ],
  "gutPunch": "<personalized reality check using their exact words from dream goal>",
  "patterns": [
    "<insight 1>",
    "<insight 2>",
    "<insight 3>"
  ],
  "opportunityCost": {
    "oneMonth": "<what 50% reduction enables in 1 month>",
    "threeMonths": "<in 3 months>",
    "sixMonths": "<in 6 months>",
    "oneYear": "<in 1 year>"
  },
  "reclaimPlan": {
    "quickWin": "<targets regret app + peak time they want back>",
    "highImpact": "<addresses checked time windows>",
    "longTerm": "<aligned with success definition>"
  }
}

TONE CALIBRATION:
- If "serious problem": Direct, urgent, actionable
- If "like to cut back": Motivating, supportive, realistic
- If "curious": Playful, eye-opening, non-judgmental
- If "here for data": Analytical, interesting, no prescriptions

CRITICAL RULES:
1. Use their own language - quote their goal back to them
2. Be specific, not generic
3. Focus on their regret app as the "main character"
4. Reference their role/work context for impact
5. Make the gut punch personal but not mean
6. Show what they're trading for scrolling
7. Match intensity to their readiness level

For the translation array, include the top 3 apps only.
For patterns, identify 3-4 specific insights based on their answers.
For opportunity cost, connect to their specific dream goal.
For reclaim plan, be concrete and actionable.

Respond with ONLY valid JSON. No markdown, no preamble, no explanation.`;
}
