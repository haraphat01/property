import { OpenAI } from "openai";
// import { OpenAIStream } from "ai";
// import { NextApiRequest, NextApiResponse } from 'next';
// import { imageConfigDefault } from "next/dist/shared/lib/image-config";
// const configuration = new Configuration({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);
const client = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req, res) {
    let passedValue = await new Response(req.body).text();
    let bodyreq = JSON.parse(passedValue);
   
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Extract image URLs and text from the request body
    const { imageUrls, propertyType, location } = bodyreq;
    const text = `You are tasked with generating descriptive property listings based on a set of property images. Your objective is to create engaging narratives that showcase the unique attributes of each property and appeal to potential buyers or renters. Focus on highlighting the property's key features, such as its architecture, interior design, amenities, and surrounding environment. Tailor your descriptions to match the type of property (e.g., ${propertyType}) and its ${location}, ensuring relevance and specificity. Utilize persuasive language and vivid imagery to captivate the audience, compelling them to inquire further about the property. Your goal is to create enticing property listings that leave a lasting impression on potential buyers or renters.`
    // Initialize OpenAI API
    //   const openai = createApi({ apiKey: process.env.OPENAI_API_KEY });
  


    try {
        
        const response = await client.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: 'user',
                    content: [
                        {"type": "text", 
                        "text": text},
                        {
                            type: "image_url",
                            image_url: {
                                "url": imageUrls,
                            },
                        },
                    ],
                },
            ],
        });

        // Return the generated description
        res.status(200).json({ description: response.choices[0] });
        // return OpenAIStream(response);

    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ error: 'Failed to generate description' });
    }
}
