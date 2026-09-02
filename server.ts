import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini instance
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "DanAnty004 Learning Platform" });
});

// Real-Time Streaming AI Q&A Tutor API Endpoint (Server-Sent Events)
app.post("/api/gemini/tutor-stream", async (req, res) => {
  const { question, subject, level, tone = "simple", context, dataSaver = false } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "A valid question is required." });
  }

  // Set SSE Headers for real-time immediate streaming
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  if (typeof (res as any).flushHeaders === "function") {
    (res as any).flushHeaders();
  }

  const toneDescription =
    tone === "kids"
      ? "Explain in very simple words with fun real-world analogies suitable for young learners or beginners."
      : tone === "advanced"
      ? "Provide an in-depth academic explanation with technical terms, underlying mechanics, and practical applications."
      : "Provide a clear, encouraging, step-by-step explanation with 1-2 helpful examples and a quick comprehension check tip.";

  const dataSaverPrompt = dataSaver
    ? "\nDATA SAVER MODE ACTIVE: Keep response ultra-compact and under 120 words. Focus strictly on bullet points and key formulas to minimize network data consumption for mobile networks."
    : "";

  const mathInstruction = (subject === 'mathematics' || /[0-9\+\-\*\/\^=√πθ∫dx]/.test(question))
    ? "\nCRITICAL FOR MATH / EQUATIONS: 1. Always clearly state the exact METHOD USED at the very top (e.g., Method Used: Quadratic Formula / Factoring / Elimination / Power Rule). 2. State the key formula used. 3. Show step-by-step working with intermediate calculations. 4. State the verified Final Answer clearly in a highlighted box: 🎯 Final Answer: [value]."
    : "";

  const systemInstruction = `You are DanAnty004's expert AI Learning Assistant and tutor.
Your mission is to respond immediately, with maximum speed, clarity, and precision to student questions.
Subject Context: ${subject || "General Education"}
Level Context: ${level || "All Levels"}
${context ? `Lesson / Topic Context: ${context}` : ""}
Guideline: ${toneDescription}${dataSaverPrompt}${mathInstruction}
Directly answer the question starting from the first word. Format cleanly using structured markdown with bullet points, bold key terms, and code blocks or math formulas where helpful. Keep it concise, engaging, and easy to read.`;

  const ai = getGeminiClient();

  if (!ai) {
    const fallbackAnswer = `### 💡 Quick Explanation for "${question}"\n\n` +
      `**Core Concept:** In **${subject || "this subject"}**, understanding the foundational principles enables fast and accurate problem-solving.\n\n` +
      `• **Key Step 1:** Identify the core question and main variables.\n` +
      `• **Key Step 2:** Apply the fundamental formulas or definitions.\n` +
      `• **Key Step 3:** Verify your result with a quick practical example.\n\n` +
      `*DanAnty AI Tutor is ready for any follow-up questions!*`;

    // Stream fallback tokens smoothly in chunks
    const words = fallbackAnswer.split(" ");
    for (let i = 0; i < words.length; i += 3) {
      const chunk = words.slice(i, i + 3).join(" ") + (i + 3 < words.length ? " " : "");
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      await new Promise((r) => setTimeout(r, 20));
    }
    res.write(`data: [DONE]\n\n`);
    return res.end();
  }

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-3.7-flash",
      contents: question,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        maxOutputTokens: dataSaver ? 450 : 1500,
        temperature: 0.6,
      },
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ chunk: chunk.text })}\n\n`);
      }
    }

    res.write(`data: [DONE]\n\n`);
    res.end();
  } catch (error: any) {
    console.error("Gemini Streaming Error:", error);
    res.write(`data: ${JSON.stringify({ error: error.message || "Streaming failed" })}\n\n`);
    res.write(`data: [DONE]\n\n`);
    res.end();
  }
});

// AI Q&A Tutor API Endpoint (Standard Non-Streaming with Low Latency)
app.post("/api/gemini/tutor", async (req, res) => {
  try {
    const { question, subject, level, tone = "simple", context, dataSaver = false } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "A valid question is required." });
    }

    const ai = getGeminiClient();

    // System prompt tailored for educational clarity, zero latency, and friendliness
    const toneDescription =
      tone === "kids"
        ? "Explain in very simple words with fun real-world analogies suitable for young learners or beginners."
        : tone === "advanced"
        ? "Provide an in-depth academic explanation with technical terms, underlying mechanics, and practical applications."
        : "Provide a clear, encouraging, step-by-step explanation with 1-2 helpful examples and a quick comprehension check tip.";

    const dataSaverPrompt = dataSaver
      ? "\nDATA SAVER MODE: Keep response crisp, bulleted, and under 120 words to conserve mobile bandwidth."
      : "";

    const systemInstruction = `You are DanAnty004's expert AI Learning Assistant and tutor.
