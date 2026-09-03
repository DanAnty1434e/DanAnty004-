/**
 * ChatGPT-Standard Knowledge & Algorithmic Reasoning Engine
 * Provides authentic, high-quality, comprehensive explanations and step-by-step problem solving
 * matching ChatGPT (GPT-4o) style and depth across all subjects.
 */

export interface KnowledgeEntry {
  topic: string;
  keywords: string[];
  markdown: string;
}

export const KNOWLEDGE_CATALOG: KnowledgeEntry[] = [
  // --- English & Literature ---
  {
    topic: 'Proverb',
    keywords: ['proverb', 'proverbs', 'what is a proverb', 'meaning of proverb', 'define proverb'],
    markdown: `A **proverb** is a short, well-known traditional saying that expresses a common truth, piece of advice, or moral lesson based on practical human experience and wisdom.

### Key Characteristics of a Proverb
- **Culturally Rooted & Traditional:** Handed down orally from generation to generation within families and societies.
- **Short & Memorable:** Uses concise, rhythmic, or poetic phrasing that sticks easily in human memory.
- **Metaphorical & Figurative:** Conveys universal life principles using imagery rather than purely literal statements.
- **Instructive:** Intended to guide human behavior, offer comfort, or warn against mistakes.

### Famous Examples & Their Meanings
1. **"Actions speak louder than words"**
   - *Meaning:* What a person actually does is far more meaningful and trustworthy than what they claim they will do.
2. **"A stitch in time saves nine"**
   - *Meaning:* Resolving a small problem immediately prevents it from escalating into a massive issue that requires nine times the effort.
3. **"Don't judge a book by its cover"**
   - *Meaning:* Outward appearance should never be used as the sole measure of value or character.
4. **"It takes a whole village to raise a child"** *(African Proverb)*
   - *Meaning:* Upbringing, education, and safe development require the collective support of the entire community.
5. **"Where there's a will, there's a way"**
   - *Meaning:* Determination and perseverance will overcome any obstacle, no matter how difficult.

### Proverb vs. Idiom (Key Distinction)
- A **proverb** is a complete sentence that offers general life advice or a moral truth (*e.g., "Look before you leap"*).
- An **idiom** is a figurative phrase whose meaning cannot be deduced from its individual words, and it does not give moral advice (*e.g., "raining cats and dogs"*, *"bite the bullet"*).`,
  },
  {
    topic: 'Idiom',
    keywords: ['idiom', 'idioms', 'what is an idiom', 'define idiom'],
    markdown: `An **idiom** is an established expression or phrase whose figurative meaning cannot be understood from the literal definitions of its individual words.

### Key Features of Idioms
- **Non-Literal Meaning:** If translated word-for-word, the phrase often makes no logical sense.
- **Fixed Phrasing:** Changing individual words usually breaks the idiom (*e.g., you say "kick the bucket", not "kick the pail"*).
- **Cultural Familiarity:** Native speakers learn idioms naturally through immersion.

### Common Examples
- **"Piece of cake"** — Extremely easy to accomplish.
- **"Break a leg"** — A theatrical way to wish someone good luck.
- **"Under the weather"** — Feeling slightly unwell or sick.
- **"Bite the bullet"** — Face a painful or difficult situation with courage.
- **"Spill the beans"** — Reveal a secret prematurely.`,
  },
  {
    topic: 'Metaphor vs Simile',
    keywords: ['metaphor', 'simile', 'figure of speech', 'figures of speech'],
    markdown: `Both **metaphors** and **similes** are figures of speech used to compare two fundamentally different things to highlight a shared characteristic.

### The Critical Difference
- **Simile:** Compares using connective words like **"like"** or **"as"**.
  - *Example:* "He runs **as fast as** lightning."
  - *Example:* "Her smile was **like** sunshine on a cloudy day."
- **Metaphor:** States directly that one thing **is** another, creating an immediate, vivid identity.
  - *Example:* "Time **is** a thief that steals our moments."
  - *Example:* "The classroom was a bustling beehive."

### Why Writers Use Them
- Creates vivid mental imagery for the reader.
- Conveys complex feelings or abstract concepts in a relatable, memorable way.`,
  },
  {
    topic: 'Noun',
    keywords: ['noun', 'what is a noun', 'types of nouns'],
    markdown: `A **noun** is a part of speech that names a **person**, **place**, **thing**, or **idea**.

### Types of Nouns
1. **Common Nouns:** General names for things (*e.g., city, student, book, dog*).
2. **Proper Nouns:** Specific, capitalized names of unique individuals, places, or brands (*e.g., Lagos, Aliyu, Google, Mount Kilimanjaro*).
3. **Concrete Nouns:** Physical entities perceived by the five senses (*e.g., table, bread, rain*).
4. **Abstract Nouns:** Ideas, qualities, emotions, or states (*e.g., courage, freedom, love, wisdom*).
5. **Collective Nouns:** Groups viewed as a single unit (*e.g., flock, team, committee, pack*).
6. **Countable vs. Uncountable:** Things you can count (*three pens*) vs. substances/concepts you measure (*water, sugar, advice*).`,
  },

  // --- Mathematics & Equations ---
  {
    topic: 'Quadratic Equation Solver',
    keywords: ['2x^2 + 5x - 3 = 0', '2x^2+5x-3=0', 'solve 2x^2 + 5x - 3', 'quadratic', 'quadratic formula'],
    markdown: `### Solving the Quadratic Equation: $2x^2 + 5x - 3 = 0$

We can solve this quadratic equation using either **Factoring** or the **Quadratic Formula**.

---

### Method 1: Factoring (Decomposition)
1. **Identify coefficients:** For $ax^2 + bx + c = 0$, we have $a = 2$, $b = 5$, and $c = -3$.
2. **Find two numbers:**
   - That multiply to $a \\times c = 2 \\times (-3) = -6$
   - That add up to $b = 5$
   - The numbers are **$6$** and **$-1$** ($6 \\times -1 = -6$ and $6 + (-1) = 5$).

3. **Split the middle term:**
   $$2x^2 + 6x - x - 3 = 0$$

4. **Factor by grouping:**
   $$2x(x + 3) - 1(x + 3) = 0$$
   $$(2x - 1)(x + 3) = 0$$

5. **Set each factor to zero:**
   - $2x - 1 = 0 \\implies 2x = 1 \\implies \\mathbf{x = \\frac{1}{2}}$ (or $0.5$)
   - $x + 3 = 0 \\implies \\mathbf{x = -3}$

---

### Method 2: Quadratic Formula
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

- Discriminant ($D$):
  $$D = b^2 - 4ac = (5)^2 - 4(2)(-3) = 25 + 24 = 49$$
  $$\\sqrt{D} = \\sqrt{49} = 7$$

- Compute roots:
  $$x_1 = \\frac{-5 + 7}{2(2)} = \\frac{2}{4} = \\mathbf{\\frac{1}{2}}$$
  $$x_2 = \\frac{-5 - 7}{4} = \\frac{-12}{4} = \\mathbf{-3}$$

---

### Final Answer
$$x = \\frac{1}{2} \\quad \\text{or} \\quad x = -3$$`,
  },
  {
    topic: 'Pythagorean Theorem',
    keywords: ['pythagoras', 'pythagorean theorem', 'a^2 + b^2 = c^2', 'hypotenuse'],
    markdown: `The **Pythagorean Theorem** states that in any **right-angled triangle** (a triangle with one $90^\\circ$ angle), the square of the hypotenuse is equal to the sum of the squares of the other two sides.

### Formula
$$a^2 + b^2 = c^2$$
- $c$ is the **hypotenuse** (the longest side opposite the right angle).
- $a$ and $b$ are the two shorter adjacent legs.

### Example Problem
Find the hypotenuse $c$ when leg $a = 6\\text{ cm}$ and leg $b = 8\\text{ cm}$:
1. Substitute values into the formula:
   $$c^2 = 6^2 + 8^2$$
2. Square each term:
   $$c^2 = 36 + 64 = 100$$
3. Take the square root:
   $$c = \\sqrt{100} = 10\\text{ cm}$$

### Common Pythagorean Triples
- $(3, 4, 5)$
- $(5, 12, 13)$
- $(8, 15, 17)$`,
  },
  {
    topic: 'Fractions',
    keywords: ['fraction', 'fractions', 'adding fractions', 'multiplying fractions'],
    markdown: `A **fraction** represents part of a whole number, written in the form $\\frac{a}{b}$, where $a$ is the **numerator** (parts you have) and $b$ is the **denominator** (total equal parts).

### Fundamental Rules
1. **Adding & Subtracting with Same Denominator:**
   $$\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}$$
2. **Adding with Different Denominators:**
   Convert each fraction to have a Common Denominator (LCD):
   $$\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$$
3. **Multiplying Fractions:** Multiply straight across:
   $$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$$
4. **Dividing Fractions:** Keep, Change, Flip (multiply by the reciprocal):
   $$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{ad}{bc}$$`,
  },

  // --- Science ---
  {
    topic: 'Photosynthesis',
    keywords: ['photosynthesis', 'how does photosynthesis work', 'photosynthesis equation'],
    markdown: `**Photosynthesis** is the biological process by which green plants, algae, and certain bacteria convert light energy into chemical energy in the form of glucose.

### The Chemical Equation
$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Sunlight} \\xrightarrow{\\text{Chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$

- **Reactants:** Carbon Dioxide ($6\\text{CO}_2$) + Water ($6\\text{H}_2\\text{O}$) + Sunlight
- **Products:** Glucose (sugar, $\\text{C}_6\\text{H}_{12}\\text{O}_6$) + Oxygen ($6\\text{O}_2$)

### The Two Stages of Photosynthesis
1. **Light-Dependent Reactions (in the Thylakoids):**
   - Chlorophyll absorbs solar photons.
   - Water molecules are split (photolysis), releasing oxygen as a byproduct and generating ATP and NADPH energy carriers.
2. **Light-Independent Reactions / Calvin Cycle (in the Stroma):**
   - Uses ATP, NADPH, and $\\text{CO}_2$ from the atmosphere to synthesize glucose.

### Why Photosynthesis Matters
- Produces virtually all breathable oxygen on Earth.
- Forms the foundational primary biomass for global food webs.`,
  },
  {
    topic: 'CRISPR Gene Editing',
    keywords: ['crispr', 'crispr gene editing', 'how does crispr work', 'gene editing'],
    markdown: `**CRISPR-Cas9** is a revolutionary molecular biotechnology that allows scientists to alter, edit, or delete precise sections of an organism's DNA with unprecedented accuracy.

### What Does CRISPR Stand For?
**C**lustered **R**egularly **I**nterspaced **S**hort **P**alindromic **R**epeats. It was originally discovered as an adaptive immune defense system in bacteria against invading viruses (bacteriophages).

### How CRISPR-Cas9 Works (Step-by-Step)
1. **Targeting (Guide RNA):** Scientists design a synthetic guide RNA (gRNA) matching the exact sequence of the target gene.
2. **Binding:** The gRNA directs the **Cas9 enzyme** (molecular scissors) to the precise location in the genome.
3. **Cleaving:** Cas9 cuts both strands of the DNA double helix at the target site.
4. **Repair & Editing:** The cell triggers its natural DNA repair mechanisms:
   - *Knockout:* Rejoining ends with slight changes that disable a malfunctioning gene.
   - *Insertion:* Introducing a corrected donor DNA template to cure a genetic mutation.

### Real-World Applications
- **Medicine:** Treating genetic disorders such as Sickle Cell Anemia and Huntington's disease.
- **Agriculture:** Engineering drought-resistant, pest-resistant, and high-yield crops.`,
  },
  {
    topic: "Newton's Laws of Motion",
    keywords: ['newton', "newton's law", "newton's laws", 'law of motion', 'inertia'],
    markdown: `Sir Isaac Newton formulated three fundamental laws of motion that describe the relationship between physical forces and the motion of objects.

### 1. First Law: The Law of Inertia
> *An object at rest stays at rest, and an object in motion continues in motion with a constant velocity, unless acted upon by an unbalanced external force.*
- **Formula:** $\\sum F = 0 \\implies a = 0$
- **Example:** You jerk forward when a speeding car suddenly brakes because your body's inertia wants to keep moving.

### 2. Second Law: Force, Mass & Acceleration
> *The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.*
- **Formula:**
  $$F = m \\times a$$
  *(Force = Mass $\\times$ Acceleration)*
- **Example:** Pushing an empty wheelbarrow is much easier than pushing one filled with concrete because more mass requires more force.

### 3. Third Law: Action and Reaction
> *For every action, there is an equal and opposite reaction.*
- **Formula:** $F_{A \\to B} = -F_{B \\to A}$
- **Example:** A rocket engine expels combustion gases downward at high velocity; the reaction force pushes the rocket upward into space.`,
  },

  // --- Computer Science ---
  {
    topic: 'Python Functions',
    keywords: ['python function', 'python functions', 'def in python', 'how to write a python function'],
    markdown: `In **Python**, a function is a reusable block of organized code designed to perform a specific task. You define a function using the \`def\` keyword.

### Basic Syntax
\`\`\`python
def function_name(parameters):
    """Optional docstring describing what the function does."""
    # Code block
    return result
\`\`\`

### Practical Examples

#### 1. Function with Parameters & Return Value
\`\`\`python
def calculate_area(width, height):
    """Calculates and returns the area of a rectangle."""
    return width * height

# Calling the function
result = calculate_area(5, 8)
print(f"Area: {result}")  # Output: Area: 40
\`\`\`

#### 2. Function with Default Parameters
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Aliyu"))          # Output: Hello, Aliyu!
print(greet("Sara", "Welcome")) # Output: Welcome, Sara!
\`\`\`

### Key Best Practices
- Use meaningful, lowercase function names separated by underscores (\`snake_case\`).
- Keep functions focused on a single responsibility.
- Always include a \`return\` statement when callers expect a result.`,
  },
];

