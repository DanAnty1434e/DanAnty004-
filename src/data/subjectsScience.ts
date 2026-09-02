import { Subject } from '../types';

export const SCIENCE_SUBJECTS: Subject[] = [
  {
    id: 'mathematics',
    title: 'General Mathematics & Algebra',
    tagline: 'From foundational algebra to Euclidean geometry, trigonometry, and calculus.',
    description: 'Master quadratic formulas, circle theorems, logarithms, sequences & series, trigonometry, and probability with step-by-step verified proofs.',
    category: 'sciences',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'undergrad', 'general'],
    color: 'indigo',
    lightColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderColor: 'border-indigo-500',
    gradient: 'from-indigo-600 to-blue-600',
    iconName: 'Calculator',
    featuredTopics: ['Quadratic Equations', 'Trigonometry & SOH-CAH-TOA', 'Circle Theorems', 'Probability & Statistics'],
    lessons: [
      {
        id: 'math-101',
        subjectId: 'mathematics',
        level: 'beginner',
        title: 'Fractions, Decimals, Ratios & Proportional Reasoning',
        subtitle: 'Building a rock-solid mental model for numerical manipulation',
        durationMinutes: 12,
        xpReward: 50,
        iconName: 'Divide',
        tags: ['Fractions', 'Decimals', 'Ratios', 'Percentages'],
        sections: [
          {
            title: '1. Proportional Values & Fractions',
            content: 'A fraction $\\frac{a}{b}$ represents $a$ equal parts out of a total $b$ parts.\n\n• **Equivalent Fractions**: $\\frac{3}{4} = \\frac{6}{8} = 0.75 = 75\\%$.\n• **Addition**: If denominators match, $\\frac{2}{7} + \\frac{3}{7} = \\frac{5}{7}$. If differing, convert to Least Common Denominator (LCD).',
            keyTakeaway: 'Fractions, decimals, and percentages express identical proportional realities.'
          }
        ],
        quiz: [
          {
            id: 'm101-q1',
            question: 'Simplify the fraction: 18 / 24 to its lowest terms.',
            options: ['3/4', '2/3', '4/5', '5/6'],
            correctIndex: 0,
            explanation: 'Divide both 18 and 24 by their greatest common divisor (6): 18÷6 = 3, 24÷6 = 4. Result is 3/4.',
            hint: 'Find the greatest common factor of 18 and 24.'
          }
        ]
      },
      {
        id: 'math-201',
        subjectId: 'mathematics',
        level: 'intermediate',
        title: 'Quadratic Equations & Simultaneous Linear Systems',
        subtitle: 'Factoring, completing the square, and quadratic formula mastery',
        durationMinutes: 16,
        xpReward: 75,
        iconName: 'Sigma',
        tags: ['Algebra', 'Quadratic', 'Factoring', 'Simultaneous Equations'],
        sections: [
          {
            title: '1. The Standard Quadratic Formula',
            content: 'For any quadratic equation $ax^2 + bx + c = 0$ ($a \\neq 0$):\n\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n• **The Discriminant ($D = b^2 - 4ac$)**:\n  - $D > 0$: Two real distinct roots.\n  - $D = 0$: One repeated real root.\n  - $D < 0$: Two complex conjugate roots.',
            keyTakeaway: 'The discriminant reveals the nature of solutions before carrying out the full calculation.'
          }
        ],
        quiz: [
          {
            id: 'm201-q1',
            question: 'Solve for x in: x² - 5x + 6 = 0',
            options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = -1 or x = -6'],
            correctIndex: 0,
            explanation: 'Factoring gives (x - 2)(x - 3) = 0, so x = 2 or x = 3.',
            hint: 'Find two numbers that multiply to 6 and add to -5.'
          }
        ]
      }
    ]
  },
  {
    id: 'further-math',
    title: 'Further Mathematics & Advanced Calculus',
    tagline: 'Pure mathematics, vectors, matrices, differentiation, and integration.',
    description: 'High-level calculus, vector algebra, complex numbers, coordinate geometry, and differential equations designed for SS3, SAT Math, and University STEM.',
    category: 'sciences',
    applicableClasses: ['ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'purple',
    lightColor: 'bg-purple-50 text-purple-700 border-purple-200',
    borderColor: 'border-purple-500',
    gradient: 'from-purple-600 to-indigo-700',
    iconName: 'Activity',
    featuredTopics: ['Calculus Differentiation', 'Integration by Parts', 'Matrix Determinants', 'Vector Mechanics'],
    lessons: [
      {
        id: 'fmath-101',
        subjectId: 'further-math',
        level: 'advanced',
        title: 'Calculus: Derivatives, Tangents & Critical Points',
        subtitle: 'Rates of change, product rule, quotient rule, and chain rule',
        durationMinutes: 18,
        xpReward: 90,
        iconName: 'TrendingUp',
        tags: ['Calculus', 'Derivatives', 'Chain Rule', 'Optimization'],
        sections: [
          {
            title: '1. Differentiation Foundations',
            content: 'The derivative $\\frac{dy}{dx}$ measures instantaneous rate of change:\n\n• **Power Rule**: $\\frac{d}{dx}(x^n) = n x^{n-1}$\n• **Product Rule**: $\\frac{d}{dx}(uv) = u \\frac{dv}{dx} + v \\frac{du}{dx}$\n• **Chain Rule**: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$',
            keyTakeaway: 'Derivatives allow finding optimal maximum and minimum points in engineering and physical dynamics.'
          }
        ],
        quiz: [
          {
            id: 'fm101-q1',
            question: 'Find the derivative of f(x) = 3x⁴ - 5x² + 2.',
            options: ['12x³ - 10x', '12x³ - 10x + 2', '7x³ - 7x', '6x³ - 10x'],
            correctIndex: 0,
            explanation: 'f\'(x) = 3(4x³) - 5(2x) + 0 = 12x³ - 10x.',
            hint: 'Apply the power rule to each term individually.'
          }
        ]
      }
    ]
  },
  {
    id: 'physics',
    title: 'Physics & Applied Mechanics',
    tagline: 'Forces, motion, thermodynamics, optics, electricity, and quantum mechanics.',
    description: 'Explore kinematics, Newton\'s laws of motion, wave phenomena, electromagnetic fields, nuclear physics, and cosmological relativity.',
    category: 'sciences',
    applicableClasses: ['jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'cyan',
    lightColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    borderColor: 'border-cyan-500',
    gradient: 'from-cyan-600 to-blue-700',
    iconName: 'Atom',
    featuredTopics: ['Newtonian Kinematics', 'Ohm\'s Law & Circuits', 'Wave Optics', 'Nuclear Reactions'],
    lessons: [
      {
        id: 'phys-101',
        subjectId: 'physics',
        level: 'intermediate',
        title: 'Kinematics & Newton’s Three Laws of Motion',
        subtitle: 'Force, momentum, acceleration, and gravitational energy',
        durationMinutes: 15,
        xpReward: 70,
        iconName: 'Zap',
        tags: ['Kinematics', 'Newton\'s Laws', 'Friction', 'Velocity'],
        sections: [
          {
            title: '1. Newton\'s Laws in Action',
            content: '• **First Law (Inertia)**: An object remains at rest or in uniform velocity unless acted upon by an external net force.\n• **Second Law ($F = ma$)**: Force equals mass multiplied by acceleration.\n• **Third Law**: For every action force, there is an equal and opposite reaction force acting on a different body.',
            keyTakeaway: 'Forces always occur in matched interaction pairs across interacting bodies.'
          }
        ],
        quiz: [
          {
            id: 'p101-q1',
            question: 'What net force is required to accelerate a 5 kg mass at 4 m/s²?',
            options: ['20 N', '9 N', '1.25 N', '25 N'],
            correctIndex: 0,
            explanation: 'F = m × a = 5 kg × 4 m/s² = 20 N.',
            hint: 'Use the formula F = m × a.'
          }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    title: 'Chemistry & Molecular Science',
    tagline: 'Atomic structure, stoichiometry, chemical bonding, and organic synthesis.',
    description: 'Investigate the periodic table, acid-base neutralization, redox reactions, thermodynamics, IUPAC organic nomenclature, and reaction rates.',
    category: 'sciences',
    applicableClasses: ['jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'emerald',
    lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-500',
    gradient: 'from-emerald-600 to-teal-700',
    iconName: 'FlaskConical',
    featuredTopics: ['Periodic Table Trends', 'Chemical Bonding', 'Acids, Bases & pH', 'Hydrocarbons & IUPAC'],
    lessons: [
      {
        id: 'chem-101',
        subjectId: 'chemistry',
        level: 'intermediate',
        title: 'The Periodic Table & Chemical Bonding',
        subtitle: 'Ionic, covalent, metallic bonding and octet electronic stability',
        durationMinutes: 14,
        xpReward: 65,
        iconName: 'Share2',
        tags: ['Periodic Table', 'Ionic Bond', 'Covalent Bond', 'Electronegativity'],
        sections: [
          {
            title: '1. Electronic Configuration & The Octet Rule',
            content: 'Atoms bond to achieve stable valence electron octets (8 valence electrons):\n\n• **Ionic Bonding**: Transfer of electrons from metal (cation) to non-metal (anion) (e.g. $NaCl$).\n• **Covalent Bonding**: Mutual sharing of electron pairs between non-metals (e.g. $H_2O, CO_2$).\n• **Metallic Bonding**: Positive metal ions embedded in a sea of delocalized valence electrons.',
            keyTakeaway: 'Valence electron interactions dictate chemical properties and macroscopic material states.'
          }
        ],
        quiz: [
          {
            id: 'c101-q1',
            question: 'Which type of bond involves the complete transfer of electrons from a metal to a non-metal?',
            options: ['Ionic Bond', 'Covalent Bond', 'Hydrogen Bond', 'Metallic Bond'],
            correctIndex: 0,
            explanation: 'Ionic bonding forms through electrostatic attraction after the complete transfer of electrons.',
            hint: 'Think of table salt (NaCl) formation.'
          }
        ]
      }
    ]
  },
  {
    id: 'biology',
    title: 'Biology & Life Sciences',
    tagline: 'Cellular biology, human physiology, genetics, ecology, and evolution.',
    description: 'Understand the architecture of life from organelles and photosynthesis to circulatory systems, DNA replication, inheritance, and biodiversity.',
    category: 'sciences',
    applicableClasses: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'green',
    lightColor: 'bg-green-50 text-green-700 border-green-200',
    borderColor: 'border-green-500',
    gradient: 'from-green-600 to-emerald-700',
    iconName: 'Dna',
    featuredTopics: ['Cell Structure & Organelles', 'Photosynthesis & Respiration', 'Mendelian Genetics', 'Ecology & Food Webs'],
    lessons: [
      {
        id: 'bio-101',
        subjectId: 'biology',
        level: 'intermediate',
        title: 'Cell Biology: Plant vs. Animal Cells',
        subtitle: 'Nucleus, mitochondria, chloroplasts, and cell membrane transport',
        durationMinutes: 13,
        xpReward: 60,
        iconName: 'ShieldCheck',
        tags: ['Cells', 'Organelles', 'Mitochondria', 'Plant Cells'],
        sections: [
          {
            title: '1. Cell Organelles and Functions',
            content: '• **Nucleus**: Contains DNA and controls cellular metabolic instructions.\n• **Mitochondria**: The powerhouses of the cell that generate ATP via cellular respiration.\n• **Chloroplasts**: Organelles in plant cells containing chlorophyll for photosynthesis.\n• **Cell Wall**: Rigid cellulose boundary found in plant cells but absent in animal cells.',
            keyTakeaway: 'Cells are the fundamental structural and functional units of all living organisms.'
          }
        ],
        quiz: [
          {
            id: 'b101-q1',
            question: 'Which organelle is responsible for generating energy in the form of ATP?',
            options: ['Mitochondrion', 'Ribosome', 'Golgi Apparatus', 'Endoplasmic Reticulum'],
            correctIndex: 0,
            explanation: 'The mitochondrion is known as the cellular powerhouse where aerobic respiration produces ATP.',
            hint: 'Often called the powerhouse of the cell.'
          }
        ]
      }
    ]
  },
  {
    id: 'agricultural-science',
    title: 'Agricultural Science & Farming',
    tagline: 'Crop husbandry, animal science, soil fertility, and agricultural economics.',
    description: 'Learn sustainable crop production, agronomy, soil chemistry, farm mechanization, livestock breeding, and agribusiness management.',
    category: 'sciences',
    applicableClasses: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'general'],
    color: 'lime',
    lightColor: 'bg-lime-50 text-lime-800 border-lime-200',
    borderColor: 'border-lime-500',
    gradient: 'from-lime-600 to-green-700',
    iconName: 'Sprout',
    featuredTopics: ['Soil Fertility & Soil Types', 'Crop Production & Pest Control', 'Livestock Husbandry', 'Farm Mechanization'],
    lessons: [
      {
        id: 'agric-101',
        subjectId: 'agricultural-science',
        level: 'intermediate',
        title: 'Soil Science: Types, Texture & Nutrient Management',
        subtitle: 'Sandy, clayey, and loamy soils with NPK fertilization strategies',
        durationMinutes: 12,
        xpReward: 55,
        iconName: 'Layers',
        tags: ['Soil Types', 'Loam', 'Fertilizer', 'Agriculture'],
        sections: [
          {
            title: '1. Classification of Soil Types',
            content: '• **Sandy Soil**: Large particles, high aeration, rapid drainage, low nutrient retention.\n• **Clay Soil**: Fine particles, high water-holding capacity, poor aeration, sticky when wet.\n• **Loamy Soil**: Balanced mixture of sand, silt, clay, and organic matter (humus). Best soil for general agricultural cultivation!',
            keyTakeaway: 'Loam soil provides optimal aeration, water retention, and mineral availability for plant roots.'
          }
        ],
        quiz: [
          {
            id: 'ag101-q1',
            question: 'Which soil type is most suitable for cultivating most agricultural crops?',
            options: ['Loamy Soil', 'Sandy Soil', 'Pure Clay Soil', 'Gravel'],
            correctIndex: 0,
            explanation: 'Loamy soil has balanced drainage, rich organic humus content, and great water retention for healthy roots.',
            hint: 'It is a balanced mix of sand, silt, and clay.'
          }
        ]
      }
    ]
  },
  {
    id: 'computer-studies',
    title: 'Computer Science, Coding & ICT',
    tagline: 'Algorithms, Python programming, web development, data structures, and AI.',
    description: 'Learn algorithmic problem solving, Python coding, data structures, hardware architecture, computer networking, cybersecurity, and artificial intelligence.',
    category: 'sciences',
    applicableClasses: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'blue',
    lightColor: 'bg-blue-50 text-blue-700 border-blue-200',
    borderColor: 'border-blue-500',
    gradient: 'from-blue-600 to-indigo-700',
    iconName: 'Terminal',
    featuredTopics: ['Python Programming Basics', 'Data Structures & Algorithms', 'Web Development', 'Computer Networks & Security'],
    lessons: [
      {
        id: 'cs-101',
        subjectId: 'computer-studies',
        level: 'beginner',
        title: 'Computational Logic, Variables & Control Flow in Python',
        subtitle: 'Variables, conditional if-else statements, and loops',
        durationMinutes: 14,
        xpReward: 60,
        iconName: 'Code',
        tags: ['Python', 'Variables', 'Loops', 'Conditionals'],
        sections: [
          {
            title: '1. Variables and Loops in Code',
            content: 'Programming translates human logic into executable machine instructions:\n\n```python\n# Variables & Math\nscore = 100\nbonus = 20\ntotal = score + bonus\n\n# Loop demonstration\nfor i in range(3):\n    print(f"Iteration {i + 1}")\n```\n• **Variables**: Memory containers for storing numbers, strings, and data structures.',
            keyTakeaway: 'Loops automate repetitive tasks efficiently in $O(n)$ time.'
          }
        ],
        quiz: [
          {
            id: 'cs101-q1',
            question: 'What is the output of print(len("Python")) in Python?',
            options: ['6', '5', '7', 'Error'],
            correctIndex: 0,
            explanation: 'The word "Python" contains 6 characters (P-y-t-h-o-n), so len("Python") returns 6.',
            hint: 'Count the number of letters in the word "Python".'
          }
        ]
      }
    ]
  },
  {
    id: 'basic-technology',
    title: 'Basic Technology & Engineering',
    tagline: 'Materials, technical drawing, mechanical drives, and energy systems.',
    description: 'Study wood/metal technology, orthographic projections, gears, belt drives, hydraulics, electricity transmission, and safety practices.',
    category: 'sciences',
    applicableClasses: ['jss1', 'jss2', 'jss3', 'jss', 'general'],
    color: 'amber',
    lightColor: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-500',
    gradient: 'from-amber-600 to-orange-700',
    iconName: 'Wrench',
    featuredTopics: ['Technical Drawing & Projections', 'Wood & Metal Materials', 'Gears & Belt Drives', 'Electrical Energy Safety'],
    lessons: [
      {
        id: 'btech-101',
        subjectId: 'basic-technology',
        level: 'intermediate',
        title: 'Simple Machines, Levers & Mechanical Advantage',
        subtitle: 'First, second, and third-class levers and gear ratios',
        durationMinutes: 12,
        xpReward: 50,
        iconName: 'Tool',
        tags: ['Levers', 'Mechanical Advantage', 'Simple Machines', 'Gears'],
        sections: [
          {
            title: '1. The Three Classes of Levers',
            content: '• **First Class**: Fulcrum is in the middle between Load and Effort (e.g., Scissors, Crowbar, Pliers).\n• **Second Class**: Load is in the middle between Fulcrum and Effort (e.g., Wheelbarrow, Nutcracker).\n• **Third Class**: Effort is in the middle between Fulcrum and Load (e.g., Tweezers, Tongs, Fishing rod).\n\n$$\\text{Mechanical Advantage (MA)} = \\frac{\\text{Load}}{\\text{Effort}}$$',
            keyTakeaway: 'Remember the acronym FLE: 1st has Fulcrum in middle, 2nd has Load, 3rd has Effort.'
          }
        ],
        quiz: [
          {
            id: 'bt101-q1',
            question: 'A wheelbarrow is an example of which class of lever?',
            options: ['Second Class Lever', 'First Class Lever', 'Third Class Lever', 'Compound Pulley'],
            correctIndex: 0,
            explanation: 'In a wheelbarrow, the Load sits in the middle between the wheel (Fulcrum) and the handles (Effort).',
            hint: 'Where is the load positioned in a wheelbarrow?'
          }
        ]
      }
    ]
  },
  {
    id: 'health-science',
    title: 'Health Science & Physical Education',
    tagline: 'Human anatomy, balanced nutrition, hygiene, sports, and first aid.',
    description: 'Explore personal hygiene, disease prevention, balanced diets, cardiovascular exercise, first aid CPR, and physical fitness conditioning.',
    category: 'sciences',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'general'],
    color: 'rose',
    lightColor: 'bg-rose-50 text-rose-700 border-rose-200',
    borderColor: 'border-rose-500',
    gradient: 'from-rose-600 to-red-700',
    iconName: 'HeartPulse',
    featuredTopics: ['Balanced Nutrition & Vitamins', 'First Aid & CPR Procedures', 'Cardiovascular Fitness', 'Communicable Disease Prevention'],
    lessons: [
      {
        id: 'health-101',
        subjectId: 'health-science',
        level: 'beginner',
        title: 'Balanced Nutrition & Food Classes',
        subtitle: 'Carbohydrates, proteins, fats, vitamins, minerals, water and fiber',
        durationMinutes: 10,
        xpReward: 45,
        iconName: 'Activity',
        tags: ['Nutrition', 'Vitamins', 'Health', 'Balanced Diet'],
        sections: [
          {
            title: '1. The 6 Essential Nutrients',
            content: '• **Carbohydrates**: Primary energy source (Rice, Yam, Bread).\n• **Proteins**: Growth and tissue repair (Fish, Eggs, Beans).\n• **Fats & Oils**: Energy storage and organ insulation (Vegetable oil, Butter).\n• **Vitamins**: Immune defense (Vitamin C for immunity, Vitamin A for eyesight).\n• **Minerals**: Bone and blood health (Calcium for bones, Iron for hemoglobin).\n• **Water & Dietary Fiber**: Digestion and metabolism.',
            keyTakeaway: 'A balanced diet provides all essential nutrients in proper physiological proportions.'
          }
        ],
        quiz: [
          {
            id: 'h101-q1',
            question: 'Which nutrient is primarily responsible for the growth and repair of worn-out body tissues?',
            options: ['Proteins', 'Carbohydrates', 'Fats', 'Vitamins'],
            correctIndex: 0,
            explanation: 'Proteins are made of amino acids, the essential building blocks for cellular growth and tissue repair.',
            hint: 'Eggs, beans, and meat are rich in this nutrient.'
          }
        ]
      }
    ]
  }
];
