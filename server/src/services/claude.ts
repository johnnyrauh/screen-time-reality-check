import Anthropic from '@anthropic-ai/sdk';
import { QuestionnaireData, AnalysisResult } from '../types/index.js';
import { createAnalysisPrompt } from '../prompts/analysis.js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeScreenTime(data: QuestionnaireData): Promise<AnalysisResult> {
  const prompt = createAnalysisPrompt(data);

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  
  // Parse the JSON response from Claude
  try {
    const result = JSON.parse(responseText);
    return result;
  } catch (error) {
    console.error('Error parsing Claude response:', error);
    throw new Error('Failed to parse AI response');
  }
}
