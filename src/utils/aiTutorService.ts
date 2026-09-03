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
  // Mathematics & Logic
  pythagoras: "🎯 **Exact Answer:** In any right-angled triangle, **$a^2 + b^2 = c^2$**, where $c$ is the hypotenuse and $a, b$ are the adjacent legs.\n\n• **Direct Example:** For legs $a = 3$ and $b = 4$, $c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.\n• **Real-World Application:** Used in construction and engineering to guarantee perfect 90° right angles.",
  fraction: "🎯 **Exact Answer:** A fraction $\\frac{a}{b}$ represents $a$ equal parts out of a total $b$ parts ($a = \\text{Numerator}$, $b = \\text{Denominator}$).\n\n• **Addition Rule:** If denominators match, $\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}$. If they differ, convert to the Least Common Denominator (LCD).",
  quadratic: "🎯 **Exact Answer:** Solutions to $ax^2 + bx + c = 0$ are given by **$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$**.\n\n• **Discriminant Rules ($D = b^2 - 4ac$):**\n  - $D > 0$: 2 real distinct roots\n  - $D = 0$: 1 repeated real root\n  - $D < 0$: 2 complex conjugate roots",
  ratio: "🎯 **Exact Answer:** A ratio $a:b$ is the quantitative comparison of $a$ to $b$ expressed as $\\frac{a}{b}$.\n\n• **Simplifying:** Divide both sides by their Greatest Common Divisor (GCD). E.g., $4:6 = 2:3$.",
  calculus: "🎯 **Exact Answer:** Calculus is the study of continuous change through **Derivatives** (rate of change) and **Integrals** (accumulation of area).\n\n• **Derivative Power Rule:** $\\frac{d}{dx}(x^n) = n x^{n-1}$\n• **Integral Power Rule:** $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$",

  // Science, Physics & Chemistry
  photosynthesis: "🎯 **Exact Answer:** Photosynthesis converts light into glucose: **$6CO_2 + 6H_2O + \\text{Sunlight} \\longrightarrow C_6H_{12}O_6 + 6O_2$**.\n\n• **Process:** Chlorophyll in chloroplasts absorbs solar photons, powering the Calvin cycle to produce energy-rich carbohydrates.",
  gravity: "🎯 **Exact Answer:** Gravity is the universal attractive force between masses, governed by **$F = G \\frac{m_1 m_2}{r^2}$**.\n\n• **Earth's Surface Acceleration ($g$):** $9.81\\text{ m/s}^2$.\n• **Relativity Definition:** Mass and energy warp the 4D geometry of spacetime.",
  atom: "🎯 **Exact Answer:** An atom is the basic unit of a chemical element, consisting of a nucleus (**Protons** $+1$, **Neutrons** $0$) orbited by **Electrons** ($-1$).\n\n• **Atomic Number ($Z$):** Number of protons in the nucleus.",
  dna: "🎯 **Exact Answer:** DNA (Deoxyribonucleic Acid) is a double-helix polymer carrying genetic blueprints with base pairs **A-T** and **C-G**.\n\n• **Function:** Dictates amino acid sequences to synthesize proteins in living cells.",

  // Computer Science & Programming
  loop: "🎯 **Exact Answer:** A loop repeats execution of a code block until a specified termination condition is reached.\n\n```python\n# For-loop (Fixed iterations)\nfor i in range(5):\n    print(i)\n\n# While-loop (Condition-based)\nwhile active:\n    process_task()\n```",
  variable: "🎯 **Exact Answer:** A variable is a named storage address in memory storing mutable or immutable data values (e.g., Integer, Float, String, Boolean).",
  recursion: "🎯 **Exact Answer:** Recursion is when a function calls itself to solve smaller instances of the same problem, ending at a mandatory **Base Case**.",
  algorithm: "🎯 **Exact Answer:** An algorithm is an unambiguous, step-by-step procedure for solving a computational problem in finite time ($O(1), O(\\log n), O(n), O(n \\log n)$).",

  // English, Literature & Languages
  active: "🎯 **Exact Answer:** In **Active Voice**, the subject performs the verb (*“The scientist wrote the code”*). In **Passive Voice**, the subject receives the action (*“The code was written by the scientist”*).",
  metaphor: "🎯 **Exact Answer:** A **Metaphor** states one thing directly *is* another without 'like' or 'as' (*“Time is a river”*), whereas a **Simile** uses comparison words (*“Fast like lightning”*).",
  spanish: "🎯 **Exact Answer:** Core Spanish Essentials:\n\n1. **¡Hola!** = Hello\n2. **¿Cómo estás?** = How are you?\n3. **Por favor** = Please\n4. **Muchas gracias** = Thank you very much\n5. **Sí / No** = Yes / No\n6. **Adiós** = Goodbye",
  hausa: "🎯 **Exact Answer:** Core Hausa Essentials:\n\n1. **Sannu** = Hello\n2. **Ina kwana?** = Good morning\n3. **Lafiya lau** = Fine / Good health\n4. **Na gode** = Thank you\n5. **Yaya aiki?** = How is work?\n6. **Sai an jima** = See you later",

  // History, Geography & Economics
  industrial: "🎯 **Exact Answer:** The Industrial Revolution (circa 1760-1840) transformed agrarian societies into industrialized manufacturing economies through steam power, mechanization, and railways.",
  inflation: "🎯 **Exact Answer:** Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power over time.",

  // Real-World & Practical
  focus: "🎯 **Exact Answer:** The most effective focus framework is the **Pomodoro Protocol**: 25 minutes of deep distraction-free work followed by a 5-minute cognitive rest.",
  airplane: "🎯 **Exact Answer:** Airplanes fly because wings generate **Lift** via pressure differences (Bernoulli's principle and Newton's 3rd Law), overcoming **Weight**, with engines providing **Thrust** against **Drag**.",
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
    const timeoutMs = isDataSaver ? 25000 : 35000;
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
    let streamHadError = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (value) {
        totalBytesReceived += value.byteLength;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;

        const jsonStr = trimmed.replace(/^data:\s*/, '');
        if (jsonStr === '[DONE]') {
          if (accumulated.trim().length > 0) {
            recordDataTransfer(totalBytesReceived, bytesSent, isDataSaver ? 650 : 200, false);
            onComplete(accumulated);
            return;
          }
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.chunk) {
            accumulated += parsed.chunk;
            onChunk(parsed.chunk, accumulated);
          } else if (parsed.error) {
            streamHadError = true;
            console.warn('Stream received error payload:', parsed.error);
          }
        } catch {
          // non-json lines ignored
        }
      }
    }

    if (!streamHadError && accumulated.trim().length > 0) {
      recordDataTransfer(totalBytesReceived, bytesSent, isDataSaver ? 650 : 200, false);
      onComplete(accumulated);
      return;
    }

    throw new Error(streamHadError ? 'Streaming reported server error' : 'Empty stream output');
  } catch (err: any) {
    console.warn('Stream connection slow or offline, using robust data fallback:', err);

    // Fallback to standard endpoint
    try {
      const fallbackRes = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestPayload,
      });

      if (!fallbackRes.ok) throw new Error(`Standard endpoint failed with ${fallbackRes.status}`);
      const data = await fallbackRes.json();
      if (data.error) throw new Error(data.error);

      const answer = data.answer || getOfflineAnswer(question, subject);
      const bytesIn = new Blob([JSON.stringify(data)]).size;
      recordDataTransfer(bytesIn, bytesSent, isDataSaver ? 400 : 100, false);

      onChunk(answer, answer);
      onComplete(answer);
      return;
    } catch (fallbackErr) {
      console.warn('Fallback to local offline knowledge engine:', fallbackErr);
      const offlineAns = getOfflineAnswer(question, subject);
      recordDataTransfer(0, bytesSent, new Blob([offlineAns]).size, true);
      onChunk(offlineAns, offlineAns);
      onComplete(offlineAns);
      return;
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

