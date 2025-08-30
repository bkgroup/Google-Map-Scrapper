import { GoogleGenAI, Type } from "@google/genai";
import { type BusinessListing } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const businessSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The full name of the business." },
    address: { type: Type.STRING, description: "The complete physical address of the business." },
    phone: { type: Type.STRING, description: "The primary contact phone number.", nullable: true },
    website: { type: Type.STRING, description: "The official website URL, starting with http:// or https://.", nullable: true },
    rating: { type: Type.NUMBER, description: "The average user rating, from 1.0 to 5.0.", nullable: true },
    reviewCount: { type: Type.INTEGER, description: "The total number of reviews.", nullable: true },
    category: { type: Type.STRING, description: "The main category of the business (e.g., 'Dentist', 'Restaurant')." },
  },
  required: ["name", "address", "category"],
};

export const scrapeGoogleMaps = async (query: string, existingNames: string[] = []): Promise<BusinessListing[]> => {
  try {
    const prompt = existingNames.length > 0
      ? `
        Act as a Google Maps data scraper. Based on the user query "${query}", generate a new, realistic but fictional list of 10 additional business listings.
        
        IMPORTANT: Do NOT include any of the following businesses that have already been listed:
        - ${existingNames.join('\n- ')}

        Ensure the new data is diverse and accurately reflects the types of businesses that would appear in a real search.
        Provide the output as a JSON array of business objects.
      `
      : `
        Act as a Google Maps data scraper. Based on the user query "${query}", generate a realistic but fictional list of 15 business listings.
        Ensure the data is diverse and accurately reflects the types of businesses that would appear in a real search for this query.
        Provide the output as a JSON array of business objects.
      `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: businessSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("API returned an empty response.");
    }
    
    const parsedData = JSON.parse(jsonText);
    return parsedData as BusinessListing[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('json')) {
         throw new Error("Failed to get valid data from the AI. Please try again with a different query.");
    }
    throw new Error("An error occurred while fetching data from the AI service.");
  }
};