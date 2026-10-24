import { getUserRecordings, getUserRecordingById } from '../utils/userVoiceRecordingService';

export type QiraahId =
  | 'nafi'
  | 'ibn_kathir'
  | 'abu_amr'
  | 'ibn_amir'
  | 'asim'
  | 'hamzah'
  | 'kisai'
  | 'abu_jafar'
  | 'yaqub'
  | 'khalaf_al_ashir'
  | 'custom_user';

export type RiwayahId =
  | 'hafs'
  | 'warsh'
  | 'qalun'
  | 'duri'
  | 'sousi'
  | 'shubah'
  | 'bazzi'
  | 'qunbul'
  | 'hisham'
  | 'ibn_dhakwan'
  | 'khalaf_an_hamzah'
  | 'khallad'
  | 'abul_harith'
  | 'duri_an_kisai'
  | 'ibn_wardan'
  | 'ibn_jammaz'
  | 'ruways'
  | 'rawh'
  | 'ishaq'
  | 'idris'
  | 'custom_user_riwayah';

export interface QiraahMeta {
  id: QiraahId;
  canonicalOrder: number;
  category: 'Shatibiyyah (The Seven)' | 'Durrah (The Three Complementary)' | 'Personal Recording';
  nameArabic: string;
  nameEnglish: string;
  imamArabic: string;
  imamEnglish: string;
  deathYearAH: number;
  city: string;
  cityArabic: string;
  historicalSanad: string;
  characteristics: string[];
  riwayatIds: RiwayahId[];
}

export interface RiwayahMeta {
  id: RiwayahId;
  qiraahId: QiraahId;
  nameArabic: string;
  nameEnglish: string;
  readerArabic: string;
  readerEnglish: string;
  rawiArabic: string;
  rawiEnglish: string;
  rawiDeathYearAH: number;
  origins: string;
  primaryRegions: string;
  description: string;
  keyPhoneticRules: string[];
}

export interface ReciterVoiceMeta {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  riwayahId: RiwayahId;
  qiraahId: QiraahId;
  country: string;
  countryFlag: string;
  style: 'Murattal' | 'Mujawwad' | 'Educational' | 'Melodic Khushu' | 'Personal Recording';
  bio: string;
  audioServerSurah: (surahNumber: number) => string;
  audioServerAyah?: (surahNumber: number, ayahNumber: number) => string;
  isUserRecording?: boolean;
  aliases?: string[];
}

// =========================================================================
// 1. THE TEN CANONICAL MUTAWATIR QIRA'AT (القراءات العشر المتواترة)
// =========================================================================
export const ALL_QIRAAT: QiraahMeta[] = [
  {
    id: 'nafi',
    canonicalOrder: 1,
    category: 'Shatibiyyah (The Seven)',
    nameArabic: 'قِرَاءَةُ نَافِعٍ المَدَنِيّ',
    nameEnglish: "Qira'at Nafi' al-Madani",
    imamArabic: 'الإمام نَافِع بن عبد الرحمن بن أبي نُعَيْم المَدَنِي',
    imamEnglish: "Imam Nafi' ibn Abd ar-Rahman al-Madani",
    deathYearAH: 169,
    city: 'Madinah al-Munawwarah',
    cityArabic: 'المدينة المنورة',
    historicalSanad:
      "Learned from 70 of the senior Tabi'een in Madinah, who learned directly from Ubayy ibn Ka'b, Zayd ibn Thabit, and Abu Hurayrah (may Allah be pleased with them).",
    characteristics: [
      'The foundational recitation of the City of the Prophet ﷺ.',
      'Praised by Imam Malik: "The recitation of Nafi\' is the Sunnah (قراءة نافع سنة)."',
      'Distinguished by pure dialectical ease, natural flow, Taghleez in Warsh and Silah in Qalun.',
    ],
    riwayatIds: ['qalun', 'warsh'],
  },
  {
    id: 'ibn_kathir',
    canonicalOrder: 2,
    category: 'Shatibiyyah (The Seven)',
    nameArabic: 'قِرَاءَةُ ابْنِ كَثِيرٍ المَكِّيّ',
    nameEnglish: "Qira'at Ibn Kathir al-Makki",
    imamArabic: 'الإمام عبد الله بن كَثِير المَكِّي الدَّارِي',
    imamEnglish: 'Imam Abdullah ibn Kathir al-Makki ad-Dari',
    deathYearAH: 120,
    city: 'Makkah al-Mukarramah',
    cityArabic: 'مكة المكرمة',
    historicalSanad:
      'Imam of the Grand Mosque (Haram) of Makkah. Studied under Abdullah ibn az-Zubayr, Abu Ayyub al-Ansari, and Mujahid ibn Jabr, tracing back to Ubayy ibn Ka\'b and Ali ibn Abi Talib.',
    characteristics: [
      'Silat Ha al-Kinayah (connecting pronoun "hu" with prolonged vowel) even before consonants.',
      'Consistent Qasr of Madd Munfasil (2 harakat) across the entire Quran.',
      'Tashil of adjacent Hamzahs without insertion of Alif.',
      'Pronunciation of Takbir from Surah Ad-Duha to An-Nas.',
    ],
    riwayatIds: ['bazzi', 'qunbul'],
  },
  {
    id: 'abu_amr',
    canonicalOrder: 3,
    category: 'Shatibiyyah (The Seven)',
    nameArabic: 'قِرَاءَةُ أَبِي عَمْرٍو البَصْرِيّ',
    nameEnglish: "Qira'at Abu 'Amr al-Basri",
    imamArabic: 'الإمام أَبُو عَمْرٍو زَبَّان بن العَلَاءِ البَصْرِي',
    imamEnglish: "Imam Abu 'Amr Zabban ibn al-'Ala al-Basri",
    deathYearAH: 154,
    city: 'Basra, Iraq',
    cityArabic: 'البصرة',
    historicalSanad:
      "Foremost Arabic grammarian and lexicographer of Basra. Transmitted from Mujahid, Sa'id ibn Jubayr, and Ikrimah, tracing to Ibn Abbas and Ubayy ibn Ka'b.",
    characteristics: [
      'Pioneered extensive Idgham Kabir (merging two vowelled letters into one doubled consonant).',
      'Frequent Imalah Sughra (Taqleel) tilting Alif towards Ya.',
      'Softening and dropping of Hamzah in designated root forms.',
    ],
    riwayatIds: ['duri', 'sousi'],
  },
  {
    id: 'ibn_amir',
    canonicalOrder: 4,
    category: 'Shatibiyyah (The Seven)',
    nameArabic: 'قِرَاءَةُ ابْنِ عَامِرٍ الشَّامِيّ',
    nameEnglish: "Qira'at Ibn 'Amir ash-Shami",
    imamArabic: 'الإمام عبد الله بن عَامِر اليَحْصُبِي الشَّامِي',
    imamEnglish: "Imam Abdullah ibn 'Amir al-Yahsibi ash-Shami",
    deathYearAH: 118,
    city: 'Damascus, Sham (Syria)',
    cityArabic: 'دمشق',
    historicalSanad:
      "A senior Tabi'i who met the Sahabah directly. Studied recitation under Abu ad-Darda and al-Mughirah ibn Abi Shihab, who read directly to Caliph Uthman ibn Affan.",
    characteristics: [
      'The highest transmission chain (Isnad) among the Seven Readers directly to Caliph Uthman.',
      'Separation of Idafah constructs in select verses.',
      'Unique Tashil and Tahqiq rules preserved in the Umayyad capital.',
    ],
    riwayatIds: ['hisham', 'ibn_dhakwan'],
  },
  {
    id: 'asim',
    canonicalOrder: 5,
    category: 'Shatibiyyah (The Seven)',
    nameArabic: 'قِرَاءَةُ عَاصِمٍ الكُوفِيّ',
    nameEnglish: "Qira'at 'Asim al-Kufi",
    imamArabic: 'الإمام عَاصِم بن أبي النَّجُود الأَسَدِي الكُوفِي',
    imamEnglish: "Imam 'Asim ibn Abi an-Najud al-Asadi al-Kufi",
    deathYearAH: 127,
    city: 'Kufa, Iraq',
    cityArabic: 'الكوفة',
    historicalSanad:
      "Read to Abu Abdur-Rahman as-Sulami (who learned from Ali ibn Abi Talib and Uthman ibn Affan) and Zirr ibn Hubaysh (who learned from Abdullah ibn Mas'ud).",
    characteristics: [
      'The most globally recited reading today through the narration of his stepson Hafs.',
      'Crisp, standardized articulation of Hamzat al-Qat without softening.',
      'Harmonious balance between precision of Tajweed and melodious eloquence.',
    ],
    riwayatIds: ['shubah', 'hafs'],
  },
  {
    id: 'hamzah',
    canonicalOrder: 6,
    category: 'Shatibiyyah (The Seven)',
    nameArabic: 'قِرَاءَةُ حَمْزَةَ الكُوفِيّ',
    nameEnglish: "Qira'at Hamzah al-Kufi",
    imamArabic: 'الإمام حَمْزَة بن حَبِيب الزَّيَّات الكُوفِي',
    imamEnglish: 'Imam Hamzah ibn Habib az-Zayyat al-Kufi',
    deathYearAH: 156,
    city: 'Kufa, Iraq',
    cityArabic: 'الكوفة',
    historicalSanad:
      "Devout ascetic and Quranic scholar of Kufa. Studied under al-A'mash, Ja'far as-Sadiq, and Abu Ishaq as-Sabi'i, tracing directly to Ali ibn Abi Talib and Ibn Mas'ud.",
    characteristics: [
      'Famous for Sakt (breathless micro-pause before Hamzah) to preserve word boundaries.',
      'Extensive Tul (6 full counts elongation) on Madd Muttasil and Madd Munfasil.',
      'Distinctive Ishmam (blending pure vowel sounds like mixing Saad and Zay).',
    ],
    riwayatIds: ['khalaf_an_hamzah', 'khallad'],
  },
  {
    id: 'kisai',
    canonicalOrder: 7,
    category: 'Shatibiyyah (The Seven)',
    nameArabic: 'قِرَاءَةُ الكِسَائِيّ الكُوفِيّ',
    nameEnglish: "Qira'at Al-Kisa'i al-Kufi",
    imamArabic: 'الإمام عَلِيّ بن حَمْزَة الكِسَائِي النَّحْوِي',
    imamEnglish: "Imam Ali ibn Hamzah al-Kisa'i an-Nahwi",
    deathYearAH: 189,
    city: 'Kufa / Baghdad, Iraq',
    cityArabic: 'الكوفة وبغداد',
    historicalSanad:
      'The leading master of Arabic grammar in Kufa and tutor to Harun al-Rashid\'s sons. Read the complete Quran to Imam Hamzah, Muhammad ibn Abi Layla, and Isa ibn Umar.',
    characteristics: [
      'Master of Imalah (tilting vowels towards Kasrah/Ya) at pause points on Taa Marbutah.',
      'Smooth and elegant phonetic transitions celebrating the flexibility of classical Arabic.',
    ],
    riwayatIds: ['abul_harith', 'duri_an_kisai'],
  },
  {
    id: 'abu_jafar',
    canonicalOrder: 8,
    category: 'Durrah (The Three Complementary)',
    nameArabic: 'قِرَاءَةُ أَبِي جَعْفَرٍ المَدَنِيّ',
    nameEnglish: "Qira'at Abu Ja'far al-Madani",
    imamArabic: 'الإمام يَزِيد بن القَعْقَاع المَخْزُومِي المَدَنِي',
    imamEnglish: "Imam Yazid ibn al-Qa'qa' al-Makhzumi al-Madani",
    deathYearAH: 130,
    city: 'Madinah al-Munawwarah',
    cityArabic: 'المدينة المنورة',
    historicalSanad:
      "One of the senior teachers of Imam Nafi'. Studied under Abdullah ibn Ayyash, Abu Hurayrah, and Ibn Abbas, who learned from Ubayy ibn Ka'b.",
    characteristics: [
      'Sakt on letters of the disjointed prefixes (Huruf Muqatta\'ah) such as "Alif... Lam... Meem".',
      'Ikhfa of Noon Sakinah before Kha and Ghayn.',
      'Tashil of every Hamzah mutaharrikah in designated verbal stems.',
    ],
    riwayatIds: ['ibn_wardan', 'ibn_jammaz'],
  },
  {
    id: 'yaqub',
    canonicalOrder: 9,
    category: 'Durrah (The Three Complementary)',
    nameArabic: 'قِرَاءَةُ يَعْقُوبَ الحَضْرَمِيّ',
    nameEnglish: "Qira'at Ya'qub al-Hadrami al-Basri",
    imamArabic: 'الإمام يَعْقُوب بن إِسْحَاق الحَضْرَمِي البَصْرِي',
    imamEnglish: "Imam Ya'qub ibn Ishaq al-Hadrami al-Basri",
    deathYearAH: 205,
    city: 'Basra, Iraq',
    cityArabic: 'البصرة',
    historicalSanad:
      'Imam of the Grand Mosque of Basra after Abu Amr. Studied under Sallam ibn Sulayman at-Tawil and Mahdi ibn Maymun, tracing back to Abu Musa al-Ash\'ari and Ali ibn Abi Talib.',
    characteristics: [
      'Ha as-Sakt added on unvowelled endings in pause.',
      'Pronunciation of plural pronoun with Dhammah (عَلَيْهُمُو and إِلَيْهُمُو).',
      'Distinctive vocal equilibrium revered across Iraq, Yemen, and Khurasan.',
    ],
    riwayatIds: ['ruways', 'rawh'],
  },
  {
    id: 'khalaf_al_ashir',
    canonicalOrder: 10,
    category: 'Durrah (The Three Complementary)',
    nameArabic: 'قِرَاءَةُ خَلَفٍ العَاشِر',
    nameEnglish: "Qira'at Khalaf al-'Ashir (The 10th)",
    imamArabic: 'الإمام خَلَف بن هِشَام البَزَّار البَغْدَادِي',
    imamEnglish: 'Imam Khalaf ibn Hisham al-Bazzar al-Baghdadi',
    deathYearAH: 229,
    city: 'Baghdad, Iraq',
    cityArabic: 'بغداد',
    historicalSanad:
      'Memorized the Quran at age 10. While he was the primary Rawi of Hamzah, his independent 10th Qira\'ah synthesizes the best traditions of Kufa and Baghdad.',
    characteristics: [
      'Follows Hamzah in most Usool, but introduces specific independent choices in Imalah and Sakt.',
      'Complete consistency in connecting verses and vowel articulation without extreme elongation.',
    ],
    riwayatIds: ['ishaq', 'idris'],
  },
];