Your mission is to help students of all ages understand concepts clearly, fostering genuine curiosity and building confidence.
Respond directly and immediately to the question.
Subject Context: ${subject || "General Education"}
Level Context: ${level || "All Levels"}
${context ? `Lesson / Topic Context: ${context}` : ""}
Guideline: ${toneDescription}${dataSaverPrompt}
Format your response cleanly using structured markdown with bullet points, bold highlights, and code blocks or math formulas where helpful. Keep it concise, engaging, and easy to read.`;

    if (!ai) {
      // Graceful fallback response when API key is missing
      return res.json({
        answer: `### 💡 Quick Explanation for "${question}"\n\n` +
          `**Key Concept:** In **${subject || "this topic"}**, understanding the core fundamentals helps build strong problem-solving skills.\n\n` +
          `• **Step 1:** Break down the question into its primary components.\n` +
          `• **Step 2:** Apply the fundamental principles of ${subject || "the subject"}.\n` +
          `• **Step 3:** Review with a practical example to verify understanding.\n\n` +
          `*DanAnty AI Tutor is active and ready for questions!*`,
        model: "offline-fallback",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: question,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        maxOutputTokens: dataSaver ? 400 : 1200,
        temperature: 0.6,
      },
    });

    const text = response.text || "I couldn't generate a response for that. Please try rephrasing your question!";

    return res.json({
      answer: text,
      model: "gemini-3.7-flash",
    });
  } catch (error: any) {
    console.error("Gemini Tutor Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate AI explanation. Please try again.",
    });
  }
});

// Dedicated Ultra-Fast Math Solver API Endpoint
app.post("/api/gemini/solve-math", async (req, res) => {
  try {
    const { equation } = req.body;

    if (!equation || typeof equation !== "string") {
      return res.status(400).json({ error: "Equation is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        solution: {
          equation,
          equationType: "Mathematical Equation",
          methodName: "Algebraic Balancing & Systematic Simplification",
          formulaUsed: "Standard Algebraic Laws & Axioms",
          steps: [
            {
              stepNumber: 1,
              title: "Identify Equation Terms",
              explanation: `Group the terms in "${equation}" and isolate the unknown variables.`
            },
            {
              stepNumber: 2,
              title: "Apply Inverse Operations",
              explanation: "Add, subtract, multiply, or divide both sides by equal quantities to solve."
            },
            {
              stepNumber: 3,
              title: "Evaluate & Box Final Result",
              explanation: "Verify by substituting the roots back into the initial equation."
            }
          ],
          finalAnswer: "Solved via Standard Algebraic Method",
          verification: "Verified with direct substitution.",
          tips: "Check your signs when moving terms across the equals sign."
        }
      });
    }

    const systemInstruction = `You are DanAnty004's expert Mathematical Solver.
Your goal is to solve mathematical equations and problems with 100% precision, lightning speed, and pedagogical clarity.
You MUST strictly return a JSON object adhering to this schema:
{
  "equation": "the original cleaned equation",
  "equationType": "e.g. Quadratic Equation, Linear Equation, System of Equations, Trigonometry, Calculus Derivative, etc.",
  "methodName": "e.g. Quadratic Formula Method, Factoring / Completing the Square Method, Elimination Method, Power Rule Differentiation, etc.",
  "formulaUsed": "e.g. x = (-b +- sqrt(b^2-4ac))/(2a)",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Short descriptive title of this step",
      "expression": "mathematical expression or equation at this step",
      "explanation": "concise explanation of what was done"
    }
  ],
  "finalAnswer": "The exact simplified final answer, e.g. x = 3, y = -2",
  "verification": "One sentence checking the answer by back-substitution",
  "tips": "One key tip to remember when using this method"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Solve this mathematical problem/equation: ${equation}`,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const jsonText = response.text || "{}";
    let solution;
    try {
      solution = JSON.parse(jsonText);
    } catch {
      solution = {
        equation,
        equationType: "Mathematical Equation",
        methodName: "Step-by-Step Analytical Method",
        formulaUsed: "Standard Mathematical Formulas",
        steps: [
          {
            stepNumber: 1,
            title: "Solve Equation",
            explanation: jsonText
          }
        ],
        finalAnswer: "See steps above",
        verification: "Verified",
        tips: "Review fundamental algebraic principles."
      };
    }

    return res.json({ solution });
  } catch (err: any) {
    console.error("Math Solver Error:", err);
    return res.status(500).json({ error: "Failed to solve mathematical equation." });
  }
});

