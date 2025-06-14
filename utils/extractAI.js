// utils/extractAI.js
require("dotenv").config();                    // ← if you use a .env
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDz8AKPbx3VArMbNc2lL31u004VoU1GFuo");

async function extractStructuredData(resumeText) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Extract the following details from this resume:
  - Name
  - Email
  - Phone
  - Skills (as array)
  - Work Experience (paragraph)

  Resume:
  ${resumeText}`;

  const result = await model.generateContent(prompt);

  /* ───────────────────────────────────────────────────────────── */

  // Safety‑check: did we actually get a candidate back?
  if (!result?.response?.candidates?.length) {
    console.error("❌ Gemini returned no content:", result);
    throw new Error("Empty response from Gemini");
  }

  // Raw text from Gemini
  let content = result.response.text();

  //console.log("Gemini raw text response:\n", content);

  /* ───────────────────────────────────────────────────────────── */

  // Strip ```json … ``` or ``` … ``` fences
  content = content.trim();
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced) content = fenced[1].trim();

  // Parse to JS object
  try {
    //console.log(content)
    return JSON.parse(content);
  } catch (err) {
    console.error("❌ Couldn't parse Gemini output as JSON:\n", content);
    throw err;
  }
}

module.exports = { extractStructuredData };