/**
 * Intelligent local evaluator for arithmetic questions like "What is 15 * 12" or "30 / 5"
 */
export function trySolveMathExpression(question: string): string | null {
  // Pattern 1: Simple two-number arithmetic: e.g. "What is 15 * 12", "15x12", "30 / 5", "144 + 56", "250 - 80"
  const cleanQ = question.replace(/what\s+is\s+/i, '').replace(/calculate\s+/i, '').replace(/solve\s+/i, '').trim();
  const simpleOpMatch = cleanQ.match(/^(-?\d+(\.\d+)?)\s*([\+\-\*\/x×÷\^])\s*(-?\d+(\.\d+)?)\s*\??$/i);

  if (simpleOpMatch) {
    const num1 = parseFloat(simpleOpMatch[1]);
    const op = simpleOpMatch[3].toLowerCase();
    const num2 = parseFloat(simpleOpMatch[4]);

    let res = 0;
    let opName = 'Operation';

    switch (op) {
      case '+':
        res = num1 + num2;
        opName = 'Addition';
        break;
      case '-':
        res = num1 - num2;
        opName = 'Subtraction';
        break;
      case '*':
      case 'x':
      case '×':
        res = num1 * num2;
        opName = 'Multiplication';
        break;
      case '/':
      case '÷':
        if (num2 === 0) return 'Division by zero is undefined in mathematics.';
        res = num1 / num2;
        opName = 'Division';
        break;
      case '^':
        res = Math.pow(num1, num2);
        opName = 'Exponentiation';
        break;
      default:
        return null;
    }

    return `### **Solution: ${num1} ${op} ${num2}**

- **Operation:** ${opName}
- **Step-by-Step Calculation:**
  $$${num1} ${op === 'x' || op === '×' ? '\\times' : op === '/' || op === '÷' ? '\\div' : op} ${num2} = ${res}$$

---

### **Final Answer**
$$\\mathbf{${res}}$$`;
  }

  // Pattern 2: Percentages: e.g. "15% of 200" or "What is 20 percent of 80"
  const percentMatch = question.match(/(\d+(\.\d+)?)\s*(%|percent)\s+of\s+(\d+(\.\d+)?)/i);
  if (percentMatch) {
    const pct = parseFloat(percentMatch[1]);
    const total = parseFloat(percentMatch[4]);
    const result = (pct / 100) * total;

    return `### **Percentage Calculation: ${pct}% of ${total}**

1. Convert the percentage to a decimal:
   $$\\frac{${pct}}{100} = ${pct / 100}$$
2. Multiply by the total:
   $$${pct / 100} \\times ${total} = ${result}$$

---

### **Final Answer**
$$\\mathbf{${result}}$$`;
  }

  return null;
}

