import { Subject } from '../types';

export const COMMERCIAL_SUBJECTS: Subject[] = [
  {
    id: 'economics',
    title: 'Economics & Market Analysis',
    tagline: 'Scarcity, supply & demand, elasticity, fiscal policy, and international trade.',
    description: 'Master microeconomics and macroeconomics: price equilibrium, consumer behavior, GDP, inflation, central banking, and international trade.',
    category: 'commercial',
    applicableClasses: ['ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'emerald',
    lightColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-500',
    gradient: 'from-emerald-600 to-green-700',
    iconName: 'TrendingUp',
    featuredTopics: ['Demand & Supply Elasticity', 'Market Structures (Monopoly vs. Perfect Competition)', 'Inflation & Monetary Policy', 'National Income Accounting'],
    lessons: [
      {
        id: 'econ-101',
        subjectId: 'economics',
        level: 'intermediate',
        title: 'Price Theory: Demand, Supply & Market Equilibrium',
        subtitle: 'The law of demand, supply shifts, and equilibrium pricing',
        durationMinutes: 15,
        xpReward: 65,
        iconName: 'BarChart2',
        tags: ['Demand', 'Supply', 'Equilibrium', 'Price Elasticity'],
        sections: [
          {
            title: '1. The Law of Demand & Supply',
            content: '• **Law of Demand**: All other things being equal (*ceteris paribus*), as the price of a good increases, quantity demanded decreases.\n• **Law of Supply**: As the price of a good increases, the quantity supplied increases.\n• **Market Equilibrium**: The price where quantity demanded equals quantity supplied ($Q_d = Q_s$).',
            keyTakeaway: 'The price mechanism allocates scarce resources efficiently through market forces.'
          }
        ],
        quiz: [
          {
            id: 'ec101-q1',
            question: 'What happens to the equilibrium price when consumer demand increases while supply remains constant?',
            options: ['Equilibrium price rises', 'Equilibrium price falls', 'Equilibrium price stays unchanged', 'Supply shifts left'],
            correctIndex: 0,
            explanation: 'When demand shifts to the right against a fixed supply curve, competition among buyers drives the equilibrium price upwards.',
            hint: 'More buyers competing for the same amount of goods.'
          }
        ]
      }
    ]
  },
  {
    id: 'accounting',
    title: 'Financial Accounting & Bookkeeping',
    tagline: 'The double-entry system, journals, ledger accounts, trial balance, and balance sheets.',
    description: 'Learn double-entry bookkeeping, bank reconciliation statements, depreciation methods, trading profit & loss accounts, and statement of financial position.',
    category: 'commercial',
    applicableClasses: ['ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'teal',
    lightColor: 'bg-teal-50 text-teal-800 border-teal-200',
    borderColor: 'border-teal-500',
    gradient: 'from-teal-600 to-cyan-700',
    iconName: 'Receipt',
    featuredTopics: ['Double-Entry Bookkeeping', 'Trial Balance Preparation', 'Bank Reconciliation', 'Final Accounts & Balance Sheet'],
    lessons: [
      {
        id: 'acc-101',
        subjectId: 'accounting',
        level: 'intermediate',
        title: 'The Golden Rule of Double Entry: Debit & Credit',
        subtitle: 'Assets, liabilities, capital, revenues, and expenses',
        durationMinutes: 14,
        xpReward: 65,
        iconName: 'DollarSign',
        tags: ['Double Entry', 'Debit', 'Credit', 'Ledger'],
        sections: [
          {
            title: '1. The Fundamental Accounting Equation',
            content: '$$\\text{Assets} = \\text{Liabilities} + \\text{Capital (Owner\'s Equity)}$$\n\n• **Debit the receiver, Credit the giver**.\n• **Debit all increases in Assets & Expenses**.\n• **Credit all increases in Liabilities, Capital & Revenues**.',
            keyTakeaway: 'Every financial transaction has an equal and opposite dual effect across the accounting equation.'
          }
        ],
        quiz: [
          {
            id: 'acc101-q1',
            question: 'When a business purchases office furniture with cash, what is the correct double-entry record?',
            options: [
              'Debit Furniture Account, Credit Cash Account',
              'Debit Cash Account, Credit Furniture Account',
              'Debit Capital Account, Credit Furniture Account',
              'Debit Purchases Account, Credit Sales Account'
            ],
            correctIndex: 0,
            explanation: 'Furniture (an asset) increases, so it is debited. Cash (an asset) decreases, so it is credited.',
            hint: 'Furniture comes in (debit asset increase), cash goes out (credit asset decrease).'
          }
        ]
      }
    ]
  },
  {
    id: 'commerce',
    title: 'Commerce & Business Management',
    tagline: 'Trade, wholesale/retail, banking, warehousing, insurance, and entrepreneurship.',
    description: 'Explore home & foreign trade, commercial banks, marketing mix, business organizations (sole proprietorship, partnership, limited company), and e-commerce.',
    category: 'commercial',
    applicableClasses: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'general'],
    color: 'sky',
    lightColor: 'bg-sky-50 text-sky-800 border-sky-200',
    borderColor: 'border-sky-500',
    gradient: 'from-sky-600 to-blue-700',
    iconName: 'Briefcase',
    featuredTopics: ['Channels of Distribution', 'Forms of Business Organization', 'Commercial Banking & Central Bank', 'E-Commerce & Digital Marketing'],
    lessons: [
      {
        id: 'comm-101',
        subjectId: 'commerce',
        level: 'intermediate',
        title: 'Channels of Distribution & Intermediaries',
        subtitle: 'Manufacturers, wholesalers, retailers, and final consumers',
        durationMinutes: 12,
        xpReward: 55,
        iconName: 'Truck',
        tags: ['Distribution', 'Wholesaler', 'Retailer', 'Trade'],
        sections: [
          {
            title: '1. The Traditional Distribution Chain',
            content: '$$\\text{Manufacturer} \\rightarrow \\text{Wholesaler} \\rightarrow \\text{Retailer} \\rightarrow \\text{Consumer}$$\n\n• **Wholesalers**: Buy in bulk from manufacturers, break bulk, provide storage, and grant credit to retailers.\n• **Retailers**: Sell in small quantities to the ultimate final consumer at convenient locations.',
            keyTakeaway: 'Intermediaries bridge temporal, spatial, and quantity gaps between production and consumption.'
          }
        ],
        quiz: [
          {
            id: 'cm101-q1',
            question: 'Which intermediary directly sells goods in small quantities to the final consumer?',
            options: ['The Retailer', 'The Wholesaler', 'The Importer', 'The Manufacturer'],
            correctIndex: 0,
            explanation: 'Retailers operate at the final link of the distribution chain, selling directly to end consumers.',
            hint: 'Neighborhood shopkeepers and supermarkets.'
          }
        ]
      }
    ]
  },
  {
    id: 'geography',
    title: 'Geography & Earth Systems',
    tagline: 'Cartography, landforms, weather & climate, human settlements, and GIS.',
    description: 'Study map reading & contours, plate tectonics, rocks, volcanic features, global climatic zones, population distribution, and environmental resources.',
    category: 'commercial',
    applicableClasses: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3', 'sss', 'undergrad', 'general'],
    color: 'emerald',
    lightColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-500',
    gradient: 'from-emerald-600 to-teal-700',
    iconName: 'Compass',
    featuredTopics: ['Map Reading & Contour Lines', 'Plate Tectonics & Volcanism', 'Global Climatic Zones', 'Economic & Human Geography'],
    lessons: [
      {
        id: 'geo-101',
        subjectId: 'geography',
        level: 'intermediate',
        title: 'Map Reading, Scale & Topographic Contour Lines',
        subtitle: 'Interpreting contour lines, gradient, relief, and spot heights',
        durationMinutes: 14,
        xpReward: 60,
        iconName: 'Map',
        tags: ['Contours', 'Map Reading', 'Relief', 'Geography'],
        sections: [
          {
            title: '1. Contour Lines and Slope Interpretation',
            content: 'Contour lines join points of equal elevation above sea level:\n\n• **Closely spaced contours**: Indicate a **steep slope** or cliff.\n• **Widely spaced contours**: Indicate a **gentle slope** or flat plain.\n• **Concentric circular contours with increasing values inward**: Represent a **hill or mountain peak**.',
            keyTakeaway: 'Contour patterns translate three-dimensional topography onto two-dimensional paper maps.'
          }
        ],
        quiz: [
          {
            id: 'geo101-q1',
            question: 'What do closely spaced contour lines on a topographic map indicate?',
            options: ['A steep slope', 'A flat plain', 'A wide valley', 'A swampy wetland'],
            correctIndex: 0,
            explanation: 'When contour lines are tightly packed, elevation changes rapidly over short horizontal distance, indicating a steep slope.',
            hint: 'Close lines mean quick elevation changes.'
          }
        ]
      }
    ]
  }
];