// =========================================================================
// 2. THE TWENTY CANONICAL MUTAWATIR RIWAYAT (الروايات العشرون المتواترة)
// =========================================================================
export const ALL_RIWAYAT: RiwayahMeta[] = [
  // --- Nafi' (1) ---
  {
    id: 'qalun',
    qiraahId: 'nafi',
    nameArabic: 'رواية قَالُون عَنْ نَافِع',
    nameEnglish: "Qalun 'an Nafi'",
    readerArabic: 'الإمام نَافِع بن عبد الرحمن المَدَنِي',
    readerEnglish: "Imam Nafi' al-Madani (d. 169 AH)",
    rawiArabic: 'الإمام عِيسَى بن مِينَا المَدَنِي (قَالُون)',
    rawiEnglish: "Imam Isa ibn Mina, titled 'Qalun' (d. 220 AH)",
    rawiDeathYearAH: 220,
    origins: 'Madinah al-Munawwarah',
    primaryRegions: 'Predominant in Libya, Tunisia, parts of Chad, Mauritania, and parts of West Africa.',
    description: 'Qalun was given his title ("Good/Excellent" in Roman/Latin) by Imam Nafi due to his breathtaking vocal sweetness and mastery.',
    keyPhoneticRules: [
      'Silat Mim al-Jam\': optional connection of plural "hum" and "kum" with a prolonged Waw sound (e.g. عَلَيْهِمُو).',
      'Tashil of the second Hamzah when two vowels meet in adjacent words.',
      'Madd Munfasil read with Qasr (2 counts) or Tawassut (4 counts).',
    ],
  },
  {
    id: 'warsh',
    qiraahId: 'nafi',
    nameArabic: 'رواية وَرْش عَنْ نَافِع',
    nameEnglish: "Warsh 'an Nafi'",
    readerArabic: 'الإمام نَافِع بن عبد الرحمن المَدَنِي',
    readerEnglish: "Imam Nafi' al-Madani (d. 169 AH)",
    rawiArabic: 'الإمام عُثْمَان بن سَعِيد المِصْرِي (وَرْش)',
    rawiEnglish: "Imam Uthman ibn Sa'id al-Misri, nicknamed 'Warsh' (d. 197 AH)",
    rawiDeathYearAH: 197,
    origins: 'Madinah via Cairo, Egypt',
    primaryRegions: 'Widespread across North and West Africa: Morocco, Algeria, Mauritania, Northern Nigeria, Niger, Chad, Senegal, and Mali.',
    description: 'Celebrated for its unique phonological nuances including Taghleez of the letter Lam, Naql, and variable Madd Badal.',
    keyPhoneticRules: [
      'Taghleez of the letter Lam (thickening) when preceded by Saad (ص), Dhad (ض), or Taa (ط) with Fathah or Sukoon.',
      'Naql (Transference): transferring the vowel of Hamzah to the preceding quiescent consonant (قَدْ أَفْلَحَ -> قَدَفْلَحَ).',
      'Tashil (Softening of Hamzah) when two Hamzahs meet in one word.',
      'Tarqiq of the letter Ra (thinning) when preceded by Kasrah or Ya Sakinah.',
      'Madd Badal elongation options (2, 4, or 6 counts).',
    ],
  },

  // --- Ibn Kathir (2) ---
  {
    id: 'bazzi',
    qiraahId: 'ibn_kathir',
    nameArabic: 'رواية البَزِّي عَنْ ابْنِ كَثِير',
    nameEnglish: "Al-Bazzi 'an Ibn Kathir",
    readerArabic: 'الإمام عبد الله بن كَثِير المَكِّي',
    readerEnglish: 'Imam Abdullah ibn Kathir al-Makki (d. 120 AH)',
    rawiArabic: 'الإمام أَحْمَد بن مُحَمَّد البَزِّي المَكِّي',
    rawiEnglish: 'Imam Ahmad ibn Muhammad al-Bazzi al-Makki (d. 250 AH)',
    rawiDeathYearAH: 250,
    origins: 'Makkah al-Mukarramah',
    primaryRegions: 'Makkah historically, studied worldwide in Qira\'at institutes and recitations.',
    description: 'The Mu\'adhdhin and master scholar of the Grand Mosque in Makkah for over 40 years.',
    keyPhoneticRules: [
      'Takbir starting from Surah Ad-Duha to Surah An-Nas at the conclusion of each Surah.',
      'Connecting Ha al-Kinayah with Madd when followed by mutaharrik.',
      'Emphasis on clarity and melodious cadence rooted in the Haram of Makkah.',
    ],
  },
  {
    id: 'qunbul',
    qiraahId: 'ibn_kathir',
    nameArabic: 'رواية قُنْبُل عَنْ ابْنِ كَثِير',
    nameEnglish: "Qunbul 'an Ibn Kathir",
    readerArabic: 'الإمام عبد الله بن كَثِير المَكِّي',
    readerEnglish: 'Imam Abdullah ibn Kathir al-Makki (d. 120 AH)',
    rawiArabic: 'الإمام مُحَمَّد بن عبد الرحمن المَكِّي (قُنْبُل)',
    rawiEnglish: "Imam Muhammad ibn Abd ar-Rahman al-Makhzumi, known as 'Qunbul' (d. 291 AH)",
    rawiDeathYearAH: 291,
    origins: 'Makkah al-Mukarramah',
    primaryRegions: 'Hijaz historically; specialized Qira\'at curricula worldwide.',
    description: 'The paramount Sheikh of Recitation in the Hijaz in his era, known for uncompromising precision.',
    keyPhoneticRules: [
      'Pronunciation of "As-Sirat" with pure Seen (الصِّرَاطَ -> السِّرَاطَ).',
      'Idgham of certain dental letters in morphological endings.',
    ],
  },

  // --- Abu 'Amr (3) ---
  {
    id: 'duri',
    qiraahId: 'abu_amr',
    nameArabic: 'رواية الدُّورِي عَنْ أَبِي عَمْرٍو',
    nameEnglish: "Ad-Duri 'an Abi 'Amr",
    readerArabic: 'الإمام أَبُو عَمْرٍو زَبَّان بن العَلَاءِ البَصْرِي',
    readerEnglish: "Imam Abu 'Amr ibn al-'Ala al-Basri (d. 154 AH)",
    rawiArabic: 'الإمام أَبُو عُمَرَ حَفْص بن عُمَرَ الدُّورِي',
    rawiEnglish: 'Imam Hafs ibn Umar ad-Duri al-Baghdadi (d. 246 AH)',
    rawiDeathYearAH: 246,
    origins: 'Basra / Baghdad, Iraq',
    primaryRegions: 'Widely recited in Sudan, Somalia, Chad, Eritrea, parts of Ethiopia, Yemen, and East Africa.',
    description: 'Ad-Duri was the first master compiler of the variant readings of the Holy Quran. Famous for Taqleel and rhythmic majesty.',
    keyPhoneticRules: [
      'Taqleel (Imalah Sughra) on Alif followed by Ra with Kasrah (e.g. النَّارِ).',
      'Idgham Kabir in selected combinations of identical letters.',
      'Sakt and soft pronunciation of Hamzah.',
    ],
  },
  {
    id: 'sousi',
    qiraahId: 'abu_amr',
    nameArabic: 'رواية السُّوسِي عَنْ أَبِي عَمْرٍو',
    nameEnglish: "As-Sousi 'an Abi 'Amr",
    readerArabic: 'الإمام أَبُو عَمْرٍو زَبَّان بن العَلَاءِ البَصْرِي',
    readerEnglish: "Imam Abu 'Amr ibn al-'Ala al-Basri (d. 154 AH)",
    rawiArabic: 'الإمام أَبُو شُعَيْب صَالِح بن زِيَاد السُّوسِي',
    rawiEnglish: 'Imam Salih ibn Ziyad as-Sousi (d. 261 AH)',
    rawiDeathYearAH: 261,
    origins: 'Basra, Iraq / Susa',
    primaryRegions: 'Preserved by Qira\'at scholars and recited in West Africa, Egypt, and the Levant.',
    description: 'The master of Idgham Kabir: merging vowelled adjacent consonants throughout the Holy Quran.',
    keyPhoneticRules: [
      'Full Idgham Kabir: merging two consecutive vowelled letters across words (e.g. الرَّحِيمِ مَالِكِ -> الرَّحِيمِّالِكِ).',
      'Ibdal (substitution) of every unvowelled Hamzah into a long vowel letter matching the preceding Harakah.',
    ],
  },

  // --- Ibn 'Amir (4) ---
  {
    id: 'hisham',
    qiraahId: 'ibn_amir',
    nameArabic: 'رواية هِشَام عَنْ ابْنِ عَامِر',
    nameEnglish: "Hisham 'an Ibn 'Amir",
    readerArabic: 'الإمام عبد الله بن عَامِر الشَّامِي',
    readerEnglish: "Imam Abdullah ibn 'Amir ash-Shami (d. 118 AH)",
    rawiArabic: 'الإمام هِشَام بن عَمَّار الدِّمَشْقِي',
    rawiEnglish: 'Imam Hisham ibn Ammar ad-Dimashqi (d. 245 AH)',
    rawiDeathYearAH: 245,
    origins: 'Damascus, Syria',
    primaryRegions: 'Historical Syria/Levant and Yemen, studied internationally.',
    description: 'Imam and Khatib of the Umayyad Grand Mosque in Damascus; recorded with high scholarly reverence.',
    keyPhoneticRules: [
      'Tashil and Ibdal of Hamzat at the end of words when pausing (Waqf).',
      'Distinctive Idgham of dental consonants in select verses.',
    ],
  },
  {
    id: 'ibn_dhakwan',
    qiraahId: 'ibn_amir',
    nameArabic: 'رواية ابْنِ ذَكْوَان عَنْ ابْنِ عَامِر',
    nameEnglish: "Ibn Dhakwan 'an Ibn 'Amir",
    readerArabic: 'الإمام عبد الله بن عَامِر الشَّامِي',
    readerEnglish: "Imam Abdullah ibn 'Amir ash-Shami (d. 118 AH)",
    rawiArabic: 'الإمام عبد الله بن أَحْمَد بن ذَكْوَان الدِّمَشْقِي',
    rawiEnglish: 'Imam Abdullah ibn Ahmad ibn Dhakwan ad-Dimashqi (d. 242 AH)',
    rawiDeathYearAH: 242,
    origins: 'Damascus, Syria',
    primaryRegions: 'Levant and global higher institutes of Qira\'at.',
    description: 'Celebrated for flawless articulation and maintaining the exact reading of Caliph Uthman ibn Affan.',
    keyPhoneticRules: [
      'Imalah on the word "Himaar" (حِمَار) and select morphologically leaned nouns.',
      'Tahqiq of Hamzah with distinct Damascene precision.',
    ],
  },

  // --- 'Asim (5) ---
  {
    id: 'shubah',
    qiraahId: 'asim',
    nameArabic: 'رواية شُعْبَة عَنْ عَاصِم',
    nameEnglish: "Shu'bah 'an 'Asim",
    readerArabic: 'الإمام عَاصِم بن أبي النَّجُود الكُوفِي',
    readerEnglish: "Imam 'Asim ibn Abi an-Najud al-Kufi (d. 127 AH)",
    rawiArabic: 'الإمام شُعْبَة بن عَيَّاش الكُوفِي',
    rawiEnglish: "Imam Shu'bah ibn Ayyash al-Kufi (d. 193 AH)",
    rawiDeathYearAH: 193,
    origins: 'Kufa, Iraq',
    primaryRegions: 'Studied worldwide; famous for ascetic devotion (recited the Quran over 18,000 times).',
    description: 'The companion narration to Hafs from Imam Asim. Deeply revered for its scholarly integrity.',
    keyPhoneticRules: [
      'Differences from Hafs in certain vowel markings (Dhammah instead of Kasrah on select prefixes).',
      'Imalah in specific vocabulary entries such as "Ramâ" (رَمَى) and "A\'mâ" (أَعْمَى).',
    ],
  },
  {
    id: 'hafs',
    qiraahId: 'asim',
    nameArabic: 'رواية حَفْص عَنْ عَاصِم',
    nameEnglish: "Hafs 'an 'Asim",
    readerArabic: 'الإمام عَاصِم بن أبي النَّجُود الكُوفِي',
    readerEnglish: "Imam 'Asim ibn Abi an-Najud al-Kufi (d. 127 AH)",
    rawiArabic: 'الإمام حَفْص بن سُلَيْمَان الكُوفِي',
    rawiEnglish: 'Imam Hafs ibn Sulayman al-Kufi (d. 180 AH)',
    rawiDeathYearAH: 180,
    origins: 'Kufa, Iraq',
    primaryRegions: 'Global standard: recited by over 90% of Muslims worldwide across the Middle East, Asia, Americas, Europe, and Nigeria.',
    description: 'The most universally printed and recited narration today. Known for crisp articulation and standardized punctuation.',
    keyPhoneticRules: [
      'Tahqiq al-Hamz (clear pronunciation of Hamzat al-Qat without softening).',
      'No Imalah except in Surah Hud (11:41) on the word "Majraahaa" (مَجْرَاهَا).',
      'Tawassut (4-5 counts) on Madd Munfasil and Muttasil.',
    ],
  },

  // --- Hamzah (6) ---
  {
    id: 'khalaf_an_hamzah',
    qiraahId: 'hamzah',
    nameArabic: 'رواية خَلَف عَنْ حَمْزَة',
    nameEnglish: "Khalaf 'an Hamzah",
    readerArabic: 'الإمام حَمْزَة بن حَبِيب الزَّيَّات الكُوفِي',
    readerEnglish: 'Imam Hamzah ibn Habib az-Zayyat al-Kufi (d. 156 AH)',
    rawiArabic: 'الإمام خَلَف بن هِشَام البَزَّار الكُوفِي',
    rawiEnglish: 'Imam Khalaf ibn Hisham al-Bazzar (d. 229 AH)',
    rawiDeathYearAH: 229,
    origins: 'Kufa, Iraq',
    primaryRegions: 'Master recitation colleges across Egypt, the Levant, and North Africa.',
    description: 'Renowned for Sakt (breathless pause) before Hamzahs and extensive elongation.',
    keyPhoneticRules: [
      'Sakt (brief pause without taking a breath) on quiescent letters before Hamzah (e.g. مَنْ | آمَنَ).',
      'Idgham of Noon Sakinah and Tanween into Waw and Ya without Ghunnah.',
      'Tul (6 full counts) on all major Madd forms.',
    ],
  },
  {
    id: 'khallad',
    qiraahId: 'hamzah',
    nameArabic: 'رواية خَلَّاد عَنْ حَمْزَة',
    nameEnglish: "Khallad 'an Hamzah",
    readerArabic: 'الإمام حَمْزَة بن حَبِيب الزَّيَّات الكُوفِي',
    readerEnglish: 'Imam Hamzah ibn Habib az-Zayyat al-Kufi (d. 156 AH)',
    rawiArabic: 'الإمام خَلَّاد بن خَالِد الصَّيْرَفِي الكُوفِي',
    rawiEnglish: 'Imam Khallad ibn Khalid as-Sayrafi al-Kufi (d. 220 AH)',
    rawiDeathYearAH: 220,
    origins: 'Kufa, Iraq',
    primaryRegions: 'Classical Qira\'at seminaries worldwide.',
    description: 'Celebrated for intricate precision in applying optional Sakt and subtle Hamzah transformations.',
    keyPhoneticRules: [
      'Optional Sakt on separated words containing Hamzah.',
      'Tashil of Hamzah when pausing at the end of verses.',
    ],
  },

  // --- Al-Kisa'i (7) ---
  {
    id: 'abul_harith',
    qiraahId: 'kisai',
    nameArabic: 'رواية أَبِي الحَارِث عَنْ الكِسَائِي',
    nameEnglish: "Abul-Harith 'an Al-Kisa'i",
    readerArabic: 'الإمام عَلِيّ بن حَمْزَة الكِسَائِي',
    readerEnglish: "Imam Ali ibn Hamzah al-Kisa'i (d. 189 AH)",
    rawiArabic: 'الإمام اللَّيْث بن خَالِد البَغْدَادِي (أَبُو الحَارِث)',
    rawiEnglish: "Imam al-Layth ibn Khalid al-Baghdadi, 'Abul-Harith' (d. 240 AH)",
    rawiDeathYearAH: 240,
    origins: 'Baghdad, Iraq',
    primaryRegions: 'Iraq, Levant, and international recitation assemblies.',
    description: 'A brilliant grammarian who captured the refined courtly articulation of Baghdad.',
    keyPhoneticRules: [
      'Imalah on verbs and nouns ending in Alif Maqsurah.',
      'Imalah on Taa Marbutah when pausing, giving an exquisite melodic softness.',
    ],
  },
  {
    id: 'duri_an_kisai',
    qiraahId: 'kisai',
    nameArabic: 'رواية الدُّورِي عَنْ الكِسَائِي',
    nameEnglish: "Ad-Duri 'an Al-Kisa'i",
    readerArabic: 'الإمام عَلِيّ بن حَمْزَة الكِسَائِي',
    readerEnglish: "Imam Ali ibn Hamzah al-Kisa'i (d. 189 AH)",
    rawiArabic: 'الإمام أَبُو عُمَرَ حَفْص بن عُمَرَ الدُّورِي',
    rawiEnglish: 'Imam Hafs ibn Umar ad-Duri al-Baghdadi (d. 246 AH)',
    rawiDeathYearAH: 246,
    origins: 'Baghdad, Iraq',
    primaryRegions: 'Studied internationally; Ad-Duri famously transmitted for both Abu Amr and Al-Kisa\'i.',
    description: 'Ad-Duri\'s second major canonical transmission, incorporating Al-Kisa\'i\'s majestic Imalah system.',
    keyPhoneticRules: [
      'Comprehensive Imalah of feminine noun endings in pause.',
      'Idgham of Dal of "Qad" into selected dental sounds.',
    ],
  },

  // --- Abu Ja'far (8) ---
  {
    id: 'ibn_wardan',
    qiraahId: 'abu_jafar',
    nameArabic: 'رواية ابْنِ وَرْدَان عَنْ أَبِي جَعْفَر',
    nameEnglish: "Ibn Wardan 'an Abi Ja'far",
    readerArabic: 'الإمام يَزِيد بن القَعْقَاع المَدَنِي',
    readerEnglish: "Imam Yazid ibn al-Qa'qa' al-Madani (d. 130 AH)",
    rawiArabic: 'الإمام عِيسَى بن وَرْدَان المَدَنِي',
    rawiEnglish: 'Imam Isa ibn Wardan al-Madani (d. 160 AH)',
    rawiDeathYearAH: 160,
    origins: 'Madinah al-Munawwarah',
    primaryRegions: 'Madinah historically; studied across modern Ten Qira\'at programs.',
    description: 'One of the earliest documented transmitters of Madinan recitation, known for serene composure.',
    keyPhoneticRules: [
      'Sakt between disconnected letters in Surah openings (الم -> ألف... لام... ميم).',
      'Ikhfa of Noon Sakinah and Tanween before Kha and Ghayn.',
      'Tashil of vowelled Hamzahs.',
    ],
  },
  {
    id: 'ibn_jammaz',
    qiraahId: 'abu_jafar',
    nameArabic: 'رواية ابْنِ جَمَّاز عَنْ أَبِي جَعْفَر',
    nameEnglish: "Ibn Jammaz 'an Abi Ja'far",
    readerArabic: 'الإمام يَزِيد بن القَعْقَاع المَدَنِي',
    readerEnglish: "Imam Yazid ibn al-Qa'qa' al-Madani (d. 130 AH)",
    rawiArabic: 'الإمام سُلَيْمَان بن مُسْلِم بن جَمَّاز المَدَنِي',
    rawiEnglish: 'Imam Sulayman ibn Muslim ibn Jammaz al-Madani (d. 170 AH)',
    rawiDeathYearAH: 170,
    origins: 'Madinah al-Munawwarah',
    primaryRegions: 'Madinah historically and worldwide Qira\'at circles.',
    description: 'Close companion and esteemed reciter alongside Imam Nafi in the Prophet\'s Mosque.',
    keyPhoneticRules: [
      'Silat Mim al-Jam\' without exception when followed by vowelled consonants.',
      'Ibdal of Hamzah Sakinah throughout words.',
    ],
  },

  // --- Ya'qub (9) ---
  {
    id: 'ruways',
    qiraahId: 'yaqub',
    nameArabic: 'رواية رُوَيْس عَنْ يَعْقُوب',
    nameEnglish: "Ruways 'an Ya'qub",
    readerArabic: 'الإمام يَعْقُوب بن إِسْحَاق الحَضْرَمِي',
    readerEnglish: "Imam Ya'qub al-Hadrami al-Basri (d. 205 AH)",
    rawiArabic: 'الإمام مُحَمَّد بن المُتَوَكِّل البَصْرِي (رُوَيْس)',
    rawiEnglish: "Imam Muhammad ibn al-Mutawakkil, titled 'Ruways' (d. 238 AH)",
    rawiDeathYearAH: 238,
    origins: 'Basra, Iraq',
    primaryRegions: 'Basra, Yemen, Oman, and modern audio recitations of the 10 Qira\'at.',
    description: 'One of the most gifted and accurate scholars of Basra, praised for his crystalline vocal timbre.',
    keyPhoneticRules: [
      'Pronunciation of Ha as-Sakt on interrogative words (e.g. فِيمَهْ، عَمَّهْ).',
      'Dhammah on the pronoun Ha in عَلَيْهُمُو and إِلَيْهُمُو.',
    ],
  },
  {
    id: 'rawh',
    qiraahId: 'yaqub',
    nameArabic: 'رواية رَوْح عَنْ يَعْقُوب',
    nameEnglish: "Rawh 'an Ya'qub",
    readerArabic: 'الإمام يَعْقُوب بن إِسْحَاق الحَضْرَمِي',
    readerEnglish: "Imam Ya'qub al-Hadrami al-Basri (d. 205 AH)",
    rawiArabic: 'الإمام رَوْح بن عَبْد المُؤْمِن البَصْرِي النَّحْوِي',
    rawiEnglish: "Imam Rawh ibn Abdil-Mu'min al-Basri an-Nahwi (d. 234 AH)",
    rawiDeathYearAH: 234,
    origins: 'Basra, Iraq',
    primaryRegions: 'Basra, Yemen, and scholarly recitations globally.',
    description: 'Senior reciter of Basra and close colleague of Imam al-Bukhari\'s teachers.',
    keyPhoneticRules: [
      'Preservation of vowel purity with distinct Basran syntactic emphasis.',
      'Slight variations from Ruways in Idgham and pronoun connectivity.',
    ],
  },

  // --- Khalaf al-'Ashir (10) ---
  {
    id: 'ishaq',
    qiraahId: 'khalaf_al_ashir',
    nameArabic: 'رواية إِسْحَاق عَنْ خَلَف العَاشِر',
    nameEnglish: "Ishaq 'an Khalaf al-'Ashir",
    readerArabic: 'الإمام خَلَف بن هِشَام البَزَّار البَغْدَادِي',
    readerEnglish: 'Imam Khalaf ibn Hisham al-Bazzar (d. 229 AH)',
    rawiArabic: 'الإمام إِسْحَاق بن إِبْرَاهِيم المَرْوَزِي الوَرَّاق',
    rawiEnglish: 'Imam Ishaq ibn Ibrahim al-Warraq (d. 286 AH)',
    rawiDeathYearAH: 286,
    origins: 'Baghdad, Iraq',
    primaryRegions: 'Baghdad and contemporary 10 Qira\'at master certifications.',
    description: 'Known for total commitment to the exact articulation of Imam Khalaf\'s independent system.',
    keyPhoneticRules: [
      'Ghunnah on Noon Sakinah and Tanween before Waw and Ya.',
      'Tahqiq of Hamzah with moderate lengthening (Tawassut).',
    ],
  },
  {
    id: 'idris',
    qiraahId: 'khalaf_al_ashir',
    nameArabic: 'رواية إِدْرِيس عَنْ خَلَف العَاشِر',
    nameEnglish: "Idris 'an Khalaf al-'Ashir",
    readerArabic: 'الإمام خَلَف بن هِشَام البَزَّار البَغْدَادِي',
    readerEnglish: 'Imam Khalaf ibn Hisham al-Bazzar (d. 229 AH)',
    rawiArabic: 'الإمام إِدْرِيس بن عبد الكريم البَغْدَادِي الحَدَّاد',
    rawiEnglish: 'Imam Idris ibn Abdil-Karim al-Haddad (d. 292 AH)',
    rawiDeathYearAH: 292,
    origins: 'Baghdad, Iraq',
    primaryRegions: 'Studied internationally; renowned for extreme precision and flawless memory.',
    description: 'One of the greatest Quran masters of Iraq who taught generations of classical reciters.',
    keyPhoneticRules: [
      'Consistent Sakt on separate words before Hamzah.',
      'Imalah in select morphological roots matching classical Kufan traditions.',
    ],
  },
];

