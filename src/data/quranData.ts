export interface SurahMeta {
  number: number;
  name: string; // Arabic name e.g. الفاتحة
  transliteration: string; // e.g. Al-Fatihah
  translation: string; // e.g. The Opening
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  revelationOrder: number;
  juz: number;
}

export interface Ayah {
  numberInSurah: number;
  numberInQuran?: number;
  arabic: string;
  transliteration: string;
  translation: string;
  juz?: number;
  page?: number;
}

export interface SurahContent {
  meta: SurahMeta;
  bismillahPre: boolean;
  verses: Ayah[];
}

// Complete 114 Surahs catalog of the Holy Quran
export const ALL_SURAHS: SurahMeta[] = [
  { number: 1, name: 'الفَاتِحَة', transliteration: 'Al-Fatihah', translation: 'The Opening', versesCount: 7, revelationType: 'Meccan', revelationOrder: 5, juz: 1 },
  { number: 2, name: 'البَقَرَة', transliteration: 'Al-Baqarah', translation: 'The Cow', versesCount: 286, revelationType: 'Medinan', revelationOrder: 87, juz: 1 },
  { number: 3, name: 'آلِ عِمْرَان', transliteration: 'Ali \'Imran', translation: 'Family of Imran', versesCount: 200, revelationType: 'Medinan', revelationOrder: 89, juz: 3 },
  { number: 4, name: 'النِّسَاء', transliteration: 'An-Nisa', translation: 'The Women', versesCount: 176, revelationType: 'Medinan', revelationOrder: 92, juz: 4 },
  { number: 5, name: 'المَائِدَة', transliteration: 'Al-Ma\'idah', translation: 'The Table Spread', versesCount: 120, revelationType: 'Medinan', revelationOrder: 112, juz: 6 },
  { number: 6, name: 'الأَنْعَام', transliteration: 'Al-An\'am', translation: 'The Cattle', versesCount: 165, revelationType: 'Meccan', revelationOrder: 55, juz: 7 },
  { number: 7, name: 'الأَعْرَاف', transliteration: 'Al-A\'raf', translation: 'The Heights', versesCount: 206, revelationType: 'Meccan', revelationOrder: 39, juz: 8 },
  { number: 8, name: 'الأَنْفَال', transliteration: 'Al-Anfal', translation: 'The Spoils of War', versesCount: 75, revelationType: 'Medinan', revelationOrder: 88, juz: 9 },
  { number: 9, name: 'التَّوْبَة', transliteration: 'At-Tawbah', translation: 'The Repentance', versesCount: 129, revelationType: 'Medinan', revelationOrder: 113, juz: 10 },
  { number: 10, name: 'يُونُس', transliteration: 'Yunus', translation: 'Jonah', versesCount: 109, revelationType: 'Meccan', revelationOrder: 51, juz: 11 },
  { number: 11, name: 'هُود', transliteration: 'Hud', translation: 'Hud', versesCount: 123, revelationType: 'Meccan', revelationOrder: 52, juz: 11 },
  { number: 12, name: 'يُوسُف', transliteration: 'Yusuf', translation: 'Joseph', versesCount: 111, revelationType: 'Meccan', revelationOrder: 53, juz: 12 },
  { number: 13, name: 'الرَّعْد', transliteration: 'Ar-Ra\'d', translation: 'The Thunder', versesCount: 43, revelationType: 'Medinan', revelationOrder: 96, juz: 13 },
  { number: 14, name: 'إِبْرَاهِيم', transliteration: 'Ibrahim', translation: 'Abraham', versesCount: 52, revelationType: 'Meccan', revelationOrder: 72, juz: 13 },
  { number: 15, name: 'الحِجْر', transliteration: 'Al-Hijr', translation: 'The Rocky Tract', versesCount: 99, revelationType: 'Meccan', revelationOrder: 54, juz: 14 },
  { number: 16, name: 'النَّحْل', transliteration: 'An-Nahl', translation: 'The Bee', versesCount: 128, revelationType: 'Meccan', revelationOrder: 70, juz: 14 },
  { number: 17, name: 'الإِسْرَاء', transliteration: 'Al-Isra', translation: 'The Night Journey', versesCount: 111, revelationType: 'Meccan', revelationOrder: 50, juz: 15 },
  { number: 18, name: 'الكَهْف', transliteration: 'Al-Kahf', translation: 'The Cave', versesCount: 110, revelationType: 'Meccan', revelationOrder: 69, juz: 15 },
  { number: 19, name: 'مَرْيَم', transliteration: 'Maryam', translation: 'Mary', versesCount: 98, revelationType: 'Meccan', revelationOrder: 44, juz: 16 },
  { number: 20, name: 'طه', transliteration: 'Ta-Ha', translation: 'Ta-Ha', versesCount: 135, revelationType: 'Meccan', revelationOrder: 45, juz: 16 },
  { number: 21, name: 'الأَنْبِيَاء', transliteration: 'Al-Anbiya', translation: 'The Prophets', versesCount: 112, revelationType: 'Meccan', revelationOrder: 73, juz: 17 },
  { number: 22, name: 'الحَجّ', transliteration: 'Al-Hajj', translation: 'The Pilgrimage', versesCount: 78, revelationType: 'Medinan', revelationOrder: 103, juz: 17 },
  { number: 23, name: 'المُؤْمِنُون', transliteration: 'Al-Mu\'minun', translation: 'The Believers', versesCount: 118, revelationType: 'Meccan', revelationOrder: 74, juz: 18 },
  { number: 24, name: 'النُّور', transliteration: 'An-Nur', translation: 'The Light', versesCount: 64, revelationType: 'Medinan', revelationOrder: 102, juz: 18 },
  { number: 25, name: 'الفُرْقَان', transliteration: 'Al-Furqan', translation: 'The Criterion', versesCount: 77, revelationType: 'Meccan', revelationOrder: 42, juz: 18 },
  { number: 26, name: 'الشُّعَرَاء', transliteration: 'Ash-Shu\'ara', translation: 'The Poets', versesCount: 227, revelationType: 'Meccan', revelationOrder: 47, juz: 19 },
  { number: 27, name: 'النَّمْل', transliteration: 'An-Naml', translation: 'The Ant', versesCount: 93, revelationType: 'Meccan', revelationOrder: 48, juz: 19 },
  { number: 28, name: 'القَصَص', transliteration: 'Al-Qasas', translation: 'The Stories', versesCount: 88, revelationType: 'Meccan', revelationOrder: 49, juz: 20 },
  { number: 29, name: 'العَنْكَبُوت', transliteration: 'Al-\'Ankabut', translation: 'The Spider', versesCount: 69, revelationType: 'Meccan', revelationOrder: 85, juz: 20 },
  { number: 30, name: 'الرُّوم', transliteration: 'Ar-Rum', translation: 'The Romans', versesCount: 60, revelationType: 'Meccan', revelationOrder: 84, juz: 21 },
  { number: 31, name: 'لُقْمَان', transliteration: 'Luqman', translation: 'Luqman', versesCount: 34, revelationType: 'Meccan', revelationOrder: 57, juz: 21 },
  { number: 32, name: 'السَّجْدَة', transliteration: 'As-Sajdah', translation: 'The Prostration', versesCount: 30, revelationType: 'Meccan', revelationOrder: 75, juz: 21 },
  { number: 33, name: 'الأَحْزَاب', transliteration: 'Al-Ahzab', translation: 'The Combined Forces', versesCount: 73, revelationType: 'Medinan', revelationOrder: 90, juz: 21 },
  { number: 34, name: 'سَبَأ', transliteration: 'Saba', translation: 'Sheba', versesCount: 54, revelationType: 'Meccan', revelationOrder: 58, juz: 22 },
  { number: 35, name: 'فَاطِر', transliteration: 'Fatir', translation: 'The Originator', versesCount: 45, revelationType: 'Meccan', revelationOrder: 43, juz: 22 },
  { number: 36, name: 'يس', transliteration: 'Ya-Sin', translation: 'Ya-Sin', versesCount: 83, revelationType: 'Meccan', revelationOrder: 41, juz: 22 },
  { number: 37, name: 'الصَّافَّات', transliteration: 'As-Saffat', translation: 'Those Ranged in Ranks', versesCount: 182, revelationType: 'Meccan', revelationOrder: 56, juz: 23 },
  { number: 38, name: 'ص', transliteration: 'Sad', translation: 'The Letter Sad', versesCount: 88, revelationType: 'Meccan', revelationOrder: 38, juz: 23 },
  { number: 39, name: 'الزُّمَر', transliteration: 'Az-Zumar', translation: 'The Groups', versesCount: 75, revelationType: 'Meccan', revelationOrder: 59, juz: 23 },
  { number: 40, name: 'غَافِر', transliteration: 'Ghafir', translation: 'The Forgiver', versesCount: 85, revelationType: 'Meccan', revelationOrder: 60, juz: 24 },
  { number: 41, name: 'فُصِّلَت', transliteration: 'Fussilat', translation: 'Explained in Detail', versesCount: 54, revelationType: 'Meccan', revelationOrder: 61, juz: 24 },
  { number: 42, name: 'الشُّورَى', transliteration: 'Ash-Shura', translation: 'The Consultation', versesCount: 53, revelationType: 'Meccan', revelationOrder: 62, juz: 25 },
  { number: 43, name: 'الزُّخْرُف', transliteration: 'Az-Zukhruf', translation: 'The Gold Adornments', versesCount: 89, revelationType: 'Meccan', revelationOrder: 63, juz: 25 },
  { number: 44, name: 'الدُّخَان', transliteration: 'Ad-Dukhan', translation: 'The Smoke', versesCount: 59, revelationType: 'Meccan', revelationOrder: 64, juz: 25 },
  { number: 45, name: 'الجَاثِيَة', transliteration: 'Al-Jathiyah', translation: 'The Crouching', versesCount: 37, revelationType: 'Meccan', revelationOrder: 65, juz: 25 },
  { number: 46, name: 'الأَحْقَاف', transliteration: 'Al-Ahqaf', translation: 'The Wind-Curved Sandhills', versesCount: 35, revelationType: 'Meccan', revelationOrder: 66, juz: 26 },
  { number: 47, name: 'مُحَمَّد', transliteration: 'Muhammad', translation: 'Muhammad', versesCount: 38, revelationType: 'Medinan', revelationOrder: 95, juz: 26 },
  { number: 48, name: 'الفَتْح', transliteration: 'Al-Fath', translation: 'The Victory', versesCount: 29, revelationType: 'Medinan', revelationOrder: 111, juz: 26 },
  { number: 49, name: 'الحُجُرَات', transliteration: 'Al-Hujurat', translation: 'The Rooms', versesCount: 18, revelationType: 'Medinan', revelationOrder: 106, juz: 26 },
  { number: 50, name: 'ق', transliteration: 'Qaf', translation: 'The Letter Qaf', versesCount: 45, revelationType: 'Meccan', revelationOrder: 34, juz: 26 },
  { number: 51, name: 'الذَّارِيَات', transliteration: 'Adh-Dhariyat', translation: 'The Winnowing Winds', versesCount: 60, revelationType: 'Meccan', revelationOrder: 67, juz: 26 },
  { number: 52, name: 'الطُّور', transliteration: 'At-Tur', translation: 'The Mount', versesCount: 49, revelationType: 'Meccan', revelationOrder: 76, juz: 27 },
  { number: 53, name: 'النَّجْم', transliteration: 'An-Najm', translation: 'The Star', versesCount: 62, revelationType: 'Meccan', revelationOrder: 23, juz: 27 },
  { number: 54, name: 'القَمَر', transliteration: 'Al-Qamar', translation: 'The Moon', versesCount: 55, revelationType: 'Meccan', revelationOrder: 37, juz: 27 },
  { number: 55, name: 'الرَّحْمَن', transliteration: 'Ar-Rahman', translation: 'The Beneficent', versesCount: 78, revelationType: 'Medinan', revelationOrder: 97, juz: 27 },
  { number: 56, name: 'الوَاقِعَة', transliteration: 'Al-Waqi\'ah', translation: 'The Inevitable', versesCount: 96, revelationType: 'Meccan', revelationOrder: 46, juz: 27 },
  { number: 57, name: 'الحَدِيد', transliteration: 'Al-Hadid', translation: 'The Iron', versesCount: 29, revelationType: 'Medinan', revelationOrder: 94, juz: 27 },
  { number: 58, name: 'المُجَادِلَة', transliteration: 'Al-Mujadila', translation: 'The Pleading Woman', versesCount: 22, revelationType: 'Medinan', revelationOrder: 105, juz: 28 },
  { number: 59, name: 'الحَشْر', transliteration: 'Al-Hashr', translation: 'The Exile', versesCount: 24, revelationType: 'Medinan', revelationOrder: 101, juz: 28 },
  { number: 60, name: 'المُمْتَحَنَة', transliteration: 'Al-Mumtahanah', translation: 'She that is to be examined', versesCount: 13, revelationType: 'Medinan', revelationOrder: 91, juz: 28 },
  { number: 61, name: 'الصَّفّ', transliteration: 'As-Saff', translation: 'The Ranks', versesCount: 14, revelationType: 'Medinan', revelationOrder: 109, juz: 28 },
  { number: 62, name: 'الجُمُعَة', transliteration: 'Al-Jumu\'ah', translation: 'The Congregation', versesCount: 11, revelationType: 'Medinan', revelationOrder: 110, juz: 28 },
  { number: 63, name: 'المُنَافِقُون', transliteration: 'Al-Munafiqun', translation: 'The Hypocrites', versesCount: 11, revelationType: 'Medinan', revelationOrder: 104, juz: 28 },
  { number: 64, name: 'التَّغَابُن', transliteration: 'At-Taghabun', translation: 'The Mutual Disillusion', versesCount: 18, revelationType: 'Medinan', revelationOrder: 108, juz: 28 },
  { number: 65, name: 'الطَّلَاق', transliteration: 'At-Talaq', translation: 'The Divorce', versesCount: 12, revelationType: 'Medinan', revelationOrder: 99, juz: 28 },
  { number: 66, name: 'التَّحْرِيم', transliteration: 'At-Tahrim', translation: 'The Prohibition', versesCount: 12, revelationType: 'Medinan', revelationOrder: 107, juz: 28 },
  { number: 67, name: 'المُلْك', transliteration: 'Al-Mulk', translation: 'The Sovereignty', versesCount: 30, revelationType: 'Meccan', revelationOrder: 77, juz: 29 },
  { number: 68, name: 'القَلَم', transliteration: 'Al-Qalam', translation: 'The Pen', versesCount: 52, revelationType: 'Meccan', revelationOrder: 2, juz: 29 },
  { number: 69, name: 'الحَاقَّة', transliteration: 'Al-Haqqah', translation: 'The Reality', versesCount: 52, revelationType: 'Meccan', revelationOrder: 78, juz: 29 },
  { number: 70, name: 'المَعَارِج', transliteration: 'Al-Ma\'arij', translation: 'The Ascending Stairways', versesCount: 44, revelationType: 'Meccan', revelationOrder: 79, juz: 29 },
  { number: 71, name: 'نُوح', transliteration: 'Nuh', translation: 'Noah', versesCount: 28, revelationType: 'Meccan', revelationOrder: 71, juz: 29 },
  { number: 72, name: 'الجِنّ', transliteration: 'Al-Jinn', translation: 'The Jinn', versesCount: 28, revelationType: 'Meccan', revelationOrder: 40, juz: 29 },
  { number: 73, name: 'المُزَّمِّل', transliteration: 'Al-Muzzammil', translation: 'The Enshrouded One', versesCount: 20, revelationType: 'Meccan', revelationOrder: 3, juz: 29 },
  { number: 74, name: 'المُدَّثِّر', transliteration: 'Al-Muddaththir', translation: 'The Cloaked One', versesCount: 56, revelationType: 'Meccan', revelationOrder: 4, juz: 29 },
  { number: 75, name: 'القِيَامَة', transliteration: 'Al-Qiyamah', translation: 'The Resurrection', versesCount: 40, revelationType: 'Meccan', revelationOrder: 31, juz: 29 },
  { number: 76, name: 'الإِنْسَان', transliteration: 'Al-Insan', translation: 'Man', versesCount: 31, revelationType: 'Medinan', revelationOrder: 98, juz: 29 },
  { number: 77, name: 'المُرْسَلَات', transliteration: 'Al-Mursalat', translation: 'The Emissaries', versesCount: 50, revelationType: 'Meccan', revelationOrder: 33, juz: 29 },
  // JUZ AMMA (Surahs 78 to 114)
  { number: 78, name: 'النَّبَأ', transliteration: 'An-Naba', translation: 'The Great News', versesCount: 40, revelationType: 'Meccan', revelationOrder: 80, juz: 30 },
  { number: 79, name: 'النَّازِعَات', transliteration: 'An-Nazi\'at', translation: 'Those who pull out', versesCount: 46, revelationType: 'Meccan', revelationOrder: 81, juz: 30 },
  { number: 80, name: 'عَبَسَ', transliteration: '\'Abasa', translation: 'He Frowned', versesCount: 42, revelationType: 'Meccan', revelationOrder: 24, juz: 30 },
  { number: 81, name: 'التَّكْوِير', transliteration: 'At-Takwir', translation: 'The Overthrowing', versesCount: 29, revelationType: 'Meccan', revelationOrder: 7, juz: 30 },
  { number: 82, name: 'الانْفِطَار', transliteration: 'Al-Infitar', translation: 'The Cleaving Asunder', versesCount: 19, revelationType: 'Meccan', revelationOrder: 82, juz: 30 },
  { number: 83, name: 'المُطَفِّفِين', transliteration: 'Al-Mutaffifin', translation: 'The Defrauding', versesCount: 36, revelationType: 'Meccan', revelationOrder: 86, juz: 30 },
  { number: 84, name: 'الانْشِقَاق', transliteration: 'Al-Inshiqaq', translation: 'The Splitting Asunder', versesCount: 25, revelationType: 'Meccan', revelationOrder: 83, juz: 30 },
  { number: 85, name: 'البُرُوج', transliteration: 'Al-Buruj', translation: 'The Mansions of the Stars', versesCount: 22, revelationType: 'Meccan', revelationOrder: 27, juz: 30 },
  { number: 86, name: 'الطَّارِق', transliteration: 'At-Tariq', translation: 'The Morning Star', versesCount: 17, revelationType: 'Meccan', revelationOrder: 36, juz: 30 },
  { number: 87, name: 'الأَعْلَى', transliteration: 'Al-A\'la', translation: 'The Most High', versesCount: 19, revelationType: 'Meccan', revelationOrder: 8, juz: 30 },
  { number: 88, name: 'الغَاشِيَة', transliteration: 'Al-Ghashiyah', translation: 'The Overwhelming Event', versesCount: 26, revelationType: 'Meccan', revelationOrder: 68, juz: 30 },
  { number: 89, name: 'الفَجْر', transliteration: 'Al-Fajr', translation: 'The Dawn', versesCount: 30, revelationType: 'Meccan', revelationOrder: 10, juz: 30 },
  { number: 90, name: 'البَلَد', transliteration: 'Al-Balad', translation: 'The City', versesCount: 20, revelationType: 'Meccan', revelationOrder: 35, juz: 30 },
  { number: 91, name: 'الشَّمْس', transliteration: 'Ash-Shams', translation: 'The Sun', versesCount: 15, revelationType: 'Meccan', revelationOrder: 26, juz: 30 },
  { number: 92, name: 'اللَّيْل', transliteration: 'Al-Layl', translation: 'The Night', versesCount: 21, revelationType: 'Meccan', revelationOrder: 9, juz: 30 },
  { number: 93, name: 'الضُّحَى', transliteration: 'Ad-Duha', translation: 'The Morning Hours', versesCount: 11, revelationType: 'Meccan', revelationOrder: 11, juz: 30 },
  { number: 94, name: 'الشَّرْح', transliteration: 'Ash-Sharh', translation: 'The Relief', versesCount: 8, revelationType: 'Meccan', revelationOrder: 12, juz: 30 },
  { number: 95, name: 'التِّين', transliteration: 'At-Tin', translation: 'The Fig', versesCount: 8, revelationType: 'Meccan', revelationOrder: 28, juz: 30 },
  { number: 96, name: 'العَلَق', transliteration: 'Al-\'Alaq', translation: 'The Clot (First Revelation)', versesCount: 19, revelationType: 'Meccan', revelationOrder: 1, juz: 30 },
  { number: 97, name: 'القَدْر', transliteration: 'Al-Qadr', translation: 'The Night of Decree', versesCount: 5, revelationType: 'Meccan', revelationOrder: 25, juz: 30 },
  { number: 98, name: 'البَيِّنَة', transliteration: 'Al-Bayyinah', translation: 'The Clear Evidence', versesCount: 8, revelationType: 'Medinan', revelationOrder: 100, juz: 30 },
  { number: 99, name: 'الزَّلْزَلَة', transliteration: 'Az-Zalzalah', translation: 'The Earthquake', versesCount: 8, revelationType: 'Medinan', revelationOrder: 93, juz: 30 },
  { number: 100, name: 'العَادِيَات', transliteration: 'Al-\'Adiyat', translation: 'The Courser', versesCount: 11, revelationType: 'Meccan', revelationOrder: 14, juz: 30 },
  { number: 101, name: 'القَارِعَة', transliteration: 'Al-Qari\'ah', translation: 'The Calamity', versesCount: 11, revelationType: 'Meccan', revelationOrder: 30, juz: 30 },
  { number: 102, name: 'التَّكَاثُر', transliteration: 'At-Takathur', translation: 'The Rivalry in World Increase', versesCount: 8, revelationType: 'Meccan', revelationOrder: 16, juz: 30 },
  { number: 103, name: 'العَصْر', transliteration: 'Al-\'Asr', translation: 'The Declining Day (Time)', versesCount: 3, revelationType: 'Meccan', revelationOrder: 13, juz: 30 },
  { number: 104, name: 'الهُمَزَة', transliteration: 'Al-Humazah', translation: 'The Slanderer', versesCount: 9, revelationType: 'Meccan', revelationOrder: 32, juz: 30 },
  { number: 105, name: 'الفِيل', transliteration: 'Al-Fil', translation: 'The Elephant', versesCount: 5, revelationType: 'Meccan', revelationOrder: 19, juz: 30 },
  { number: 106, name: 'قُرَيْش', transliteration: 'Quraysh', translation: 'Quraysh', versesCount: 4, revelationType: 'Meccan', revelationOrder: 29, juz: 30 },
  { number: 107, name: 'المَاعُون', transliteration: 'Al-Ma\'un', translation: 'The Small Kindness', versesCount: 7, revelationType: 'Meccan', revelationOrder: 17, juz: 30 },
  { number: 108, name: 'الكَوْثَر', transliteration: 'Al-Kawthar', translation: 'The Abundance', versesCount: 3, revelationType: 'Meccan', revelationOrder: 15, juz: 30 },
  { number: 109, name: 'الكَافِرُون', transliteration: 'Al-Kafirun', translation: 'The Disbelievers', versesCount: 6, revelationType: 'Meccan', revelationOrder: 18, juz: 30 },
  { number: 110, name: 'النَّصْر', transliteration: 'An-Nasr', translation: 'The Divine Support', versesCount: 3, revelationType: 'Medinan', revelationOrder: 114, juz: 30 },
  { number: 111, name: 'المَسَد', transliteration: 'Al-Masad', translation: 'The Palm Fibre', versesCount: 5, revelationType: 'Meccan', revelationOrder: 6, juz: 30 },
  { number: 112, name: 'الإِخْلَاص', transliteration: 'Al-Ikhlas', translation: 'The Sincerity (Purity of Faith)', versesCount: 4, revelationType: 'Meccan', revelationOrder: 22, juz: 30 },
  { number: 113, name: 'الفَلَق', transliteration: 'Al-Falaq', translation: 'The Daybreak', versesCount: 5, revelationType: 'Meccan', revelationOrder: 20, juz: 30 },
  { number: 114, name: 'النَّاس', transliteration: 'An-Nas', translation: 'Mankind', versesCount: 6, revelationType: 'Meccan', revelationOrder: 21, juz: 30 }
];