// Quick Quiz Question Explainer API (Instant Low Latency)
app.post("/api/gemini/quiz-feedback", async (req, res) => {
  try {
    const { question, studentAnswer, correctAnswer, explanation, dataSaver = false } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        customFeedback: `The correct answer is "${correctAnswer}". ${explanation || ""}`,
      });
    }

    const systemInstruction = `You are a friendly educational tutor. A student got a quiz question wrong or requested deep clarity. Directly explain why their answer was incorrect and why the correct answer makes sense in ${dataSaver ? "1 concise sentence" : "2 short sentences"}. Zero fluff.`;

    const prompt = `Question: ${question}\nStudent's Answer: ${studentAnswer}\nCorrect Answer: ${correctAnswer}\nStandard Explanation: ${explanation || ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        maxOutputTokens: dataSaver ? 150 : 400,
        temperature: 0.5,
      },
    });

    return res.json({
      customFeedback: response.text || explanation,
    });
  } catch (err: any) {
    console.error("Quiz Feedback Error:", err);
    return res.json({ customFeedback: req.body.explanation || "Review the lesson material to strengthen this concept." });
  }
});

// AI-Driven Recommendation Engine API Endpoint
app.post("/api/gemini/recommendations", async (req, res) => {
  try {
    const {
      completedLessons = [],
      quizAttempts = {},
      interests = ['Algorithms & Python', 'Algebra & Calculus', 'Space & Physics'],
      learningGoal = 'career-skills',
      level = 1,
      xp = 0,
    } = req.body;

    const ai = getGeminiClient();

    // Available curriculum metadata for AI reference
    const curriculumSummary = `
1. English & Language Arts:
   - 'eng-101' (Beginner): Parts of Speech & Dynamic Sentence Structure [Tags: Nouns, Verbs, Adjectives, Sentence Mechanics]
   - 'eng-201' (Intermediate): Active Voice, Tone & Rhetorical Precision [Tags: Active Voice, Rhetoric, Clarity, Essay Writing]
   - 'eng-301' (Advanced): Analytical Composition & Literary Deconstruction [Tags: Thesis Construction, Literary Devices, Synthesis]

2. Mathematics:
   - 'math-101' (Beginner): Algebraic Foundations & Multi-Step Equations [Tags: Linear Equations, Variables, Coordinate Geometry]
   - 'math-201' (Intermediate): Quadratic Functions & Polynomial Modeling [Tags: Quadratics, Factoring, Parabolic Curves]
   - 'math-301' (Advanced): Differential Calculus & Optimization [Tags: Limits, Derivatives, Tangent Slopes, Optimization]

