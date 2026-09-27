export interface NawawiHadith {
  id: number;
  title: string;
  narrator: string;
  arabic: string;
  english: string;
  keyLessons: string[];
}

export interface IslamicTopic {
  id: string;
  title: string;
  arabicTitle: string;
  category: 'hadith' | 'arkan-islam' | 'arkan-iman' | 'seerah' | 'tajweed' | 'duas' | 'exam-prep';
  summary: string;
  badge: string;
}

export interface SalahStep {
  step: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  description: string;
  posture: string;
}

export interface DuaItem {
  id: string;
  title: string;
  occasion: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  virtue?: string;
}

export interface IslamicExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

// ==========================================
// 1. THE 40 HADITHS OF IMAM AN-NAWAWI (SELECTIONS & CORE)
// ==========================================
export const NAWAWI_HADITHS: NawawiHadith[] = [
  {
    id: 1,
    title: 'Actions are Judged by Intentions (Innama al-A\'malu bin-Niyyat)',
    narrator: 'Amir al-Mu\'minin Umar ibn al-Khattab (RA)',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.',
    english: 'Actions are judged by motives (intentions), and each person will be rewarded according to what he intended. So whoever emigrated for the sake of Allah and His Messenger, his emigration is for Allah and His Messenger; and whoever emigrated for worldly gain or to marry a woman, his emigration is for what he emigrated for.',
    keyLessons: [
      'The purity of intention (Ikhlas) is the essential foundation of every righteous deed.',
      'A good deed without sincere intention for Allah is rejected.',
      'Even mundane, daily actions (eating, sleeping, working) earn reward when intended for Allah\'s pleasure.',
    ],
  },
  {
    id: 2,
    title: 'Hadith Jibril: Islam, Iman, Ihsan, and the Signs of the Hour',
    narrator: 'Umar ibn al-Khattab (RA)',
    arabic: 'قَالَ: فَأَخْبِرْنِي عَنِ الإِسْلاَمِ. قَالَ: الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلاَةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً... قَالَ: فَأَخْبِرْنِي عَنِ الإِحْسَانِ. قَالَ: أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ.',
    english: 'Jibril asked the Prophet ﷺ: "Inform me about Islam." He replied: "Islam is to testify that there is no deity worthy of worship except Allah and that Muhammad is the Messenger of Allah, to establish Salah, to pay Zakat, to fast Ramadan, and to perform Hajj to the House if you can find a way." He then asked: "Inform me about Ihsan." He said: "To worship Allah as though you see Him, for even if you do not see Him, He surely sees you."',
    keyLessons: [
      'Defines the three overarching tiers of religion: Islam (outward practice), Iman (inner conviction), and Ihsan (excellence and spiritual awareness).',
      'Encourages constant mindfulness that Allah is always watching over us (Muraqabah).',
      'Demonstrates etiquette of asking questions to educate an audience.',
    ],
  },
  {
    id: 3,
    title: 'The Five Pillars of Islam',
    narrator: 'Abdullah ibn Umar (RA)',
    arabic: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ.',
    english: 'Islam is built upon five [pillars]: testifying that there is no deity worthy of worship except Allah and that Muhammad is the Messenger of Allah, establishing prayer, giving zakat, making pilgrimage to the House, and fasting Ramadan.',
    keyLessons: [
      'The metaphor of Islam as a grand structure upheld by 5 indispensable pillars.',
      'Neglecting prayer or any pillar weakens the entire edifice of one\'s faith.',
    ],
  },
  {
    id: 4,
    title: 'Stages of Human Creation and the Divine Decree',
    narrator: 'Abdullah ibn Mas\'ud (RA)',
    arabic: 'إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْمًا نُطْفَةً، ثُمَّ يَكُونُ عَلَقَةً مِثْلَ ذَلِكَ، ثُمَّ يَكُونُ مُضْغَةً مِثْلَ ذَلِكَ، ثُمَّ يُرْسَلُ إِلَيْهِ الْمَلَكُ فَيَنْفُخُ فِيهِ الرُّوحَ...',
    english: 'Each of you is assembled in his mother\'s womb for forty days as a drop (nutfah), then becomes a clot (\'alaqah) for a like period, then a piece of flesh (mudghah) for a like period, then the angel is sent to breathe life into him and write four decrees: his provision, his lifespan, his deeds, and whether he will be wretched or blessed.',
    keyLessons: [
      'Miraculous Qur\'anic and prophetic embryology confirmed by modern biological sciences.',
      'Absolute faith in Allah\'s divine wisdom and sovereignty over life and sustenance.',
    ],
  },
  {
    id: 5,
    title: 'Rejection of Innovation (Bid\'ah) in Religion',
    narrator: 'Umm al-Mu\'minin Aisha (RA)',
    arabic: 'مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ.',
    english: 'Whoever introduces into this affair of ours (religion) something which does not belong to it, will have it rejected.',
    keyLessons: [
      'Preservation of Islamic orthodoxy and pure adherence to the authentic Sunnah.',
      'Rituals in worship must have clear evidence from the Quran or Sunnah.',
    ],
  },
  {
    id: 6,
    title: 'Clarifying the Halal, Haram, and Doubtful Matters',
    narrator: 'An-Nu\'man ibn Bashir (RA)',
    arabic: 'إِنَّ الْحَلاَلَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ، وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ لاَ يَعْلَمُهُنَّ كَثِيرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الشُّبُهَاتِ اسْتَبْرَأَ لِدِينِهِ وَعِرْضِهِ... أَلاَ وَإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ، وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ، أَلاَ وَهِيَ الْقَلْبُ.',
    english: 'That which is lawful is clear and that which is unlawful is clear, and between the two of them are doubtful matters about which many people do not know. Thus he who avoids doubtful matters clears himself in regard to his religion and his honor... Truly, in the body there is a morsel of flesh which, if it be sound, the whole body is sound; and if it be diseased, the whole body is diseased. Truly, it is the heart.',
    keyLessons: [
      'Cultivating scrupulousness (Wara\') by leaving suspicious or doubtful actions.',
      'The spiritual heart (Qalb) is the master regulator of human morality and righteous behavior.',
    ],
  },
  {
    id: 7,
    title: 'Religion is Sincerity (Ad-Deenu an-Naseehah)',
    narrator: 'Tamim ad-Dari (RA)',
    arabic: 'الدِّينُ النَّصِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ، وَلِكِتَابِهِ، وَلِرَسُولِهِ، وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ.',
    english: 'The Prophet ﷺ said: "Religion is sincerity." We said: "To whom?" He said: "To Allah, His Book, His Messenger, and to the leaders of the Muslims and their common folk."',
    keyLessons: [
      'Sincerity toward Allah: Believing in Him, worshipping Him solely without partners.',
      'Sincerity toward His Book: Reciting, memorizing, contemplating, and acting upon its laws.',
      'Sincerity toward fellow people: Giving gentle constructive counsel, wishing good for others, and guiding toward righteousness.',
    ],
  },
  {
    id: 13,
    title: 'Loving for Your Brother What You Love for Yourself',
    narrator: 'Anas ibn Malik (RA)',
    arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
    english: 'None of you truly believes until he loves for his brother what he loves for himself.',
    keyLessons: [
      'The hallmark of a perfected believer is genuine altruism, benevolence, and empathy.',
      'Eradication of envy (Hasad), selfishness, and malice from the Muslim community.',
    ],
  },
  {
    id: 15,
    title: 'Good Speech, Hospitality, and Kindness to Neighbors',
    narrator: 'Abu Hurairah (RA)',
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ.',
    english: 'Whoever believes in Allah and the Last Day should speak good or remain silent. Whoever believes in Allah and the Last Day should honor his neighbor. Whoever believes in Allah and the Last Day should honor his guest.',
    keyLessons: [
      'Guarding the tongue from backbiting, slander, false accusations, and futile chatter.',
      'Sacred importance of neighborly rights and warm hospitality.',
    ],
  },
  {
    id: 16,
    title: 'The Prohibition of Anger',
    narrator: 'Abu Hurairah (RA)',
    arabic: 'أَنَّ رَجُلاً قَالَ لِلنَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: أَوْصِنِي. قَالَ: لاَ تَغْضَبْ. فَرَدَّدَ مِرَارًا، قَالَ: لاَ تَغْضَبْ.',
    english: 'A man said to the Prophet ﷺ: "Counsel me." He said: "Do not get angry." The man repeated his request several times, and each time he replied: "Do not get angry."',
    keyLessons: [
      'Self-control and emotional mastery are the pinnacle of true strength.',
      'Anger destroys relationships and clouds moral judgment.',
      'Prophetic remedies for anger: seeking refuge in Allah, making Wudu, sitting down or lying down, remaining silent.',
    ],
  },
];

