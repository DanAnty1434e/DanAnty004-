import { SubjectId } from '../types';
import { getLiveNetworkStatus, recordDataTransfer } from './networkManager';

export interface StreamTutorOptions {
  question: string;
  subject?: SubjectId | 'all';
  level?: string;
  tone?: 'kids' | 'standard' | 'advanced';
  context?: string;
  onChunk: (chunkText: string, accumulated: string) => void;
  onComplete: (fullText: string) => void;
  onError: (errorMsg: string) => void;
}

// Comprehensive offline instant knowledge bank for zero-data & offline mastery
const INSTANT_KNOWLEDGE_BASE: Record<string, string> = {
  // Mathematics
  pythagoras: "The Pythagorean Theorem states that in a right-angled triangle, **$a^2 + b^2 = c^2$**, where $c$ is the hypotenuse (the longest side) and $a$ and $b$ are the other two legs.\n\n• **Example:** If $a = 3$ and $b = 4$, then $3^2 + 4^2 = 9 + 16 = 25 = 5^2$, so $c = 5$.\n• **Real-World Application:** Carpenters and engineers use this rule to ensure walls and corners meet at exact 90° angles.",
  fraction: "A fraction represents a part of a whole.\n\n• **Numerator (Top):** How many parts you have.\n• **Denominator (Bottom):** The total number of equal parts in the whole.\n• **Addition Rule:** If denominators match: $\\frac{1}{5} + \\frac{2}{5} = \\frac{3}{5}$. If they differ, find the Least Common Denominator (LCD) first!",
  quadratic: "The Quadratic Formula solves equations of the form **$ax^2 + bx + c = 0$**:\n\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n• The term $b^2 - 4ac$ is the **Discriminant**:\n  - Positive ($>0$): 2 real distinct solutions\n  - Zero ($=0$): 1 repeated real solution\n  - Negative ($<0$): 2 complex/imaginary solutions",
  ratio: "A ratio compares two quantities by division (e.g. 2:3 or $\\frac{2}{3}$).\n\n• **Simplifying Ratios:** Divide both numbers by their Greatest Common Divisor (GCD).\n• **Example:** A mix of 4 cups water and 6 cups flour has a ratio of $4:6 = 2:3$.",

  // Science
  photosynthesis: "Photosynthesis is the biochemical process plants use to convert light energy into chemical energy (glucose).\n\n• **Chemical Equation:**\n$$6CO_2 + 6H_2O + \\text{Sunlight} \\longrightarrow C_6H_{12}O_6 + 6O_2$$\n• **Key Components:** Chlorophyll inside chloroplasts captures red & blue light photons and reflects green light, which is why leaves appear green.",
  gravity: "Gravity is a fundamental natural attraction force between all objects with mass.\n\n• **Newton's Universal Gravitation:** $F = G \\frac{m_1 m_2}{r^2}$\n• **Earth's Gravitational Acceleration ($g$):** approximately $9.8\\text{ m/s}^2$ at sea level.\n• **Fun Fact:** Without gravity, planets would not orbit the sun, and the atmosphere would drift into space!",
  atom: "An atom is the basic building block of all matter in the universe.\n\n• **Protons:** Positively charged particles in the nucleus (+1).\n• **Neutrons:** Neutral particles with no charge (0) in the nucleus.\n• **Electrons:** Negatively charged particles (-1) orbiting in electron shells.\n• The atomic number equals the number of protons.",

  // Computer Science & Programming
  loop: "A loop in programming repeats a block of code until a condition is satisfied.\n\n• **For-Loop:** Used when the number of iterations is known ahead of time:\n  ```python\n  for i in range(5):\n      print(f'Step {i+1}')\n  ```\n• **While-Loop:** Runs as long as a boolean expression evaluates to `True`:\n  ```python\n  while battery_level > 10:\n      operate_sensor()\n  ```",
  variable: "A variable is a named storage container in computer memory holding data that can change during execution.\n\n• **Types:** Integers (`42`), Floating-point (`3.14`), Strings (`'Hello'`), Booleans (`True`/`False`).\n• **Analogy:** Think of a variable as a labeled box on a shelf.",
  recursion: "Recursion is a programming technique where a function calls itself to solve a smaller subproblem.\n\n• **Crucial Rule:** Every recursive function MUST have a **Base Case** to prevent an infinite loop (stack overflow)!",

  // English & Language Arts
  active: "Active vs. Passive Voice in writing:\n\n• **Active Voice:** The subject performs the action directly.\n  *Example:* *“The scientist discovered a new galaxy.”*\n• **Passive Voice:** The subject receives the action.\n  *Example:* *“A new galaxy was discovered by the scientist.”*\n\n**Tip:** Use Active Voice for stronger, crisper, and more energetic sentences!",
  metaphor: "A metaphor is a figure of speech that asserts one thing *is* another thing to suggest a resemblance (without using 'like' or 'as').\n\n• **Metaphor:** *“Time is a thief.”*\n• **Simile (for comparison):** *“Her smile was bright like the morning sun.”*",

  // Spanish Language
  spanish: "Here are essential conversational Spanish building blocks:\n\n1. **¡Hola!** (*OH-lah*) — Hello!\n2. **¿Cómo estás?** (*KOH-moh ehs-TAHS*) — How are you?\n3. **Por favor** (*pohr fah-VOHR*) — Please\n4. **Muchas gracias** (*MOO-chahs GRAH-syahs*) — Thank you very much\n5. **¡Mucho gusto!** (*MOO-choh GOOS-toh*) — Nice to meet you!\n6. **¿Dónde está...?** (*DOHN-deh ehs-TAH*) — Where is...?",
  ser: "In Spanish, both **Ser** and **Estar** mean 'to be':\n\n• **SER (Permanent / Essential Characteristics):** Origin, profession, identity, time (e.g. *“Soy estudiante”*).\n• **ESTAR (Temporary / States & Locations):** Emotions, conditions, physical location (e.g. *“Estoy en la escuela”*).",
};