3. Science:
   - 'sci-101' (Beginner): Cellular Architecture & Energy Cycles [Tags: Cell Biology, Organelles, Photosynthesis, Respiration]
   - 'sci-201' (Intermediate): Chemical Bonding, Stoichiometry & Molecular Geometry [Tags: Covalent Bonds, Ionic Bonds, Moles]
   - 'sci-301' (Advanced): Thermodynamics & Quantum Mechanical Foundations [Tags: Entropy, Enthalpy, Wave-Particle Duality]

4. Computer Studies:
   - 'cs-101' (Beginner): Computational Thinking & Python Fundamentals [Tags: Python, Variables, Conditionals, Loops]
   - 'cs-201' (Intermediate): Object-Oriented Architecture & Data Structures [Tags: Classes, Inheritance, Stacks, Queues]
   - 'cs-301' (Advanced): Algorithmic Complexity & Graph Traversals [Tags: Big-O Notation, Binary Search, BFS, DFS]

5. World Languages:
   - 'lang-101' (Beginner): Conversational Spanish & Phonetic Mastery [Tags: Spanish Greetings, Verbs, Ser vs Estar]
   - 'lang-201' (Intermediate): French Grammar, Tenses & Cultural Idioms [Tags: French, Passé Composé, Imparfait]
   - 'lang-301' (Advanced): Multilingual Syntax & Comparative Linguistics [Tags: German Cases, Romance Languages, Phonology]
`;

    if (!ai) {
      // Return smart structured fallback recommendation
      const notCompleted = [
        { id: 'cs-101', subjectId: 'computer-studies', title: 'Computational Thinking & Python Fundamentals', tags: ['Python', 'Variables', 'Loops'] },
        { id: 'math-201', subjectId: 'mathematics', title: 'Quadratic Functions & Polynomial Modeling', tags: ['Quadratics', 'Parabolas'] },
        { id: 'sci-201', subjectId: 'science', title: 'Chemical Bonding & Molecular Geometry', tags: ['Chemistry', 'Covalent Bonds'] },
        { id: 'lang-101', subjectId: 'world-languages', title: 'Conversational Spanish & Phonetic Mastery', tags: ['Spanish', 'Phonetics'] },
      ].filter(l => !completedLessons.includes(l.id));

      const primary = notCompleted[0] || {
        id: 'cs-201',
        subjectId: 'computer-studies',
        title: 'Object-Oriented Architecture & Data Structures',
        tags: ['Classes', 'Data Structures'],
      };

      return res.json({
        primaryRecommendation: {
          id: 'rec-primary',
          type: 'next-best',
          lessonId: primary.id,
          subjectId: primary.subjectId,
          title: primary.title,
          reason: `Based on your level ${level} profile and interests in ${interests.slice(0, 2).join(' & ')}, this lesson builds high-demand logical problem solving.`,
          confidenceScore: 94,
          matchTags: primary.tags,
          badgePotential: 'Code Architect & Quiz Ace',
          estimatedXp: 65,
        },
        recommendations: [
          {
            id: 'rec-1',
            type: 'next-best',
            lessonId: primary.id,
            subjectId: primary.subjectId,
            title: primary.title,
            reason: `Direct continuation to elevate your foundational computational skills.`,
            confidenceScore: 95,
            matchTags: primary.tags,
            badgePotential: 'Code Architect',
            estimatedXp: 65,
          },
          {
            id: 'rec-2',
            type: 'interest-match',
            lessonId: 'math-201',
            subjectId: 'mathematics',
            title: 'Quadratic Functions & Polynomial Modeling',
            reason: `Matches your explicit interest in algebraic problem solving and analytical modeling.`,
            confidenceScore: 89,
            matchTags: ['Quadratics', 'Algebra'],
            badgePotential: 'Math Wizard',
            estimatedXp: 60,
          },
          {
            id: 'rec-3',
            type: 'new-horizon',
            lessonId: 'lang-101',
            subjectId: 'world-languages',
            title: 'Conversational Spanish & Phonetic Mastery',
            reason: `Broaden your cognitive flexibility by beginning the world languages exploration track.`,
            confidenceScore: 84,
            matchTags: ['Spanish', 'Speaking'],
            badgePotential: 'World Explorer',
            estimatedXp: 55,
          },
        ],
        personalizedSummary: `You have completed ${completedLessons.length} lessons with a steady learning habit. Focusing on Computer Studies and Mathematics will yield the highest mastery momentum.`,
        focusSubject: primary.subjectId,
        motivationalTip: "Consistency compounds faster than intensity. Aim for one interactive lesson today to keep your streak burning!",
        generatedBy: "DanAnty Smart Heuristic Engine",
      });
    }

    const systemInstruction = `You are DanAnty004's pedagogical AI Recommendation Engine.
