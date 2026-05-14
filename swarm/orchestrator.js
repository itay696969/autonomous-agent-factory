const { GoogleGenerativeAI } = require("@google/generai");

async function main() {
  console.log("--- Swarm Orchestrator Test Mode ---");
  
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("Error: GOOGLE_API_KEY is missing in environment!");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  console.log("Making a test LLM call to verify Langfuse telemetry...");
  
  try {
    const result = await model.generateContent("Confirm that the autonomous factory swarm telemetry is online with a short greeting.");
    console.log("Gemini Response:", result.response.text());
    console.log("Test completed successfully!");
  } catch (error) {
    console.error("LLM Call Failed:", error);
  }
}

main().catch(console.error);