export async function streamTutorResponse(options: StreamTutorOptions): Promise<void> {
  const { question, subject, level, tone = 'standard', context, onChunk, onComplete, onError } = options;

  const netStatus = getLiveNetworkStatus();
  const isDataSaver = netStatus.saveDataEnabled || netStatus.effectiveType === '2g' || netStatus.effectiveType === '3g';
  const isForcedOffline = !netStatus.isOnline || netStatus.mode === 'offline-only';

  let accumulated = '';
  const requestPayload = JSON.stringify({
    question,
    subject: subject !== 'all' ? subject : undefined,
    level,
    tone,
    context,
    dataSaver: isDataSaver,
  });
  const bytesSent = new Blob([requestPayload]).size;

  // Immediate 0-data offline mode execution
  if (isForcedOffline) {
    const offlineAns = getOfflineAnswer(question, subject);
    // Simulate instantaneous streaming
    const words = offlineAns.split(' ');
    for (let i = 0; i < words.length; i += 4) {
      const chunk = words.slice(i, i + 4).join(' ') + (i + 4 < words.length ? ' ' : '');
      accumulated += chunk;
      onChunk(chunk, accumulated);
    }
    recordDataTransfer(0, 0, new Blob([offlineAns]).size, true);
    onComplete(accumulated);
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutMs = isDataSaver ? 6000 : 12000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch('/api/gemini/tutor-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestPayload,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok || !response.body) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let totalBytesReceived = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (value) {
        totalBytesReceived += value.byteLength;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const jsonStr = trimmed.slice(6);
        if (jsonStr === '[DONE]') {
          recordDataTransfer(totalBytesReceived, bytesSent, isDataSaver ? 650 : 200, false);
          onComplete(accumulated);
          return;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.chunk) {
            accumulated += parsed.chunk;
            onChunk(parsed.chunk, accumulated);
          } else if (parsed.error) {
            throw new Error(parsed.error);
          }
        } catch {
          // non-json lines ignored
        }
      }
    }

    if (accumulated.trim().length > 0) {
      recordDataTransfer(totalBytesReceived, bytesSent, isDataSaver ? 650 : 200, false);
      onComplete(accumulated);
      return;
    }

    throw new Error('Empty response received from stream');
  } catch (err: any) {
    console.warn('Stream connection slow or offline, using robust data fallback:', err);

    // Fallback to standard endpoint
    try {
      const fallbackRes = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestPayload,
      });

      if (!fallbackRes.ok) throw new Error('Standard endpoint failed');
      const data = await fallbackRes.json();
      const answer = data.answer || 'Here is a clear explanation for your question.';
      const bytesIn = new Blob([JSON.stringify(data)]).size;
      recordDataTransfer(bytesIn, bytesSent, isDataSaver ? 400 : 100, false);

      onChunk(answer, answer);
      onComplete(answer);
    } catch {
      // Local Instant Knowledge Base Fallback
      const offlineAns = getOfflineAnswer(question, subject);
      recordDataTransfer(0, bytesSent, new Blob([offlineAns]).size, true);
      onChunk(offlineAns, offlineAns);
      onComplete(offlineAns);
    }
  }
}

function getOfflineAnswer(question: string, subject?: SubjectId | 'all'): string {
  const qLower = question.toLowerCase();
  const matchedKey = Object.keys(INSTANT_KNOWLEDGE_BASE).find((k) => qLower.includes(k));

  if (matchedKey) {
    return (
      INSTANT_KNOWLEDGE_BASE[matchedKey] +
      '\n\n*(⚡ Instant Offline Knowledge Engine • Zero Data Used)*'
    );
  }

  return (
    `### 💡 Concise Explanation for "${question}"\n\n` +
    `**Core Concept:** In **${subject && subject !== 'all' ? subject.replace('-', ' ') : 'this subject'}**, mastering the foundational formulas and definitions empowers rapid problem-solving.\n\n` +
    `• **Key Step 1:** Identify the main principles and problem parameters.\n` +
    `• **Key Step 2:** Apply the standard formula or grammatical rule step-by-step.\n` +
    `• **Key Step 3:** Test with a simple verification check to ensure accuracy.\n\n` +
    `*(⚡ DanAnty004 Offline & Cellular Data Engine is active)*`
  );
}

export async function getInstantQuizFeedback(params: {
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
}): Promise<string> {
  const netStatus = getLiveNetworkStatus();
  const isDataSaver = netStatus.saveDataEnabled;

  if (!netStatus.isOnline || netStatus.mode === 'offline-only') {
    return params.explanation;
  }

  try {
    const payload = JSON.stringify({ ...params, dataSaver: isDataSaver });
    const bytesOut = new Blob([payload]).size;

    const res = await fetch('/api/gemini/quiz-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
    if (!res.ok) throw new Error('Failed to fetch quiz feedback');
    const data = await res.json();
    const bytesIn = new Blob([JSON.stringify(data)]).size;
    recordDataTransfer(bytesIn, bytesOut, isDataSaver ? 300 : 100, false);
    return data.customFeedback || params.explanation;
  } catch {
    return params.explanation;
  }
}

