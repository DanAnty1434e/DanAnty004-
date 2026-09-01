import { Subject } from '../types';

export const CURRICULUM_DATA: Subject[] = [
  {
    id: 'english',
    title: 'English & Language Arts',
    tagline: 'Master grammar, critical reading, creative rhetoric, and articulate composition.',
    description: 'Explore foundational sentence architecture, expand high-impact vocabulary, analyze literary masterpieces, and write persuasive essays with confidence.',
    color: 'emerald',
    lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-500',
    gradient: 'from-emerald-500 to-teal-600',
    iconName: 'BookOpen',
    featuredTopics: ['Parts of Speech', 'Active vs. Passive Voice', 'Rhetorical Devices', 'Essay Composition'],
    lessons: [
      {
        id: 'eng-101',
        subjectId: 'english',
        level: 'beginner',
        title: 'Parts of Speech & Dynamic Sentence Structure',
        subtitle: 'The fundamental building blocks of clear communication',
        durationMinutes: 12,
        xpReward: 50,
        iconName: 'PenTool',
        tags: ['Nouns', 'Verbs', 'Adjectives', 'Sentence Mechanics'],
        sections: [
          {
            title: '1. The Core Eight Parts of Speech',
            content: 'Every word in the English language plays a specific role in a sentence. Think of them as the specialized instruments in an orchestra:\n\n' +
              '• **Nouns**: Name a person, place, thing, or concept (*philosopher, laboratory, galaxy, courage*).\n' +
              '• **Pronouns**: Stand in place of nouns (*she, it, they, who*).\n' +
              '• **Verbs**: Express physical actions, occurrences, or states of being (*analyze, accelerates, exists*).\n' +
              '• **Adjectives**: Modify or quantify nouns with sensory detail (*vibrant, microscopic, exponential*).\n' +
              '• **Adverbs**: Describe how, when, where, or to what degree an action occurs (*swiftly, accurately, seldom*).\n' +
              '• **Prepositions**: Position objects in time and space (*beyond, throughout, beneath*).\n' +
              '• **Conjunctions**: Connect clauses, phrases, and ideas (*because, although, nevertheless*).\n' +
              '• **Interjections**: Express spontaneous emotion (*Eureka!, Indeed!*).',
            keyTakeaway: 'Mastering the 8 parts of speech allows you to decode any complex sentence and craft expressive paragraphs.',
            interactiveWidget: {
              type: 'grammar-builder',
              title: 'Interactive Sentence Architect',
              description: 'Drag and organize parts of speech to construct grammatically sound, dynamic sentences.',
              data: {
                targetSentence: 'The curious scientist carefully observed the glowing specimen.',
                tokens: ['The curious', 'scientist', 'carefully', 'observed', 'the glowing', 'specimen'],
                roles: ['Adjective Phrase', 'Subject Noun', 'Adverb', 'Action Verb', 'Modifier', 'Object Noun']
              }
            }
          },
          {
            title: '2. Subject-Verb Agreement & Avoiding Fragments',
            content: 'A complete sentence (independent clause) requires two vital components:\n\n' +
              '1. **A Subject**: The person or thing performing the action.\n' +
              '2. **A Predicate (Verb)**: What the subject is doing or being.\n\n' +
              '⚠️ **Common Pitfall**: Sentence fragments occur when a dependent clause is punctuated like a complete thought (e.g., *"Although the experiment succeeded."* Needs a main clause: *"Although the experiment succeeded, we needed more data."*).',
            keyTakeaway: 'Always verify that singular subjects take singular verbs (*The team runs* vs. *The members run*).'
          }
        ],
        quiz: [
          {
            id: 'eng101-q1',
            question: 'Identify the adverb in the following sentence: "The rover slowly traversed the martian crater."',
            options: ['rover', 'slowly', 'traversed', 'martian'],
            correctIndex: 1,
            explanation: '"Slowly" is an adverb because it modifies the verb "traversed", answering how the rover moved.',
            hint: 'Look for the word describing the manner of the action.'
          },
          {
            id: 'eng101-q2',
            question: 'Which of the following sentences represents a complete, grammatically correct independent clause?',
            options: [
              'Because the telescope was calibrated accurately.',
              'The astronomers observed a distant nebula.',
              'While recording data throughout the evening.',
              'Having calculated the planetary orbital trajectory.'
            ],
            correctIndex: 1,
            explanation: '"The astronomers observed a distant nebula" has both a clear subject (astronomers) and a finite verb (observed), forming a complete thought.',
            hint: 'Check which option does not start with a subordinating conjunction leaving the thought unfinished.'
          },
          {
            id: 'eng101-q3',
            question: 'Which sentence has correct Subject-Verb Agreement?',
            options: [
              'The collection of rare manuscripts were preserved.',
              'The collection of rare manuscripts was preserved.',
              'The collection of rare manuscripts are preserved.',
              'The collection of rare manuscripts being preserved.'
            ],
            correctIndex: 1,
            explanation: 'The true subject is the singular noun "collection" (not the prepositional phrase "of rare manuscripts"), so it takes the singular verb "was".',
            hint: 'Identify the head noun before the prepositional phrase.'
          }
        ]
      },
      {
        id: 'eng-201',
        subjectId: 'english',
        level: 'intermediate',
        title: 'Active Voice, Tone & Rhetorical Precision',
        subtitle: 'Transforming passive prose into punchy, compelling prose',
        durationMinutes: 15,
        xpReward: 75,
        iconName: 'Zap',
        tags: ['Active Voice', 'Syntax Variation', 'Rhetoric', 'Tone'],
        sections: [
          {
            title: '1. Active vs. Passive Voice',
            content: 'In **Active Voice**, the subject performs the action. In **Passive Voice**, the subject receives the action.\n\n' +
              '• **Active**: *Marie Curie discovered radium.* (Direct, energetic, 4 words)\n' +
              '• **Passive**: *Radium was discovered by Marie Curie.* (Indirect, weaker impact, 6 words)\n\n' +
              '💡 **When to use passive voice?** Use passive voice only when the actor is unknown, confidential, or when the focus should intentionally be on the result (*"The ancient artifact was unearthed during excavation"*).',
            keyTakeaway: 'Active voice creates clarity, directness, and momentum in persuasive writing.'
          },
          {
            title: '2. Pacing with Varying Sentence Lengths',
            content: 'Great writers vary their sentence lengths to create rhythm. Short sentences create urgency, tension, and clarity. Long, compound-complex sentences allow for nuanced reasoning and rich imagery.\n\n' +
              '*"This sentence has five words. Here are five more words. Five-word sentences are okay. But several together become monotonous. Listen to what happens when you vary the length... The writing begins to sing."* — Gary Provost',
            keyTakeaway: 'Mix short punchy sentences with structured compound-complex sentences to maintain reader engagement.'
          }
        ],
        quiz: [
          {
            id: 'eng201-q1',
            question: 'Which of the following is written in the ACTIVE voice?',
            options: [
              'The algorithm was designed by the engineering team.',
              'The engineering team designed the algorithm.',
              'A new record was set by the marathon runner.',
              'The project was reviewed thoroughly before launch.'
            ],
            correctIndex: 1,
            explanation: '"The engineering team designed the algorithm" places the actor (engineering team) at the subject position actively doing the action.',
            hint: 'Find the sentence where the doer of the action comes before the verb.'
          },
          {
            id: 'eng201-q2',
            question: 'What is the rhetorical effect of placing a short 3-word sentence immediately after a complex 30-word paragraph?',
            options: [
              'It confuses the grammatical flow of the paper.',
              'It delivers sudden emphasis, dramatic pause, and sharp focus.',
              'It violates formal academic writing conventions.',
              'It indicates an incomplete argument.'
            ],
            correctIndex: 1,
            explanation: 'Sudden brevity after prolonged elaboration creates high-contrast visual and cognitive impact, emphasizing the key takeaway.',
            hint: 'Think about dynamic contrast and rhythm.'
          }
        ]
      },
      {
        id: 'eng-301',
        subjectId: 'english',
        level: 'advanced',
        title: 'Mastering Rhetorical Devices & Argumentative Thesis',
        subtitle: 'Aristotelian appeals, antithesis, and persuasive thesis construction',
        durationMinutes: 20,
        xpReward: 100,
        iconName: 'Award',
        tags: ['Ethos/Pathos/Logos', 'Chiasmus', 'Thesis Statements', 'Critical Analysis'],
        sections: [
          {
            title: '1. The Classical Rhetorical Triangle',
            content: 'Aristotle identified three foundational pillars of persuasion:\n\n' +
              '• **Ethos (Credibility)**: Establishing authority, moral character, and unbiased expertise.\n' +
              '• **Logos (Logic & Evidence)**: Constructing rational syllogisms, empirical data, and sound reasoning.\n' +
              '• **Pathos (Emotional Resonance)**: Evoking empathy, shared human values, and compelling narratives.\n\n' +
              'A truly persuasive essay harmonizes all three without relying on manipulative fallacies.',
            keyTakeaway: 'Persuasive resonance requires balancing empirical rigor (Logos) with ethical credibility (Ethos).'
          },
          {
            title: '2. Sophisticated Stylistic Devices',
            content: 'Elevate your prose with classical stylistic instruments:\n\n' +
              '• **Antithesis**: Juxtaposing contrasting ideas in balanced phrases (*"Speech is silver, but silence is golden"*).\n' +
              '• **Anaphora**: Repetition of a phrase at the beginning of successive clauses to build momentum (*"We shall fight on the beaches, we shall fight on the landing grounds..."*).\n' +
              '• **Chiasmus**: Inverting grammatical structures in successive clauses (*"Ask not what your country can do for you — ask what you can do for your country"*).',
            keyTakeaway: 'Rhetorical figures structure complex arguments into unforgettable insights.'
          }
        ],
        quiz: [
          {
            id: 'eng301-q1',
            question: 'Which rhetorical device is showcased in Neil Armstrong’s quote: "That’s one small step for man, one giant leap for mankind"?',
            options: ['Hyperbole', 'Antithesis', 'Onomatopoeia', 'Synecdoche'],
            correctIndex: 1,
            explanation: 'Antithesis pairs two contrasting concepts ("small step" vs. "giant leap", "man" vs. "mankind") in parallel grammatical balance.',
            hint: 'Notice the deliberate contrast in balanced syntax.'
          },
          {
            id: 'eng301-q2',
            question: 'What makes a thesis statement academically strong and debatable?',
            options: [
              'Stating an indisputable universal fact that everyone agrees with.',
              'Making a specific, provable claim with a roadmap that addresses counterarguments.',
              'Writing a vague broad summary of the entire subject topic.',
              'Using emotional superlatives without citing empirical mechanisms.'
            ],
            correctIndex: 1,
            explanation: 'A strong thesis takes a defined, argumentative stance supported by specific mechanisms, inviting scholarly dialogue.',
            hint: 'A good thesis takes a stance that someone could reasonably argue against.'
          }
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    title: 'Mathematics & Logic',
    tagline: 'From visual arithmetic to algebraic modeling, geometry, and calculus.',
    description: 'Unravel the elegant universal language of numbers, geometric proofs, functional equations, and probabilistic reasoning through step-by-step interactive modeling.',
    color: 'indigo',
    lightColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderColor: 'border-indigo-500',
    gradient: 'from-indigo-500 to-blue-600',
    iconName: 'Calculator',
    featuredTopics: ['Fractions & Ratios', 'Linear Algebra', 'Pythagorean Proofs', 'Quadratic Equations'],
    lessons: [
      {
        id: 'math-101',
        subjectId: 'mathematics',
        level: 'beginner',
        title: 'Fractions, Decimals, Ratios & Number Line Intuition',
        subtitle: 'Building a rock-solid mental model for proportional reasoning',
        durationMinutes: 14,
        xpReward: 50,
        iconName: 'Divide',
        tags: ['Fractions', 'Percentages', 'Ratios', 'Mental Math'],
        sections: [
          {
            title: '1. What Are Fractions Really?',
            content: 'A fraction $\\frac{a}{b}$ represents **$a$ equal parts** of a whole divided into **$b$ parts**.\n\n' +
              '• **Numerator ($a$)**: How many slices of pizza you have.\n' +
              '• **Denominator ($b$)**: The total number of equal slices the entire pizza was cut into.\n\n' +
              '**Equivalence**: Multiplying or dividing both numerator and denominator by the same non-zero number preserves proportion:\n' +
              '$$\\frac{3}{4} = \\frac{3 \\times 2}{4 \\times 2} = \\frac{6}{8} = 0.75 = 75\\%$$',
            keyTakeaway: 'Fractions, decimals, and percentages are simply three different dialects of proportional value.',
            interactiveWidget: {
              type: 'math-grapher',
              title: 'Interactive Slope & Fraction Explorer',
              description: 'Adjust the sliders to see how numerator and denominator transform the graphical scale in real-time.',
              data: {
                initialSlope: 2,
                initialIntercept: 1,
                min: -5,
                max: 5
              }
            }
          },
          {
            title: '2. Addition and Subtraction with Common Denominators',
            content: 'You cannot add quarters to thirds directly because their slice sizes differ. You must convert both fractions to share a **Least Common Denominator (LCD)**:\n\n' +
              '$$\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$$\n\n' +
              'For multiplication, multiply straight across: $\\frac{2}{3} \\times \\frac{5}{7} = \\frac{10}{21}$. For division, multiply by the reciprocal (flip the second fraction): $\\frac{2}{3} \\div \\frac{5}{7} = \\frac{2}{3} \\times \\frac{7}{5} = \\frac{14}{15}$.',
            keyTakeaway: 'Flip and multiply when dividing fractions; find common denominators when adding or subtracting.'
          }
        ],
        quiz: [
          {
            id: 'math101-q1',
            question: 'What is the sum of 2/5 + 1/3 in its simplest fractional form?',
            options: ['3/8', '11/15', '7/15', '3/15'],
            correctIndex: 1,
            explanation: 'The LCD of 5 and 3 is 15. Convert: (2×3)/(5×3) = 6/15, and (1×5)/(3×5) = 5/15. 6/15 + 5/15 = 11/15.',
            hint: 'Find the lowest common multiple of 5 and 3.'
          },
          {
            id: 'math101-q2',
            question: 'A solar charger converts 60% of captured sunlight into battery power. Express 60% as a simplified fraction.',
            options: ['6/10', '3/5', '12/25', '60/1000'],
            correctIndex: 1,
            explanation: '60% = 60/100. Dividing numerator and denominator by their greatest common factor 20 gives 3/5.',
            hint: 'Divide 60 and 100 by their greatest common factor.'
          }
        ]
      },
      {
        id: 'math-201',
        subjectId: 'mathematics',
        level: 'intermediate',
        title: 'Linear Equations & Coordinate Geometry ($y = mx + b$)',
        subtitle: 'Mapping algebraic relationships to geometric lines in the Cartesian plane',
        durationMinutes: 16,
        xpReward: 75,
        iconName: 'TrendingUp',
        tags: ['Slope', 'Y-Intercept', 'Linear Systems', 'Graphing'],
        sections: [
          {
            title: '1. The Anatomy of a Linear Equation',
            content: 'The slope-intercept form represents any non-vertical line:\n\n' +
              '$$y = mx + b$$\n\n' +
              '• **$m$ (Slope)**: The rate of change $\\frac{\\Delta y}{\\Delta x} = \\frac{\\text{Rise}}{\\text{Run}}$. A positive slope tilts upward, a negative slope falls.\n' +
              '• **$b$ (Y-Intercept)**: The exact coordinate $(0, b)$ where the line intersects the vertical y-axis.\n\n' +
              '**Parallel vs. Perpendicular Lines**:\n' +
              '• Parallel lines have identical slopes: $m_1 = m_2$.\n' +
              '• Perpendicular lines have negative reciprocal slopes: $m_1 \\times m_2 = -1$.',
            keyTakeaway: 'The slope measures steepness and direction; the y-intercept anchors the line in Cartesian space.'
          },
          {
            title: '2. Solving Systems of Equations',
            content: 'When two lines intersect on a graph, that single point $(x, y)$ satisfies both equations simultaneously.\n\n' +
              'You can solve linear systems algebraically via **Substitution** or **Elimination**:\n' +
              '1) $y = 2x + 1$\n' +
              '2) $x + y = 7$\n' +
              'Substitute $y$ into equation 2: $x + (2x + 1) = 7 \\implies 3x + 1 = 7 \\implies 3x = 6 \\implies x = 2$.\n' +
              'Substitute $x = 2$ back: $y = 2(2) + 1 = 5$. The solution is $(2, 5)$.',
            keyTakeaway: 'The solution to a system of equations is the unique coordinates where the paths cross.'
          }
        ],
        quiz: [
          {
            id: 'math201-q1',
            question: 'What is the slope of a line that is perpendicular to the line y = 3x - 4?',
            options: ['3', '-3', '-1/3', '1/3'],
            correctIndex: 2,
            explanation: 'Perpendicular lines have negative reciprocal slopes. The negative reciprocal of 3 is -1/3.',
            hint: 'Flip the fraction and change the positive/negative sign.'
          },
          {
            id: 'math201-q2',
            question: 'If a line passes through (0, -3) and (2, 5), what is its equation in slope-intercept form?',
            options: ['y = 4x - 3', 'y = 2x - 3', 'y = -3x + 4', 'y = 4x + 2'],
            correctIndex: 0,
            explanation: 'Slope m = (5 - (-3)) / (2 - 0) = 8 / 2 = 4. The y-intercept b = -3 from point (0, -3). Hence, y = 4x - 3.',
            hint: 'Calculate rise over run: (y2 - y1) / (x2 - x1).'
          }
        ]
      },
      {
        id: 'math-301',
        subjectId: 'mathematics',
        level: 'advanced',
        title: 'Quadratic Equations, The Discriminant & Parabolic Modeling',
        subtitle: 'Analyzing nonlinear curves, projectile trajectories, and complex roots',
        durationMinutes: 22,
        xpReward: 100,
        iconName: 'Layers',
        tags: ['Quadratic Formula', 'Discriminant', 'Vertex', 'Parabolas'],
        sections: [
          {
            title: '1. Standard Quadratic Form & The Quadratic Formula',
            content: 'A quadratic function has the general form $f(x) = ax^2 + bx + c$ ($a \\neq 0$). Its graph is a symmetrical U-shaped curve called a **parabola**.\n\n' +
              'To find where the parabola crosses the x-axis ($f(x) = 0$), use the **Quadratic Formula**:\n\n' +
              '$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n' +
              'The vertex (maximum or minimum point) occurs at $x = -\\frac{b}{2a}$.',
            keyTakeaway: 'The quadratic formula finds the exact roots of any second-degree polynomial.'
          },
          {
            title: '2. The Discriminant ($D = b^2 - 4ac$)',
            content: 'The quantity underneath the square root symbol determines the nature of the roots:\n\n' +
              '• **$D > 0$**: Two distinct real roots (parabola crosses x-axis twice).\n' +
              '• **$D = 0$**: Exactly one real repeated root (parabola touches x-axis at its vertex).\n' +
              '• **$D < 0$**: Zero real roots (two complex conjugate roots; parabola never touches x-axis).',
            keyTakeaway: 'Evaluating $b^2 - 4ac$ reveals root behavior without computing the full formula.'
          }
        ],
        quiz: [
          {
            id: 'math301-q1',
            question: 'For the quadratic equation x² - 6x + 9 = 0, what is the value of the discriminant, and how many real roots exist?',
            options: [
              'D = 72, two real roots',
              'D = 0, exactly one real repeated root',
              'D = -36, zero real roots',
              'D = 9, two real roots'
            ],
            correctIndex: 1,
            explanation: 'D = b² - 4ac = (-6)² - 4(1)(9) = 36 - 36 = 0. When D = 0, there is exactly one unique real root (x = 3).',
            hint: 'Calculate (-6)² - 4(1)(9).'
          },
          {
            id: 'math301-q2',
            question: 'What is the x-coordinate of the vertex of the parabola y = 2x² - 8x + 5?',
            options: ['x = 4', 'x = 2', 'x = -2', 'x = 8'],
            correctIndex: 1,
            explanation: 'The x-coordinate of the vertex is x = -b / (2a) = -(-8) / (2 × 2) = 8 / 4 = 2.',
            hint: 'Use the formula x = -b / (2a).'
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    title: 'Natural & Applied Science',
    tagline: 'Discover the laws of the universe: physics, chemistry, biology, and ecology.',
    description: 'Explore the fundamental forces of nature, atomic bonding, cellular biology, ecosystems, and planetary science through interactive simulations and real-world experiments.',
    color: 'sky',
    lightColor: 'bg-sky-50 text-sky-700 border-sky-200',
    borderColor: 'border-sky-500',
    gradient: 'from-sky-500 to-blue-600',
    iconName: 'FlaskConical',
    featuredTopics: ['Ecosystems & Photosynthesis', 'Atomic Bonding', "Newton's Laws", 'DNA & Genetics'],
    lessons: [
      {
        id: 'sci-101',
        subjectId: 'science',
        level: 'beginner',
        title: 'Photosynthesis, Ecosystems & Energy Cycles',
        subtitle: 'How sunlight powers life on Earth and balances the biosphere',
        durationMinutes: 14,
        xpReward: 50,
        iconName: 'Sun',
        tags: ['Biology', 'Photosynthesis', 'Ecology', 'Food Chains'],
        sections: [
          {
            title: '1. The Biochemical Magic of Photosynthesis',
            content: 'Plants, algae, and cyanobacteria are Earth’s primary producers. Inside their microscopic **chloroplasts**, the green pigment **chlorophyll** absorbs photon energy from sunlight to synthesize glucose:\n\n' +
              '$$\\text{Carbon Dioxide} + \\text{Water} + \\text{Light Energy} \\longrightarrow \\text{Glucose} + \\text{Oxygen}$$\n' +
              '$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} + h\\nu \\longrightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$\n\n' +
              'This reaction provides both the chemical energy stored in carbohydrates and the atmospheric oxygen necessary for aerobic organisms.',
            keyTakeaway: 'Photosynthesis converts radiant solar energy into stable chemical bonds (glucose).'
          },
          {
            title: '2. Trophic Levels & The 10% Energy Rule',
            content: 'Energy flows through ecosystems in trophic pyramids:\n\n' +
              '1. **Primary Producers** (Plants & Phytoplankton) — 100% baseline energy.\n' +
              '2. **Primary Consumers** (Herbivores e.g., rabbits, deer) — ~10% energy transferred.\n' +
              '3. **Secondary Consumers** (Carnivores/Omnivores e.g., foxes) — ~1% energy.\n' +
              '4. **Apex Predators** (Eagles, Lions) — ~0.1% energy.\n\n' +
              'The remaining 90% of energy at each stage is dissipated as metabolic heat or cellular work.',
            keyTakeaway: 'Because 90% of energy is lost as heat between levels, ecosystems can only sustain a small apex predator population.'
          }
        ],
        quiz: [
          {
            id: 'sci101-q1',
            question: 'What are the two primary outputs (products) generated by the photosynthesis reaction?',
            options: [
              'Carbon Dioxide and Water',
              'Glucose and Oxygen',
              'Methane and Nitrogen',
              'Nitrogen and Carbon Monoxide'
            ],
            correctIndex: 1,
            explanation: 'Photosynthesis uses carbon dioxide, water, and sunlight to produce glucose (sugar for plant fuel) and releases oxygen gas as a byproduct.',
            hint: 'Think about what plants make for energy and what they release for animals to breathe.'
          },
          {
            id: 'sci101-q2',
            question: 'If primary producers in a forest capture 10,000 kJ of solar energy, approximately how much energy reaches the secondary consumers?',
            options: ['1,000 kJ', '100 kJ', '10 kJ', '5,000 kJ'],
            correctIndex: 1,
            explanation: 'Applying the 10% rule twice: Primary consumers get 10% of 10,000 = 1,000 kJ. Secondary consumers get 10% of 1,000 = 100 kJ.',
            hint: 'Apply the 10% rule two steps up the trophic pyramid.'
          }
        ]
      },
      {
        id: 'sci-201',
        subjectId: 'science',
        level: 'intermediate',
        title: "Newton's Three Laws of Motion & Gravitational Dynamics",
        subtitle: 'The universal physical principles governing everything from billiard balls to orbital satellites',
        durationMinutes: 18,
        xpReward: 75,
        iconName: 'Compass',
        tags: ['Physics', 'Forces', 'Kinematics', 'Gravity'],
        sections: [
          {
            title: "1. Newton's Three Universal Laws",
            content: 'Sir Isaac Newton formulated the foundation of classical mechanics in 1687:\n\n' +
              '• **First Law (Inertia)**: An object at rest stays at rest, and an object in uniform motion stays in motion unless acted upon by a net external force.\n' +
              '• **Second Law ($F = ma$)**: Acceleration is directly proportional to net force and inversely proportional to mass ($F_{\\text{net}} = m \\cdot a$).\n' +
              '• **Third Law (Action & Reaction)**: For every action force, there is an equal and opposite reaction force ($F_{A \\to B} = -F_{B \\to A}$).',
            keyTakeaway: 'Force is an interaction that changes an object’s state of momentum; mass resists acceleration.'
          },
          {
            title: '2. Gravity and Weight vs. Mass',
            content: 'Mass is the fundamental quantity of matter in an object (measured in kilograms, unchanging across planets). Weight is the downward gravitational force acting on that mass:\n\n' +
              '$$W = m \\cdot g$$\n\n' +
              'On Earth, $g \\approx 9.8 \\, \\text{m/s}^2$. On the Moon, $g \\approx 1.62 \\, \\text{m/s}^2$. A 60 kg astronaut weighs 588 N on Earth, but only 97 N on the Moon.',
            keyTakeaway: 'Mass remains constant everywhere; weight depends on the local gravitational acceleration $g$.'
          }
        ],
        quiz: [
          {
            id: 'sci201-q1',
            question: 'A spacecraft fires its thrusters in deep interstellar space to reach 10,000 km/h, then turns off its engines. What happens to its velocity?',
            options: [
              'It gradually slows down to a stop due to natural friction.',
              'It continues moving at 10,000 km/h in a straight line indefinitely.',
              'It immediately drops to half its speed.',
              'It accelerates continuously without fuel.'
            ],
            correctIndex: 1,
            explanation: 'According to Newton’s First Law (Inertia), in the vacuum of deep space without opposing net friction, an object maintains its constant velocity.',
            hint: 'In deep space, there is negligible air resistance or friction.'
          },
          {
            id: 'sci201-q2',
            question: 'If a net force of 50 Newtons is applied to an object with a mass of 10 kg, what is its acceleration?',
            options: ['500 m/s²', '5 m/s²', '0.2 m/s²', '40 m/s²'],
            correctIndex: 1,
            explanation: 'Using F = ma, solve for a = F / m = 50 N / 10 kg = 5 m/s².',
            hint: 'Rearrange F = ma to solve for acceleration a.'
          }
        ]
      },
      {
        id: 'sci-301',
        subjectId: 'science',
        level: 'advanced',
        title: 'Atomic Structure, Chemical Bonding & Molecular Orbitals',
        subtitle: 'Covalent, ionic, and metallic bonds shaping material reality',
        durationMinutes: 22,
        xpReward: 100,
        iconName: 'Atom',
        tags: ['Chemistry', 'Electronegativity', 'Valence Electrons', 'Thermodynamics'],
        sections: [
          {
            title: '1. Valence Electrons and Electronegativity',
            content: 'Atoms bond to achieve stable electronic configurations, typically filling their valence shell with 8 electrons (**Octet Rule**).\n\n' +
              '• **Ionic Bonding**: Formed when electrons are completely transferred from a metal to a nonmetal with a large electronegativity difference ($\\Delta EN > 2.0$, e.g., $\\text{Na}^+ \\text{Cl}^-$).\n' +
              '• **Covalent Bonding**: Formed when nonmetal atoms share electron pairs (e.g., $\\text{H}_2\\text{O}$, $\\text{CO}_2$).\n' +
              '• **Polar Covalent Bonding**: Unequal sharing due to moderate electronegativity differences creates partial dipoles ($\\delta^+$ and $\\delta^-$).',
            keyTakeaway: 'Electronegativity differentials dictate whether electrons are transferred, equally shared, or polarized.'
          }
        ],
        quiz: [
          {
            id: 'sci301-q1',
            question: 'Why does water (H2O) exhibit strong surface tension and a high boiling point compared to similar molecules?',
            options: [
              'Because of nonpolar covalent bonds',
              'Because of intermolecular Hydrogen bonding caused by polar O-H dipoles',
              'Because oxygen and hydrogen form an ionic crystal lattice',
              'Because water contains radioactive isotopes'
            ],
            correctIndex: 1,
            explanation: 'Oxygen’s high electronegativity creates strong partial dipoles (δ- on O, δ+ on H), creating robust intermolecular hydrogen bonds.',
            hint: 'Look for hydrogen bonding between polar molecules.'
          }
        ]
      }
    ]
  },
  {
    id: 'computer-studies',
    title: 'Computer Studies & Coding',
    tagline: 'Algorithms, binary logic, web technologies, and software engineering.',
    description: 'Learn how computers compute, master algorithmic thinking, write real Python and JavaScript code, understand database architecture, and explore modern artificial intelligence.',
    color: 'amber',
    lightColor: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-500',
    gradient: 'from-amber-500 to-orange-600',
    iconName: 'Code2',
    featuredTopics: ['Binary & Logic Gates', 'Python & JavaScript', 'Data Structures', 'AI & Cybersecurity'],
    lessons: [
      {
        id: 'cs-101',
        subjectId: 'computer-studies',
        level: 'beginner',
        title: 'Binary Numbers, Bits, Bytes & Boolean Logic',
        subtitle: 'The fundamental language of silicon microchips and digital computation',
        durationMinutes: 12,
        xpReward: 50,
        iconName: 'Cpu',
        tags: ['Binary', 'Logic Gates', 'Hardware Basics', 'Boolean Logic'],
        sections: [
          {
            title: '1. Why Computers Speak in 1s and 0s',
            content: 'Computer processors are made of billions of microscopic semiconductor switches called **transistors**. A transistor can be either ON (electrical current flowing = 1) or OFF (no current = 0).\n\n' +
              '• **Bit**: A single binary digit (0 or 1).\n' +
              '• **Byte**: 8 bits combined ($2^8 = 256$ possible values, from 0 to 255).\n\n' +
              '**Converting Binary to Decimal**:\n' +
              '| $2^7$ (128) | $2^6$ (64) | $2^5$ (32) | $2^4$ (16) | $2^3$ (8) | $2^2$ (4) | $2^1$ (2) | $2^0$ (1) |\n' +
              '|---|---|---|---|---|---|---|---|\n' +
              '| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |\n' +
              '$$1 \\times 8 + 1 \\times 4 + 0 \\times 2 + 1 \\times 1 = 13$$ in decimal!',
            keyTakeaway: 'Binary positional notation uses base 2 powers (1, 2, 4, 8, 16, 32, 64, 128) to encode any number or character.'
          },
          {
            title: '2. The Core Boolean Logic Gates',
            content: 'Logic gates combine binary inputs into logical outputs:\n\n' +
              '• **AND**: Outputs 1 ONLY if both Input A AND Input B are 1.\n' +
              '• **OR**: Outputs 1 if AT LEAST ONE input is 1.\n' +
              '• **NOT (Inverter)**: Flips 1 to 0, and 0 to 1.\n' +
              '• **XOR (Exclusive OR)**: Outputs 1 if inputs are DIFFERENT (one is 1, one is 0).',
            keyTakeaway: 'Complex microprocessors are constructed from billions of interconnected elementary logic gates.'
          }
        ],
        quiz: [
          {
            id: 'cs101-q1',
            question: 'What is the decimal equivalent of the 8-bit binary number 00010110?',
            options: ['22', '18', '26', '14'],
            correctIndex: 0,
            explanation: 'Positional values: 16 (from 2^4) + 4 (from 2^2) + 2 (from 2^1) = 16 + 4 + 2 = 22.',
            hint: 'Sum the values for 2⁴, 2², and 2¹.'
          },
          {
            id: 'cs101-q2',
            question: 'If Input A is 1 and Input B is 0, what is the output of an XOR (Exclusive OR) gate?',
            options: ['0', '1', 'Undefined', 'Both 0 and 1'],
            correctIndex: 1,
            explanation: 'An XOR gate outputs 1 when its inputs are different (one true, one false). Since 1 ≠ 0, output is 1.',
            hint: 'XOR outputs true when inputs are strictly different.'
          }
        ]
      },
      {
        id: 'cs-201',
        subjectId: 'computer-studies',
        level: 'intermediate',
        title: 'Programming Fundamentals: Variables, Loops & Functions',
        subtitle: 'Writing clear algorithmic code with interactive execution in the browser',
        durationMinutes: 18,
        xpReward: 75,
        iconName: 'Terminal',
        tags: ['Python', 'Loops', 'Conditionals', 'Functions'],
        sections: [
          {
            title: '1. Variables and Data Types',
            content: 'In code, variables store values in memory:\n\n' +
              '```python\n' +
              'student_name = "DanAnty Scholar"  # String (text)\n' +
              'score = 95                         # Integer\n' +
              'accuracy = 0.95                    # Float\n' +
              'is_enrolled = True                 # Boolean\n' +
              'subjects = ["Math", "Science"]    # List / Array\n' +
              '```',
            keyTakeaway: 'Variables hold labeled data in memory that can be manipulated by functions and control structures.',
            interactiveWidget: {
              type: 'code-playground',
              title: 'Live Interactive Code Sandbox',
              description: 'Edit, run, and experiment with real code in real-time right inside your browser.',
              data: {
                initialCode: `// DanAnty004 Interactive Code Sandbox\nfunction calculateGrade(score) {\n  if (score >= 90) return "🌟 Grade: A (Mastery)";\n  if (score >= 80) return "👍 Grade: B (Proficient)";\n  if (score >= 70) return "📚 Grade: C (Developing)";\n  return "💪 Keep practicing!";\n}\n\nconst testScores = [95, 82, 68, 100];\ntestScores.forEach(s => console.log(\`Score \${s} -> \${calculateGrade(s)}\`));`
              }
            }
          },
          {
            title: '2. Loops and Algorithmic Flow',
            content: 'Loops allow machines to repeat instructions thousands of times without human error:\n\n' +
              '• **For Loops**: Used when you know how many iterations to perform (e.g. iterating over a list of students).\n' +
              '• **While Loops**: Used when repeating until a specific condition changes.\n\n' +
              'Functions package reusable logic into clean, modular blocks with parameters and return values.',
            keyTakeaway: 'Modularity and abstraction through functions make software maintainable, testable, and scalable.'
          }
        ],
        quiz: [
          {
            id: 'cs201-q1',
            question: 'What will be the output of the following Python snippet?\n\ntotal = 0\nfor i in [1, 2, 3, 4]:\n    total += i\nprint(total)',
            options: ['10', '24', '4', '0'],
            correctIndex: 0,
            explanation: 'The loop adds each item to total: 0 + 1 = 1, 1 + 2 = 3, 3 + 3 = 6, 6 + 4 = 10. The output is 10.',
            hint: 'Trace the cumulative sum of 1 + 2 + 3 + 4.'
          },
          {
            id: 'cs201-q2',
            question: 'What is the primary benefit of writing reusable functions instead of copying and pasting code blocks?',
            options: [
              'It makes the file size strictly zero bytes.',
              'It avoids duplication, reduces bugs, and simplifies updates in one central place.',
              'It allows computers to run without memory.',
              'It forces code to execute backwards.'
            ],
            correctIndex: 1,
            explanation: 'Functions enforce the DRY (Don’t Repeat Yourself) principle, ensuring changes only need to be made in one place.',
            hint: 'Think about software maintenance and debugging.'
          }
        ]
      },
      {
        id: 'cs-301',
        subjectId: 'computer-studies',
        level: 'advanced',
        title: 'Data Structures, Big-O Notation & AI Architectures',
        subtitle: 'Computational complexity, binary search trees, and neural networks',
        durationMinutes: 24,
        xpReward: 100,
        iconName: 'Network',
        tags: ['Big-O', 'Hash Tables', 'Graphs', 'Machine Learning'],
        sections: [
          {
            title: '1. Big-O Complexity and Algorithmic Efficiency',
            content: 'Big-O notation classifies algorithms according to how their run time or space requirements grow as the input size $n$ grows:\n\n' +
              '• **$O(1)$ Constant**: Instant lookup in a Hash Table (Dictionary).\n' +
              '• **$O(\\log n)$ Logarithmic**: Binary Search through a sorted array (halving the search space each step).\n' +
              '• **$O(n)$ Linear**: Iterating through an unsorted array once.\n' +
              '• **$O(n \\log n)$ Linearithmic**: Efficient sorting algorithms like Merge Sort and Quick Sort.\n' +
              '• **$O(n^2)$ Quadratic**: Nested loops (e.g. Bubble Sort on large data sets).',
            keyTakeaway: 'Optimizing algorithmic complexity from $O(n^2)$ to $O(n \\log n)$ is what allows modern apps to process billions of records in milliseconds.'
          }
        ],
        quiz: [
          {
            id: 'cs301-q1',
            question: 'How many maximum comparisons does Binary Search take to find an item in a sorted list of 1,000,000 elements?',
            options: ['1,000,000 comparisons', '500,000 comparisons', 'Approximately 20 comparisons', 'Exactly 1 comparison'],
            correctIndex: 2,
            explanation: 'Binary Search has O(log₂ n) complexity. log₂(1,000,000) ≈ 19.93, meaning it takes at most 20 step comparisons!',
            hint: 'Think of powers of 2: 2²⁰ is approximately 1,048,576.'
          }
        ]
      }
    ]
  },
  {
    id: 'world-languages',
    title: 'World Languages & Linguistics',
    tagline: 'Speak, listen, and communicate across Spanish, French, German, Japanese & more.',
    description: 'Immerse yourself in global languages with audio-enabled phonetic pronunciation, essential conversational phrases, grammar conjugation drills, and cultural linguistic insights.',
    color: 'violet',
    lightColor: 'bg-violet-50 text-violet-700 border-violet-200',
    borderColor: 'border-violet-500',
    gradient: 'from-violet-500 to-purple-600',
    iconName: 'Languages',
    featuredTopics: ['Spanish & French Basics', 'Conversational Phrases', 'Pronunciation Audio', 'Grammar Conjugation'],
    lessons: [
      {
        id: 'lang-101',
        subjectId: 'world-languages',
        level: 'beginner',
        title: 'Essential Spanish & French Greetings and Daily Expressions',
        subtitle: 'Listen, practice phonetics, and converse with polite confidence',
        durationMinutes: 12,
        xpReward: 50,
        iconName: 'MessageSquare',
        tags: ['Spanish', 'French', 'Pronunciation', 'Greetings'],
        sections: [
          {
            title: '1. Spanish Essentials (Español)',
            content: 'Spanish is the official language of 20 countries. Here are the core daily greetings:\n\n' +
              '• **¡Hola!** (*OH-lah*) — Hello / Hi\n' +
              '• **Buenos días** (*BWEH-nohs DEE-ahs*) — Good morning\n' +
              '• **Buenas tardes** (*BWEH-nahs TAR-dehs*) — Good afternoon\n' +
              '• **¿Cómo estás?** (*KOH-moh ehs-TAHS*) — How are you? (informal)\n' +
              '• **Muy bien, gracias** (*mooy byehn, GRAH-syahs*) — Very well, thank you\n' +
              '• **Por favor** (*por fah-VOR*) — Please\n' +
              '• **Mucho gusto** (*MOO-choh GOOS-toh*) — Nice to meet you',
            keyTakeaway: 'Spanish vowel sounds (A, E, I, O, U) are pure, consistent, and never diphthongized.',
            interactiveWidget: {
              type: 'language-audio',
              title: 'Interactive Pronunciation Flashcards',
              description: 'Click the speaker button to hear authentic pronunciations and test your speaking ear.',
              data: {
                cards: [
                  { phrase: '¡Hola! ¿Cómo estás?', lang: 'es-ES', translation: 'Hello! How are you?', phonetic: 'OH-lah KOH-moh ehs-TAHS' },
                  { phrase: 'Bonjour, enchanté!', lang: 'fr-FR', translation: 'Hello, delighted to meet you!', phonetic: 'bohn-ZHOOR, ahn-shahn-TAY' },
                  { phrase: 'Guten Tag, wie geht es Ihnen?', lang: 'de-DE', translation: 'Good day, how are you? (formal)', phonetic: 'GOO-ten tahk, vee gayt es EE-nen' },
                  { phrase: 'Konnichiwa, hajimemashite', lang: 'ja-JP', translation: 'Hello, nice to meet you', phonetic: 'kohn-NEE-chee-wah, hah-jee-meh-MAH-shee-teh' }
                ]
              }
            }
          },
          {
            title: '2. French Essentials (Français)',
            content: 'French is renowned for its smooth liaison and melodic flow:\n\n' +
              '• **Bonjour** (*bohn-ZHOOR*) — Good morning / Hello\n' +
              '• **Bonsoir** (*bohn-SWAHR*) — Good evening\n' +
              '• **S’il vous plaît** (*seel voo PLEH*) — Please (formal)\n' +
              '• **Merci beaucoup** (*mehr-SEE boh-KOO*) — Thank you very much\n' +
              '• **Au revoir** (*oh ruh-VWAHR*) — Goodbye',
            keyTakeaway: 'In French, the last consonant of a word is often silent unless followed by a word starting with a vowel (liaison).'
          }
        ],
        quiz: [
          {
            id: 'lang101-q1',
            question: 'How do you politely say "Nice to meet you" in Spanish when introduced to a new person?',
            options: ['Buenos días', 'Mucho gusto', 'Por favor', 'De nada'],
            correctIndex: 1,
            explanation: '"Mucho gusto" literally translates to "Much pleasure" and is the standard phrase for "Nice to meet you".',
            hint: 'It begins with the word for "much/a lot".'
          },
          {
            id: 'lang101-q2',
            question: 'What is the French word for "Thank you very much"?',
            options: ['De rien', 'Merci beaucoup', 'S’il vous plaît', 'Bonne nuit'],
            correctIndex: 1,
            explanation: '"Merci beaucoup" translates directly to "Thank you very much" in French.',
            hint: '"Merci" is thank you; "beaucoup" means a lot.'
          }
        ]
      },
      {
        id: 'lang-201',
        subjectId: 'world-languages',
        level: 'intermediate',
        title: 'German & Japanese: Travel, Directions & Cultural Etiquette',
        subtitle: 'Navigating train stations, ordering cuisine, and honorific communication',
        durationMinutes: 16,
        xpReward: 75,
        iconName: 'Compass',
        tags: ['German', 'Japanese', 'Travel', 'Phrases'],
        sections: [
          {
            title: '1. German Travel & Ordering (Deutsch)',
            content: '• **Wo ist der Bahnhof?** (*voh ist dehr BAHN-hohf*) — Where is the train station?\n' +
              '• **Ich möchte bitte ein Wasser** (*ikh MERKH-tuh BIT-tuh eyn VAHS-ser*) — I would like a water, please.\n' +
              '• **Was kostet das?** (*vahs KOHS-tet dahs*) — How much does that cost?\n' +
              '• **Entschuldigung!** (*ent-SHOOL-dee-goong*) — Excuse me / Pardon me',
            keyTakeaway: 'German compounds long descriptive nouns together logically (e.g. *Krankenhaus* = Sick-house = Hospital).'
          },
          {
            title: '2. Japanese Essentials (日本語)',
            content: '• **Sumimasen** (すみません) — Excuse me / Thank you (acknowledging effort)\n' +
              '• **Kore wa ikura desu ka?** (これはいくらですか) — How much is this?\n' +
              '• **Arigatou gozaimasu** (ありがとうございます) — Thank you very much (polite)\n' +
              '• **O-kaikei o onegaishimasu** (お会計をお願いします) — The bill, please',
            keyTakeaway: 'Japanese relies on honorific prefixes (like *o-* or *go-*) to show respect in social interactions.'
          }
        ],
        quiz: [
          {
            id: 'lang201-q1',
            question: 'In Japanese, what versatile word can be used both to get a waiter’s attention ("Excuse me!") and to apologize for a minor inconvenience?',
            options: ['Sayounara', 'Sumimasen', 'Konbanwa', 'Hai'],
            correctIndex: 1,
            explanation: '"Sumimasen" (すみません) is the polite, multi-purpose Japanese expression for "Excuse me" or "Pardon me".',
            hint: 'It starts with the syllable "Su-".'
          }
        ]
      },
      {
        id: 'lang-301',
        subjectId: 'world-languages',
        level: 'advanced',
        title: 'Comparative Linguistics, Idiomatic Expressions & Fluency',
        subtitle: 'Subjunctive moods, cultural idioms, and polyglot mastery strategies',
        durationMinutes: 20,
        xpReward: 100,
        iconName: 'Globe',
        tags: ['Linguistics', 'Subjunctive', 'Idioms', 'Polyglot'],
        sections: [
          {
            title: '1. The Power of Idioms Across Cultures',
            content: 'Direct word-for-word translation fails when encountering idioms:\n\n' +
              '• **Spanish**: *"Estar en las nubes"* (To be in the clouds) = To daydream.\n' +
              '• **French**: *"Avoir le coup de foudre"* (To have the lightning bolt) = Love at first sight.\n' +
              '• **German**: *"Ich verstehe nur Bahnhof"* (I only understand train station) = It’s all Greek to me / I understand nothing.\n' +
              '• **Japanese**: *"Sarumo ki kara ochiru"* (Even monkeys fall from trees) = Even experts make mistakes.',
            keyTakeaway: 'Mastering cultural idioms is the defining bridge between mechanical grammar and natural conversational fluency.'
          }
        ],
        quiz: [
          {
            id: 'lang301-q1',
            question: 'What does the German idiomatic phrase "Ich verstehe nur Bahnhof" actually mean in everyday conversation?',
            options: [
              'I am purchasing a train ticket.',
              'I do not understand anything being said / It makes no sense to me.',
              'I love traveling across Europe.',
              'The train is arriving late.'
            ],
            correctIndex: 1,
            explanation: 'Literally "I only understand train station", this idiom humorously signifies that the speaker doesn’t understand a single thing being discussed.',
            hint: 'It is the German equivalent of "It\'s all Greek to me".'
          }
        ]
      }
    ]
  }
];
