// Static quiz data (25 questions)
// Easy = first 9, Medium = first 17, Hard = all 25
// Q1 (gender) is handled separately on the home page.

export type Lang = 'en' | 'el';

export interface QuizOption {
  label: Record<Lang, string>;
  facets?: Partial<Record<string, number>>;
  vibe?: Partial<Record<string, number>>;
  tags?: string[];
}

export interface QuizQuestion {
  id: string;
  question: Record<Lang, string>;
  options: QuizOption[];
}

export const DIFFICULTY_COUNTS: Record<'easy' | 'medium' | 'hard', number> = {
  easy: 9,
  medium: 17,
  hard: 25,
};

export const quizQuestions: QuizQuestion[] = [
  // ─── CORE 9 (Easy) ────────────────────────────────────────────────
  {
    id: 'q2',
    question: {
      en: 'What mood do you want your fragrance to evoke?',
      el: 'Τι διάθεση θέλεις να προκαλεί το άρωμά σου;',
    },
    options: [
      { label: { en: 'Calm & serene', el: 'Ήρεμη & γαλήνια' }, facets: { clean_musk: 0.8, freshness: 0.6 }, vibe: { day_night: 0.3 } },
      { label: { en: 'Sensual & mysterious', el: 'Αισθησιακή & μυστηριώδης' }, facets: { warmth: 0.8, ambery: 0.7 }, vibe: { day_night: 0.8, formal_casual: 0.7 } },
      { label: { en: 'Fresh & energetic', el: 'Φρέσκια & ενεργητική' }, facets: { freshness: 0.9, citrus: 0.8 }, vibe: { day_night: 0.2, introvert_extrovert: 0.6 } },
      { label: { en: 'Luxurious & bold', el: 'Πολυτελής & τολμηρή' }, facets: { spiciness: 0.7, woodiness: 0.8 }, vibe: { safe_provocative: 0.8, introvert_extrovert: 0.7 } },
    ],
  },
  {
    id: 'q3',
    question: {
      en: 'When are you most likely to wear your signature scent?',
      el: 'Πότε είναι πιο πιθανό να φοράς το αρωματικό σου signature;',
    },
    options: [
      { label: { en: 'Morning & day', el: 'Πρωί & μέρα' }, facets: { freshness: 0.8, citrus: 0.7 }, vibe: { day_night: 0.1 } },
      { label: { en: 'Evening & night', el: 'Βράδυ & νύχτα' }, facets: { warmth: 0.8, ambery: 0.7 }, vibe: { day_night: 0.9 } },
      { label: { en: 'All day every day', el: 'Όλη μέρα, κάθε μέρα' }, facets: { clean_musk: 0.7, freshness: 0.5 }, vibe: { day_night: 0.5 } },
      { label: { en: 'Special occasions only', el: 'Μόνο για ειδικές περιστάσεις' }, facets: { spiciness: 0.6, woodiness: 0.7 }, vibe: { formal_casual: 0.2 } },
    ],
  },
  {
    id: 'q4',
    question: {
      en: 'What natural element speaks to your soul?',
      el: 'Ποιο φυσικό στοιχείο μιλά στην ψυχή σου;',
    },
    options: [
      { label: { en: 'Ocean & breeze', el: 'Ωκεανός & αύρα' }, facets: { freshness: 0.9, green: 0.5 }, tags: ['aquatic', 'fresh'] },
      { label: { en: 'Forest & earth', el: 'Δάσος & γη' }, facets: { woodiness: 0.9, green: 0.8 }, tags: ['woody', 'green'] },
      { label: { en: 'Flowers & gardens', el: 'Λουλούδια & κήποι' }, facets: { florality: 0.9, powdery: 0.5 }, tags: ['floral', 'romantic'] },
      { label: { en: 'Smoke & fire', el: 'Καπνός & φωτιά' }, facets: { warmth: 0.9, spiciness: 0.7 }, tags: ['smoky', 'oriental'] },
    ],
  },
  {
    id: 'q5',
    question: {
      en: 'How would friends describe your style?',
      el: 'Πώς θα περιέγραφαν οι φίλοι σου το στυλ σου;',
    },
    options: [
      { label: { en: 'Classic & refined', el: 'Κλασικό & εκλεπτυσμένο' }, facets: { powdery: 0.6, clean_musk: 0.7 }, vibe: { formal_casual: 0.2, safe_provocative: 0.2 } },
      { label: { en: 'Bohemian & free', el: 'Μποέμ & ελεύθερο' }, facets: { green: 0.7, florality: 0.6 }, vibe: { safe_provocative: 0.6, introvert_extrovert: 0.5 } },
      { label: { en: 'Urban & modern', el: 'Αστικό & μοντέρνο' }, facets: { woodiness: 0.7, citrus: 0.6 }, vibe: { formal_casual: 0.5, introvert_extrovert: 0.7 } },
      { label: { en: 'Dramatic & daring', el: 'Δραματικό & τολμηρό' }, facets: { spiciness: 0.8, ambery: 0.8 }, vibe: { safe_provocative: 0.9, introvert_extrovert: 0.9 } },
    ],
  },
  {
    id: 'q6',
    question: {
      en: 'Which scent family feels most like you?',
      el: 'Ποια οικογένεια αρωμάτων σου ταιριάζει περισσότερο;',
    },
    options: [
      { label: { en: 'Fresh / Citrus', el: 'Φρέσκα / Εσπεριδοειδή' }, facets: { freshness: 0.9, citrus: 0.9 }, tags: ['fresh', 'citrus'] },
      { label: { en: 'Floral / Romantic', el: 'Λουλουδάτα / Ρομαντικά' }, facets: { florality: 0.9, powdery: 0.6 }, tags: ['floral', 'romantic'] },
      { label: { en: 'Woody / Earthy', el: 'Ξύλινα / Γήινα' }, facets: { woodiness: 0.9, green: 0.7 }, tags: ['woody', 'earthy'] },
      { label: { en: 'Oriental / Spicy', el: 'Ανατολίτικα / Μπαχαρικά' }, facets: { spiciness: 0.8, ambery: 0.9 }, tags: ['oriental', 'spicy'] },
    ],
  },
  {
    id: 'q7',
    question: {
      en: 'What kind of impression do you want to leave?',
      el: 'Τι εντύπωση θέλεις να αφήνεις;',
    },
    options: [
      { label: { en: 'Approachable & warm', el: 'Προσιτός/ή & ζεστός/ή' }, facets: { clean_musk: 0.8, sweetness: 0.5 }, vibe: { introvert_extrovert: 0.4 } },
      { label: { en: 'Sophisticated & distant', el: 'Εκλεπτυσμένος/η & αποστασιοποιημένος/η' }, facets: { woodiness: 0.7, powdery: 0.6 }, vibe: { introvert_extrovert: 0.3, formal_casual: 0.2 } },
      { label: { en: 'Provocative & memorable', el: 'Προκλητικός/ή & αξέχαστος/η' }, facets: { spiciness: 0.7, ambery: 0.8 }, vibe: { safe_provocative: 0.9 } },
      { label: { en: 'Natural & authentic', el: 'Φυσικός/ή & αυθεντικός/η' }, facets: { green: 0.8, freshness: 0.7 }, vibe: { safe_provocative: 0.2 } },
    ],
  },
  {
    id: 'q8',
    question: {
      en: 'How sweet should your fragrance be?',
      el: 'Πόσο γλυκό πρέπει να είναι το άρωμά σου;',
    },
    options: [
      { label: { en: 'Zero sweetness — dry & sharp', el: 'Καθόλου — ξηρό & έντονο' }, facets: { sweetness: 0.0, woodiness: 0.8 } },
      { label: { en: 'A subtle hint', el: 'Μια λεπτή νότα' }, facets: { sweetness: 0.3, clean_musk: 0.6 } },
      { label: { en: 'Moderately sweet', el: 'Μέτρια γλυκύτητα' }, facets: { sweetness: 0.6, florality: 0.5 } },
      { label: { en: 'Deliciously sweet', el: 'Γλυκό & λαχταριστό' }, facets: { sweetness: 0.9, powdery: 0.6 }, tags: ['gourmand'] },
    ],
  },
  {
    id: 'q9',
    question: {
      en: 'How long should your fragrance last?',
      el: 'Πόσο καιρό πρέπει να διαρκεί το άρωμά σου;',
    },
    options: [
      { label: { en: 'A couple of hours — light touch', el: 'Μερικές ώρες — ελαφριά επαφή' }, facets: { freshness: 0.8 } },
      { label: { en: 'Half a day — balanced', el: 'Μισή μέρα — ισορροπημένο' }, facets: { clean_musk: 0.7, freshness: 0.5 } },
      { label: { en: 'Full day — lasting presence', el: 'Όλη μέρα — μόνιμη παρουσία' }, facets: { woodiness: 0.7, ambery: 0.5 } },
      { label: { en: 'Beyond a day — legendary trail', el: 'Πάνω από μέρα — θρυλική πορεία' }, facets: { ambery: 0.9, spiciness: 0.7, warmth: 0.8 } },
    ],
  },
  {
    id: 'q10',
    question: {
      en: 'How noticeable do you want your fragrance to be?',
      el: 'Πόσο αισθητό θέλεις να είναι το άρωμά σου;',
    },
    options: [
      { label: { en: 'Only I can smell it', el: 'Μόνο εγώ να το μυρίζω' }, facets: { clean_musk: 0.8, freshness: 0.5 }, vibe: { introvert_extrovert: 0.2 } },
      { label: { en: 'Close contact notices', el: 'Μόνο όσοι πλησιάζουν' }, facets: { woodiness: 0.6, florality: 0.6 }, vibe: { introvert_extrovert: 0.4 } },
      { label: { en: 'Fills the room gently', el: 'Γεμίζει χαλαρά το δωμάτιο' }, facets: { ambery: 0.6, spiciness: 0.5 }, vibe: { introvert_extrovert: 0.7 } },
      { label: { en: 'Bold & unforgettable', el: 'Τολμηρό & αξέχαστο' }, facets: { spiciness: 0.9, ambery: 0.9 }, vibe: { introvert_extrovert: 0.9, safe_provocative: 0.8 } },
    ],
  },

  // ─── EXTENDED 8 (Medium adds questions 10-17) ──────────────────────
  {
    id: 'q11',
    question: {
      en: 'What landscape energizes you most?',
      el: 'Ποιο τοπίο σε ενεργοποιεί περισσότερο;',
    },
    options: [
      { label: { en: 'Coastal ocean at sunrise', el: 'Ακτή ωκεανού την αυγή' }, facets: { freshness: 0.9, citrus: 0.6 }, tags: ['aquatic', 'fresh'] },
      { label: { en: 'Dense mountain forest', el: 'Πυκνό ορεινό δάσος' }, facets: { woodiness: 0.9, green: 0.8 }, tags: ['woody', 'green'] },
      { label: { en: 'Vibrant city at night', el: 'Ζωντανή πόλη τη νύχτα' }, facets: { spiciness: 0.6, ambery: 0.7 }, vibe: { day_night: 0.8, introvert_extrovert: 0.8 } },
      { label: { en: 'Desert at dusk', el: 'Έρημος το σούρουπο' }, facets: { warmth: 0.9, ambery: 0.8, spiciness: 0.6 }, tags: ['oriental', 'warm'] },
    ],
  },
  {
    id: 'q12',
    question: {
      en: 'Which color palette matches your energy?',
      el: 'Ποια παλέτα χρωμάτων ταιριάζει στην ενέργειά σου;',
    },
    options: [
      { label: { en: 'White, soft pink, sky blue', el: 'Λευκό, απαλό ροζ, γαλάζιο' }, facets: { clean_musk: 0.7, florality: 0.8, powdery: 0.6 } },
      { label: { en: 'Deep purple, midnight, black', el: 'Βαθύ μοβ, νυχτερινό, μαύρο' }, facets: { ambery: 0.8, spiciness: 0.7 }, vibe: { day_night: 0.9 } },
      { label: { en: 'Forest green, brown, terracotta', el: 'Πράσινο δάσους, καφέ, τερακότα' }, facets: { woodiness: 0.8, green: 0.9 }, tags: ['earthy', 'woody'] },
      { label: { en: 'Gold, orange, fiery red', el: 'Χρυσό, πορτοκαλί, φλογερό κόκκινο' }, facets: { warmth: 0.9, spiciness: 0.8, citrus: 0.5 }, tags: ['spicy', 'warm'] },
    ],
  },
  {
    id: 'q13',
    question: {
      en: 'How do you feel about leather & smoke?',
      el: 'Πώς αισθάνεσαι για δέρμα & καπνό;',
    },
    options: [
      { label: { en: 'Love the raw intensity', el: 'Λατρεύω την ακατέργαστη ένταση' }, facets: { warmth: 0.8, spiciness: 0.7 }, tags: ['leather', 'smoky'] },
      { label: { en: 'In small, intriguing doses', el: 'Σε μικρές, ελκυστικές δόσεις' }, facets: { warmth: 0.5, woodiness: 0.6 } },
      { label: { en: 'Prefer cleaner, fresher notes', el: 'Προτιμώ πιο καθαρές, φρέσκες νότες' }, facets: { freshness: 0.8, clean_musk: 0.7 } },
      { label: { en: 'Absolutely not my style', el: 'Απολύτως όχι το στυλ μου' }, facets: { florality: 0.7, green: 0.6 } },
    ],
  },
  {
    id: 'q14',
    question: {
      en: 'Pick your ideal social setting:',
      el: 'Επίλεξε το ιδανικό κοινωνικό σου περιβάλλον:',
    },
    options: [
      { label: { en: 'Intimate dinner for two', el: 'Οικεία βραδινή έξοδος για δύο' }, facets: { ambery: 0.7, warmth: 0.7 }, vibe: { formal_casual: 0.3, day_night: 0.8 } },
      { label: { en: 'Lively cocktail party', el: 'Ζωηρό κοκτέιλ πάρτι' }, facets: { spiciness: 0.6, florality: 0.5 }, vibe: { introvert_extrovert: 0.8 } },
      { label: { en: 'Outdoor yoga in the park', el: 'Υπαίθρια γιόγκα στο πάρκο' }, facets: { green: 0.8, freshness: 0.8 }, vibe: { formal_casual: 0.8, day_night: 0.2 } },
      { label: { en: 'Museum or gallery opening', el: 'Εγκαίνια μουσείου ή γκαλερί' }, facets: { woodiness: 0.7, powdery: 0.6 }, vibe: { formal_casual: 0.2 } },
    ],
  },
  {
    id: 'q15',
    question: {
      en: 'Warm or cool temperature in your scent?',
      el: 'Ζεστή ή δροσερή θερμοκρασία στο άρωμά σου;',
    },
    options: [
      { label: { en: 'Icy cool — like winter air', el: 'Παγωμένο δροσερό — σαν χειμωνιάτικος αέρας' }, facets: { freshness: 0.9, citrus: 0.7 }, tags: ['fresh', 'cool'] },
      { label: { en: 'Refreshingly cool', el: 'Δροσιστικά δροσερό' }, facets: { freshness: 0.7, green: 0.6 } },
      { label: { en: 'Pleasantly warm', el: 'Ευχάριστα ζεστό' }, facets: { warmth: 0.7, clean_musk: 0.5 } },
      { label: { en: 'Intensely warm — like a fire', el: 'Έντονα ζεστό — σαν φωτιά' }, facets: { warmth: 0.9, ambery: 0.8, spiciness: 0.6 }, tags: ['warm', 'oriental'] },
    ],
  },
  {
    id: 'q16',
    question: {
      en: 'What role does fragrance play for you?',
      el: 'Τι ρόλο παίζει το άρωμα για σένα;',
    },
    options: [
      { label: { en: 'Daily ritual, like armor', el: 'Καθημερινό τελετουργικό, σαν πανοπλία' }, facets: { clean_musk: 0.7, woodiness: 0.6 }, vibe: { formal_casual: 0.4 } },
      { label: { en: 'Express my mood', el: 'Να εκφράζω τη διάθεσή μου' }, facets: { citrus: 0.5, florality: 0.5 }, vibe: { safe_provocative: 0.6 } },
      { label: { en: 'Attract & seduce', el: 'Να ελκύω & να γοητεύω' }, facets: { ambery: 0.8, spiciness: 0.6 }, vibe: { safe_provocative: 0.8 } },
      { label: { en: 'Transport me to a memory', el: 'Να με μεταφέρει σε μια ανάμνηση' }, facets: { powdery: 0.7, sweetness: 0.5 }, tags: ['nostalgic'] },
    ],
  },
  {
    id: 'q17',
    question: {
      en: 'Which fruit or food note appeals to you?',
      el: 'Ποια φρουτώδης ή γλυκιά νότα σε ελκύει;',
    },
    options: [
      { label: { en: 'Bright bergamot & lemon', el: 'Φωτεινό βεργαμότο & λεμόνι' }, facets: { citrus: 0.9, freshness: 0.7 }, tags: ['citrus'] },
      { label: { en: 'Ripe peach & apricot', el: 'Ώριμο ροδάκινο & βερίκοκο' }, facets: { sweetness: 0.7, florality: 0.5 }, tags: ['fruity'] },
      { label: { en: 'Dark berry & plum', el: 'Σκούρα μούρα & δαμάσκηνο' }, facets: { ambery: 0.6, sweetness: 0.6 }, tags: ['fruity', 'dark'] },
      { label: { en: 'None — I prefer no fruit', el: 'Κανένα — προτιμώ χωρίς φρούτα' }, facets: { woodiness: 0.7, spiciness: 0.5 } },
    ],
  },

  // ─── ADVANCED 8 (Hard adds questions 18-25) ────────────────────────
  {
    id: 'q18',
    question: {
      en: 'How do you feel about floral (rose, jasmine) notes?',
      el: 'Πώς αισθάνεσαι για ανθικές νότες (τριαντάφυλλο, γιασεμί);',
    },
    options: [
      { label: { en: 'A rose or jasmine-heart is essential', el: 'Μια καρδιά τριαντάφυλλου ή γιασεμιού είναι απαραίτητη' }, facets: { florality: 0.95 }, tags: ['floral'] },
      { label: { en: 'Light floral note as an accent', el: 'Ελαφριά ανθική νότα ως τόνισμα' }, facets: { florality: 0.5, clean_musk: 0.5 } },
      { label: { en: 'Florals only if dark & smoky', el: 'Ανθικά μόνο αν είναι σκούρα & καπνιστά' }, facets: { florality: 0.4, warmth: 0.6, spiciness: 0.5 } },
      { label: { en: 'No florals at all', el: 'Καθόλου ανθικά' }, facets: { woodiness: 0.8, freshness: 0.6 } },
    ],
  },
  {
    id: 'q19',
    question: {
      en: 'What is your take on oud wood & resins?',
      el: 'Ποια είναι η γνώμη σου για oud ξύλο & ρητίνες;',
    },
    options: [
      { label: { en: 'Obsessed — the richer the better', el: 'Εμμονικό — όσο πιο πλούσιο τόσο καλύτερο' }, facets: { woodiness: 0.9, warmth: 0.8, ambery: 0.7 }, tags: ['oud', 'oriental'] },
      { label: { en: 'Love a subtle resinous warmth', el: 'Αγαπώ μια ήπια ρητινώδη ζεστασιά' }, facets: { woodiness: 0.6, warmth: 0.6 } },
      { label: { en: 'Neutral on oud, open to resins', el: 'Ουδέτερος/η με oud, ανοιχτός/ή σε ρητίνες' }, facets: { ambery: 0.5 } },
      { label: { en: 'Too heavy for my taste', el: 'Πολύ βαρύ για τα γούστα μου' }, facets: { freshness: 0.8, citrus: 0.6 } },
    ],
  },
  {
    id: 'q20',
    question: {
      en: 'Which herb or green note speaks to you?',
      el: 'Ποια βοτανική ή πράσινη νότα σου μιλά;',
    },
    options: [
      { label: { en: 'Sage, vetiver, oakmoss', el: 'Φασκόμηλο, βετιβέρ, βρύα' }, facets: { green: 0.9, woodiness: 0.7 }, tags: ['green', 'earthy'] },
      { label: { en: 'Basil, mint, fresh herbs', el: 'Βασιλικός, μέντα, φρέσκα βότανα' }, facets: { green: 0.8, freshness: 0.8 }, tags: ['green', 'fresh'] },
      { label: { en: 'Lavender — calming & clean', el: 'Λεβάντα — ηρεμιστική & καθαρή' }, facets: { clean_musk: 0.7, green: 0.5 }, tags: ['lavender'] },
      { label: { en: 'No green notes for me', el: 'Δεν με ελκύουν οι πράσινες νότες' }, facets: { florality: 0.7, sweetness: 0.5 } },
    ],
  },
  {
    id: 'q21',
    question: {
      en: 'Vintage or modern fragrance direction?',
      el: 'Vintage ή μοντέρνη κατεύθυνση αρώματος;',
    },
    options: [
      { label: { en: 'Classic powdery vintage', el: 'Κλασικό πουδρένιο vintage' }, facets: { powdery: 0.9, clean_musk: 0.6 }, tags: ['classic', 'powdery'] },
      { label: { en: 'Modern clean minimalism', el: 'Μοντέρνος καθαρός μινιμαλισμός' }, facets: { clean_musk: 0.9, freshness: 0.7 }, tags: ['clean', 'modern'] },
      { label: { en: 'Neo-oriental — modern + deep', el: 'Νεο-ανατολίτικο — μοντέρνο + βαθύ' }, facets: { ambery: 0.7, spiciness: 0.6, woodiness: 0.6 } },
      { label: { en: 'Niche & experimental', el: 'Niche & πειραματικό' }, facets: { spiciness: 0.5, green: 0.5 }, vibe: { safe_provocative: 0.8 } },
    ],
  },
  {
    id: 'q22',
    question: {
      en: 'How do you feel about musk notes?',
      el: 'Πώς αισθάνεσαι για νότες musk;',
    },
    options: [
      { label: { en: 'White clean musk — essential', el: 'Λευκό καθαρό musk — απαραίτητο' }, facets: { clean_musk: 0.9 }, tags: ['musk', 'clean'] },
      { label: { en: 'Skin-like natural musk', el: 'Φυσικό musk σαν δέρμα' }, facets: { clean_musk: 0.7, warmth: 0.5 } },
      { label: { en: 'Animalic & raw musk', el: 'Ζωώδες & ακατέργαστο musk' }, facets: { warmth: 0.8, spiciness: 0.5 }, tags: ['animalic'] },
      { label: { en: 'Musk-free please', el: 'Παρακαλώ χωρίς musk' }, facets: { freshness: 0.7, citrus: 0.7 } },
    ],
  },
  {
    id: 'q23',
    question: {
      en: 'Choose your perfume concentration:',
      el: 'Επίλεξε τη συγκέντρωση του αρώματός σου:',
    },
    options: [
      { label: { en: 'Eau de Cologne — light & fresh', el: 'Eau de Cologne — ελαφρύ & φρέσκο' }, facets: { freshness: 0.9, citrus: 0.7 } },
      { label: { en: 'Eau de Toilette — everyday wear', el: 'Eau de Toilette — για κάθε μέρα' }, facets: { freshness: 0.6, clean_musk: 0.6 } },
      { label: { en: 'Eau de Parfum — lasting elegance', el: 'Eau de Parfum — διαρκής κομψότητα' }, facets: { woodiness: 0.6, florality: 0.6 } },
      { label: { en: 'Extrait de Parfum — pure luxury', el: 'Extrait de Parfum — καθαρή πολυτέλεια' }, facets: { ambery: 0.8, spiciness: 0.7 }, tags: ['luxury', 'intense'] },
    ],
  },
  {
    id: 'q24',
    question: {
      en: 'What word best captures your inner world?',
      el: 'Ποια λέξη αποτυπώνει καλύτερα τον εσωτερικό σου κόσμο;',
    },
    options: [
      { label: { en: 'Serenity', el: 'Γαλήνη' }, facets: { clean_musk: 0.8, freshness: 0.6 }, vibe: { introvert_extrovert: 0.2 } },
      { label: { en: 'Passion', el: 'Πάθος' }, facets: { ambery: 0.8, warmth: 0.8 }, vibe: { safe_provocative: 0.8 } },
      { label: { en: 'Freedom', el: 'Ελευθερία' }, facets: { green: 0.7, freshness: 0.7 }, vibe: { formal_casual: 0.9 } },
      { label: { en: 'Mystique', el: 'Μυστήριο' }, facets: { spiciness: 0.7, woodiness: 0.7 }, vibe: { day_night: 0.8, introvert_extrovert: 0.3 } },
    ],
  },
  {
    id: 'q25',
    question: {
      en: 'What feeling should the perfect fragrance leave you with?',
      el: 'Τι αίσθημα πρέπει να σου αφήνει το τέλειο άρωμα;',
    },
    options: [
      { label: { en: 'Confident & powerful', el: 'Αυτοπεποίθηση & δύναμη' }, facets: { woodiness: 0.8, spiciness: 0.6 }, vibe: { introvert_extrovert: 0.7 } },
      { label: { en: 'Romantic & desired', el: 'Ρομαντικός/ή & επιθυμητός/ή' }, facets: { florality: 0.7, ambery: 0.6 }, vibe: { safe_provocative: 0.6 } },
      { label: { en: 'Calm & grounded', el: 'Ήρεμος/η & σταθερός/η' }, facets: { green: 0.7, clean_musk: 0.7 }, vibe: { introvert_extrovert: 0.2 } },
      { label: { en: 'Free & adventurous', el: 'Ελεύθερος/η & περιπετειώδης' }, facets: { freshness: 0.7, citrus: 0.6 }, vibe: { formal_casual: 0.9, introvert_extrovert: 0.7 } },
    ],
  },
];
