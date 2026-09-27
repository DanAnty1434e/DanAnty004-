export interface IslamicSubjectModule {
  id: string;
  code: string;
  title: string;
  arabicTitle: string;
  category: 'Fiqh' | 'Aqeedah' | 'Ulum-al-Quran' | 'Hadith-Sciences' | 'Seerah-History' | 'Akhlaq-Adab';
  badge: string;
  summary: string;
  audioVerseRef?: { surah: number; ayah: number; label: string };
  arabicKeyText?: string;
  englishExplanation: string;
  corePrinciples: {
    heading: string;
    arabicTerm?: string;
    details: string;
    evidence?: string;
  }[];
  practicalApplication: string;
}

export const ISLAMIC_CURRICULUM_SUBJECTS: IslamicSubjectModule[] = [
  // ==========================================
  // 1. FIQH (ISLAMIC JURISPRUDENCE)
  // ==========================================
  {
    id: 'fiqh-taharah',
    code: 'FIQH-101',
    title: 'Taharah (Ritual Purification & Hygiene)',
    arabicTitle: 'فِقْهُ الطَّهَارَةِ وَالنَّظَافَةِ',
    category: 'Fiqh',
    badge: 'Fundamental Fiqh',
    summary: 'The legal rulings governing physical and ritual purification (Wudu, Ghusl, Tayammum, and cleansing of Najasah) as the mandatory prerequisite for Salah.',
    audioVerseRef: { surah: 5, ayah: 6, label: 'Surah Al-Ma\'idah 5:6 (Verse of Wudu & Tayammum)' },
    arabicKeyText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ',
    englishExplanation: 'Purification in Islam is both spiritual and physical. Allah declares in the Holy Quran that ritual cleanliness is a condition for standing before Him in prayer. Purification removes major and minor impurities, elevating the soul and preparing the heart for devotion.',
    corePrinciples: [
      {
        heading: 'Minor Ritual Impurity (Al-Hadath al-Asghar)',
        arabicTerm: 'الحَدَثُ الأَصْغَرُ',
        details: 'Caused by natural bodily emissions, deep sleep, or loss of consciousness. It is rectified exclusively by performing Wudu (ablution).',
        evidence: 'Surah Al-Ma\'idah (5:6) establishes the four obligatory limbs: face, hands to elbows, head wiping, and feet to ankles.',
      },
      {
        heading: 'Major Ritual Impurity (Al-Hadath al-Akbar)',
        arabicTerm: 'الحَدَثُ الأَكْبَرُ',
        details: 'Caused by marital relations, nocturnal emissions (Janabah), menses (Hayd), or post-natal bleeding (Nifas). It requires full ritual bath (Ghusl) with water reaching all hair and skin.',
        evidence: 'Prophetic Sunnah: Intention, washing private areas, performing standard Wudu, pouring water 3 times over head, and washing the entire body.',
      },
      {
        heading: 'Dry Ablution (Tayammum)',
        arabicTerm: 'التَّيَمُّمُ بِالصَّعِيدِ الطَّيِّبِ',
        details: 'The divine concession when clean water is completely unavailable or medically harmful to use. Performed with pure earth/dust by striking the hands once, wiping the face, and wiping the hands.',
        evidence: 'Quran 5:6: "And if you find no water, then seek clean earth and wipe over your faces and hands therewith. Allah does not intend to make difficulty for you."',
      },
      {
        heading: 'Categories of Water & Removing Najasah',
        arabicTerm: 'أَقْسَامُ المِيَاهِ وَإِزَالَةُ النَّجَاسَاتِ',
        details: 'Tahoor (pure and purifying natural rain, sea, well, or river water), Tahir (clean but mixed), and Najis (water altered in color, taste, or odor by impurity). Impurities must be physically washed away until trace and odor disappear.',
      },
    ],
    practicalApplication: 'Maintain conscious hygiene throughout the day: brushing teeth with Siwak, cleaning after bodily functions (Istinja\'), keeping clothes free from urine drops, and renewing Wudu before every prayer.',
  },
  {
    id: 'fiqh-salah',
    code: 'FIQH-102',
    title: 'Salah: The Pillars, Conditions, and Sunan of Prayer',
    arabicTitle: 'فِقْهُ الصَّلَاةِ: الأَرْكَانُ وَالشُّرُوطُ وَالسُّنَنُ',
    category: 'Fiqh',
    badge: 'Core Worship',
    summary: 'Comprehensive jurisprudence of the 5 daily prayers, congregational prayer (Jumu\'ah), prostration of forgetfulness (Sujud as-Sahw), and the prayer of the sick and traveler.',
    audioVerseRef: { surah: 2, ayah: 238, label: 'Surah Al-Baqarah 2:238 (Guard the Prayers)' },
    arabicKeyText: 'حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ',
    englishExplanation: 'Salah is the second pillar of Islam and the primary demarcation between faith and heedlessness. It is a direct spiritual dialogue between the servant and the Creator, repeated five times each day.',
    corePrinciples: [
      {
        heading: 'Conditions of Validity (Shurut as-Salah)',
        arabicTerm: 'شُرُوطُ صِحَّةِ الصَّلَاةِ',
        details: 'Nine prerequisite conditions that must exist prior to commencing: Islam, Sanity, Discernment (Tamyiz), Removal of Hadath, Removal of Najasah, Covering \'Awrah, Arrival of prayer time, Facing the Qiblah, and Sincere Intention (Niyyah).',
      },
      {
        heading: 'The 14 Pillars of Prayer (Arkan as-Salah)',
        arabicTerm: 'أَرْكَانُ الصَّلَاةِ الأَرْبَعَةَ عَشَرَ',
        details: 'Elements that cannot be omitted intentionally or mistakenly: Standing if able (Qiyam), Opening Takbir, Recitation of Surah Al-Fatihah, Bowing (Ruku\'), Straightening from Ruku\', Prostration (Sujud) on 7 limbs, Rising from Sujud, Sitting between prostrations, Tranquility (Tuma\'ninah) in every posture, Final Tashahhud, Sitting for Tashahhud, Blessing the Prophet ﷺ, Concluding Salam, and Sequential Order.',
      },
      {
        heading: 'Obligatory Duties (Wajibat as-Salah)',
        arabicTerm: 'وَاجِبَاتُ الصَّلَاةِ',
        details: 'Takbirs of transition, saying "Subhana Rabbiyal-\'Azeem" in Ruku\', saying "Sami\' Allahu liman hamidah" and "Rabbana wa lakal-hamd", saying "Subhana Rabbiyal-A\'la" in Sujud, and the First Tashahhud. If forgotten, they are compensated by Sujud as-Sahw.',
      },
      {
        heading: 'Prostration of Forgetfulness (Sujud as-Sahw)',
        arabicTerm: 'سُجُودُ السَّهْوِ',
        details: 'Two prostrations made either before or after Taslim to remedy unintentional additions, omissions, or doubtful counts during prayer.',
      },
    ],
    practicalApplication: 'Perform each posture with calm tranquility (Tuma\'ninah). Ensure full focus (Khushu\'), understanding that rushing nullifies prayer validity.',
  },
  {
    id: 'fiqh-zakat-sawm',
    code: 'FIQH-103',
    title: 'Zakat & Sawm (Purifying Wealth & Fasting Ramadan)',
    arabicTitle: 'فِقْهُ الزَّكَاةِ وَالصِّيَامِ',
    category: 'Fiqh',
    badge: 'Pillars of Social & Personal Purifying',
    summary: 'The jurisprudence of compulsory charity (Zakat al-Mal and Zakat al-Fitr) and the rulings of Ramadan fasting, nullifiers, exemptions, and voluntary fasts.',
    audioVerseRef: { surah: 2, ayah: 183, label: 'Surah Al-Baqarah 2:183 (Fasting Prescribed)' },
    arabicKeyText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
    englishExplanation: 'Zakat purifies wealth and redistributes surplus resources to eradicate poverty and support the underprivileged. Fasting purifies the body and soul, fostering self-restraint (Taqwa) and empathy with those who hunger.',
    corePrinciples: [
      {
        heading: 'The Nisab & 2.5% Rate of Zakat',
        arabicTerm: 'نِصَابُ الزَّكَاةِ وَالحَوْلُ',
        details: 'Compulsory on cash, gold, silver, and commercial merchandise held for a full lunar year (Hawl) exceeding the Nisab threshold (85 grams of pure gold or 595 grams of silver). The rate is 2.5% (one fortieth).',
        evidence: 'Surah At-Tawbah (9:103): "Take from their wealth a charity by which you purify them and cause them increase."',
      },
      {
        heading: 'The 8 Eligible Beneficiaries (Masarif az-Zakat)',
        arabicTerm: 'مَصَارِفُ الزَّكَاةِ الثَّمَانِيَة',
        details: 'Explicitly restricted in Surah At-Tawbah (9:60) to: The Poor (Fuqara), The Needy (Masakin), Zakat Administrators, Those whose hearts are inclined, Ransoming slaves/captives, Debtors in distress, In the cause of Allah (Fi Sabilillah), and The Stranded Traveler.',
      },
      {
        heading: 'Fasting Rulings & Nullifiers (Mubtilat as-Siyam)',
        arabicTerm: 'مُفْطِرَاتُ الصَّوْمِ',
        details: 'Abstaining with intention from food, drink, and intimacy from true dawn (Fajr) until sunset (Maghrib). Nullified by intentional eating, drinking, intimacy, deliberate vomiting, and menstruation. Injections for nutrition break the fast; non-nutritive medical injections do not.',
      },
      {
        heading: 'Exemptions, Fidyah, and Kaffarah',
        arabicTerm: 'الرُّخَصُ وَالفِدْيَةُ وَالكَفَّارَةُ',
        details: 'Travelers and the temporarily sick must make up missed days (Qadha). The chronically ill or elderly who cannot fast pay Fidyah (feeding one needy person per day). Deliberate daytime marital intimacy incurs major Kaffarah (fasting 60 consecutive days or feeding 60 poor persons).',
      },
    ],
    practicalApplication: 'Calculate Zakat meticulously at the end of each lunar year. Approach Ramadan with spiritual readiness, guarding the tongue from arguments, gossip, and vanity.',
  },

  // ==========================================
  // 2. AQEEDAH & TAWHID (THEOLOGY & FAITH)
  // ==========================================
  {
    id: 'aqeedah-tawhid',
    code: 'AQD-201',
    title: 'Tawhid: The Three Categories of Monotheism',
    arabicTitle: 'أَقْسَامُ التَّوْحِيدِ الثَّلَاثَةِ: الرُّبُوبِيَّةُ وَالأُلُوهِيَّةُ وَالأَسْمَاءُ وَالصِّفَاتُ',
    category: 'Aqeedah',
    badge: 'Foundational Creed',
    summary: 'The ultimate bedrock of Islamic faith: Tawhid ar-Rububiyyah (Lordship), Tawhid al-Uluhiyyah (Worship), and Tawhid al-Asma\' wa-Sifat (Names and Attributes).',
    audioVerseRef: { surah: 112, ayah: 1, label: 'Surah Al-Ikhlas (Pure Monotheism)' },
    arabicKeyText: 'قُلْ هُوَ اللَّهُ أَحَدٌ • اللَّهُ الصَّمَدُ • لَمْ يَلِدْ وَلَمْ يُولَدْ • وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    englishExplanation: 'Tawhid is the defining truth of existence: that Allah is One, without partners, parents, offspring, or rivals. All prophets from Adam to Muhammad ﷺ were sent with the single proclamation of La ilaha illallah.',
    corePrinciples: [
      {
        heading: '1. Tawhid ar-Rububiyyah (Oneness in Lordship)',
        arabicTerm: 'تَوْحِيدُ الرُّبُوبِيَّةِ',
        details: 'Singling out Allah alone in His actions: Creation, Sovereignty, Sustenance, Giving life and death, and Master of all affairs. Even the pagan Arabs acknowledged this, but it alone did not make them Muslims.',
      },
      {
        heading: '2. Tawhid al-Uluhiyyah (Oneness in Worship)',
        arabicTerm: 'تَوْحِيدُ الأُلُوهِيَّةِ وَالعِبَادَةِ',
        details: 'Directing all acts of worship exclusively to Allah: Prayer, Supplication (Dua), Sacrificing, Vowing, Hope (Raja\'), Fear (Khawf), and Reliance (Tawakkul). Calling upon dead intermediaries or graves is Shirk.',
      },
      {
        heading: '3. Tawhid al-Asma\' wa-Sifat (Names & Attributes)',
        arabicTerm: 'تَوْحِيدُ الأَسْمَاءِ وَالصِّفَاتِ',
        details: 'Affirming whatever Allah and His Messenger ﷺ affirmed of His Beautiful Names and Exalted Attributes without distortion (Tahrif), denial (Ta\'til), imagining how (Takyif), or resemblance to creation (Tamthil).',
        evidence: 'Surah Ash-Shura (42:11): "There is nothing like unto Him, and He is the Hearing, the Seeing."',
      },
      {
        heading: 'Types of Shirk (Polytheism)',
        arabicTerm: 'الشِّرْكُ الأَكْبَرُ وَالأَصْغَرُ',
        details: 'Major Shirk (Ash-Shirk al-Akbar) expels one from Islam and cancels all good deeds if died upon without repentance. Minor Shirk (Ash-Shirk al-Asghar) includes showing off in worship (Riya\') and swearing by other than Allah.',
      },
    ],
    practicalApplication: 'Direct all supplications and hopes to Allah alone. Free the mind from superstitions, lucky charms, amulets (Tama\'im), and horoscopes.',
  },
  {
    id: 'aqeedah-iman',
    code: 'AQD-202',
    title: 'The Six Articles of Faith (Arkan al-Iman)',
    arabicTitle: 'أَرْكَانُ الإِيمَانِ السِّتَّةِ',
    category: 'Aqeedah',
    badge: 'Pillars of Faith',
    summary: 'The 6 mandatory internal convictions: Belief in Allah, His Angels, His Books, His Messengers, The Last Day, and Divine Decree (Al-Qadr).',
    audioVerseRef: { surah: 2, ayah: 285, label: 'Surah Al-Baqarah 2:285 (Amanar-Rasool)' },
    arabicKeyText: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ',
    englishExplanation: 'While Islam represents the external submission of limbs, Iman represents the internal illumination and conviction of the intellect and spirit. When both flourish together, the believer reaches Ihsan.',
    corePrinciples: [
      {
        heading: '1. Belief in Allah & 2. Belief in His Angels',
        arabicTerm: 'الإِيمَانُ بِاللَّهِ وَمَلَائِكَتِهِ',
        details: 'Angels are noble, sinless beings created from light who carry out divine orders without disobedience. Among them: Jibril (revelation), Mika\'il (rain and provision), Israfil (trumpet blower), and the Angel of Death (Malak al-Mawt).',
      },
      {
        heading: '3. Belief in the Scriptures & 4. Belief in the Messengers',
        arabicTerm: 'الإِيمَانُ بِالكُتُبِ وَالرُّسُلِ',
        details: 'Belief that Allah revealed divine scriptures to His messengers: the Suhuf of Ibrahim, the Tawrat to Musa, the Zabur to Dawud, the Injeel to Isa, and the Holy Quran to Muhammad ﷺ as the final preserved criterion (Muhaymin).',
      },
      {
        heading: '5. The Last Day (Al-Yawm al-Akhir)',
        arabicTerm: 'الإِيمَانُ بِاليَوْمِ الآخِرِ',
        details: 'Belief in the trials of the grave, the Resurrection (Ba\'th), the Gathering (Hashr), the Balance (Mizan), the Basin (Hawdh), the Bridge (Sirat), and the eternal abodes: Jannah (Paradise) and Jahannam (Hellfire).',
      },
      {
        heading: '6. Divine Decree (Al-Qadr: Good and Hardships)',
        arabicTerm: 'الإِيمَانُ بِالقَدَرِ خَيْرِهِ وَشَرِّهِ',
        details: 'Consists of 4 fundamental levels: Divine Knowledge (\'Ilm), Divine Writing (Kitabah in the Preserved Tablet), Divine Will (Mashi\'ah), and Divine Creation (Khalq). Humans have genuine free will and accountability within Allah\'s overarching sovereign will.',
      },
    ],
    practicalApplication: 'Peace of mind in tribulations: knowing that whatever misses you could never have hit you, and whatever hits you could never have missed you.',
  },

  // ==========================================
  // 3. ULUM AL-QUR'AN & TAJWEED
  // ==========================================
  {
    id: 'ulum-quran-revelation',
    code: 'ULUM-301',
    title: 'Ulum al-Qur\'an: Revelation, Compilation & The 10 Qira\'at',
    arabicTitle: 'عُلُومُ القُرْآنِ: نُزُولُهُ وَتَدْوِينُهُ وَالقِرَاءَاتُ العَشْرُ',
    category: 'Ulum-al-Quran',
    badge: 'Quranic Sciences',
    summary: 'The history of divine revelation (Wahi), the reasons for revelation (Asbab an-Nuzul), the Uthmanic compilation, and the authentic Mutawatir Qira\'at and Riwayat.',
    audioVerseRef: { surah: 15, ayah: 9, label: 'Surah Al-Hijr 15:9 (Preservation of Quran)' },
    arabicKeyText: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
    englishExplanation: 'The Holy Quran is the uncreated Word of Allah revealed in clear Arabic to the Prophet Muhammad ﷺ via the Archangel Jibril over 23 years. It has been preserved verbatim with absolute zero alteration across fourteen centuries.',
    corePrinciples: [
      {
        heading: 'Makki and Madani Revelations',
        arabicTerm: 'المَكِّيُّ وَالمَدَنِيُّ',
        details: 'Makki Surahs (revealed before Hijrah): focus on Tawhid, the Day of Judgment, stories of previous prophets, and short poetic verses. Madani Surahs (revealed after Hijrah): address legislation, social contracts, family law, criminal penalties, international relations, and community building.',
      },
      {
        heading: 'Compilation of the Mushaf',
        arabicTerm: 'جَمْعُ القُرْآنِ وَتَدْوِينُهُ',
        details: 'Written down during the Prophet\'s ﷺ life upon palm leaves and parchment. Collected into a single bound book under Caliph Abu Bakr (RA) after the Battle of Yamama. Standardized and disseminated across the empire under Caliph Uthman ibn Affan (RA) with the Uthmanic script (Rasm Uthmani).',
      },
      {
        heading: 'The 7 Ahruf and 10 Mutawatir Qira\'at',
        arabicTerm: 'الأَحْرُفُ السَّبْعَةُ وَالقِرَاءَاتُ العَشْرُ',
        details: 'Revealed in 7 distinct authentic dialectical modes (Ahruf) to ease recitation across diverse Arab tribes. From these emerge the 10 Canonical Qira\'at (e.g. Nafi\', \'Asim, Abu \'Amr, Ibn Kathir, Hamzah, Al-Kisa\'i) and their 20 authentic Riwayat (such as Hafs, Warsh, Qalun, and Ad-Duri).',
      },
    ],
    practicalApplication: 'Appreciate the miraculous linguistic precision and acoustic diversity of the Holy Quran across its verified narrations.',
  },

  // ==========================================
  // 4. MUSTALAH AL-HADITH (HADITH SCIENCES)
  // ==========================================
  {
    id: 'mustalah-hadith',
    code: 'HDT-401',
    title: 'Mustalah al-Hadith: Sciences of Prophetic Tradition',
    arabicTitle: 'مُصْطَلَحُ الحَدِيثِ وَعُلُومُ الرِّوَايَةِ',
    category: 'Hadith-Sciences',
    badge: 'Hadith Methodology',
    summary: 'The world\'s most rigorous historical methodology for textual verification: Sanad, Matn, narrator criticism (Jarh wa Ta\'dil), and classification from Sahih to Mawdu\'.',
    arabicKeyText: 'إِنَّ هَذَا العِلْمَ دِينٌ فَانْظُرُوا عَمَّنْ تَأْخُذُونَ دِينَكُمْ (الإمام ابن سيرين)',
    englishExplanation: 'Islamic scholars pioneered the science of Isnad (chains of custody) which prevented fabrication and maintained the exact speech, deeds, and tacit approvals of Prophet Muhammad ﷺ with scientific precision.',
    corePrinciples: [
      {
        heading: 'The Anatomy of a Hadith: Sanad and Matn',
        arabicTerm: 'السَّنَدُ وَالمَتْنُ',
        details: 'Sanad (the unbroken chain of narrators transmitting the report from one to another until reaching the Prophet ﷺ) and Matn (the actual verbal text or description of the action).',
      },
      {
        heading: 'The 5 Conditions of a Sahih (Authentic) Hadith',
        arabicTerm: 'شُرُوطُ الحَدِيثِ الصَّحِيحِ الخَمْسَةُ',
        details: '1. Ittisal as-Sanad (unbroken continuity of the chain). 2. \'Adalat ar-Ruwat (upright moral integrity and piety of all narrators). 3. Dabt ar-Ruwat (accurate precision and memory). 4. Absence of Shudhudh (contradiction with stronger narrations). 5. Absence of \'Illah Qadihah (hidden technical defects).',
      },
      {
        heading: 'Classifications: Hasan, Da\'if, and Mawdu\'',
        arabicTerm: 'الحَسَنُ وَالضَّعِيفُ وَالمَوْضُوعُ',
        details: 'Hasan: sound Hadith whose narrators have slightly lesser precision than Sahih. Da\'if: weak Hadith missing one of the conditions (e.g. broken link or weak narrator). Mawdu\': completely fabricated lie attributed falsely to the Prophet ﷺ; strictly forbidden to narrate except to expose it.',
      },
      {
        heading: 'The Six Canonical Compilers (Kutub al-Sittah)',
        arabicTerm: 'أَئِمَّةُ الكُتُبِ السِّتَّةِ',
        details: 'Imam al-Bukhari (d. 256 AH), Imam Muslim (d. 261 AH), Imam Abu Dawud (d. 275 AH), Imam at-Tirmidhi (d. 279 AH), Imam an-Nasa\'i (d. 303 AH), and Imam Ibn Majah (d. 273 AH).',
      },
    ],
    practicalApplication: 'Always verify the authenticity grade of any Hadith before quoting or sharing it on social media. Beware of attributing unverified statements to the Messenger of Allah ﷺ.',
  },

  // ==========================================
  // 5. SEERAH AN-NABAWIAH & ISLAMIC HISTORY
  // ==========================================
  {
    id: 'seerah-milestones',
    code: 'SRH-501',
    title: 'Seerah an-Nabawiyyah: The Prophetic Biography',
    arabicTitle: 'السِّيرَةُ النَّبَوِيَّةُ العَطِرَةُ',
    category: 'Seerah-History',
    badge: 'Prophetic Life',
    summary: 'The life of the final Messenger ﷺ: from birth in the Year of the Elephant (570 CE) to the First Revelation at Cave Hira, the Makkan trials, the Hijrah, Madinan statehood, and the Farewell Pilgrimage.',
    audioVerseRef: { surah: 33, ayah: 21, label: 'Surah Al-Ahzab 33:21 (The Perfect Example)' },
    arabicKeyText: 'لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ',
    englishExplanation: 'The life of Prophet Muhammad ﷺ is the living embodiment of the Holy Quran. Studying his biography instills deep love, strategic wisdom, moral courage, and compassionate leadership in the believer.',
    corePrinciples: [
      {
        heading: 'The Makkan Phase (570 – 622 CE)',
        arabicTerm: 'المَرْحَلَةُ المَكِّيَّةُ',
        details: 'Upbringing as an orphan known as As-Sadiq al-Amin (The Truthful and Trustworthy). First revelation in Cave Hira at age 40 (Surah Al-\'Alaq). Three years of secret da\'wah, followed by open proclamation on Mount Safa. Endured severe torture, economic boycott in Shi\'b Abi Talib, loss of Khadijah and Abu Talib (Year of Sorrow), and the miraculous Night Journey (Isra & Mi\'raj).',
      },
      {
        heading: 'The Hijrah & Founding the Madinan Society (622 CE)',
        arabicTerm: 'الهِجْرَةُ النَّبَوِيَّةُ وَتَأْسِيسُ المَدِينَةِ',
        details: 'Emigration with Abu Bakr (RA) to Yathrib (Madinah). Three foundational pillars: 1. Building the Prophet\'s Mosque as a spiritual and civic center. 2. Establishing brotherhood (Muwakhat) between Muhajirun and Ansar. 3. Drafting the Constitution of Madinah guaranteeing religious freedom and mutual defense.',
      },
      {
        heading: 'Decisive Battles & The Treaty of Hudaybiyyah',
        arabicTerm: 'الغَزَوَاتُ الكُبْرَى وَصُلْحُ الحُدَيْبِيَةِ',
        details: 'The Battle of Badr (2 AH - miraculous victory), Uhud (3 AH - lessons of obedience), and Khandaq (5 AH - defensive unity). The Treaty of Hudaybiyyah (6 AH) recognized Islam diplomatically and initiated explosive peaceful conversions.',
      },
      {
        heading: 'The Conquest of Makkah & Farewell Pilgrimage (8 – 10 AH)',
        arabicTerm: 'فَتْحُ مَكَّةَ وَحَجَّةُ الوَدَاعِ',
        details: 'Bloodless conquest of Makkah (8 AH) accompanied by historic general pardon: "Go, for you are free." The Farewell Sermon (10 AH) on Mount Arafat enshrining human equality, abolition of racism and usury, and women\'s sacred rights.',
      },
    ],
    practicalApplication: 'Model prophetic patience, mercy towards adversaries, strategic planning in daily projects, and unconditional kindness to family members.',
  },
  {
    id: 'caliphs-history',
    code: 'SRH-502',
    title: 'The Rightly Guided Caliphs (Al-Khulafa ar-Rashidun)',
    arabicTitle: 'عَصْرُ الخُلَفَاءِ الرَّاشِدِينَ المَهْدِيِّينَ',
    category: 'Seerah-History',
    badge: 'Golden Age of Caliphate',
    summary: 'The exemplary reigns of Abu Bakr, Umar, Uthman, and Ali (RA) from 11 AH to 40 AH (632 – 661 CE), establishing justice, rule of law, and rapid welfare expansion.',
    arabicKeyText: 'عَلَيْكُمْ بِسُنَّتِي وَسُنَّةِ الخُلَفَاءِ الرَّاشِدِينَ المَهْدِيِّينَ مِنْ بَعْدِي (حديث نبوي)',
    englishExplanation: 'The 30-year Caliphate following the Prophet ﷺ demonstrated the practical implementation of Islamic governance, consultative democracy (Shura), judicial independence, and public treasury accountability.',
    corePrinciples: [
      {
        heading: '1. Abu Bakr as-Siddiq (RA) (11 – 13 AH / 632 – 634 CE)',
        arabicTerm: 'أَبُو بَكْرٍ الصِّدِّيقُ رَضِيَ اللَّهُ عَنْهُ',
        details: 'Preserved the unity of the nascent state during the Ridda (apostasy) crises, initiated the first unified compilation of the Holy Quran, and sent expeditions to the Levant and Mesopotamia.',
      },
      {
        heading: '2. Umar ibn al-Khattab (RA) (13 – 23 AH / 634 – 644 CE)',
        arabicTerm: 'عُمَرُ بْنُ الخَطَّابِ الفَارُوقُ رَضِيَ اللَّهُ عَنْهُ',
        details: 'Transformed governance by establishing ministries (Diwans), the Hijri calendar, regular police and welfare allowances for children and the elderly, liberated Jerusalem without bloodshed, and expanded into Persia and Egypt.',
      },
      {
        heading: '3. Uthman ibn Affan (RA) (23 – 35 AH / 644 – 656 CE)',
        arabicTerm: 'عُثْمَانُ بْنُ عَفَّانَ ذُو النُّورَيْنِ رَضِيَ اللَّهُ عَنْهُ',
        details: 'Commissioned the official standardized Uthmanic copies of the Quran, built the first Islamic naval fleet, and expanded the Prophet\'s Mosque in Madinah.',
      },
      {
        heading: '4. Ali ibn Abi Talib (RA) (35 – 40 AH / 656 – 661 CE)',
        arabicTerm: 'عَلِيُّ بْنُ أَبِي طَالِبٍ أَمِيرُ المُؤْمِنِينَ رَضِيَ اللَّهُ عَنْهُ',
        details: 'The pinnacle of Islamic eloquence, jurisprudential genius, and ascetic integrity; preserved central treasury equity amidst immense political turbulence.',
      },
    ],
    practicalApplication: 'Emulate their selflessness in leadership: Umar walked while his servant rode his camel, and Abu Bakr milked goats for neighborhood orphans even as Caliph.',
  },

  // ==========================================
  // 6. AKHLAQ & ADAB (MANNERS & ETHICS)
  // ==========================================
  {
    id: 'akhlaq-adab',
    code: 'AKH-601',
    title: 'Akhlaq & Adab: Islamic Manners & Character Excellence',
    arabicTitle: 'الأَخْلَاقُ الإِسْلَامِيَّةُ وَالآدَابُ الشَّرْعِيَّةُ',
    category: 'Akhlaq-Adab',
    badge: 'Spiritual Refinement',
    summary: 'The prophetic virtues that constitute the ultimate objective of the divine message: honesty, humility, modesty (Haya\'), fulfilling promises, and etiquette in society.',
    audioVerseRef: { surah: 68, ayah: 4, label: 'Surah Al-Qalam 68:4 (Exalted Character)' },
    arabicKeyText: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ • إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الأَخْلَاقِ',
    englishExplanation: 'The Prophet ﷺ stated: "I was only sent to perfect noble character." Character is not an optional aesthetic in Islam; it is the ultimate measure of true religious practice and faith.',
    corePrinciples: [
      {
        heading: 'Truthfulness (Sidq) & Trustworthiness (Amanah)',
        arabicTerm: 'الصِّدْقُ وَالأَمَانَةُ',
        details: 'The foundation of all virtue. Honesty in speech, transactions, and inner self. Fulfilling promises, guarding secrets, and delivering rights to their owners without betrayal.',
      },
      {
        heading: 'Modesty (Haya\') & Humility (Tawadu\')',
        arabicTerm: 'الحَيَاءُ وَالتَّوَاضُعُ',
        details: 'Haya\' is a moral sensitivity that prevents one from committing shameful acts before Allah or mankind. Humility lowers the wing of gentleness to believers, extinguishing arrogance (Kibr).',
      },
      {
        heading: 'Filial Piety (Birr al-Walidayn) & Kinship (Silat ar-Rahim)',
        arabicTerm: 'بِرُّ الوَالِدَيْنِ وَصِلَةُ الأَرْحَامِ',
        details: 'Caring for aging parents with tenderness, never saying even "Uff" to them. Maintaining regular ties, phone calls, and assistance to relatives even if they sever ties.',
      },
      {
        heading: 'The 40 Etiquettes of Daily Life',
        arabicTerm: 'آدَابُ الحَيَاةِ اليَوْمِيَّةِ',
        details: 'Etiquette of eating with the right hand and saying Bismillah, greeting with Salam, visiting the sick, controlling the eyes from forbidden sights, and keeping roads clear of obstacles.',
      },
    ],
    practicalApplication: 'Smile in the faces of others (which is counted as Sadaqah), avoid gossip and sarcastic mocking, and forgive those who wrong you to seek Allah\'s forgiveness.',
  },
];
