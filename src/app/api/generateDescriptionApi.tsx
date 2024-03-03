import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from 'next';
const openai = new OpenAI();
const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Extract image URLs and text from the request body
    const { imageUrls, text, propertyType, location } = req.body;

    // Initialize OpenAI API
    //   const openai = createApi({ apiKey: process.env.OPENAI_API_KEY });

    try {
        // Call OpenAI API to generate a description
        const response = await openai.chat.completions.create({
            model: 'gpt-4-vision-preview',
            messages: [
                {
                    role: 'You are a property description generator AI tasked with writing compelling property descriptions based on images provided by users. Your goal is to create descriptions that effectively showcase the key features and selling points of the properties.',
                    content: [
                        { type: 'text', text },
                        ...imageUrls.map(imageUrl => ({ type: 'image_url', image_url: { url: imageUrl } }))
                    ],
                },
            ],
        });

        // Return the generated description
        res.status(200).json({ description: response.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ error: 'Failed to generate description' });
    }
}