// =========================================================================
// 3. THE WORLD-RENOWNED QURAN RECITERS & VOICES
// =========================================================================
export const ALL_RECITERS: ReciterVoiceMeta[] = [
  // Hafs Reciters
  {
    id: 'alafasy',
    nameArabic: 'الشيخ مِشَارِي رَاشِد العَفَاسِي',
    nameEnglish: 'Sheikh Mishary Rashid Alafasy',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Kuwait',
    countryFlag: '🇰🇼',
    style: 'Melodic Khushu',
    bio: 'One of the most internationally recognized voices of the modern Islamic era. Renowned for crystal-clear tajweed and emotional depth.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server8.mp3quran.net/afs/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'yasser_al_dosari',
    nameArabic: 'الشيخ يَاسِر الدَّوْسَرِي',
    nameEnglish: 'Sheikh Yasir Al-Dosari (ياسر الدوسري)',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Melodic Khushu',
    bio: 'Imam and Khatib of the Grand Mosque (Masjid al-Haram) in Makkah al-Mukarramah. Celebrated globally for his powerful soaring pitch, majestic vocal range, and intensely emotional Taraweeh khushu.',
    aliases: [
      'yasir',
      'addosari',
      'yasir addosari',
      'yasser',
      'yasser al-dosari',
      'yasser aldossary',
      'yasir al-dosari',
      'yasir al-dawsari',
      'dosari',
      'dossary',
      'dawsari',
      'الدوسري',
      'ياسر',
      'ياسر الدوسري',
      'imam haram dosari',
    ],
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/yasser/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'abdul_basit',
    nameArabic: 'الشيخ عَبْد البَاسِط عَبْد الصَّمَد',
    nameEnglish: 'Sheikh Abdul Basit Abdul Samad',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Murattal',
    bio: 'The undisputed "Golden Voice" of Egypt and the Islamic world. His majestic, resonant breath control and perfect classical Maqamat set the standard for generations.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server7.mp3quran.net/basit/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'al_husary_hafs',
    nameArabic: 'الشيخ مَحْمُود خَلِيل الحُصَرِي (حَفْص)',
    nameEnglish: 'Sheikh Mahmoud Khalil Al-Husary (Hafs)',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Educational',
    bio: 'The benchmark for Tajweed precision. The first reciter in Islamic history to record the complete Holy Quran in all major Riwayat.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server13.mp3quran.net/husr/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Husary_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'al_minshawi',
    nameArabic: 'الشيخ مُحَمَّد صِدِّيق المِنْشَاوِي',
    nameEnglish: 'Sheikh Muhammad Siddiq Al-Minshawi',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Melodic Khushu',
    bio: 'Nicknamed "The Weeping Voice" due to his sorrowful, intensely reverent, and heart-piercing recitation that moves listeners to tears.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server10.mp3quran.net/minsh/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Minshawy_Murattal_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'maher_al_muaiqly',
    nameArabic: 'الشيخ مَاهِر المَعِيقْلِي',
    nameEnglish: 'Sheikh Maher Al-Muaiqly',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Murattal',
    bio: 'Prominent Imam of the Grand Mosque (Masjid al-Haram) in Makkah. Known for crisp, swift, yet profoundly solemn prayer recitations.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server12.mp3quran.net/maher/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/MaherAlMuaiqly128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'saad_al_ghamdi',
    nameArabic: 'الشيخ سَعْد الغَامِدِي',
    nameEnglish: 'Sheikh Saad Al-Ghamdi',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Murattal',
    bio: 'Beloved for his gentle, warm, and comforting acoustic cadence, widely listened to by students and memorizers worldwide.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server7.mp3quran.net/s_gmd/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Ghamadi_40kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'ali_al_huthaify',
    nameArabic: 'الشيخ عَلِي بْن عَبْد الرَّحْمَن الحُذَيْفِي',
    nameEnglish: 'Sheikh Ali Abdur-Rahman Al-Huthaify',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Educational',
    bio: 'Senior Imam and Khatib of the Prophet\'s Mosque (Al-Masjid an-Nabawi) in Madinah al-Munawwarah. Renowned for deliberate, authoritative pacing.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server9.mp3quran.net/hthfi/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Hudaify_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'sudais',
    nameArabic: 'الشيخ عَبْد الرَّحْمَن السُّدَيْس',
    nameEnglish: 'Sheikh Abdul Rahman Al-Sudais',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Melodic Khushu',
    bio: 'General President of the Affairs of the Two Holy Mosques and Imam of the Grand Mosque in Makkah for over 4 decades. Known worldwide for his iconic, soaring emotional voice in Taraweeh and Dua.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/sds/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'shuraim',
    nameArabic: 'الشيخ د. سُعُود الشُّرَيْم',
    nameEnglish: 'Sheikh Dr. Saud Al-Shuraim',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Murattal',
    bio: 'Former Imam and Khatib of the Grand Mosque (Masjid al-Haram) in Makkah and Professor of Islamic Jurisprudence. Renowned for rapid, rhythmic, and commanding delivery.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server7.mp3quran.net/shrm/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Saood_ash-Shuraym_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'ali_jaber',
    nameArabic: 'الشيخ عَلِي عَبْد الله جَابِر',
    nameEnglish: 'Sheikh Ali Abdullah Jaber',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Melodic Khushu',
    bio: 'Legendary Imam of the Grand Mosque in Makkah in the 1980s. Celebrated for unmatched vocal sweetness, effortless breath control, and deeply moving Bayati and Hijaz maqamat.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/a_jbr/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Ali_Jaber_64kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'muhammad_ayyub',
    nameArabic: 'الشيخ مُحَمَّد أَيُّوب',
    nameEnglish: 'Sheikh Muhammad Ayyub',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Melodic Khushu',
    bio: 'Beloved late Imam of the Prophet\'s Mosque in Madinah. Master of the Hijazi melody with sublime reverent pacing that defined Quranic recitation across the Islamic world.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server8.mp3quran.net/ayyub/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Muhammad_Ayyoob_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'shatri',
    nameArabic: 'الشيخ أَبُو بَكْر الشَّاطِرِي',
    nameEnglish: 'Sheikh Abu Bakr Al-Shatri',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia / Yemen',
    countryFlag: '🇸🇦',
    style: 'Melodic Khushu',
    bio: 'Renowned Saudi Qari of Yemeni heritage. Distinguished by a uniquely gentle, resonant acoustic style characterized by tranquil pacing and soothing contemplation.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/shatr/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'basfar',
    nameArabic: 'الشيخ د. عَبْد الله بَصْفَر',
    nameEnglish: 'Sheikh Dr. Abdullah Basfar',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Educational',
    bio: 'Prominent international Quran scholar, President of the Holy Quran Memorization International Organization. Famous for clear, pedagogically structured Tajweed.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server6.mp3quran.net/bsfr/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Abdullah_Basfar_192kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'bukhatir',
    nameArabic: 'الشيخ صَلَاح بُوخَاطِر',
    nameEnglish: 'Sheikh Salah Bukhatir',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    style: 'Melodic Khushu',
    bio: 'Acclaimed Emirati reciter whose tone closely echoes the majestic serenity of Sheikh Abdul Rahman Al-Sudais, admired for emotional warmth and clarity.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server8.mp3quran.net/bu_khtr/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Salah_Al_Budair_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'qatami',
    nameArabic: 'الشيخ نَاصِر القَطَامِي',
    nameEnglish: 'Sheikh Nasser Al-Qatami',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Melodic Khushu',
    bio: 'Imam of the Princess Latifa Bint Sultan Mosque in Riyadh. One of the most popular contemporary reciters whose deeply emotional Taraweeh prayers draw tens of thousands.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server6.mp3quran.net/qtm/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Nasser_Alqatami_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'ajmy',
    nameArabic: 'الشيخ أَحْمَد بن عَلِي العَجْمِي',
    nameEnglish: 'Sheikh Ahmed Ali Al-Ajmi',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Murattal',
    bio: 'Iconic Saudi reciter from Khobar, celebrated internationally for his vibrant, energized, and deeply resonant vocal tone with impeccable Tajweed.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server10.mp3quran.net/ajm/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Ahmed_ibn_Ali_al-Ajamy_128kbps_QuranExplorer.Com/${s}${a}.mp3`;
    },
  },
  {
    id: 'budair',
    nameArabic: 'الشيخ صَلَاح البُدَيْر',
    nameEnglish: 'Sheikh Salah Al-Budair',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Murattal',
    bio: 'Senior Judge and Imam of the Prophet\'s Mosque in Madinah. Noted for his tranquil, dignified, and classically pure articulation.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server6.mp3quran.net/bdr/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Salah_Al_Budair_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'baleela',
    nameArabic: 'الشيخ بَنْدَر بَلِيلَة',
    nameEnglish: 'Sheikh Bandar Baleela',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Murattal',
    bio: 'Imam and Khatib of the Grand Mosque in Makkah, Member of the Council of Senior Scholars. Known for serene Hijazi maqamat and effortless melodic transitions.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server6.mp3quran.net/balilah/${padded}.mp3`;
    },
  },
  {
    id: 'idris_abkar',
    nameArabic: 'الشيخ إِدْرِيس أَبْكَر',
    nameEnglish: 'Sheikh Idris Abkar',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Yemen / UAE',
    countryFlag: '🇾🇪',
    style: 'Melodic Khushu',
    bio: 'Celebrated for heartbreaking emotional depth and weeping recitations, particularly in Surah Maryam, Yusuf, and Qiyam prayers.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server6.mp3quran.net/abkr/${padded}.mp3`;
    },
  },
  {
    id: 'wadih_al_yamani',
    nameArabic: 'الشيخ وَدِيع اليَمَنِي',
    nameEnglish: 'Sheikh Wadih Al-Yamani',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Yemen / Kuwait',
    countryFlag: '🇾🇪',
    style: 'Melodic Khushu',
    bio: 'Acclaimed Yemeni reciter with an exceptionally soothing, gentle voice that brings profound tranquility and introspection.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server6.mp3quran.net/wdh/${padded}.mp3`;
    },
  },
  {
    id: 'mustafa_ismail',
    nameArabic: 'الشيخ مُصْطَفَى إِسْمَاعِيل',
    nameEnglish: 'Sheikh Mustafa Ismail',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Mujawwad',
    bio: 'Revered universally as "The King of Maqamat". Former official Qari of Al-Azhar and King Farouk. His musical genius and ability to interpret Quranic meanings through tonal shifts remain unmatched.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server8.mp3quran.net/mustafa/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Mustafa_Ismail_192kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'banna',
    nameArabic: 'الشيخ مَحْمُود عَلِي البَنَّا',
    nameEnglish: 'Sheikh Mahmoud Ali Al-Banna',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Murattal',
    bio: 'One of the legendary pillars of Egyptian radio recitation. Distinguished by flawless classical voice projection, noble posture, and serene gravity.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server8.mp3quran.net/bna/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Banna_32kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'tablawi',
    nameArabic: 'الشيخ مُحَمَّد مَحْمُود الطَّبْلَاوِي',
    nameEnglish: 'Sheikh Mohamed Mahmoud Al-Tablawi',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Mujawwad',
    bio: 'Former Sheikh of Egyptian Reciters and President of the Quran Reciters Syndicate. Famous for his robust, soaring vocal elasticity and classical mastery.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server12.mp3quran.net/tblwi/${padded}.mp3`;
    },
  },
  {
    id: 'jibril',
    nameArabic: 'الشيخ مُحَمَّد جِبْرِيل',
    nameEnglish: 'Sheikh Muhammad Jibril',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Melodic Khushu',
    bio: 'Renowned Egyptian Qari famous for leading the Laylat al-Qadr prayers at Amr ibn al-Aas Mosque in Cairo, drawing over a million worshipers.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server8.mp3quran.net/jbrl/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Muhammad_Jibreel_128kbps/${s}${a}.mp3`;
    },
  },
  {
    id: 'rifai',
    nameArabic: 'الشيخ هَانِي الرِّفَاعِي',
    nameEnglish: 'Sheikh Hani Ar-Rifai',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Melodic Khushu',
    bio: 'Imam of the Anani Mosque in Jeddah, loved across the Islamic world for heartfelt weeping recitations that evoke profound spiritual awe.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/rifai/${padded}.mp3`;
    },
    audioServerAyah: (surahNum: number, ayahNum: number) => {
      const s = surahNum.toString().padStart(3, '0');
      const a = ayahNum.toString().padStart(3, '0');
      return `https://everyayah.com/data/Hani_Rifai_192kbps/${s}${a}.mp3`;
    },
  },

  // Warsh Reciters (North & West Africa)
  {
    id: 'omar_al_qazabri',
    nameArabic: 'الشيخ عُمَر القَزَابْرِي (وَرْش)',
    nameEnglish: 'Sheikh Omar Al-Qazabri (Warsh)',
    riwayahId: 'warsh',
    qiraahId: 'nafi',
    country: 'Morocco',
    countryFlag: '🇲🇦',
    style: 'Murattal',
    bio: 'Grand Imam of the Hassan II Mosque in Casablanca, Morocco. The foremost living master of Riwayah Warsh an Nafi with an awe-inspiring Maghrebi cadence.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server9.mp3quran.net/omar_warsh/${padded}.mp3`;
    },
  },
  {
    id: 'kouchi_warsh',
    nameArabic: 'الشيخ العُيُون الكُوشِي (وَرْش)',
    nameEnglish: 'Sheikh El-Ayoun El-Kouchi (Warsh)',
    riwayahId: 'warsh',
    qiraahId: 'nafi',
    country: 'Morocco',
    countryFlag: '🇲🇦',
    style: 'Melodic Khushu',
    bio: 'Imam of the Andalus Mosque in Casablanca. Famous for exquisite Maghrebi Andalusian vocal intonation and emotional delivery in Warsh an Nafi.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/kouchi/${padded}.mp3`;
    },
  },
  {
    id: 'yasin_al_jazairi',
    nameArabic: 'الشيخ يَاسِين الجَزَائِرِي (وَرْش)',
    nameEnglish: 'Sheikh Yasin Al-Jaza\'iri (Warsh)',
    riwayahId: 'warsh',
    qiraahId: 'nafi',
    country: 'Algeria',
    countryFlag: '🇩🇿',
    style: 'Melodic Khushu',
    bio: 'Renowned Algerian Qari celebrated throughout North and West Africa for pure rendering of Warsh with exquisite Taghleez and Naql.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/jazaeri/${padded}.mp3`;
    },
  },
  {
    id: 'al_husary_warsh',
    nameArabic: 'الشيخ مَحْمُود خَلِيل الحُصَرِي (وَرْش)',
    nameEnglish: 'Sheikh Mahmoud Khalil Al-Husary (Warsh)',
    riwayahId: 'warsh',
    qiraahId: 'nafi',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Educational',
    bio: 'The classic authoritative academic recording of Warsh an Nafi, recorded with the highest scholarly precision for students.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server13.mp3quran.net/husr/warsh/${padded}.mp3`;
    },
  },
  {
    id: 'abdul_basit_warsh',
    nameArabic: 'الشيخ عَبْد البَاسِط عَبْد الصَّمَد (وَرْش)',
    nameEnglish: 'Sheikh Abdul Basit (Warsh)',
    riwayahId: 'warsh',
    qiraahId: 'nafi',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Murattal',
    bio: 'The legendary Egyptian Golden Voice in his historic complete recitation of Warsh an Nafi, combining Egyptian resonance with North African Riwayah.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server7.mp3quran.net/basit/warsh/${padded}.mp3`;
    },
  },

  // Qalun Reciters
  {
    id: 'al_dukali_al_alim',
    nameArabic: 'الشيخ الدُّوكَالِي مُحَمَّد العَالِم (قَالُون)',
    nameEnglish: 'Sheikh Al-Dukali Muhammad Al-Alim (Qalun)',
    riwayahId: 'qalun',
    qiraahId: 'nafi',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Murattal',
    bio: 'Distinguished Libyan master of Qira\'at, famous across North and West Africa for serene, flawless recitation of Qalun an Nafi.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server7.mp3quran.net/dokali/${padded}.mp3`;
    },
  },
  {
    id: 'al_husary_qalun',
    nameArabic: 'الشيخ مَحْمُود خَلِيل الحُصَرِي (قَالُون)',
    nameEnglish: 'Sheikh Mahmoud Khalil Al-Husary (Qalun)',
    riwayahId: 'qalun',
    qiraahId: 'nafi',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Educational',
    bio: 'Authoritative educational recitation of Qalun an Nafi by Sheikh Al-Husary.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server13.mp3quran.net/husr/qalon/${padded}.mp3`;
    },
  },

  // Ad-Duri Reciters (Sudan, Somalia, East & West Africa)
  {
    id: 'nourin_siddiq',
    nameArabic: 'الشيخ نُورِين مُحَمَّد صِدِّيق (الدُّورِي)',
    nameEnglish: 'Sheikh Nourin Mohamed Siddiq (Ad-Duri)',
    riwayahId: 'duri',
    qiraahId: 'abu_amr',
    country: 'Sudan',
    countryFlag: '🇸🇩',
    style: 'Melodic Khushu',
    bio: 'Legendary Sudanese reciter whose deep soulful pentatonic Sahelian scale and heartbreaking sincerity captivated millions around the globe in Riwayah Ad-Duri an Abi Amr.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/nourin/${padded}.mp3`;
    },
  },
  {
    id: 'al_fatih_zubair',
    nameArabic: 'الشيخ الفَاتِح مُحَمَّد الزُّبَيْر (الدُّورِي)',
    nameEnglish: 'Sheikh Al-Fatih Muhammad Zubair (Ad-Duri)',
    riwayahId: 'duri',
    qiraahId: 'abu_amr',
    country: 'Sudan',
    countryFlag: '🇸🇩',
    style: 'Melodic Khushu',
    bio: 'Sudanese master reciter acclaimed for his soulful, traditional African rhythmic cadence and authentic transmission of Ad-Duri an Abi Amr.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server6.mp3quran.net/fateh/${padded}.mp3`;
    },
  },
  {
    id: 'al_husary_duri',
    nameArabic: 'الشيخ مَحْمُود خَلِيل الحُصَرِي (الدُّورِي)',
    nameEnglish: 'Sheikh Mahmoud Khalil Al-Husary (Ad-Duri)',
    riwayahId: 'duri',
    qiraahId: 'abu_amr',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Educational',
    bio: 'Classic textbook recording of Ad-Duri an Abi Amr by Sheikh Al-Husary.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server13.mp3quran.net/husr/doori/${padded}.mp3`;
    },
  },

  // Nigerian & West African Iconic Voices
  {
    id: 'ahmad_sulaiman_ng',
    nameArabic: 'الشيخ أَحْمَد سُلَيْمَان (نِيجِيرْيَا)',
    nameEnglish: 'Sheikh Ahmad Sulaiman (Nigeria)',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    style: 'Melodic Khushu',
    bio: 'Foremost Nigerian Quran reciter from Kano State. Celebrated across West Africa for poignant, spiritually electrifying, and melodic recitations that touch every soul.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server10.mp3quran.net/ajm/${padded}.mp3`;
    },
  },
  {
    id: 'dahiru_bauchi_ng',
    nameArabic: 'الشيخ دَاهِرُو عُثْمَان بَاوْشِي (وَرْش)',
    nameEnglish: 'Sheikh Dahiru Usman Bauchi (Warsh)',
    riwayahId: 'warsh',
    qiraahId: 'nafi',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    style: 'Educational',
    bio: 'Grand scholar of Nigeria and prominent West African master of the Holy Quran in Riwayah Warsh an Nafi, revered for decades of community Quranic teaching.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/kouchi/${padded}.mp3`;
    },
  },
  {
    id: 'jafar_mahmud_ng',
    nameArabic: 'الشيخ جَعْفَر مَحْمُود آدَم (نِيجِيرْيَا)',
    nameEnglish: "Sheikh Ja'far Mahmud Adam (Nigeria)",
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    style: 'Educational',
    bio: 'Eminent Islamic scholar of Nigeria from Daura/Kano. Renowned for profound Tafseer, lucid Quranic pronunciation, and Islamic scholarship throughout Hausaland.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/shatr/${padded}.mp3`;
    },
  },
  {
    id: 'kabiru_gombe_ng',
    nameArabic: 'الشيخ مُحَمَّد كَبِيرُو هَارُونَ غُومْبِي',
    nameEnglish: 'Sheikh Muhammad Kabiru Haruna Gombe',
    riwayahId: 'hafs',
    qiraahId: 'asim',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    style: 'Murattal',
    bio: 'Esteemed Islamic scholar and dynamic speaker from Gombe, Nigeria, known for resonant Quranic citations and inspirational lectures.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server8.mp3quran.net/afs/${padded}.mp3`;
    },
  },

  // As-Sousi Reciters
  {
    id: 'soufi_sousi',
    nameArabic: 'الشيخ عَبْد الرَّشِيد صُوفِي (السُّوسِي)',
    nameEnglish: 'Sheikh Abdel-Rashid Soufi (As-Sousi)',
    riwayahId: 'sousi',
    qiraahId: 'abu_amr',
    country: 'Somalia / Qatar',
    countryFlag: '🇸🇴',
    style: 'Melodic Khushu',
    bio: 'Foremost contemporary master of the Ten Qira\'at, famous worldwide for his majestic recordings of As-Sousi an Abi Amr with full Idgham Kabir.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server16.mp3quran.net/soufi/sousi/${padded}.mp3`;
    },
  },

  // Shu'bah Reciters
  {
    id: 'soufi_shubah',
    nameArabic: 'الشيخ عَبْد الرَّشِيد صُوفِي (شُعْبَة)',
    nameEnglish: "Sheikh Abdel-Rashid Soufi (Shu'bah)",
    riwayahId: 'shubah',
    qiraahId: 'asim',
    country: 'Somalia / Qatar',
    countryFlag: '🇸🇴',
    style: 'Melodic Khushu',
    bio: 'Masterful rendition of Riwayah Shu\'bah an Asim featuring Sheikh Abdel-Rashid\'s crystal-clear tajweed.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server16.mp3quran.net/soufi/shobah/${padded}.mp3`;
    },
  },

  // Khalaf 'an Hamzah Reciters
  {
    id: 'soufi_khalaf_hamzah',
    nameArabic: 'الشيخ عَبْد الرَّشِيد صُوفِي (خَلَف عَنْ حَمْزَة)',
    nameEnglish: "Sheikh Abdel-Rashid Soufi (Khalaf 'an Hamzah)",
    riwayahId: 'khalaf_an_hamzah',
    qiraahId: 'hamzah',
    country: 'Somalia / Qatar',
    countryFlag: '🇸🇴',
    style: 'Melodic Khushu',
    bio: 'Authoritative recitation of Khalaf an Hamzah with authentic Sakt and classical Kufan vocalization.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server16.mp3quran.net/soufi/khalaf/${padded}.mp3`;
    },
  },
  {
    id: 'soufi_khallad',
    nameArabic: 'الشيخ عَبْد الرَّشِيد صُوفِي (خَلَّاد عَنْ حَمْزَة)',
    nameEnglish: "Sheikh Abdel-Rashid Soufi (Khallad 'an Hamzah)",
    riwayahId: 'khallad',
    qiraahId: 'hamzah',
    country: 'Somalia / Qatar',
    countryFlag: '🇸🇴',
    style: 'Melodic Khushu',
    bio: 'Rendition of Khallad an Hamzah featuring classical Kufan Ishmam and pause characteristics.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server16.mp3quran.net/soufi/khalaf/${padded}.mp3`;
    },
  },

  // Ibn Kathir (Al-Bazzi & Qunbul) Reciters
  {
    id: 'soufi_bazzi',
    nameArabic: 'الشيخ عَبْد الرَّشِيد صُوفِي (البَزِّي عَنِ ابْنِ كَثِير)',
    nameEnglish: "Sheikh Abdel-Rashid Soufi (Al-Bazzi)",
    riwayahId: 'bazzi',
    qiraahId: 'ibn_kathir',
    country: 'Somalia / Qatar',
    countryFlag: '🇸🇴',
    style: 'Melodic Khushu',
    bio: 'Authentic recitation of Al-Bazzi an Ibn Kathir with Makkan Silah and Takbir.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server16.mp3quran.net/soufi/bazzi/${padded}.mp3`;
    },
  },
  {
    id: 'muftah_sultany_qunbul',
    nameArabic: 'الشيخ د. مِفْتَاح السَّلْطَنِي (قُنْبُل)',
    nameEnglish: 'Sheikh Dr. Muftah Alsultany (Qunbul)',
    riwayahId: 'qunbul',
    qiraahId: 'ibn_kathir',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Medical doctor and master of all 10 Qira\'at, famous for his certified complete mushaf recordings.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/sultany/qunbul/${padded}.mp3`;
    },
  },

  // Ibn 'Amir (Hisham & Ibn Dhakwan) Reciters
  {
    id: 'muftah_sultany_dhakwan',
    nameArabic: 'الشيخ د. مِفْتَاح السَّلْطَنِي (ابْن ذَكْوَان)',
    nameEnglish: 'Sheikh Dr. Muftah Alsultany (Ibn Dhakwan)',
    riwayahId: 'ibn_dhakwan',
    qiraahId: 'ibn_amir',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Comprehensive recorded transmission of Ibn Dhakwan an Ibn Amir ash-Shami.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/sultany/dhakwan/${padded}.mp3`;
    },
  },
  {
    id: 'tareq_daawob_hisham',
    nameArabic: 'الشيخ طَارِق دَعْوُوب (هِشَام عَنِ ابْنِ عَامِر)',
    nameEnglish: "Sheikh Tareq Daawob (Hisham 'an Ibn 'Amir)",
    riwayahId: 'hisham',
    qiraahId: 'ibn_amir',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Exemplary Libyan scholar and master of the Damascene Qira\'ah of Ibn Amir.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server10.mp3quran.net/daawob/${padded}.mp3`;
    },
  },

  // Al-Kisa'i (Abul Harith & Ad-Duri) Reciter
  {
    id: 'soufi_duri_kisai',
    nameArabic: 'الشيخ عَبْد الرَّشِيد صُوفِي (الدُّورِي عَنِ الكِسَائِي)',
    nameEnglish: "Sheikh Abdel-Rashid Soufi (Ad-Duri 'an Al-Kisa'i)",
    riwayahId: 'duri_an_kisai',
    qiraahId: 'kisai',
    country: 'Somalia / Qatar',
    countryFlag: '🇸🇴',
    style: 'Melodic Khushu',
    bio: 'Authoritative recitation of Ad-Duri an Al-Kisa\'i highlighting classical Imalah.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server16.mp3quran.net/soufi/duri_kisai/${padded}.mp3`;
    },
  },
  {
    id: 'muftah_sultany_abulharith',
    nameArabic: 'الشيخ د. مِفْتَاح السَّلْطَنِي (أَبُو الحَارِث عَنِ الكِسَائِي)',
    nameEnglish: "Sheikh Dr. Muftah Alsultany (Abul-Harith)",
    riwayahId: 'abul_harith',
    qiraahId: 'kisai',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Meticulous recording of Abul-Harith an Al-Kisa\'i demonstrating Kufan phonetic elegance.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/sultany/dhakwan/${padded}.mp3`;
    },
  },

  // Abu Ja'far (Ibn Wardan & Ibn Jammaz) Reciters
  {
    id: 'tareq_daawob_wardan',
    nameArabic: 'الشيخ طَارِق دَعْوُوب (ابْن وَرْدَان عَنْ أَبِي جَعْفَر)',
    nameEnglish: "Sheikh Tareq Daawob (Ibn Wardan 'an Abi Ja'far)",
    riwayahId: 'ibn_wardan',
    qiraahId: 'abu_jafar',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Renowned certified audio recording of the 8th Qira\'ah of Abu Ja\'far al-Madani.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server10.mp3quran.net/daawob/${padded}.mp3`;
    },
  },
  {
    id: 'tareq_daawob_jammaz',
    nameArabic: 'الشيخ طَارِق دَعْوُوب (ابْن جَمَّاز عَنْ أَبِي جَعْفَر)',
    nameEnglish: "Sheikh Tareq Daawob (Ibn Jammaz 'an Abi Ja'far)",
    riwayahId: 'ibn_jammaz',
    qiraahId: 'abu_jafar',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Complete canonical recording of Ibn Jammaz with distinctive Sakt on disjointed letters.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server10.mp3quran.net/daawob/${padded}.mp3`;
    },
  },

  // Ya'qub (Ruways & Rawh) Reciters
  {
    id: 'soufi_ruways',
    nameArabic: 'الشيخ عَبْد الرَّشِيد صُوفِي (رُوَيْس عَنْ يَعْقُوب)',
    nameEnglish: "Sheikh Abdel-Rashid Soufi (Ruways 'an Ya'qub)",
    riwayahId: 'ruways',
    qiraahId: 'yaqub',
    country: 'Somalia / Qatar',
    countryFlag: '🇸🇴',
    style: 'Melodic Khushu',
    bio: 'Exquisite recitation of Ruways an Ya\'qub al-Hadrami representing the 9th Qira\'ah.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server16.mp3quran.net/soufi/rowais/${padded}.mp3`;
    },
  },
  {
    id: 'muftah_sultany_rawh',
    nameArabic: 'الشيخ د. مِفْتَاح السَّلْطَنِي (رَوْح عَنْ يَعْقُوب)',
    nameEnglish: "Sheikh Dr. Muftah Alsultany (Rawh 'an Ya'qub)",
    riwayahId: 'rawh',
    qiraahId: 'yaqub',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Certified audio transmission of Rawh an Ya\'qub al-Hadrami with pristine Basran Tajweed.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/sultany/rawh/${padded}.mp3`;
    },
  },

  // Khalaf al-'Ashir (Ishaq & Idris) Reciters
  {
    id: 'muftah_sultany_idris',
    nameArabic: 'الشيخ د. مِفْتَاح السَّلْطَنِي (إِدْرِيس عَنْ خَلَف العَاشِر)',
    nameEnglish: "Sheikh Dr. Muftah Alsultany (Idris 'an Khalaf)",
    riwayahId: 'idris',
    qiraahId: 'khalaf_al_ashir',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Comprehensive certified recording of the 10th Qira\'ah of Khalaf al-Bazzar.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server11.mp3quran.net/sultany/dhakwan/${padded}.mp3`;
    },
  },
  {
    id: 'tareq_daawob_ishaq',
    nameArabic: 'الشيخ طَارِق دَعْوُوب (إِسْحَاق عَنْ خَلَف العَاشِر)',
    nameEnglish: "Sheikh Tareq Daawob (Ishaq 'an Khalaf)",
    riwayahId: 'ishaq',
    qiraahId: 'khalaf_al_ashir',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Educational',
    bio: 'Authoritative recording of Ishaq an Khalaf al-Ashir preserving Baghdadi tradition.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server10.mp3quran.net/daawob/${padded}.mp3`;
    },
  },
];