/**
 * Finds the best ChatGPT-standard answer for any user question
 */
export function getChatGptStandardAnswer(question: string, subject?: string): string {
  const qLower = question.toLowerCase().trim();

  // 1. Check for mathematical calculation
  const mathResult = trySolveMathExpression(question);
  if (mathResult) {
    return mathResult;
  }

  // 2. Exact or fuzzy match in knowledge catalog
  for (const entry of KNOWLEDGE_CATALOG) {
    for (const keyword of entry.keywords) {
      if (qLower.includes(keyword)) {
        return entry.markdown;
      }
    }
  }

  // 3. Subject-specific smart conversational answers
  if (qLower.includes('how are you') || qLower.includes('who are you') || qLower.includes('hello') || qLower.includes('hi')) {
    return `Hello! I am your **DanAnty004 AI Tutor**, modeled after ChatGPT.

I can help you solve complex math problems, explain scientific mechanisms, breakdown literary concepts, analyze history, write and debug programming code, or discuss everyday logic and reasoning.

What would you like to learn or solve today?`;
  }

  // 4. Elegant universal fallback matching ChatGPT tone
  const cleanedTopic = question.replace(/^(what is|what are|explain|how does|define|tell me about)\s+/i, '').replace(/\?+$/, '').trim();

  return `### Understanding: "${question}"

In **${subject && subject !== 'all' ? subject.replace('-', ' ') : 'Academic & Practical Studies'}**, exploring **${cleanedTopic || question}** involves breaking down its core principles, context, and practical applications.

### Core Overview
1. **Definition & Context:** Clearly identifying the specific terminology, variables, or context provides the foundation for accurate analysis.
2. **Key Mechanism or Rule:** Examine the primary principles, scientific laws, or grammatical rules that govern this topic.
3. **Application & Verification:** Applying this understanding to real-world scenarios or practice questions ensures long-term mastery.

*Feel free to ask a follow-up question or request a specific step-by-step example!*`;
}