// ==========================================
// 2. STEP-BY-STEP SALAH (PRAYER) GUIDE
// ==========================================
export const SALAH_STEPS: SalahStep[] = [
  {
    step: 1,
    title: 'The Opening Takbir (Takbirat al-Ihram)',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    description: 'Stand upright facing the Qiblah (Makkah). Raise your hands up to shoulder or earlobe level with palms forward, and state the opening Takbir.',
    posture: 'Standing (Qiyam) with hands raised.',
  },
  {
    step: 2,
    title: 'Opening Supplication & Surah Al-Fatihah',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلاَ إِلَهَ غَيْرُكَ',
    transliteration: 'Subhaanaka Allaahumma wa bihamdika, wa tabaarakasmuka, wa ta\'aalaa jadduka, wa laa ilaaha ghayruk.',
    translation: 'Glory be to You, O Allah, and all praise. Blessed is Your name, exalted is Your majesty, and there is no deity besides You.',
    description: 'Fold your right hand over your left forearm upon your chest. Recite the opening Dua, then Surah Al-Fatihah, followed by another short Surah (in the first 2 Rak\'ahs).',
    posture: 'Standing (Qiyam) with hands clasped on the chest.',
  },
  {
    step: 3,
    title: 'Bowing (Ruku\')',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ (3×)',
    transliteration: 'Subhaana Rabbiyal-\'Azeem (3 times)',
    translation: 'Glory be to my Lord, the Most Magnificent (3 times)',
    description: 'Bow down keeping your back straight horizontal, placing your hands firmly on your knees with fingers spread, looking down at the place of prostration.',
    posture: 'Bowing at a 90-degree angle (Ruku\').',
  },
  {
    step: 4,
    title: 'Rising from Bowing (I\'tidal)',
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا وَلَكَ الْحَمْدُ',
    transliteration: 'Sami\' Allaahu liman hamidah • Rabbanaa wa lakal-hamd',
    translation: 'Allah listens to those who praise Him • Our Lord, and to You belongs all praise.',
    description: 'Stand up straight with your hands at your sides or on your chest, pausing in complete calmness and balance.',
    posture: 'Standing completely erect and still.',
  },
  {
    step: 5,
    title: 'The Prostration (Sujud)',
    arabic: 'سُبْحَانَ رَبِّيَ الأَعْلَى (3×)',
    transliteration: 'Subhaana Rabbiyal-A\'laa (3 times)',
    translation: 'Glory be to my Lord, the Most High (3 times)',
    description: 'Drop to the floor into prostration. Seven body parts must touch the ground: the forehead and nose, both palms, both knees, and the toes of both feet facing Qiblah.',
    posture: 'Prostration (Sujud) with seven limbs on the floor.',
  },
  {
    step: 6,
    title: 'Sitting Between Two Sujuds (Jalsa)',
    arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbigh-fir lee, Rabbigh-fir lee',
    translation: 'My Lord forgive me, my Lord forgive me.',
    description: 'Sit back calmly on your left foot with the right foot upright. Rest your hands on your thighs and recite this supplication.',
    posture: 'Sitting peacefully between two prostrations.',
  },
  {
    step: 7,
    title: 'The Tashahhud (Sitting for Witnessing)',
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.',
    transliteration: 'At-tahiyyaatu lillaahi was-salawaatu wat-tayyibaat. As-salaamu \'alayka ayyuhan-Nabiyyu wa rahmatullaahi wa barakaatuh. As-salaamu \'alaynaa wa \'alaa \'ibaadillaahis-saaliheen. Ash-hadu allaa ilaaha illallaahu wa ash-hadu anna Muhammadan \'abduhoo wa Rasooluh.',
    translation: 'All compliments, prayers and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is His servant and Messenger.',
    description: 'Sit in the second and final Rak\'ah. Point your right index finger forward while reciting the Shahadah.',
    posture: 'Sitting with right index finger raised in testifying.',
  },
  {
    step: 8,
    title: 'The Concluding Salutations (Taslim)',
    arabic: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ (يَمِينًا وَشِمَالاً)',
    transliteration: 'As-Salaamu \'Alaykum wa Rahmatullah (Turn head to right, then to left)',
    translation: 'Peace and the mercy of Allah be upon you',
    description: 'Turn your head to the right over your shoulder and say the Taslim, then turn your head to the left and repeat.',
    posture: 'Turning head to right, then left.',
  },
];

