import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { parsedResume, numQuestions = 5, difficulty = "medium" } = await req.json();

    if (!parsedResume) {
      return Response.json({ error: "Missing parsedResume data" }, { status: 400 });
    }

    // Validate numQuestions and difficulty
    const questionsCount = Number(numQuestions);
    if (isNaN(questionsCount) || questionsCount < 1 || questionsCount > 50) {
      return Response.json(
        { error: "numQuestions must be a number between 1 and 50" },
        { status: 400 }
      );
    }

    const difficultyLevels = ["easy", "medium", "hard"];
    const level = difficulty.toLowerCase();
    if (!difficultyLevels.includes(level)) {
      return Response.json(
        { error: `difficulty must be one of ${difficultyLevels.join(", ")}` },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an expert educational content creator.

Generate ${questionsCount} multiple-choice questions with 4 options each, based on the following topic: "${parsedResume}".

Make the questions ${level} level.

Return the output as a valid JSON array of objects with this structure:

\`\`\`json
[
  {
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  },
  ...
]
\`\`\`

Make sure the JSON is properly formatted and parsable.
`;

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log("API Response:", JSON.stringify(response, null, 2));

    const candidates = response.response?.candidates;

    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini API");
    }

    const rawText = candidates[0]?.content?.parts?.[0]?.text || "";

    // Extract JSON inside the triple backticks markdown block
    const jsonMatch = rawText.match(/```json([\s\S]*?)```/);

    if (!jsonMatch) {
      return Response.json(
        { error: "Could not find JSON data in the API response" },
        { status: 500 }
      );
    }

    const jsonString = jsonMatch[1].trim();

    let quizData;
    try {
      quizData = JSON.parse(jsonString);
    } catch (parseError) {
      return Response.json(
        { error: "Failed to parse JSON: " + parseError.message },
        { status: 500 }
      );
    }

    // Validate quizData structure
    if (
      !Array.isArray(quizData) ||
      !quizData.every(
        (q) =>
          q.question &&
          typeof q.question === "string" &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          q.options.every((opt) => typeof opt === "string") &&
          typeof q.answer === "string" &&
          q.options.includes(q.answer)
      )
    ) {
      return Response.json(
        { error: "Quiz data format invalid or inconsistent" },
        { status: 500 }
      );
    }

    return Response.json({ quiz: quizData });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return Response.json({ error: error.message || "Failed to generate quiz" }, { status: 500 });
  }
}
