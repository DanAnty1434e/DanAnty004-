import { Subject } from '../types';

export const ARTS_SUBJECTS: Subject[] = [
  {
    id: 'english',
    title: 'English Language & Communication',
    tagline: 'Master grammar, reading comprehension, vocabulary, and persuasive writing.',
    description: 'Explore sentence architecture, concords, essay rhetoric, active/passive voice, idioms, and advanced vocabulary.',
    category: 'arts',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'undergrad', 'general'],
    color: 'emerald',
    lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-500',
    gradient: 'from-emerald-600 to-teal-700',
    iconName: 'BookOpen',
    featuredTopics: ['Parts of Speech', 'Subject-Verb Concord', 'Essay Composition', 'Active vs. Passive Voice'],
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
            content: 'Every word plays a distinct role in sentence construction:\n\n• **Nouns**: Name a person, place, or concept.\n• **Pronouns**: Replace nouns (*she, they, which*).\n• **Verbs**: State action or condition (*analyze, runs, is*).\n• **Adjectives**: Modify nouns with vivid detail (*brilliant, immense*).\n• **Adverbs**: Modify verbs, adjectives, or other adverbs (*swiftly, very*).\n• **Prepositions**: Position words in time/space (*under, before, across*).\n• **Conjunctions**: Connect ideas (*and, although, because*).\n• **Interjections**: Spontaneous exclamation (*Eureka!, Alas!*).',
            keyTakeaway: 'Mastering the 8 parts of speech allows constructing articulate and grammatically sound arguments.'
          }
        ],
        quiz: [
          {
            id: 'eng101-q1',
            question: 'Identify the adverb in: "The researcher meticulously reviewed the experimental logs."',
            options: ['meticulously', 'researcher', 'reviewed', 'logs'],
            correctIndex: 0,
            explanation: '"Meticulously" describes the manner in which the verb "reviewed" was performed.',
            hint: 'Look for the word ending in -ly that modifies the action.'
          }
        ]
      }
    ]
  },
  {
    id: 'literature',
    title: 'Literature in English & Drama',
    tagline: 'Prose fiction, dramatic tragedy, poetic meters, and literary criticism.',
    description: 'Analyze African and non-African prose, Shakespearean tragedy, poetic devices (metaphor, hyperbole, alliteration), and thematic analysis.',
    category: 'arts',
    applicableClasses: ['jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'amber',
    lightColor: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-500',
    gradient: 'from-amber-600 to-yellow-700',
    iconName: 'Feather',
    featuredTopics: ['Poetic Devices & Imagery', 'Dramatic Irony & Tragedy', 'Characterization in Prose', 'African Literary Classics'],
    lessons: [
      {
        id: 'lit-101',
        subjectId: 'literature',
        level: 'intermediate',
        title: 'Literary Devices: Figurative Language & Sound Devices',
        subtitle: 'Metaphors, similes, personification, alliteration, and onomatopoeia',
        durationMinutes: 14,
        xpReward: 65,
        iconName: 'Book',
        tags: ['Poetry', 'Metaphor', 'Simile', 'Personification'],
        sections: [
          {
            title: '1. Figures of Speech in Literature',
            content: '• **Simile**: A comparison between two distinct things using "like" or "as" (*"Her voice was as clear as crystal"*).\n• **Metaphor**: A direct figurative equation without "like" or "as" (*"Time is a thief"*).\n• **Personification**: Giving human attributes to inanimate objects (*"The stubborn tree refused to bend"*).\n• **Hyperbole**: Deliberate poetic exaggeration for dramatic effect (*"I have told you a million times"*).\n• **Irony**: A contradiction between expectation and reality.',
            keyTakeaway: 'Figurative language transforms plain writing into deeply evocative art.'
          }
        ],
        quiz: [
          {
            id: 'lit101-q1',
            question: 'Which literary device is used in: "The sea raged with fury throughout the tempest"?',
            options: ['Personification', 'Simile', 'Oxymoron', 'Litotes'],
            correctIndex: 0,
            explanation: 'The sea is attributed human emotional rage, which is personification.',
            hint: 'Is human emotion given to a natural body of water?'
          }
        ]
      }
    ]
  },
  {
    id: 'history',
    title: 'History & World Civilizations',
    tagline: 'Ancient empires, African kingdoms, colonial eras, and modern world affairs.',
    description: 'Explore the Mali & Songhai Empires, ancient Egypt, the Greco-Roman world, the Industrial Revolution, World Wars, and African independence movements.',
    category: 'arts',
    applicableClasses: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'orange',
    lightColor: 'bg-orange-50 text-orange-800 border-orange-200',
    borderColor: 'border-orange-500',
    gradient: 'from-orange-600 to-amber-700',
    iconName: 'Landmark',
    featuredTopics: ['Ancient African Kingdoms', 'The Industrial Revolution', 'World Wars & Decolonization', 'Constitutional History'],
    lessons: [
      {
        id: 'hist-101',
        subjectId: 'history',
        level: 'intermediate',
        title: 'The Great Empires of Western Sudan: Ghana, Mali & Songhai',
        subtitle: 'Trans-Saharan trade, Mansa Musa, and the intellectual legacy of Timbuktu',
        durationMinutes: 15,
        xpReward: 70,
        iconName: 'Crown',
        tags: ['Mali Empire', 'Mansa Musa', 'Timbuktu', 'African History'],
        sections: [
          {
            title: '1. The Wealth and Scholarship of Mali',
            content: 'The Mali Empire flourished from the 13th to 16th century along the Niger River:\n\n• **Trans-Saharan Trade**: Wealth was driven by gold, salt, copper, and agricultural abundance.\n• **Mansa Musa\'s Pilgrimage (1324)**: Put Mali on European and Mediterranean maps with legendary generosity.\n• **University of Sankore in Timbuktu**: A world-renowned center of Islamic jurisprudence, astronomy, and mathematics.',
            keyTakeaway: 'West African empires maintained sophisticated statecraft, trade networks, and global academic centers.'
          }
        ],
        quiz: [
          {
            id: 'h101-q1',
            question: 'Which historic city in the Mali Empire became famous worldwide as a premier center of scholarship and trade?',
            options: ['Timbuktu', 'Carthage', 'Alexandria', 'Zimbabwe'],
            correctIndex: 0,
            explanation: 'Timbuktu, with the Sankore University, was a preeminent center of Islamic learning and manuscript scholarship.',
            hint: 'Home to the famous Sankore Mosque university.'
          }
        ]
      }
    ]
  },
  {
    id: 'government-civics',
    title: 'Government, Civics & Political Science',
    tagline: 'Democracy, constitutions, human rights, rule of law, and international organizations.',
    description: 'Understand democratic governance, separation of powers, arms of government, constitutional development, citizenship rights, and the UN/AU.',
    category: 'arts',
    applicableClasses: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'teal',
    lightColor: 'bg-teal-50 text-teal-700 border-teal-200',
    borderColor: 'border-teal-500',
    gradient: 'from-teal-600 to-emerald-700',
    iconName: 'Scale',
    featuredTopics: ['Separation of Powers & Checks/Balances', 'Forms of Government (Federal vs. Unitary)', 'Fundamental Human Rights', 'Electoral Systems'],
    lessons: [
      {
        id: 'gov-101',
        subjectId: 'government-civics',
        level: 'intermediate',
        title: 'The Three Organs of Government & Checks and Balances',
        subtitle: 'Executive, Legislature, and Judiciary roles in modern constitutional democracy',
        durationMinutes: 13,
        xpReward: 60,
        iconName: 'Building2',
        tags: ['Government', 'Executive', 'Legislature', 'Judiciary'],
        sections: [
          {
            title: '1. Organs of Government',
            content: '• **The Legislature**: Makes, amends, and repeals statutory laws; approves national budgets.\n• **The Executive**: Implements, enforces, and administers public policy and state laws.\n• **The Judiciary**: Interprets the constitution and laws, settles disputes, and protects fundamental rights.',
            keyTakeaway: 'Montesquieu\'s doctrine ensures no single branch operates with autocratic, unchecked power.'
          }
        ],
        quiz: [
          {
            id: 'g101-q1',
            question: 'Which organ of government is charged with interpreting laws and administering justice?',
            options: ['The Judiciary', 'The Executive', 'The Legislature', 'The Civil Service'],
            correctIndex: 0,
            explanation: 'The Judiciary is the judicial organ that adjudicates disputes and interprets constitutional statutes.',
            hint: 'This branch includes courts and judges.'
          }
        ]
      }
    ]
  },
  {
    id: 'islamic-studies',
    title: 'Islamic Religious Studies (IRS)',
    tagline: 'Tawhid, Quranic exegesis, Hadith, Sirah of the Prophet, and Islamic jurisprudence.',
    description: 'Learn the Pillars of Islam and Iman, Surahs, Hadith sciences, morality, Islamic history, and ethical principles of Shariah.',
    category: 'arts',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'general'],
    color: 'emerald',
    lightColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-500',
    gradient: 'from-emerald-700 to-teal-800',
    iconName: 'Moon',
    featuredTopics: ['Pillars of Islam & Iman', 'Hadith Studies & Sunnah', 'Sirah (Biography of the Prophet)', 'Islamic Ethics & Morals'],
    lessons: [
      {
        id: 'irs-101',
        subjectId: 'islamic-studies',
        level: 'beginner',
        title: 'The Five Pillars of Islam (Arkan al-Islam)',
        subtitle: 'Shahadah, Salah, Zakat, Sawm (Fasting), and Hajj',
        durationMinutes: 12,
        xpReward: 50,
        iconName: 'Star',
        tags: ['Five Pillars', 'Salah', 'Zakat', 'Tawhid'],
        sections: [
          {
            title: '1. The Five Essential Pillars',
            content: '1. **Shahadah**: Declaration of Faith (There is no deity worthy of worship except Allah, and Muhammad is His messenger).\n2. **Salah**: The 5 daily obligatory prayers.\n3. **Zakat**: Obligatory annual charity giving to the poor.\n4. **Sawm**: Fasting in the holy month of Ramadan.\n5. **Hajj**: Pilgrimage to the Holy Kaaba in Makkah for those who are able.',
            keyTakeaway: 'The five pillars form the core devotional foundation of Islamic life and community ethics.'
          }
        ],
        quiz: [
          {
            id: 'irs101-q1',
            question: 'What is the third pillar of Islam that involves giving obligatory charity to the underprivileged?',
            options: ['Zakat', 'Salah', 'Sawm', 'Hajj'],
            correctIndex: 0,
            explanation: 'Zakat is the obligatory annual purification of wealth given to the poor and needy.',
            hint: 'It is the charity pillar.'
          }
        ]
      }
    ]
  },
  {
    id: 'christian-studies',
    title: 'Christian Religious Studies (CRS)',
    tagline: 'Biblical teachings, Christian ethics, the life of Jesus, and Church history.',
    description: 'Study the Old and New Testaments, the Gospels, moral teachings of Christ, the early Apostolic Church, and faith in modern society.',
    category: 'arts',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'general'],
    color: 'indigo',
    lightColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    borderColor: 'border-indigo-500',
    gradient: 'from-indigo-700 to-purple-800',
    iconName: 'Cross',
    featuredTopics: ['The Creation & Early Patriarchs', 'The Beatitudes & Sermon on the Mount', 'Parables of Jesus', 'Pauline Epistles & Early Church'],
    lessons: [
      {
        id: 'crs-101',
        subjectId: 'christian-studies',
        level: 'beginner',
        title: 'The Beatitudes & Moral Teachings of Jesus Christ',
        subtitle: 'The Sermon on the Mount, love for neighbor, and humility',
        durationMinutes: 12,
        xpReward: 50,
        iconName: 'Heart',
        tags: ['Beatitudes', 'Sermon on Mount', 'Parables', 'Christian Ethics'],
        sections: [
          {
            title: '1. The Beatitudes in Matthew 5',
            content: 'In the Sermon on the Mount, Jesus taught virtues that guide Christian character:\n\n• *"Blessed are the peacemakers, for they shall be called children of God."*\n• *"Blessed are the pure in heart, for they shall see God."*\n• *"Blessed are the merciful, for they shall obtain mercy."*',
            keyTakeaway: 'Christian ethics emphasize humility, forgiveness, peacemaking, and active love.'
          }
        ],
        quiz: [
          {
            id: 'crs101-q1',
            question: 'According to the Beatitudes, who shall be called the children of God?',
            options: ['The Peacemakers', 'The Wealthy', 'The Proud', 'The Boastful'],
            correctIndex: 0,
            explanation: 'Matthew 5:9 declares: "Blessed are the peacemakers, for they shall be called children of God."',
            hint: 'Those who resolve conflicts with peace.'
          }
        ]
      }
    ]
  },
  {
    id: 'creative-arts',
    title: 'Creative & Visual Arts',
    tagline: 'Drawing, color harmony, sculpture, Nigerian traditional arts, and design.',
    description: 'Learn color theory (primary, secondary, complementary), perspective drawing, Benin bronze casting, Nok terracotta, and graphic arts.',
    category: 'arts',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'general'],
    color: 'violet',
    lightColor: 'bg-violet-50 text-violet-800 border-violet-200',
    borderColor: 'border-violet-500',
    gradient: 'from-violet-600 to-purple-700',
    iconName: 'Palette',
    featuredTopics: ['Color Theory & Wheel', 'Traditional African Art (Nok & Benin)', 'Linear & Atmospheric Perspective', 'Graphic Design & Typography'],
    lessons: [
      {
        id: 'art-101',
        subjectId: 'creative-arts',
        level: 'beginner',
        title: 'Color Theory: Primary, Secondary & Complementary Hues',
        subtitle: 'The chromatic circle, warm vs. cool tones, and tints/shades',
        durationMinutes: 11,
        xpReward: 45,
        iconName: 'Brush',
        tags: ['Color Theory', 'Primary Colors', 'Secondary Colors', 'Design'],
        sections: [
          {
            title: '1. Primary & Secondary Colors',
            content: '• **Primary Colors**: Red, Yellow, Blue (cannot be created by mixing other pigments).\n• **Secondary Colors**: Formed by mixing equal parts of two primaries:\n  - Red + Yellow = **Orange**\n  - Yellow + Blue = **Green**\n  - Blue + Red = **Purple / Violet**\n• **Complementary Colors**: Colors opposite each other on the color wheel (e.g., Red & Green, Blue & Orange).',
            keyTakeaway: 'Understanding color harmonies creates striking aesthetic contrast in artwork and UI design.'
          }
        ],
        quiz: [
          {
            id: 'art101-q1',
            question: 'What secondary color is produced when yellow pigment is mixed with blue pigment?',
            options: ['Green', 'Orange', 'Purple', 'Brown'],
            correctIndex: 0,
            explanation: 'Mixing yellow and blue primaries yields green.',
            hint: 'The color of lush grass.'
          }
        ]
      }
    ]
  },
  {
    id: 'music',
    title: 'Music & Performing Arts',
    tagline: 'Musical notation, scales, African polyrhythms, and instrumental performance.',
    description: 'Understand the treble and bass clefs, rhythm signatures, chord triads, African drumming, opera, and contemporary sound composition.',
    category: 'arts',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'general'],
    color: 'fuchsia',
    lightColor: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
    borderColor: 'border-fuchsia-500',
    gradient: 'from-fuchsia-600 to-pink-700',
    iconName: 'Music',
    featuredTopics: ['Staff Notation & Clefs', 'Major & Minor Scales', 'African Polyrhythms & Percussion', 'Musical Instruments Classification'],
    lessons: [
      {
        id: 'mus-101',
        subjectId: 'music',
        level: 'beginner',
        title: 'The Musical Staff, Treble Clef & Pitch Notation',
        subtitle: 'Lines and spaces of the staff, time signatures, and note values',
        durationMinutes: 11,
        xpReward: 45,
        iconName: 'Volume2',
        tags: ['Staff', 'Treble Clef', 'Notes', 'Music Theory'],
        sections: [
          {
            title: '1. The Treble Clef Pitch Mnemonic',
            content: 'The musical staff consists of 5 horizontal lines and 4 spaces:\n\n• **Lines of Treble Staff**: E - G - B - D - F (*"Every Good Boy Deserves Fudge"*)\n• **Spaces of Treble Staff**: F - A - C - E (*Spells the word "FACE"*)\n• **Time Signature 4/4**: 4 quarter note (crotchet) beats per measure.',
            keyTakeaway: 'Staff notation provides universal visual sheet music for musicians across all cultures.'
          }
        ],
        quiz: [
          {
            id: 'mus101-q1',
            question: 'What letters spell the notes in the spaces of the Treble Clef staff from bottom to top?',
            options: ['F - A - C - E', 'E - G - B - D', 'A - C - E - G', 'G - B - D - F'],
            correctIndex: 0,
            explanation: 'The four spaces of the treble clef staff from bottom to top spell F-A-C-E.',
            hint: 'It spells the word that means your countenance (FACE).'
          }
        ]
      }
    ]
  },
  {
    id: 'world-languages',
    title: 'World & African Languages',
    tagline: 'Hausa, Yoruba, Igbo, French, Arabic, Spanish, and comparative linguistics.',
    description: 'Learn conversational phrases, pronunciation, verb conjugation, and vocabulary across Hausa, Yoruba, Igbo, French, Arabic, and Spanish.',
    category: 'languages',
    applicableClasses: ['lower-primary', 'upper-primary', 'jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'undergrad', 'general'],
    color: 'pink',
    lightColor: 'bg-pink-50 text-pink-700 border-pink-200',
    borderColor: 'border-pink-500',
    gradient: 'from-pink-600 to-rose-700',
    iconName: 'Languages',
    featuredTopics: ['Hausa Essentials', 'Yoruba & Igbo Greetings', 'French Conversational Grammar', 'Arabic Alphabet & Phrases'],
    lessons: [
      {
        id: 'lang-101',
        subjectId: 'world-languages',
        level: 'beginner',
        title: 'Core Conversational Greetings in Hausa, French & Arabic',
        subtitle: 'Foundational expressions for travel, hospitality, and dialogue',
        durationMinutes: 12,
        xpReward: 50,
        iconName: 'MessageSquare',
        tags: ['Hausa', 'French', 'Arabic', 'Greetings'],
        sections: [
          {
            title: '1. Multilingual Greeting Guide',
            content: '• **Hausa**:\n  - *Sannu* = Hello\n  - *Ina kwana?* = Good morning\n  - *Na gode* = Thank you\n• **French**:\n  - *Bonjour* = Good morning / Hello\n  - *Comment allez-vous?* = How are you?\n  - *Merci beaucoup* = Thank you very much\n• **Arabic**:\n  - *As-salamu alaykum* = Peace be upon you\n  - *Shukran* = Thank you',
            keyTakeaway: 'Greetings bridge cultural understanding and create instant rapport.'
          }
        ],
        quiz: [
          {
            id: 'wl101-q1',
            question: 'What does "Na gode" mean in the Hausa language?',
            options: ['Thank you', 'Good night', 'Goodbye', 'Where is the market?'],
            correctIndex: 0,
            explanation: '"Na gode" is the standard Hausa phrase expressing gratitude ("Thank you").',
            hint: 'A word of appreciation and thanks.'
          }
        ]
      }
    ]
  }
];