// Prayer Times and Rak'ah Breakdown Table
export const DAILY_PRAYERS_TABLE = [
  { prayer: 'Fajr (Dawn)', fard: 2, sunnahBefore: 2, sunnahAfter: 0, time: 'From true dawn until sunrise' },
  { prayer: 'Dhuhr (Noon)', fard: 4, sunnahBefore: 4, sunnahAfter: 2, time: 'From sun passing zenith until shadow equals object' },
  { prayer: 'Asr (Afternoon)', fard: 4, sunnahBefore: 0, sunnahAfter: 0, time: 'From shadow exceeding object until sunset' },
  { prayer: 'Maghrib (Sunset)', fard: 3, sunnahBefore: 0, sunnahAfter: 2, time: 'From sunset until red twilight disappears' },
  { prayer: 'Isha (Night)', fard: 4, sunnahBefore: 0, sunnahAfter: 2, time: 'From twilight disappearance until middle of the night' },
];

// ==========================================
// 3. WUDU (ABLUTION) STEP-BY-STEP
// ==========================================
export const WUDU_STEPS = [
  { step: 1, title: 'Intention (Niyyah) & Bismillah', desc: 'Make sincere intention in the heart to purify for prayer, then say "Bismillah" (In the Name of Allah).' },
  { step: 2, title: 'Washing Hands (3 times)', desc: 'Wash both hands up to the wrists thoroughly 3 times, ensuring water passes between fingers.' },
  { step: 3, title: 'Rinsing Mouth (Madmadah - 3 times)', desc: 'Take water with your right hand into your mouth, swirl it around and spit it out 3 times.' },
  { step: 4, title: 'Inhaling & Snuffing Water (Istinshaq - 3 times)', desc: 'Gently sniff water into your nostrils with right hand, then blow it out with left hand 3 times.' },
  { step: 5, title: 'Washing Face (3 times)', desc: 'Wash the entire face from hairline to below chin, and from ear to ear 3 times.' },
  { step: 6, title: 'Washing Arms to Elbows (3 times)', desc: 'Wash right arm from fingertips up to and including the elbow 3 times, then do the same for the left arm.' },
  { step: 7, title: 'Wiping the Head (Masah - 1 time)', desc: 'Moisten hands and wipe over your head from the forehead back to the nape of the neck and return to the front once.' },
  { step: 8, title: 'Wiping Ears (1 time)', desc: 'Wipe inside ears with index fingers and behind ears with thumbs once.' },
  { step: 9, title: 'Washing Feet to Ankles (3 times)', desc: 'Wash right foot up to and including ankle 3 times (interlacing toes), then repeat for left foot.' },
  { step: 10, title: 'Concluding Supplication', desc: 'Say: "Ash-hadu alla ilaha illallah wahdahu la shareeka lah, wa ash-hadu anna Muhammadan \'abduhu wa rasooluh. Allahummaj\'alnee minat-tawwabeena waj\'alnee minal-mutatahhireen."' },
];

