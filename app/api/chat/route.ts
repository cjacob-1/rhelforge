import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse, FORGEBOT_SYSTEM_PROMPT } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Generate response using OpenAI
    const response = await generateChatResponse(message, conversationHistory);

    // Extract scripts from response (simple parsing)
    // In a real app, you'd use a more sophisticated approach
    const bashScriptMatch = response.match(/```bash\n([\s\S]*?)\n```/);
    const pythonScriptMatch = response.match(/```python\n([\s\S]*?)\n```/);

    return NextResponse.json({
      response,
      bashScript: bashScriptMatch ? bashScriptMatch[1] : undefined,
      pythonScript: pythonScriptMatch ? pythonScriptMatch[1] : undefined,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