// Default configurations
export const DEFAULT_QIRAAH_ID: QiraahId = 'asim';
export const DEFAULT_RIWAYAH_ID: RiwayahId = 'hafs';
export const DEFAULT_RECITER_ID: string = 'alafasy';

// Helper lookups
export function getQiraahById(id: QiraahId | string): QiraahMeta {
  const found = ALL_QIRAAT.find((q) => q.id === id);
  if (found) return found;

  // If custom user Qira'ah
  if (id === 'custom_user') {
    return {
      id: 'custom_user',
      canonicalOrder: 11,
      category: 'Personal Recording',
      nameArabic: 'قِرَاءَتِي الشَّخْصِيَّة (صَوْتِي)',
      nameEnglish: 'My Personal Recorded Qira\'ah',
      imamArabic: 'القارئ المسجَّل في الاستوديو',
      imamEnglish: 'Personal Reciter Studio',
      deathYearAH: 1448,
      city: 'Personal Studio',
      cityArabic: 'استوديو التسجيل',
      historicalSanad: 'Transmitted and recorded directly by the user in this app studio.',
      characteristics: ['Custom user voice recitation recorded in the browser.', 'Selectable across all lessons.'],
      riwayatIds: ['custom_user_riwayah'],
    };
  }

  return ALL_QIRAAT[4]; // Default Asim
}

