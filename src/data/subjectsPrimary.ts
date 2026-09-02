import { Subject } from '../types';

export const PRIMARY_SUBJECTS: Subject[] = [
  {
    id: 'primary-math',
    title: 'Primary Mathematics & Numeracy',
    tagline: 'Basic addition, multiplication, fractions, shapes, and word problems.',
    description: 'Designed for Lower & Upper Primary (Grades 1-6): counting, times tables, place values, fractions, perimeter, time, and money arithmetic.',
    category: 'primary',
    applicableClasses: ['lower-primary', 'upper-primary', 'primary', 'general'],
    color: 'indigo',
    lightColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderColor: 'border-indigo-500',
    gradient: 'from-indigo-600 to-blue-600',
    iconName: 'Smile',
    featuredTopics: ['Addition, Subtraction & Times Tables', 'Fractions & Decimals for Kids', '2D & 3D Shapes (Circles, Cubes)', 'Word Problems & Money Math'],
    lessons: [
      {
        id: 'pmath-101',
        subjectId: 'primary-math',
        level: 'beginner',
        title: 'Multiplication Tables & Fast Mental Math Tricks',
        subtitle: 'Skip counting, arrays, and multiplication strategies (1 to 12)',
        durationMinutes: 10,
        xpReward: 40,
        iconName: 'Sparkles',
        tags: ['Times Tables', 'Multiplication', 'Primary Math', 'Mental Math'],
        sections: [
          {
            title: '1. Multiplication as Repeated Addition',
            content: 'Multiplication is simply fast repeated addition!\n\n• $4 \\times 3$ means $4$ groups of $3$: $3 + 3 + 3 + 3 = 12$.\n• **Commutative Property**: $4 \\times 3 = 3 \\times 4 = 12$.\n• **Multiplication by 10**: Just add a zero at the end! (e.g., $7 \\times 10 = 70$).',
            keyTakeaway: 'Mastering your times tables makes all future math, fractions, and division easy.'
          }
        ],
        quiz: [
          {
            id: 'pm101-q1',
            question: 'What is 8 × 7?',
            options: ['56', '54', '48', '64'],
            correctIndex: 0,
            explanation: '8 × 7 = 56.',
            hint: '8 times 5 is 40, plus 16 more.'
          }
        ]
      }
    ]
  },
  {
    id: 'primary-science',
    title: 'Primary Basic Science & Nature',
    tagline: 'Living things, animals, plants, the solar system, senses, and the weather.',
    description: 'Fun, engaging science for young learners: parts of a plant, habitats, five senses, water cycle, light and shadows, and staying healthy.',
    category: 'primary',
    applicableClasses: ['lower-primary', 'upper-primary', 'primary', 'general'],
    color: 'emerald',
    lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-500',
    gradient: 'from-emerald-600 to-green-600',
    iconName: 'Sun',
    featuredTopics: ['The 5 Human Senses', 'Parts of a Plant & Seeds', 'Animals: Mammals, Birds, Fish & Insects', 'The Sun, Earth & Moon'],
    lessons: [
      {
        id: 'psci-101',
        subjectId: 'primary-science',
        level: 'beginner',
        title: 'The Five Human Senses & Organs',
        subtitle: 'Sight, hearing, smell, taste, and touch in everyday life',
        durationMinutes: 8,
        xpReward: 35,
        iconName: 'Eye',
        tags: ['Senses', 'Eyes', 'Ears', 'Human Body'],
        sections: [
          {
            title: '1. How We Explore the World',
            content: 'We use five special sensory organs to perceive our environment:\n\n1. **Eyes (Sight)**: To see colors, shapes, and movement.\n2. **Ears (Hearing)**: To hear music, voices, and bird songs.\n3. **Nose (Smell)**: To smell flowers, rain, and delicious food.\n4. **Tongue (Taste)**: To taste sweet, salty, sour, and bitter flavors.\n5. **Skin (Touch)**: To feel hot, cold, soft, and rough textures.',
            keyTakeaway: 'Our sensory organs send messages to the brain to keep us safe and curious.'
          }
        ],
        quiz: [
          {
            id: 'ps101-q1',
            question: 'Which sense organ do we use to taste sweet and savory foods?',
            options: ['The Tongue', 'The Nose', 'The Skin', 'The Eyes'],
            correctIndex: 0,
            explanation: 'The tongue is covered in taste buds that detect sweet, salty, sour, and bitter flavors.',
            hint: 'The organ in your mouth.'
          }
        ]
      }
    ]
  },
  {
    id: 'primary-english',
    title: 'Primary English & Phonics',
    tagline: 'Phonics, reading stories, spelling, punctuation, and vocabulary.',
    description: 'Build fluent reading and writing: letter sounds, blends, sight words, capitalization, punctuation (periods, question marks), and story comprehension.',
    category: 'primary',
    applicableClasses: ['lower-primary', 'upper-primary', 'primary', 'general'],
    color: 'sky',
    lightColor: 'bg-sky-50 text-sky-700 border-sky-200',
    borderColor: 'border-sky-500',
    gradient: 'from-sky-600 to-indigo-600',
    iconName: 'BookMarked',
    featuredTopics: ['Phonics & Letter Blends', 'Sight Words & Story Reading', 'Capital Letters & Periods', 'Opposites & Rhyming Words'],
    lessons: [
      {
        id: 'peng-101',
        subjectId: 'primary-english',
        level: 'beginner',
        title: 'Capital Letters, Periods & Question Marks',
        subtitle: 'How to start and end sentences correctly',
        durationMinutes: 9,
        xpReward: 35,
        iconName: 'CheckCircle',
        tags: ['Punctuation', 'Sentences', 'Capital Letters', 'Phonics'],
        sections: [
          {
            title: '1. Sentence Rules for Young Writers',
            content: '• **Rule 1**: Every sentence MUST start with a **Capital Letter** (e.g. *The sun is shining*).\n• **Rule 2**: The word "I" is ALWAYS capitalized.\n• **Rule 3**: Put a **Period (.)** at the end of a telling sentence (*The cat sat on the mat.*).\n• **Rule 4**: Put a **Question Mark (?)** at the end of an asking sentence (*Where is my book?*).',
            keyTakeaway: 'Good punctuation tells the reader when to pause and understand your thoughts.'
          }
        ],
        quiz: [
          {
            id: 'pe101-q1',
            question: 'Which punctuation mark belongs at the end of the sentence: "What is your favorite color___"',
            options: ['Question Mark (?)', 'Period (.)', 'Exclamation Mark (!)', 'Comma (,)'],
            correctIndex: 0,
            explanation: 'Since "What is your favorite color" is an asking question, it requires a question mark (?).',
            hint: 'It is a question asking for information.'
          }
        ]
      }
    ]
  },
  {
    id: 'social-studies',
    title: 'Social Studies & Moral Values',
    tagline: 'Family, community, cultural heritage, honesty, and good citizenship.',
    description: 'Learn about family roles, Nigerian and world cultures, traditions, leadership, road safety, environmental cleanliness, and moral ethics.',
    category: 'primary',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'primary', 'jss', 'general'],
    color: 'amber',
    lightColor: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-500',
    gradient: 'from-amber-600 to-orange-600',
    iconName: 'Users',
    featuredTopics: ['The Family (Nuclear vs. Extended)', 'Culture & Traditions', 'Good Citizenship & Honesty', 'Road Safety & Traffic Signs'],
    lessons: [
      {
        id: 'soc-101',
        subjectId: 'social-studies',
        level: 'beginner',
        title: 'The Family Structure: Nuclear & Extended Family',
        subtitle: 'Roles and responsibilities of family members in society',
        durationMinutes: 9,
        xpReward: 35,
        iconName: 'Heart',
        tags: ['Family', 'Community', 'Values', 'Social Studies'],
        sections: [
          {
            title: '1. What is a Family?',
            content: 'A family is a group of people related by blood, marriage, or adoption:\n\n• **Nuclear Family**: Consists of Father, Mother, and their Children.\n• **Extended Family**: Includes Grandparents, Uncles, Aunts, Cousins, Nephews, and Nieces.\n• **Values**: Love, mutual respect, cooperation, sharing, and honesty strengthen the family and the nation.',
            keyTakeaway: 'The family is the first school where children learn values, love, and community responsibility.'
          }
        ],
        quiz: [
          {
            id: 'soc101-q1',
            question: 'A Nuclear Family consists of which members?',
            options: ['Father, Mother, and Children', 'Grandparents and Uncles only', 'Neighbors and Friends', 'Teachers and Classmates'],
            correctIndex: 0,
            explanation: 'A nuclear family is made up of father, mother, and their children.',
            hint: 'The core family unit.'
          }
        ]
      }
    ]
  }
];