// ==========================================
// 4. THE 25 PROPHETS MENTIONED IN THE HOLY QURAN
// ==========================================
export const THE_25_PROPHETS = [
  { name: 'Adam', arabic: 'آدَم', title: 'The Father of Humanity', period: 'First human and prophet' },
  { name: 'Idris (Enoch)', arabic: 'إِدْرِيس', title: 'The Trustworthy', period: 'Early generation' },
  { name: 'Nuh (Noah)', arabic: 'نُوح', title: 'Prophet of the Great Ark', period: 'Ulul \'Azm (Firm Resolve)' },
  { name: 'Hud (Eber)', arabic: 'هُود', title: 'Prophet sent to \'Ad', period: 'Arabian Peninsula' },
  { name: 'Salih (Shelah)', arabic: 'صَالِح', title: 'Prophet sent to Thamud', period: 'The miraculous She-camel' },
  { name: 'Ibrahim (Abraham)', arabic: 'إِبْرَاهِيم', title: 'Khalilullah (Friend of Allah)', period: 'Ulul \'Azm (Firm Resolve)' },
  { name: 'Lut (Lot)', arabic: 'لُوط', title: 'Prophet sent to Sodom', period: 'Contemporary of Ibrahim' },
  { name: 'Isma\'il (Ishmael)', arabic: 'إِسْمَاعِيل', title: 'Dhabiullah (The Sacrificed)', period: 'Son of Ibrahim; Ancestor of Muhammad ﷺ' },
  { name: 'Ishaq (Isaac)', arabic: 'إِسْحَاق', title: 'The Righteous Prophet', period: 'Son of Ibrahim' },
  { name: 'Ya\'qub (Jacob/Israel)', arabic: 'يَعْقُوب', title: 'Father of the 12 Tribes', period: 'Grandson of Ibrahim' },
  { name: 'Yusuf (Joseph)', arabic: 'يُوسُف', title: 'As-Siddiq (The Truthful)', period: 'Noble Minister of Egypt' },
  { name: 'Ayyub (Job)', arabic: 'أَيُّوب', title: 'Paragon of Patience (Sabr)', period: 'Endured great trials with gratitude' },
  { name: 'Shu\'ayb (Jethro)', arabic: 'شُعَيْب', title: 'Khatib al-Anbiya (Preacher)', period: 'Sent to Midian (Honest trade)' },
  { name: 'Musa (Moses)', arabic: 'مُوسَى', title: 'Kalimullah (He who spoke with Allah)', period: 'Ulul \'Azm; Revealed the Tawrat' },
  { name: 'Harun (Aaron)', arabic: 'هَارُون', title: 'Eloquent Prophet & Brother of Musa', period: 'Priestly co-prophet in Egypt' },
  { name: 'Dhul-Kifl (Ezekiel)', arabic: 'ذُو الكِفْل', title: 'The Steadfast Guarantor', period: 'Righteous and just leader' },
  { name: 'Dawud (David)', arabic: 'دَاوُود', title: 'King and Prophet', period: 'Revealed the Zabur (Psalms)' },
  { name: 'Sulayman (Solomon)', arabic: 'سُلَيْمَان', title: 'The Wise King', period: 'Given dominion over wind & jinn' },
  { name: 'Ilyas (Elijah)', arabic: 'إِلْيَاس', title: 'Prophet against Baal worship', period: 'Levant' },
  { name: 'Al-Yasa\' (Elisha)', arabic: 'اليَسَع', title: 'The Chosen Successor', period: 'Successor of Ilyas' },
  { name: 'Yunus (Jonah)', arabic: 'يُونُس', title: 'Dhun-Nun (Companion of the Whale)', period: 'Sent to Nineveh' },
  { name: 'Zakariyya (Zechariah)', arabic: 'زَكَرِيَّا', title: 'Guardian of Maryam', period: 'Martyred prophet' },
  { name: 'Yahya (John the Baptist)', arabic: 'يَحْيَى', title: 'The Pure & Compassionate', period: 'Son of Zakariyya' },
  { name: 'Isa (Jesus)', arabic: 'عِيسَى', title: 'Ruhullah & Kalimatullah (Spirit & Word)', period: 'Ulul \'Azm; Revealed the Injeel' },
  { name: 'Muhammad ﷺ', arabic: 'مُحَمَّد', title: 'Khatam an-Nabiyyin (Seal of the Prophets)', period: 'Sent as Mercy to all worlds; Revealed the Holy Quran' },
];

