import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function getRecommendstioFromGemini(mediaName,mediaType) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const prompt = "give me similar content of the god father as a json object";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
return text;
//learn express js 
//how to update type with gemini (reading the documentation)
}
getRecommendstioFromGemini("Herry Potter","Books");