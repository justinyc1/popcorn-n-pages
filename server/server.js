import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getRecommendations = async (mediaName, mediaType) => {
    const model = geminiAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const prompt = `return me a json object, delimited by backticks, of 10 ${mediaType}s similar to ${mediaName}, with the lead director, main actors, genre, rating, age rating, and summary`;
    const result = await model.generateContent(prompt);
    const jsonResponse = (response) => {
            const start = response.indexOf("[")-1;
            const end = response.lastIndexOf("]")+1;
            if (start !== -1 && end !== -1 && end > start) {
                return response.substring(start, end + 1);
            }
            return response;
        }

    console.log(jsonResponse(result.response.text()));
    return jsonResponse(result.response.text());
}

getRecommendations("Harry Potter","Books");