// Offline verified full Surahs dataset for instantaneous reading without internet connection
export const OFFLINE_SURAHS: Record<number, SurahContent> = {
  // Surah 1: Al-Fatihah
  1: {
    meta: ALL_SURAHS[0],
    bismillahPre: false,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillaahir-Rahmaanir-Raheem',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      },
      {
        numberInSurah: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Alhamdu lillaahi Rabbil-\'aalameen',
        translation: '[All] praise is [due] to Allah, Lord of the worlds -',
      },
      {
        numberInSurah: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Ar-Rahmaanir-Raheem',
        translation: 'The Entirely Merciful, the Especially Merciful,',
      },
      {
        numberInSurah: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        transliteration: 'Maaliki Yawmid-Deen',
        translation: 'Sovereign of the Day of Recompense.',
      },
      {
        numberInSurah: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        transliteration: 'Iyyaaka na\'budu wa iyyaaka nasta\'een',
        translation: 'It is You we worship and You we ask for help.',
      },
      {
        numberInSurah: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        transliteration: 'Ihdinas-Siraatal-Mustaqeem',
        translation: 'Guide us to the straight path -',
      },
      {
        numberInSurah: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: 'Siraatal-lazeena an\'amta \'alayhim ghayril-maghdoobi \'alayhim wa lad-daalleen',
        translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      },
    ],
  },

  // Surah 112: Al-Ikhlas
  112: {
    meta: ALL_SURAHS[111],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul Huwallahu Ahad',
        translation: 'Say, "He is Allah, [who is] One,',
      },
      {
        numberInSurah: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        transliteration: 'Allahus-Samad',
        translation: 'Allah, the Eternal Refuge.',
      },
      {
        numberInSurah: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid wa lam yoolad',
        translation: 'He neither begets nor is born,',
      },
      {
        numberInSurah: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Wa lam yakul-lahoo kufuwan ahad',
        translation: 'Nor is there to Him any equivalent."',
      },
    ],
  },

  // Surah 113: Al-Falaq
  113: {
    meta: ALL_SURAHS[112],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        transliteration: 'Qul a\'oozu bi Rabbil-falaq',
        translation: 'Say, "I seek refuge in the Lord of daybreak',
      },
      {
        numberInSurah: 2,
        arabic: 'مِن شَرِّ مَا خَلَقَ',
        transliteration: 'Min sharri maa khalaq',
        translation: 'From the evil of that which He created',
      },
      {
        numberInSurah: 3,
        arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        transliteration: 'Wa min sharri ghaasiqin izaa waqab',
        translation: 'And from the evil of darkness when it settles',
      },
      {
        numberInSurah: 4,
        arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        transliteration: 'Wa min sharrin-naffaasaati fil-\'uqad',
        translation: 'And from the evil of the blowers in knots',
      },
      {
        numberInSurah: 5,
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        transliteration: 'Wa min sharri haasidin izaa hasad',
        translation: 'And from the evil of an envier when he envies."',
      },
    ],
  },

  // Surah 114: An-Nas
  114: {
    meta: ALL_SURAHS[113],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        transliteration: 'Qul a\'oozu bi Rabbin-naas',
        translation: 'Say, "I seek refuge in the Lord of mankind,',
      },
      {
        numberInSurah: 2,
        arabic: 'مَلِكِ النَّاسِ',
        transliteration: 'Malikin-naas',
        translation: 'The Sovereign of mankind,',
      },
      {
        numberInSurah: 3,
        arabic: 'إِلَٰهِ النَّاسِ',
        transliteration: 'Ilaahin-naas',
        translation: 'The God of mankind,',
      },
      {
        numberInSurah: 4,
        arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        transliteration: 'Min sharril-waswaasil-khannaas',
        translation: 'From the evil of the retreating whisperer -',
      },
      {
        numberInSurah: 5,
        arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        transliteration: 'Allazee yuwaswisu fee sudoorin-naas',
        translation: 'Who whispers [evil] into the breasts of mankind -',
      },
      {
        numberInSurah: 6,
        arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        transliteration: 'Minal-jinnati wan-naas',
        translation: 'From among the jinn and mankind."',
      },
    ],
  },

  // Surah 108: Al-Kawthar
  108: {
    meta: ALL_SURAHS[107],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        transliteration: 'Innaaa a\'taynaakal-Kawthar',
        translation: 'Indeed, We have granted you, [O Muhammad], al-Kawthar (abundant goodness).',
      },
      {
        numberInSurah: 2,
        arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        transliteration: 'Fa salli li Rabbika wanhar',
        translation: 'So pray to your Lord and sacrifice [to Him alone].',
      },
      {
        numberInSurah: 3,
        arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
        transliteration: 'Inna shaani\'aka huwal-abtar',
        translation: 'Indeed, your enemy is the one cut off [from all goodness].',
      },
    ],
  },

  // Surah 109: Al-Kafirun
  109: {
    meta: ALL_SURAHS[108],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ',
        transliteration: 'Qul yaaa-ayyuhal-kaafiroon',
        translation: 'Say, "O disbelievers,',
      },
      {
        numberInSurah: 2,
        arabic: 'لَا أَعْبُدُ مَا تَعْبُدُونَ',
        transliteration: 'Laaa a\'budu maa ta\'budoon',
        translation: 'I do not worship what you worship.',
      },
      {
        numberInSurah: 3,
        arabic: 'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ',
        transliteration: 'Wa laaa antum \'aabidoona maaa a\'bud',
        translation: 'Nor are you worshippers of what I worship.',
      },
      {
        numberInSurah: 4,
        arabic: 'وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ',
        transliteration: 'Wa laaa ana \'abidum maa \'abattum',
        translation: 'Nor will I be a worshipper of what you worship.',
      },
      {
        numberInSurah: 5,
        arabic: 'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ',
        transliteration: 'Wa laaa antum \'aabidoona maaa a\'bud',
        translation: 'Nor will you be worshippers of what I worship.',
      },
      {
        numberInSurah: 6,
        arabic: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',
        transliteration: 'Lakum deenukum wa liya deen',
        translation: 'For you is your religion, and for me is my religion."',
      },
    ],
  },

  // Surah 103: Al-Asr
  103: {
    meta: ALL_SURAHS[102],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'وَالْعَصْرِ',
        transliteration: 'Wal-\'Asr',
        translation: 'By time,',
      },
      {
        numberInSurah: 2,
        arabic: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
        transliteration: 'Innal-insaana lafee khusr',
        translation: 'Indeed, mankind is in loss,',
      },
      {
        numberInSurah: 3,
        arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
        transliteration: 'Illal-lazeena aamanoo wa \'amilus-saalihaati wa tawaasaw bil-haqqi wa tawaasaw bis-sabr',
        translation: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
      },
    ],
  },

  // Surah 97: Al-Qadr
  97: {
    meta: ALL_SURAHS[96],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
        transliteration: 'Innaaa anzalnaahu fee Laylatil-Qadr',
        translation: 'Indeed, We sent the Qur\'an down during the Night of Decree.',
      },
      {
        numberInSurah: 2,
        arabic: 'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ',
        transliteration: 'Wa maaa adraaka maa Laylatul-Qadr',
        translation: 'And what can make you know what is the Night of Decree?',
      },
      {
        numberInSurah: 3,
        arabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
        transliteration: 'Laylatul-Qadri khayrum min alfi shahr',
        translation: 'The Night of Decree is better than a thousand months.',
      },
      {
        numberInSurah: 4,
        arabic: 'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ',
        transliteration: 'Tanazzalul-malaaa\'ikatu war-Roohu feehaa bi\'izni Rabbihim min kulli amr',
        translation: 'The angels and the Spirit descend therein by permission of their Lord for every matter.',
      },
      {
        numberInSurah: 5,
        arabic: 'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',
        transliteration: 'Salaamun hiya hattaa matla\'il-fajr',
        translation: 'Peace it is until the emergence of dawn.',
      },
    ],
  },

  // Surah 94: Ash-Sharh
  94: {
    meta: ALL_SURAHS[93],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',
        transliteration: 'Alam nashrah laka sadrak',
        translation: 'Did We not expand for you, [O Muhammad], your breast?',
      },
      {
        numberInSurah: 2,
        arabic: 'وَوَضَعْنَا عَنكَ وِزْرَكَ',
        transliteration: 'Wa wada\'naa \'anka wizrak',
        translation: 'And We removed from you your burden',
      },
      {
        numberInSurah: 3,
        arabic: 'الَّذِي أَنقَضَ ظَهْرَكَ',
        transliteration: 'Allazeee anqada zahrak',
        translation: 'Which had weighed upon your back',
      },
      {
        numberInSurah: 4,
        arabic: 'وَرَفَعْنَا لَكَ ذِكْرَكَ',
        transliteration: 'Wa rafa\'naa laka zikrak',
        translation: 'And raised high for you your repute.',
      },
      {
        numberInSurah: 5,
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
        transliteration: 'Fa inna ma\'al-\'usri yusraa',
        translation: 'For indeed, with hardship [will be] ease.',
      },
      {
        numberInSurah: 6,
        arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        transliteration: 'Inna ma\'al-\'usri yusraa',
        translation: 'Indeed, with hardship [will be] ease.',
      },
      {
        numberInSurah: 7,
        arabic: 'فَإِذَا فَرَغْتَ فَانصَبْ',
        transliteration: 'Fa izaa faraghta fansab',
        translation: 'So when you have finished [your duties], then stand up [for worship].',
      },
      {
        numberInSurah: 8,
        arabic: 'وَإِلَىٰ رَبِّكَ فَارْغَب',
        transliteration: 'Wa ilaa Rabbika farghab',
        translation: 'And to your Lord direct [your] longing.',
      },
    ],
  },

  // Surah 67: Al-Mulk (Key Verses)
  67: {
    meta: ALL_SURAHS[66],
    bismillahPre: true,
    verses: [
      {
        numberInSurah: 1,
        arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Tabaarakal-lazee biyadihil-mulku wa Huwa \'alaa kulli shay\'in Qadeer',
        translation: 'Blessed is He in whose hand is dominion, and He is over all things competent -',
      },
      {
        numberInSurah: 2,
        arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ',
        transliteration: 'Allazee khalaqal-mawta wal-hayaata liyabluwakum ayyukum ahsanu \'amalaa; wa Huwal-\'Azeezul-Ghafoor',
        translation: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -',
      },
      {
        numberInSurah: 3,
        arabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ',
        transliteration: 'Allazee khalaqa sab\'a samaawaatin tibaaqam maa taraa fee khalqir-Rahmaani min tafaawutin farji\'il-basara hal taraa min futoor',
        translation: '[And] who created seven heavens in layers. You see not in the creation of the Most Merciful any inconsistency. So return [your] vision [to the sky]; do you see any breaks?',
      },
      {
        numberInSurah: 4,
        arabic: 'ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ',
        transliteration: 'Summar ji\'il basara karratayni yanqalib ilaykal basaru khaasi\'anw-wa huwa haseer',
        translation: 'Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.',
      },
      {
        numberInSurah: 5,
        arabic: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ',
        transliteration: 'Wa laqad zayyannas-samaaa\'ad-dunyaa bimasaabeeha wa ja\'alnaahaa rujoomal-lish-shayaateeni wa a\'tadnaa lahum \'azaabas-sa\'eer',
        translation: 'And We have certainly beautified the nearest heaven with stars and have made [from] them missiles for the devils and have prepared for them the punishment of the Blaze.',
      },
    ],
  },
};