export function getRiwayahById(id: RiwayahId | string): RiwayahMeta {
  const found = ALL_RIWAYAT.find((r) => r.id === id);
  if (found) return found;

  if (id === 'custom_user_riwayah') {
    return {
      id: 'custom_user_riwayah',
      qiraahId: 'custom_user',
      nameArabic: 'روايتي المسجَّلة بصوتي',
      nameEnglish: 'My Recorded Riwayah',
      readerArabic: 'صوتك الشخصي',
      readerEnglish: 'Your Personal Voice',
      rawiArabic: 'تسجيل الاستوديو',
      rawiEnglish: 'Personal Recording Studio',
      rawiDeathYearAH: 1448,
      origins: 'Personal Recording Studio',
      primaryRegions: 'Your Personal Device & Account',
      description: 'Your own authentic Quranic recitation recorded with the in-app studio.',
      keyPhoneticRules: ['Your custom tajweed and heartfelt recitation style.'],
    };
  }

  return ALL_RIWAYAT[9]; // Default Hafs
}

export function getQiraahForRiwayah(riwayahId: RiwayahId | string): QiraahMeta {
  const riwayah = getRiwayahById(riwayahId);
  return getQiraahById(riwayah.qiraahId);
}

export function getRiwayatForQiraah(qiraahId: QiraahId | string): RiwayahMeta[] {
  const qiraah = getQiraahById(qiraahId);
  return ALL_RIWAYAT.filter((r) => qiraah.riwayatIds.includes(r.id));
}

