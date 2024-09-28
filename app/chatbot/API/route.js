import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const systemPrompt = "You are an AI chatbot here to help AI students study. Provide them with facts they ask for and assist them with information they may need for their tests.";

export async function POST(req) {
  // Initialize OpenAI API with proper configuration
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in the environment
    })
  );

  // Parse the request body
  const data = await req.json();
  
  // Ensure data is in the correct format (an array of messages)
  if (!Array.isArray(data) || data.length === 0) {
    return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
  }

  // Create chat completion with streaming enabled
  const completion = await openai.createChatCompletion({
    model: 'gpt-4', // Correct model name
    messages: [{ role: 'system', content: systemPrompt }, ...data],
    stream: true,
  });

  // Create a stream to send back the OpenAI response incrementally
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  // Use regular Response object for streaming
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
