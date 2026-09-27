export type RiwayahId = 'hafs' | 'warsh' | 'qalun' | 'duri' | 'shubah' | 'sousi';

export interface RiwayahMeta {
  id: RiwayahId;
  nameArabic: string;
  nameEnglish: string;
  readerArabic: string;
  readerEnglish: string;
  rawiArabic: string;
  rawiEnglish: string;
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
  country: string;
  countryFlag: string;
  style: 'Murattal' | 'Mujawwad' | 'Educational' | 'Melodic Khushu';
  bio: string;
  audioServerSurah: (surahNumber: number) => string;
  audioServerAyah?: (surahNumber: number, ayahNumber: number) => string;
}

// ==========================================
// 1. THE AUTHENTIC RIWAYAT (NARRATIONS)
// ==========================================
export const ALL_RIWAYAT: RiwayahMeta[] = [
  {
    id: 'hafs',
    nameArabic: 'رواية حَفْص عَنْ عَاصِم',
    nameEnglish: "Hafs 'an 'Asim",
    readerArabic: 'الإمام عَاصِم بن أبي النَّجُود الكوفي',
    readerEnglish: "Imam 'Asim ibn Abi an-Najud al-Kufi (d. 127 AH)",
    rawiArabic: 'الإمام حَفْص بن سُلَيْمَان الكوفي',
    rawiEnglish: 'Imam Hafs ibn Sulayman al-Kufi (d. 180 AH)',
    origins: 'Kufa, Iraq',
    primaryRegions: 'Global standard (recited by over 90% of Muslims worldwide across the Middle East, Asia, Americas, Europe, and Nigeria)',
    description: 'The most universally printed and recited narration of the Holy Quran today. Known for its clear articulation, moderate vowel prolongations, and standardized punctuation.',
    keyPhoneticRules: [
      'Pronunciation of Hamzat al-Qat\' without softening (Tahqiq al-Hamz) except in few words like "A\'a\'jamiyyun".',
      'No Imalah (vowel leaning towards "ay") except in Surah Hud (11:41) on the word "Majraahaa" (مَجْرَاهَا).',
      'Separation of Hamzatan (two adjacent glottal stops) with full crisp articulation.',
      'Prolongation of Madd Munfasil and Madd Muttasil for 4 to 5 counts (Tawassut).',
    ],
  },
  {
    id: 'warsh',
    nameArabic: 'رواية وَرْش عَنْ نَافِع',
    nameEnglish: "Warsh 'an Nafi'",
    readerArabic: 'الإمام نَافِع بن عبد الرحمن المَدَنِي',
    readerEnglish: "Imam Nafi' ibn Abd ar-Rahman al-Madani (d. 169 AH)",
    rawiArabic: 'الإمام عُثْمَان بن سَعِيد المِصْرِي (الملقّب بوَرْش)',
    rawiEnglish: "Imam Uthman ibn Sa'id al-Misri, nicknamed 'Warsh' (d. 197 AH)",
    origins: 'Medinah al-Munawwarah via Egypt',
    primaryRegions: 'Widespread across North and West Africa: Morocco, Algeria, Mauritania, Northern Nigeria, Niger, Chad, Senegal, and Mali.',
    description: 'Transmitted directly from the scholars of Madinah al-Munawwarah. Celebrated for its unique phonological nuances including Taghleez of the letter Lam, Naql (vowel transference), and Tashil (softening of the glottal stop).',
    keyPhoneticRules: [
      'Taghleez of the letter Lam (thickening) when preceded by Saad (ص), Dhad (ض), or Taa (ط) with Fathah or Sukoon (e.g. الصَّلَاة -> As-Salât).',
      'Naql (Transference): transferring the vowel of a Hamzah to the preceding unvowelled consonant (e.g. قَدْ أَفْلَحَ -> Qadaflaha).',
      'Tashil (Softening of Hamzah) when two Hamzahs meet in one word.',
      'Tarqiq of the letter Ra (thinning) under conditions where Hafs thickens it, especially when preceded by a Kasrah or Ya Sakinah.',
      'Madd Badal (elongation of vowel following Hamzah) may be stretched to 2, 4, or 6 counts (Qasr, Tawassut, Tul).',
    ],
  },
  {
    id: 'qalun',
    nameArabic: 'رواية قَالُون عَنْ نَافِع',
    nameEnglish: "Qalun 'an Nafi'",
    readerArabic: 'الإمام نَافِع بن عبد الرحمن المَدَنِي',
    readerEnglish: "Imam Nafi' ibn Abd ar-Rahman al-Madani (d. 169 AH)",
    rawiArabic: 'الإمام عِيسَى بن مِينَا المَدَنِي (الملقّب بقَالُون)',
    rawiEnglish: "Imam Isa ibn Mina al-Madani, nicknamed 'Qalun' (d. 220 AH)",
    origins: 'Medinah al-Munawwarah',
    primaryRegions: 'Predominant in Libya, Tunisia, parts of Chad, Mauritania, and parts of West Africa.',
    description: 'The primary co-narration from Imam Nafi of Medinah. Qalun was given his title ("Good/Excellent" in Roman/Latin) by Imam Nafi due to the breathtaking perfection and sweetness of his recitation.',
    keyPhoneticRules: [
      'Silat Mim al-Jam\': optional connection of plural "hum" and "kum" with a prolonged Waw sound (e.g. عَلَيْهِمُو).',
      'Tashil of the second Hamzah when two vowels meet in adjacent words.',
      'Slight Ikhtilas (partial vowel voicing) on select verbal forms.',
      'Madd Munfasil read with Qasr (2 counts) or Tawassut (4 counts).',
    ],
  },
  {
    id: 'duri',
    nameArabic: 'رواية الدُّورِي عَنْ أَبِي عَمْرٍو',
    nameEnglish: "Ad-Duri 'an Abi 'Amr",
    readerArabic: 'الإمام أَبُو عَمْرٍو زَبَّان بن العَلَاءِ البَصْرِي',
    readerEnglish: "Imam Abu 'Amr ibn al-'Ala al-Basri (d. 154 AH)",
    rawiArabic: 'الإمام أَبُو عُمَرَ حَفْص بن عُمَرَ الدُّورِي البَغْدَادِي',
    rawiEnglish: "Imam Abu Umar Hafs ibn Umar ad-Duri al-Baghdadi (d. 246 AH)",
    origins: 'Basra, Iraq',
    primaryRegions: 'Widely recited in Sudan, Somalia, Chad, Eritrea, parts of Ethiopia, and parts of Yemen and East Africa.',
    description: 'Ad-Duri was the first master compiler of the variant readings of the Holy Quran. His recitation from Abu Amr of Basra is renowned for its majestic rhythm, extensive Idgham Kabir (major merging of two vowelled letters), and Imalah.',
    keyPhoneticRules: [
      'Idgham Kabir: merging two consecutive vowelled letters into a single geminate consonant across word boundaries.',
      'Imalah Sughra (Taqleel): tilting the Alif slightly towards Ya in designated morphological endings.',
      'Sakt (brief pausing without breath) and softening of Hamzah.',
    ],
  },
  {
    id: 'shubah',
    nameArabic: 'رواية شُعْبَة عَنْ عَاصِم',
    nameEnglish: "Shu'bah 'an 'Asim",
    readerArabic: 'الإمام عَاصِم بن أبي النَّجُود الكوفي',
    readerEnglish: "Imam 'Asim ibn Abi an-Najud al-Kufi (d. 127 AH)",
    rawiArabic: 'الإمام شُعْبَة بن عَيَّاش الكوفي',
    rawiEnglish: "Imam Shu'bah ibn 'Ayyash al-Kufi (d. 193 AH)",
    origins: 'Kufa, Iraq',
    primaryRegions: 'Studied in traditional Islamic Quranic colleges across Cairo, Makkah, Madinah, Morocco, and West Africa.',
    description: 'The companion narration to Hafs from Imam Asim. Shu\'bah was a devout, ascetic scholar who read the entire Quran over 18,000 times in his life.',
    keyPhoneticRules: [
      'Differences from Hafs in certain vowel markings (Dhammah instead of Kasrah on select prefixes).',
      'Imalah in specific vocabulary entries such as "Ramâ" (رَمَى) and "A\'mâ" (أَعْمَى).',
      'Suppression or insertion of Hamzahs in specific verbal forms.',
    ],
  },
];