// ==========================================
// 5. DAILY DUAS & ADHKAR (FORTRESS OF THE MUSLIM)
// ==========================================
export const DAILY_DUAS: DuaItem[] = [
  {
    id: 'dua-wake',
    title: 'Upon Waking Up',
    occasion: 'Morning immediately upon waking',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillaahil-lazee ahyaanaa ba\'da maa amaatanaa wa ilayhin-nushoor.',
    translation: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari',
  },
  {
    id: 'dua-sleep',
    title: 'Before Going to Sleep',
    occasion: 'Night lying on the right side',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismikallaahumma amootu wa ahyaa.',
    translation: 'In Your name, O Allah, I die and I live.',
    reference: 'Sahih al-Bukhari',
  },
  {
    id: 'dua-sayyid-istighfar',
    title: 'Sayyid al-Istighfar (The Master Supplication for Forgiveness)',
    occasion: 'Morning and Evening',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.',
    transliteration: 'Allaahumma Anta Rabbee laa ilaaha illaa Anta, khalaqtanee wa ana \'abduka, wa ana \'alaa \'ahdika wa wa\'dika mastata\'tu, a\'oozu bika min sharri maa sana\'tu, aboo\'u laka bini\'matika \'alayya, wa aboo\'u bizanbee faghfir lee fa-innahoo laa yaghfiruz-zunooba illaa Anta.',
    translation: 'O Allah, You are my Lord, there is no deity worthy of worship except You. You created me and I am Your servant, and I abide by Your covenant and promise as best as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me and I confess my sins, so forgive me, for none forgives sins except You.',
    reference: 'Sahih al-Bukhari',
    virtue: 'The Prophet ﷺ said: "Whoever recites this with conviction in the evening and dies during that night will enter Paradise; and whoever says it in the morning and dies during that day will enter Paradise."',
  },
  {
    id: 'dua-leave-home',
    title: 'When Leaving the House',
    occasion: 'Exiting home',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ',
    transliteration: 'Bismillaahi tawakkaltu \'alallaahi, wa laa hawla wa laa quwwata illaa billaah.',
    translation: 'In the name of Allah, I place my trust in Allah, and there is no power or might except with Allah.',
    reference: 'Abu Dawud & At-Tirmidhi',
    virtue: 'It is said to him: "You have been guided, defended, and protected," and Shaytan moves away from him.',
  },
  {
    id: 'dua-distress',
    title: 'Supplication in Hardship & Anxiety (Dua Yunus)',
    occasion: 'Facing worries or trials',
    arabic: 'لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'Laaa ilaaha illaaa Anta Subhaanaka innee kuntu minaz-zaalimeen.',
    translation: 'There is no deity worthy of worship except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: 'Surah Al-Anbiya (21:87), At-Tirmidhi',
    virtue: 'The Prophet ﷺ said: "No Muslim supplicates with this in any matter except that Allah answers him."',
  },
  {
    id: 'dua-parents',
    title: 'Dua for Parents',
    occasion: 'Supplicating for mother & father',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhumaa kamaa rabbayaanee sagheeraa.',
    translation: 'My Lord, have mercy upon them both as they brought me up [when I was] small.',
    reference: 'Surah Al-Isra (17:24)',
  },
];

