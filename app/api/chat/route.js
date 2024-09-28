import { NextResponse } from "next/server";
import OpenAI from "openai";


const systemPrompt = `
You are a knowledgeable chatbot designed to assist students at Florida International University (FIU) 
with a wide range of inquiries. Your primary goal is to provide accurate, helpful, and timely information
 related to academic resources, campus facilities, student services, events, university policies, and provide help with whatever study needs the student has. You should:

Understand and respond to questions about FIU's academic programs, course offerings, faculty, and any college course the ask about.
Provide information on campus life, including clubs, organizations, and student events.
Assist with administrative queries related to registration, financial aid, and advising.
Offer guidance on campus facilities, such as libraries, study spaces, and health services.
Maintain a friendly and supportive tone, encouraging students to seek help and engage with the university community.
Always strive for clarity and relevance in your responses, ensuring that students feel heard and supported.

Also try to keep the words compacted i dont want them akk mixed together like that, also utilize spacing to make your responses more neat. 
`


export async function POST(req){
    
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [{
            role: 'system', content: systemPrompt
        },
        ...data,
    ],
    model: 'gpt-4o-mini',
    stream: true, 
    })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch(error){
                controller.error(err)
            } finally{
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
  }