// ==========================================
// 2. THE WORLD-RENOWNED QURAN RECITERS & VOICES
// ==========================================
export const ALL_RECITERS: ReciterVoiceMeta[] = [
  {
    id: 'alafasy',
    nameArabic: 'الشيخ مِشَارِي رَاشِد العَفَاسِي',
    nameEnglish: 'Sheikh Mishary Rashid Alafasy',
    riwayahId: 'hafs',
    country: 'Kuwait',
    countryFlag: '🇰🇼',
    style: 'Melodic Khushu',
    bio: 'One of the most internationally recognized voices of the modern Islamic era. Renowned for crystal-clear tajweed, emotional depth, and melodious spiritual cadence.',
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
    id: 'abdul_basit',
    nameArabic: 'الشيخ عَبْد البَاسِط عَبْد الصَّمَد',
    nameEnglish: 'Sheikh Abdul Basit Abdul Samad',
    riwayahId: 'hafs',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Murattal',
    bio: 'The undisputed "Golden Voice" of Egypt and the Islamic world. His majestic, resonant breath control and perfect classical Maqamat set the standard for generations of reciters.',
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
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Educational',
    bio: 'The ultimate golden benchmark for Tajweed precision. The first reciter in Islamic history to record the complete Holy Quran in all major Riwayat (Hafs, Warsh, Qalun, and Duri).',
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
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Melodic Khushu',
    bio: 'Nicknamed "The Weeping Voice" due to his deeply sorrowful, intensely reverent, and heart-piercing recitation that moves listeners to tears.',
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
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Murattal',
    bio: 'Prominent Imam of the Grand Mosque (Masjid al-Haram) in Makkah. Known for his crisp, swift, yet profoundly solemn prayer recitations leading millions of worshippers.',
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
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Murattal',
    bio: 'Beloved for his gentle, warm, and comforting acoustic cadence, widely listened to by Quran students and memorizers throughout the world.',
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
    id: 'yasser_al_dosari',
    nameArabic: 'الشيخ يَاسِر الدَّوْسَرِي',
    nameEnglish: 'Sheikh Yasser Al-Dosari',
    riwayahId: 'hafs',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Melodic Khushu',
    bio: 'Imam of the Grand Mosque in Makkah and Professor of Sharia. Celebrated for his powerful, soaring pitch, majestic vocal range, and heartfelt emotional delivery.',
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
    id: 'omar_al_qazabri',
    nameArabic: 'الشيخ عُمَر القَزَابْرِي (وَرْش)',
    nameEnglish: 'Sheikh Omar Al-Qazabri (Warsh)',
    riwayahId: 'warsh',
    country: 'Morocco',
    countryFlag: '🇲🇦',
    style: 'Murattal',
    bio: 'Grand Imam of the magnificent Hassan II Mosque in Casablanca, Morocco. The foremost living master of Riwayah Warsh an Nafi with an awe-inspiring Maghrebi cadence.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server9.mp3quran.net/omar_warsh/${padded}.mp3`;
    },
  },
  {
    id: 'yasin_al_jazairi',
    nameArabic: 'الشيخ يَاسِين الجَزَائِرِي (وَرْش)',
    nameEnglish: 'Sheikh Yasin Al-Jaza\'iri (Warsh)',
    riwayahId: 'warsh',
    country: 'Algeria',
    countryFlag: '🇩🇿',
    style: 'Melodic Khushu',
    bio: 'Renowned Algerian Qari celebrated throughout North and West Africa for his pure, melodious rendering of Warsh with exquisite Taghleez and Naql.',
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
    country: 'Egypt',
    countryFlag: '🇪🇬',
    style: 'Educational',
    bio: 'The classic authoritative academic recording of Warsh an Nafi, recorded at the highest level of scholarly precision for learners and scholars.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server13.mp3quran.net/husr/warsh/${padded}.mp3`;
    },
  },
  {
    id: 'al_dukali_al_alim',
    nameArabic: 'الشيخ الدُّوكَالِي مُحَمَّد العَالِم (قَالُون)',
    nameEnglish: 'Sheikh Al-Dukali Muhammad Al-Alim (Qalun)',
    riwayahId: 'qalun',
    country: 'Libya',
    countryFlag: '🇱🇾',
    style: 'Murattal',
    bio: 'Distinguished Libyan scholar and master of Qira\'at, famous across North and West Africa for his serene, flawless recitation of Qalun an Nafi.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server7.mp3quran.net/dokali/${padded}.mp3`;
    },
  },
  {
    id: 'al_fatih_zubair',
    nameArabic: 'الشيخ الفَاتِح مُحَمَّد الزُّبَيْر (الدُّورِي)',
    nameEnglish: 'Sheikh Al-Fatih Muhammad Zubair (Ad-Duri)',
    riwayahId: 'duri',
    country: 'Sudan',
    countryFlag: '🇸🇩',
    style: 'Melodic Khushu',
    bio: 'Sudanese master reciter acclaimed for his soulful, traditional African rhythmic inflection and authentic transmission of Ad-Duri an Abi Amr.',
    audioServerSurah: (surahNum: number) => {
      const padded = surahNum.toString().padStart(3, '0');
      return `https://server6.mp3quran.net/fateh/${padded}.mp3`;
    },
  },
  {
    id: 'ali_al_huthaify',
    nameArabic: 'الشيخ عَلِي بْن عَبْد الرَّحْمَن الحُذَيْفِي',
    nameEnglish: 'Sheikh Ali Abdur-Rahman Al-Huthaify',
    riwayahId: 'hafs',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    style: 'Educational',
    bio: 'Senior Imam and Khatib of the Prophet\'s Mosque (Al-Masjid an-Nabawi) in Madinah al-Munawwarah. Renowned for his deliberate, authoritative, and tranquil pacing.',
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
];

// Default configurations
export const DEFAULT_RIWAYAH_ID: RiwayahId = 'hafs';
export const DEFAULT_RECITER_ID: string = 'alafasy';

export function getRiwayahById(id: RiwayahId): RiwayahMeta {
  return ALL_RIWAYAT.find((r) => r.id === id) || ALL_RIWAYAT[0];
}

export function getReciterById(id: string): ReciterVoiceMeta {
  return ALL_RECITERS.find((r) => r.id === id) || ALL_RECITERS[0];
}

export function getRecitersForRiwayah(riwayahId: RiwayahId): ReciterVoiceMeta[] {
  const filtered = ALL_RECITERS.filter((r) => r.riwayahId === riwayahId);
  return filtered.length > 0 ? filtered : [ALL_RECITERS[0]];
}