// ==========================================
// 6. TAJWEED RULES & SCIENCES OF QURAN
// ==========================================
export const TAJWEED_MODULES = [
  {
    title: 'Rules of Nun Sakinah and Tanween (نْ / ً ٍ ٌ)',
    arabic: 'أَحْكَامُ النُّونِ السَّاكِنَةِ وَالتَّنْوِينِ',
    desc: 'When Nun Sakinah or Tanween meets any Arabic letter, it has four possible rules:',
    rules: [
      {
        name: '1. Izhar Halqi (Clear Pronunciation)',
        arabic: 'الإِظْهَارُ الحَلْقِي',
        letters: 'ء, هـ, ع, ح, غ, خ (The 6 throat letters)',
        meaning: 'Pronounce the "N" sound clearly without adding extra nasal buzzing (Ghunnah).',
        example: 'مَنْ آمَنَ (Man aamana), أَنْعَمْتَ (An\'amta)',
      },
      {
        name: '2. Idgham (Merging / Assimilation)',
        arabic: 'الإِدْغَام',
        letters: 'ي, ر, م, ل, و, ن (Combined in word يَرْمَلُون)',
        meaning: 'Merging the Nun Sakinah into the next letter. Split into: With Ghunnah (يَنْمُو) and Without Ghunnah (ل, ر).',
        example: 'مَن يَقُولُ (May-yaqool), مِن رَّبِّهِم (Mir-rabbihim)',
      },
      {
        name: '3. Iqlab (Conversion into Meem)',
        arabic: 'الإِقْلَاب',
        letters: 'ب (Ba)',
        meaning: 'Converting the Nun sound into a light Meem (م) sound with Ghunnah.',
        example: 'مِن بَعْدِ (Mim-ba\'di), أَنبِئْهُم (Ambi\'hum)',
      },
      {
        name: '4. Ikhfa Haqiqi (Concealment)',
        arabic: 'الإِخْفَاءُ الحَقِيقِي',
        letters: 'ت, ث, ج, د, ذ, ز, س, ش, ص, ض, ط, ظ, ف, ق, ك (The remaining 15 letters)',
        meaning: 'Concealing the Nun sound between Izhar and Idgham with nasal resonance (Ghunnah).',
        example: 'مِن قَبْلِ (Min-qabl), كُنتُمْ (Kuntum)',
      },
    ],
  },
  {
    title: 'Qalqalah (Echo / Bouncing Sound)',
    arabic: 'حُرُوفُ القَلْقَلَة',
    desc: 'When these 5 letters carry a Sukoon (ْ) or appear at a stopping pause, an echoing bounce is produced:',
    letters: 'ق , ط , ب , ج , د (Combined in phrase: قُطْبُ جَدٍّ)',
    rules: [
      {
        name: 'Qalqalah Sughra (Minor)',
        meaning: 'Occurs when the letter has a Sukoon in the middle of a word or sentence without stopping.',
        example: 'يَقْطَعُونَ (Yaq-ta\'oon), ابْتَغَى (Ib-taghaa)',
      },
      {
        name: 'Qalqalah Kubra (Major)',
        meaning: 'Occurs at the end of a word when pausing/stopping on the letter.',
        example: 'الْفَلَقِ ؕ (Al-Falaq), أَحَدٌ ؕ (Ahad), كَسَبَ ؕ (Kasab)',
      },
    ],
  },
];

