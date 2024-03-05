import { OpenAI } from "openai";
// import { OpenAIStream } from "ai";
// import { NextApiRequest, NextApiResponse } from 'next';
// import { imageConfigDefault } from "next/dist/shared/lib/image-config";
// const configuration = new Configuration({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);
const openAi = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Extract image URLs and text from the request body
    const { imageUrls, propertyType, location } = req.body;
    const text = `You are tasked with generating descriptive property listings based on a set of property images. Your objective is to create engaging narratives that showcase the unique attributes of each property and appeal to potential buyers or renters. Focus on highlighting the property's key features, such as its architecture, interior design, amenities, and surrounding environment. Tailor your descriptions to match the type of property (e.g., ${propertyType}) and its ${location}, ensuring relevance and specificity. Utilize persuasive language and vivid imagery to captivate the audience, compelling them to inquire further about the property. Your goal is to create enticing property listings that leave a lasting impression on potential buyers or renters.`
    // Initialize OpenAI API
    //   const openai = createApi({ apiKey: process.env.OPENAI_API_KEY });

    try {
        // Call OpenAI API to generate a description
        // const response =  await openAi.chat.completions.create({
        //     model: 'gpt-4-vision-preview',
        //     messages: [
        //         {
        //             role: 'You are a property description generator AI tasked with writing compelling property descriptions based on images provided by users. Your goal is to create descriptions that effectively showcase the key features and selling points of the properties.',
        //             content: [
        //                 { type: 'text', text },
        //                 ...imageUrls.map(imageUrl => ({ type: 'image_url', image_url: { url: imageUrl } }))

        //             ],
        //         },
        //     ],
        // });
        const response = await openAi.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: 'You are a property description generator AI tasked with writing compelling property descriptions based on images provided by users. Your goal is to create descriptions that effectively showcase the key features and selling points of the properties.',
                    content: [
                        { type: text},
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
