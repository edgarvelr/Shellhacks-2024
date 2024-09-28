import {NextResponse} from 'next/server'
import OpenAI from 'openai'

const systemPrompt = "  You are an AI chatbot here to help AI students study give them facts that they ask for and help them by proving infommation they may need for their tests "

export async function POST(req){
    Const openai = new OpenAI()
    Const data = await req.json()


    const completion = await openai.chat.completions.create({
        messages: [{role: 'system', content: systemPrompt} , ...data],
        model: 'gpt-4o',
        stream: true, 
    })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            
        }
    })
}