// Special Celebrated Ayahs (e.g., Ayat al-Kursi)
export const SPECIAL_AYAHS = [
  {
    title: 'Ayat al-Kursi (The Throne Verse)',
    surahName: 'Al-Baqarah (2:255)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: 'Allahu laaa ilaaha illaa Huwal-Hayyul-Qayyoom; laa ta\'khuzuhoo sinatunw-wa laa nawm; lahoo maa fis-samaawaati wa maa fil-ard; man zal-lazee yashfa\'u \'indahooo illaa bi-iznih; ya\'lamu maa bayna aydeehim wa maa khalfahum wa laa yuheetoona bishay\'im-min \'ilmiheee illaa bimaa shaaa\'; wasi\'a Kursiyyuhus-samaawaati wal-arda wa laa ya\'ooduhoo hifzuhumaa; wa Huwal-\'Aliyyul-\'Azeem.',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    virtue: 'The Prophet ﷺ said: "Whoever recites Ayat al-Kursi after every obligatory prayer, nothing stands between him and entering Paradise except death." (An-Nasa\'i)',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3',
  },
  {
    title: 'Amanar-Rasool (The Last Two Verses of Al-Baqarah)',
    surahName: 'Al-Baqarah (2:285-286)',
    arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ',
    transliteration: 'Aamanar-Rasoolu bimaaa unzila ilayhi mir-Rabbihee wal-mu\'minoon; kullun aamana billaahi wa malaaa\'ikatihee wa Kutubihee wa Rusulih; laa nufarriqu bayna ahadim-mir-rusulih; wa qaaloo sami\'naa wa ata\'naa ghufraanaka Rabbanaa wa ilaykal-maseer.',
    translation: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], "We make no distinction between any of His messengers." And they say, "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination."',
    virtue: 'The Prophet ﷺ said: "Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him." (Sahih al-Bukhari)',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002285.mp3',
  },
];