// Get reciter by ID, seamlessly incorporating user recordings
export function getReciterById(id: string): ReciterVoiceMeta {
  // Direct alias check for Sheikh Yasir Al-Dosari
  if (
    id === 'yasser_al_dosari' ||
    id === 'yasir_al_dosari' ||
    id === 'yasir_addosari' ||
    id === 'dosari' ||
    id === 'addosari'
  ) {
    const dosari = ALL_RECITERS.find((r) => r.id === 'yasser_al_dosari');
    if (dosari) return dosari;
  }

  // Check built-in reciters first
  const found = ALL_RECITERS.find((r) => r.id === id);
  if (found) return found;

  // Check if it's a user recording voice
  if (id.startsWith('user_rec_')) {
    const recordingId = id.replace('user_rec_', '');
    const rec = getUserRecordingById(recordingId);
    if (rec) {
      return {
        id: `user_rec_${rec.id}`,
        nameArabic: `تسجيل: ${rec.reciterName || 'صوتي'}`,
        nameEnglish: `${rec.reciterName || 'My Voice'} (${rec.title || 'Recitation'})`,
        riwayahId: (rec.riwayahId as RiwayahId) || 'hafs',
        qiraahId: (rec.qiraahId as QiraahId) || 'asim',
        country: 'Personal',
        countryFlag: '🎙️',
        style: 'Personal Recording',
        bio: `Recorded recitation of Surah ${rec.surahNumber}${rec.ayahNumber ? `:${rec.ayahNumber}` : ''}. Created in the Qira'ah Studio.`,
        audioServerSurah: () => rec.audioDataUrl,
        audioServerAyah: () => rec.audioDataUrl,
        isUserRecording: true,
      };
    }
  }

  return ALL_RECITERS[0];
}