// ==========================================
// 7. ISLAMIC STUDIES EXAM PRACTICE QUESTIONS (WAEC / NECO / Universal CBT)
// ==========================================
export const ISLAMIC_EXAM_QUESTIONS: IslamicExamQuestion[] = [
  {
    id: 'irs-q1',
    question: 'How many Surahs (chapters) are there in the Holy Quran?',
    options: ['114', '110', '124', '100'],
    correctIndex: 0,
    explanation: 'The Holy Quran consists of exactly 114 Surahs, divided into 30 Juz and containing 6,236 verses (Ayahs).',
    category: 'Ulum al-Quran',
  },
  {
    id: 'irs-q2',
    question: 'Which treaty signed in 6 AH is referred to in Surah Al-Fath as a "Clear Victory" (Fathan Mubeena)?',
    options: ['Treaty of Hudaybiyyah', 'Constitution of Madinah', 'Pledge of Aqabah', 'Treaty of Ta\'if'],
    correctIndex: 0,
    explanation: 'The Treaty of Hudaybiyyah paved the way for peaceful spread of Islam across the Arabian peninsula and resulted in thousands embracing faith.',
    category: 'Seerah',
  },
  {
    id: 'irs-q3',
    question: 'What is the Nisab threshold of Zakat for pure gold according to the Sunnah?',
    options: ['85 grams (20 Mithqals / Dinars)', '100 grams', '50 grams', '200 grams'],
    correctIndex: 0,
    explanation: 'The Nisab for gold is 20 Dinars, which is mathematically equivalent to 85 grams of pure gold. Anyone possessing this amount for one full lunar year must pay 2.5%.',
    category: 'Fiqh / Zakat',
  },
  {
    id: 'irs-q4',
    question: 'Which category of Hadith possesses an uninterrupted chain of trustworthy narrators with sound memory and no hidden defects?',
    options: ['Sahih (Authentic)', 'Hasan (Good)', 'Da\'if (Weak)', 'Mawdu\' (Fabricated)'],
    correctIndex: 0,
    explanation: 'A Sahih Hadith meets all 5 conditions: continuity of chain (Ittisal), integrity of narrators (\'Adalah), precision of memory (Dabt), freedom from irregularity (Shudhudh), and absence of defects (\'Illah).',
    category: 'Hadith Sciences',
  },
  {
    id: 'irs-q5',
    question: 'Which battle took place on the 17th of Ramadan in 2 AH, marking the first major victory of the Muslim community?',
    options: ['Battle of Badr', 'Battle of Uhud', 'Battle of Khandaq (Trench)', 'Battle of Mu\'tah'],
    correctIndex: 0,
    explanation: 'The Battle of Badr was the decisive confrontation (Yawm al-Furqan) where 313 Muslims defeated a Quraysh army of over 1,000 men.',
    category: 'Islamic History',
  },
  {
    id: 'irs-q6',
    question: 'What is the term for changing a Nun Sakinah into a Meem when followed by the letter Ba (ب)?',
    options: ['Iqlab', 'Izhar', 'Idgham', 'Ikhfa'],
    correctIndex: 0,
    explanation: 'Iqlab literally means turning or converting. It occurs when a Nun Sakinah or Tanween is followed by the letter Ba (ب), turning the sound into a Meem with Ghunnah.',
    category: 'Tajweed',
  },
];
