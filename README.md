## Project Summary
AI-Powered Quiz Generator from PPT/PDF to Google Form

This web application allows users to upload a PDF or PPTX file (such as lecture notes, presentations, or study materials). The system uses AI to analyze the content and automatically generate a quiz based on it.

Once processed, the app creates a Google Form quiz with the generated questions and saves it directly to the user's own Google Drive, giving them full ownership and editing access.


## How It Works

1. User uploads a PDF or PPTX file.  
2. The app parses the file and extracts text content.  
3. Extracted text is sent to the Gemini AI model, which generates quiz questions in JSON format.  
4. Using the user's Google access token, the app sends the quiz data to the Google Forms API.  
5. A Google Form quiz is created or updated, and an editable form link is returned to the user.  
6. The user can access and edit the quiz directly in Google Forms.

---

## Demo

Check out the live demo here: [Ai-Quiz-app Demo](https://ai-quiz-app-nu.vercel.app/)

## Key Features:
- Upload PDF or PPTX files

- Customize number of questions and difficulty level

- AI extracts key points and generates quiz questions

- Quiz is auto-created as a Google Form

- Form is stored in the user’s Google Drive with complete access

## Tech Stack

The Ai-Quiz-app uses the following technologies and tools:

- **Frontend Framework:**
  - Next.js (React framework for server-side rendering and static site generation)

- **Styling:**
  - Tailwind CSS (utility-first CSS framework)
  - PostCSS (CSS processing tool)

- **Programming Languages:**
  - JavaScript (ES6+)
  - TypeScript (for type safety)

- **Linting & Code Quality:**
  - ESLint (JavaScript linter)

- **AI Model:**
  - Gemini Model (used for generating quiz questions from uploaded content)

- **APIs & Integrations:**
  - Google Drive API (for saving generated quizzes)
  - Google Forms API (for creating quiz forms)

- **Build Tools & Package Management:**
  - Node.js (JavaScript runtime)
  - npm (Node package manager)