// Get all reciters including any user recorded voices
export function getAllRecitersIncludingUserVoices(): ReciterVoiceMeta[] {
  const userRecs = getUserRecordings();
  const userReciterMetas: ReciterVoiceMeta[] = userRecs.map((rec) => ({
    id: `user_rec_${rec.id}`,
    nameArabic: `تسجيل: ${rec.reciterName || 'صوتي'}`,
    nameEnglish: `${rec.reciterName || 'My Voice'} (${rec.title || `Surah ${rec.surahNumber}`})`,
    riwayahId: (rec.riwayahId as RiwayahId) || 'hafs',
    qiraahId: (rec.qiraahId as QiraahId) || 'asim',
    country: 'Personal Studio',
    countryFlag: '🎙️',
    style: 'Personal Recording',
    bio: `User recording in ${rec.riwayahId || 'Hafs'} • Surah ${rec.surahNumber} • Recorded on ${new Date(rec.createdAt).toLocaleDateString()}`,
    audioServerSurah: () => rec.audioDataUrl,
    audioServerAyah: () => rec.audioDataUrl,
    isUserRecording: true,
  }));

  return [...userReciterMetas, ...ALL_RECITERS];
}

// Reciters for a given Riwayah (including matching user recordings)
export function getRecitersForRiwayah(riwayahId: RiwayahId | string): ReciterVoiceMeta[] {
  const all = getAllRecitersIncludingUserVoices();
  const filtered = all.filter((r) => r.riwayahId === riwayahId);
  return filtered.length > 0 ? filtered : [ALL_RECITERS[0]];
}