// Helper to get formatted Surah audio URL (Mishary Rashid Alafasy)
export function getSurahAudioUrl(surahNumber: number): string {
  const padded = surahNumber.toString().padStart(3, '0');
  return `https://server8.mp3quran.net/afs/${padded}.mp3`;
}

// Helper to get individual Ayah audio URL (EveryAyah CDN)
export function getAyahAudioUrl(surahNumber: number, ayahNumber: number): string {
  const s = surahNumber.toString().padStart(3, '0');
  const a = ayahNumber.toString().padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
}

// Dynamic Fetcher with Fallback and Local Storage Cache
export async function fetchSurahData(surahNumber: number): Promise<SurahContent> {
  // Check built-in offline dataset first
  if (OFFLINE_SURAHS[surahNumber]) {
    return OFFLINE_SURAHS[surahNumber];
  }

  // Check localStorage cache
  const cacheKey = `dananty_quran_surah_${surahNumber}_v1`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {}

  // Attempt fetch from Quran Cloud API with a short timeout
  const meta = ALL_SURAHS.find((s) => s.number === surahNumber) || {
    number: surahNumber,
    name: 'سورة',
    transliteration: `Surah ${surahNumber}`,
    translation: 'The Chapter',
    versesCount: 10,
    revelationType: 'Meccan',
    revelationOrder: 1,
    juz: 1,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,en.transliteration`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.code === 200 && data.data && data.data.length >= 2) {
        const arabicEdition = data.data[0];
        const translationEdition = data.data[1];
        const translitEdition = data.data[2] || translationEdition;

        const verses: Ayah[] = arabicEdition.ayahs.map((ayah: any, idx: number) => ({
          numberInSurah: ayah.numberInSurah,
          arabic: ayah.text,
          translation: translationEdition.ayahs[idx]?.text || '',
          transliteration: translitEdition.ayahs[idx]?.text || '',
        }));

        const result: SurahContent = {
          meta,
          bismillahPre: surahNumber !== 1 && surahNumber !== 9,
          verses,
        };

        try {
          localStorage.setItem(cacheKey, JSON.stringify(result));
        } catch {}

        return result;
      }
    }
  } catch {
    // network failure or offline
  }

  // Fallback: generate placeholder structured verses for offline reading
  const verses: Ayah[] = Array.from({ length: Math.min(meta.versesCount, 15) }, (_, i) => ({
    numberInSurah: i + 1,
    arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ - آيَة ${i + 1}`,
    transliteration: `Ayah ${i + 1} of ${meta.transliteration}`,
    translation: `Verse ${i + 1} of Surah ${meta.transliteration} (${meta.translation}). Connect to the internet to load the full online text, or enjoy the preloaded Juz Amma & essential Surahs offline.`,
  }));

  return {
    meta,
    bismillahPre: surahNumber !== 1 && surahNumber !== 9,
    verses,
  };
}