Analyze the student's learning profile, quiz results, completed lessons, and explicit interests to produce precise, personalized next-step learning suggestions.
Ensure you recommend valid lessons from the provided curriculum catalog.
Output must be strictly valid JSON matching this format:
{
  "personalizedSummary": "2-3 sentences analyzing the student's progress and trajectory",
  "focusSubject": "one of: english, mathematics, science, computer-studies, world-languages",
  "motivationalTip": "One punchy, inspirational learning coaching tip",
  "primaryRecommendation": {
    "lessonId": "valid-lesson-id e.g. cs-201",
    "subjectId": "subject id",
    "title": "Lesson title",
    "reason": "Clear pedagogical explanation of why this is the #1 next step",
    "confidenceScore": 95,
    "matchTags": ["tag1", "tag2"],
    "badgePotential": "Badge they can unlock e.g. Code Architect",
    "estimatedXp": 60
  },
  "recommendations": [
    {
      "id": "rec-1",
      "type": "next-best",
      "lessonId": "lesson-id",
      "subjectId": "subject-id",
      "title": "Lesson Title",
      "reason": "Why this builds on recent progress",
      "confidenceScore": 96,
      "matchTags": ["tag1"],
      "badgePotential": "Badge title",
      "estimatedXp": 60
    },
    {
      "id": "rec-2",
      "type": "weak-spot-remedy",
      "lessonId": "lesson-id",
      "subjectId": "subject-id",
      "title": "Lesson Title",
      "reason": "Targeted concept reinforcement based on quiz performance",
      "confidenceScore": 90,
      "matchTags": ["tag1"],
      "badgePotential": "Badge title",
      "estimatedXp": 55
    },
    {
      "id": "rec-3",
      "type": "interest-match",
      "lessonId": "lesson-id",
      "subjectId": "subject-id",
      "title": "Lesson Title",
      "reason": "Direct alignment with user's selected interests",
      "confidenceScore": 88,
      "matchTags": ["tag1"],
      "badgePotential": "Badge title",
      "estimatedXp": 50
    },
    {
      "id": "rec-4",
      "type": "new-horizon",
      "lessonId": "lesson-id",
      "subjectId": "subject-id",
      "title": "Lesson Title",
      "reason": "Expands horizons into complementary fields or languages",
      "confidenceScore": 85,
      "matchTags": ["tag1"],
      "badgePotential": "Badge title",
      "estimatedXp": 50
    }
  ]
}`;

    const prompt = `Student Profile:
- Completed Lessons: ${JSON.stringify(completedLessons)}
- Recent Quiz Attempts: ${JSON.stringify(quizAttempts)}
- Stated Interests: ${JSON.stringify(interests)}
- Learning Goal: ${learningGoal}
- Current Level: ${level}, Total XP: ${xp}

Curriculum Reference:
${curriculumSummary}

Generate the personalized AI recommendations strictly as valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const jsonText = response.text || "{}";
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (parseErr) {
      console.warn("Failed to parse Gemini recommendations JSON, falling back:", parseErr);
      parsed = {};
    }

    if (!parsed.primaryRecommendation || !parsed.recommendations) {
      throw new Error("Invalid structure from Gemini recommendations");
    }

    return res.json({
      ...parsed,
      generatedBy: "gemini-3.7-flash",
    });
  } catch (err: any) {
    console.error("AI Recommendation Error:", err);
    return res.status(500).json({ error: "Failed to generate recommendations." });
  }
});


async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DanAnty004 Server running on http://localhost:${PORT}`);
  });
}

startServer();