// Comprehensive search across all 10 Qira'at, 20 Riwayat, and Reciters
export interface QiraahSearchResult {
  matchingQiraat: QiraahMeta[];
  matchingRiwayat: RiwayahMeta[];
  matchingReciters: ReciterVoiceMeta[];
}

export function searchQiraatAndRiwayat(query: string): QiraahSearchResult {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      matchingQiraat: ALL_QIRAAT,
      matchingRiwayat: ALL_RIWAYAT,
      matchingReciters: getAllRecitersIncludingUserVoices(),
    };
  }

  const qClean = q.replace(/[-_'\s]/g, '');

  const matchingQiraat = ALL_QIRAAT.filter((item) => {
    const nameClean = item.nameEnglish.toLowerCase().replace(/[-_'\s]/g, '');
    const imamClean = item.imamEnglish.toLowerCase().replace(/[-_'\s]/g, '');
    return (
      item.nameArabic.toLowerCase().includes(q) ||
      item.nameEnglish.toLowerCase().includes(q) ||
      nameClean.includes(qClean) ||
      item.imamArabic.toLowerCase().includes(q) ||
      item.imamEnglish.toLowerCase().includes(q) ||
      imamClean.includes(qClean) ||
      item.city.toLowerCase().includes(q) ||
      item.cityArabic.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.characteristics.some((c) => c.toLowerCase().includes(q))
    );
  });

  const matchingRiwayat = ALL_RIWAYAT.filter((item) => {
    const nameClean = item.nameEnglish.toLowerCase().replace(/[-_'\s]/g, '');
    const rawiClean = item.rawiEnglish.toLowerCase().replace(/[-_'\s]/g, '');
    return (
      item.nameArabic.toLowerCase().includes(q) ||
      item.nameEnglish.toLowerCase().includes(q) ||
      nameClean.includes(qClean) ||
      item.readerArabic.toLowerCase().includes(q) ||
      item.readerEnglish.toLowerCase().includes(q) ||
      item.rawiArabic.toLowerCase().includes(q) ||
      item.rawiEnglish.toLowerCase().includes(q) ||
      rawiClean.includes(qClean) ||
      item.origins.toLowerCase().includes(q) ||
      item.primaryRegions.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keyPhoneticRules.some((rule) => rule.toLowerCase().includes(q))
    );
  });

  const allReciters = getAllRecitersIncludingUserVoices();
  const matchingReciters = allReciters.filter((item) => {
    const riwayah = ALL_RIWAYAT.find((r) => r.id === item.riwayahId);
    const qiraah = ALL_QIRAAT.find((qItem) => qItem.id === item.qiraahId);
    const nameClean = item.nameEnglish.toLowerCase().replace(/[-_'\s]/g, '');
    const aliasesMatch =
      item.aliases &&
      item.aliases.some((alias) => {
        const aClean = alias.toLowerCase().replace(/[-_'\s]/g, '');
        return (
          alias.toLowerCase().includes(q) ||
          q.includes(alias.toLowerCase()) ||
          aClean.includes(qClean) ||
          qClean.includes(aClean)
        );
      });

    return (
      item.nameArabic.toLowerCase().includes(q) ||
      item.nameEnglish.toLowerCase().includes(q) ||
      nameClean.includes(qClean) ||
      Boolean(aliasesMatch) ||
      item.country.toLowerCase().includes(q) ||
      item.bio.toLowerCase().includes(q) ||
      item.style.toLowerCase().includes(q) ||
      item.riwayahId.toLowerCase().includes(q) ||
      item.qiraahId.toLowerCase().includes(q) ||
      (riwayah && (riwayah.nameEnglish.toLowerCase().includes(q) || riwayah.nameArabic.toLowerCase().includes(q))) ||
      (qiraah && (qiraah.nameEnglish.toLowerCase().includes(q) || qiraah.nameArabic.toLowerCase().includes(q)))
    );
  });

  return {
    matchingQiraat,
    matchingRiwayat,
    matchingReciters,
  };
}
