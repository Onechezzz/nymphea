import { Lang } from './translations';

type CommentMap = Record<string, string>;

export const avatarComments: Record<Lang, CommentMap> = {
  en: {
    // ── Gender selection ──────────────────────────────────────────────
    greeting: "Welcome, seeker of scents! I'm here to guide your olfactory journey...",
    q1_male: "A powerful masculine choice! I sense strength and confidence in your spirit...",
    q1_female: "Exquisite! Feminine elegance flows through you — let's find your perfect scent.",
    q1_unisex: "Fascinating! You transcend boundaries. Unisex fragrances for a liberated soul.",
    transition: "Interesting choice... I'm learning your essence.",
    calculating: "I sense your essence... calculating your perfect match...",
    resultReady: "Your fragrance destiny has been revealed!",

    // ── Q2: Mood ─────────────────────────────────────────────────────
    q2_opt1: "Serenity is your superpower... your fragrance will carry that quiet grace.",
    q2_opt2: "The night calls you... your fragrance will cast an unforgettable spell.",
    q2_opt3: "Pure vital energy! Your fragrance must match your unstoppable spirit.",
    q2_opt4: "Luxury is your language. Nothing ordinary will do for you.",

    // ── Q3: When to wear ──────────────────────────────────────────────
    q3_opt1: "A daytime soul — fresh, optimistic, radiating light from within.",
    q3_opt2: "The night is your canvas and your fragrance your brushstroke...",
    q3_opt3: "All day, every day — you deserve a signature scent that never sleeps.",
    q3_opt4: "A scent for magic moments... you understand the power of anticipation.",

    // ── Q4: Natural element ───────────────────────────────────────────
    q4_opt1: "The ocean calls your soul... I can almost hear the waves in you.",
    q4_opt2: "Deep roots, tall trees... your spirit is ancient and beautifully wise.",
    q4_opt3: "A blooming heart! Romance and beauty are your natural habitat.",
    q4_opt4: "Fire! You carry passion and transformation wherever you go.",

    // ── Q5: Style ─────────────────────────────────────────────────────
    q5_opt1: "Classic elegance — you know that true style never goes out of fashion.",
    q5_opt2: "A free spirit! Rules were made for others, not for you.",
    q5_opt3: "Urban cool — you move through the city like it was made for you.",
    q5_opt4: "Dramatic and daring — you never enter a room, you make an entrance!",

    // ── Q6: Scent family ──────────────────────────────────────────────
    q6_opt1: "Citrus brightness and crisp air — the fragrance of new beginnings.",
    q6_opt2: "A heart of flowers... you are pure poetry.",
    q6_opt3: "Grounded and soulful — the forest speaks your language.",
    q6_opt4: "Rich, deep, unforgettable — an oriental soul in every sense.",

    // ── Q7: Impression ────────────────────────────────────────────────
    q7_opt1: "Warm and welcoming — people are drawn to you naturally.",
    q7_opt2: "Mysterious and refined — you reveal yourself only to the worthy.",
    q7_opt3: "You are impossible to forget — a force of pure nature!",
    q7_opt4: "Authenticity is rare... and you are the real thing.",

    // ── Q8: Sweetness ─────────────────────────────────────────────────
    q8_opt1: "Dry and sharp — you prefer the elegant edge over sugary softness.",
    q8_opt2: "A whisper of sweetness — just enough to intrigue, never to overwhelm.",
    q8_opt3: "Balanced and lovely — sweet but never cloying. Perfect.",
    q8_opt4: "Sweet is your superpower — warm, comforting, utterly irresistible!",

    // ── Q9: Duration ──────────────────────────────────────────────────
    q9_opt1: "Light touch — like morning mist, beautiful and fleeting.",
    q9_opt2: "Balanced longevity — present when you need it, graceful when it fades.",
    q9_opt3: "All-day presence — your fragrance is part of who you are.",
    q9_opt4: "Legendary trail — you leave a signature that outlasts every moment.",

    // ── Q10: Projection ───────────────────────────────────────────────
    q10_opt1: "Intimate and personal — your fragrance is a secret garden for you alone.",
    q10_opt2: "Close encounters will remember you forever... soft, magnetic power.",
    q10_opt3: "A gentle presence that fills the air — elegantly commanding.",
    q10_opt4: "BOLD! You make an entrance with your fragrance before you even speak.",

    // ── Q11: Landscape ────────────────────────────────────────────────
    q11_opt1: "The sea is in your soul — endless, free, eternally fresh.",
    q11_opt2: "The forest remembers you... ancient, grounded, deeply alive.",
    q11_opt3: "You thrive in the electric, the vibrant, the city alive at night!",
    q11_opt4: "The desert at dusk — warm, profound, silent power.",

    // ── Q12: Color palette ────────────────────────────────────────────
    q12_opt1: "Soft and luminous — like morning light through silk curtains.",
    q12_opt2: "Deep and mysterious — the colors of midnight and pure magic.",
    q12_opt3: "Earthy and grounded — the colors of roots, bark, and living things.",
    q12_opt4: "Gold and fire! You burn bright and warm everything around you.",

    // ── Q13: Leather & smoke ──────────────────────────────────────────
    q13_opt1: "Leather and smoke — raw, powerful, unmistakably you.",
    q13_opt2: "A hint of darkness that keeps them guessing... perfect intrigue.",
    q13_opt3: "Clean and clear is your truth — pure and unapologetically fresh.",
    q13_opt4: "Lightness is your language — and there's infinite beauty in that.",

    // ── Q14: Social setting ───────────────────────────────────────────
    q14_opt1: "Romance and intimacy — the best moments are shared with very few.",
    q14_opt2: "Social butterfly! Your energy lights up every room you enter.",
    q14_opt3: "Free and natural — you find your center in the open air.",
    q14_opt4: "Cultured and refined — art speaks to your exquisite sensibilities.",

    // ── Q15: Temperature ──────────────────────────────────────────────
    q15_opt1: "Ice and clarity — your spirit is as sharp and clean as winter air.",
    q15_opt2: "A cool breeze on a warm day — exactly what the world needs.",
    q15_opt3: "Warm like sunlight... you make everyone around you feel at home.",
    q15_opt4: "Intense warmth — you are the fire that draws people in from the cold.",

    // ── Q16: Fragrance role ───────────────────────────────────────────
    q16_opt1: "Armor and ritual — your fragrance prepares you to conquer the day.",
    q16_opt2: "Mood artist! Your fragrance collection tells your daily story.",
    q16_opt3: "Magnetism... your fragrance is the invisible part of your charm.",
    q16_opt4: "A time machine in a bottle — your fragrance carries memories with grace.",

    // ── Q17: Fruit/food notes ─────────────────────────────────────────
    q17_opt1: "Bright citrus sunshine! Your energy is as uplifting as bergamot.",
    q17_opt2: "Soft, ripe, golden — like a summer afternoon in an orchard.",
    q17_opt3: "Dark and luscious — you prefer fruits with depth and mystery.",
    q17_opt4: "Pure sophistication — let the deeper notes speak for themselves.",

    // ── Q18: Floral ───────────────────────────────────────────────────
    q18_opt1: "A flower at heart! Your fragrance will bloom with every heartbeat.",
    q18_opt2: "Subtle petals — a floral whisper that adds depth without dominating.",
    q18_opt3: "Dark roses and smoke... you find beauty in the most shadowed places.",
    q18_opt4: "Beyond flowers — your beauty is raw, elemental, untamed.",

    // ── Q19: Oud & resins ─────────────────────────────────────────────
    q19_opt1: "Oud devotee! You understand the ancient, sacred language of resins.",
    q19_opt2: "A gentle resinous warmth — depth without heaviness. Just perfect.",
    q19_opt3: "Open and exploratory — you don't limit yourself to one world.",
    q19_opt4: "You prefer the light — airy, breathable, free from heavy anchors.",

    // ── Q20: Herbs & green ────────────────────────────────────────────
    q20_opt1: "Ancient herbs and roots — your soul is connected to the earth.",
    q20_opt2: "Fresh herbs alive! You carry the garden's vitality within you.",
    q20_opt3: "Lavender dreams — calm, healing, and timelessly beautiful.",
    q20_opt4: "Richer, deeper notes call to you — warmth is your natural element.",

    // ── Q21: Vintage vs modern ────────────────────────────────────────
    q21_opt1: "A timeless soul — powder and grace, the way it was always meant to be.",
    q21_opt2: "Clean and contemporary — you live in the now with elegant simplicity.",
    q21_opt3: "The best of both worlds — modern sophistication with ancient depth.",
    q21_opt4: "Fearlessly avant-garde! You lead the way for others to follow.",

    // ── Q22: Musk ─────────────────────────────────────────────────────
    q22_opt1: "Clean musk — the scent of warm skin and pure comfort. Irresistible.",
    q22_opt2: "Second skin... your fragrance becomes one with you. Beautiful.",
    q22_opt3: "Raw and primal — you embrace the most instinctual, magnetic notes.",
    q22_opt4: "Fresh and pure — no heaviness, just clarity and light.",

    // ── Q23: Concentration ────────────────────────────────────────────
    q23_opt1: "Light and enchanting — a fragrant cloud that captivates without overwhelming.",
    q23_opt2: "Everyday perfection — balanced, reliable, consistently beautiful.",
    q23_opt3: "Lasting elegance — your presence lingers like a cherished memory.",
    q23_opt4: "Pure luxury — you deserve the most concentrated, powerful essence.",

    // ── Q24: Inner world ──────────────────────────────────────────────
    q24_opt1: "Serenity within — your inner peace becomes your most radiant quality.",
    q24_opt2: "Passion burns in you — it's the fuel of every great story ever told.",
    q24_opt3: "Freedom is your birthright — and your fragrance will reflect that perfectly.",
    q24_opt4: "Mysterious and deep — you keep the world wanting to know more.",

    // ── Q25: Feeling ──────────────────────────────────────────────────
    q25_opt1: "Confidence is your fragrance! And now we're making it literal — magnificent.",
    q25_opt2: "Romance lives in your heart — your perfect scent will carry that magic.",
    q25_opt3: "Calm is your superpower — your fragrance will be a sanctuary for others too.",
    q25_opt4: "Freedom and adventure! Your fragrance will be a journey in every single breath.",
  },

  el: {
    // ── Gender selection ──────────────────────────────────────────────
    greeting: "Καλωσόρισες, ψάχτη αρωμάτων! Είμαι εδώ για να οδηγήσω το οσφρητικό σου ταξίδι...",
    q1_male: "Μια δυνατή ανδρική επιλογή! Αισθάνομαι δύναμη και αυτοπεποίθηση στο πνεύμα σου...",
    q1_female: "Εκλεπτυσμένο! Η γυναικεία κομψότητα ρέει μέσα σου — ας βρούμε το τέλειο άρωμά σου.",
    q1_unisex: "Συναρπαστικό! Ξεπερνάς τα όρια. Unisex αρώματα για μια ελεύθερη ψυχή.",
    transition: "Ενδιαφέρουσα επιλογή... μαθαίνω την ουσία σου.",
    calculating: "Αισθάνομαι την ουσία σου... υπολογίζω το τέλειο ταίριασμά σου...",
    resultReady: "Η μοίρα του αρώματός σου έχει αποκαλυφθεί!",

    // ── Q2: Mood ─────────────────────────────────────────────────────
    q2_opt1: "Η γαλήνη είναι η υπερδύναμή σου... το άρωμά σου θα φέρει εκείνη τη χάρη.",
    q2_opt2: "Η νύχτα σε καλεί... το άρωμά σου θα ρίξει ένα αξέχαστο ξόρκι.",
    q2_opt3: "Καθαρή ζωτική ενέργεια! Το άρωμά σου πρέπει να ταιριάζει με το πνεύμα σου.",
    q2_opt4: "Η πολυτέλεια είναι η γλώσσα σου. Τίποτα κοινό δεν σου ταιριάζει.",

    // ── Q3: When to wear ──────────────────────────────────────────────
    q3_opt1: "Άνθρωπος της μέρας — φρέσκος, αισιόδοξος, ακτινοβολεί φως από μέσα.",
    q3_opt2: "Η νύχτα είναι ο καμβάς σου και το άρωμά σου το πινελάκι σου...",
    q3_opt3: "Όλη μέρα, κάθε μέρα — αξίζεις ένα signature άρωμα που δεν κοιμάται ποτέ.",
    q3_opt4: "Ένα άρωμα για μαγικές στιγμές... καταλαβαίνεις τη δύναμη της προσδοκίας.",

    // ── Q4: Natural element ───────────────────────────────────────────
    q4_opt1: "Ο ωκεανός καλεί την ψυχή σου... σχεδόν ακούω τα κύματα μέσα σου.",
    q4_opt2: "Βαθιές ρίζες, ψηλά δέντρα... το πνεύμα σου είναι αρχαίο και σοφό.",
    q4_opt3: "Μια ανθισμένη καρδιά! Ο ρομαντισμός και η ομορφιά είναι ο φυσικός σου βιότοπος.",
    q4_opt4: "Φωτιά! Κουβαλάς πάθος και μεταμόρφωση όπου κι αν πας.",

    // ── Q5: Style ─────────────────────────────────────────────────────
    q5_opt1: "Κλασική κομψότητα — ξέρεις ότι το αληθινό στυλ δεν ξεπερνιέται ποτέ.",
    q5_opt2: "Ένα ελεύθερο πνεύμα! Οι κανόνες φτιάχτηκαν για άλλους, όχι για σένα.",
    q5_opt3: "Αστικό cool — κινείσαι στην πόλη σαν να φτιάχτηκε για σένα.",
    q5_opt4: "Δραματικό και τολμηρό — δεν μπαίνεις ποτέ σε ένα δωμάτιο, κάνεις είσοδο!",

    // ── Q6: Scent family ──────────────────────────────────────────────
    q6_opt1: "Εσπεριδοειδής λαμπρότητα και καθαρός αέρας — το άρωμα νέων αρχών.",
    q6_opt2: "Μια καρδιά από λουλούδια... είσαι καθαρή ποίηση.",
    q6_opt3: "Γειωμένος και ψυχικός — το δάσος μιλά τη γλώσσα σου.",
    q6_opt4: "Πλούσιο, βαθύ, αξέχαστο — μια ανατολίτικη ψυχή με κάθε έννοια.",

    // ── Q7: Impression ────────────────────────────────────────────────
    q7_opt1: "Ζεστός και φιλόξενος — ο κόσμος σε πλησιάζει φυσικά.",
    q7_opt2: "Μυστηριώδης και εκλεπτυσμένος — αποκαλύπτεσαι μόνο στους άξιους.",
    q7_opt3: "Είσαι αδύνατο να ξεχαστείς — μια δύναμη της φύσης!",
    q7_opt4: "Η αυθεντικότητα είναι σπάνια... και εσύ είσαι αληθινός.",

    // ── Q8: Sweetness ─────────────────────────────────────────────────
    q8_opt1: "Ξηρό και έντονο — προτιμάς την κομψή άκρη από τη γλυκερή απαλότητα.",
    q8_opt2: "Ένας ψίθυρος γλυκύτητας — αρκετός για να γοητεύσει, ποτέ να υπερβεί.",
    q8_opt3: "Ισορροπημένο και υπέροχο — γλυκό αλλά ποτέ κοκτεϊλάτο. Τέλειο.",
    q8_opt4: "Το γλυκό είναι η υπερδύναμή σου — ζεστό, παρήγορο, ακαταμάχητο!",

    // ── Q9: Duration ──────────────────────────────────────────────────
    q9_opt1: "Ελαφριά επαφή — σαν πρωινή ομίχλη, όμορφη και φευγαλέα.",
    q9_opt2: "Ισορροπημένη διάρκεια — παρόν όταν χρειάζεσαι, χαριτωμένο όταν σβήνει.",
    q9_opt3: "Παρουσία όλη μέρα — το άρωμά σου είναι μέρος αυτού που είσαι.",
    q9_opt4: "Θρυλική πορεία — αφήνεις ένα signature που διαρκεί πέρα από κάθε στιγμή.",

    // ── Q10: Projection ───────────────────────────────────────────────
    q10_opt1: "Οικείο και προσωπικό — το άρωμά σου είναι ένας μυστικός κήπος μόνο για σένα.",
    q10_opt2: "Κοντινές συναντήσεις θα σε θυμούνται... αθόρυβη, μαγνητική δύναμη.",
    q10_opt3: "Μια ήπια παρουσία που γεμίζει τον αέρα — κομψά αυταρχική.",
    q10_opt4: "ΤΟΛΜΗΡΟ! Κάνεις είσοδο με το άρωμά σου πριν μιλήσεις καν.",

    // ── Q11: Landscape ────────────────────────────────────────────────
    q11_opt1: "Η θάλασσα είναι στην ψυχή σου — ατέλειωτη, ελεύθερη, αιώνια φρέσκια.",
    q11_opt2: "Το δάσος σε θυμάται... αρχαίο, γειωμένο, βαθιά ζωντανό.",
    q11_opt3: "Ακμάζεις στο ηλεκτρικό, ζωντανό παλμό της νυχτερινής πόλης!",
    q11_opt4: "Η έρημος το σούρουπο — ζεστή, βαθιά, αθόρυβη δύναμη.",

    // ── Q12: Color palette ────────────────────────────────────────────
    q12_opt1: "Απαλό και φωτεινό — σαν πρωινό φως μέσα από μεταξένες κουρτίνες.",
    q12_opt2: "Βαθύ και μυστηριώδες — τα χρώματα του μεσονυκτίου και της μαγείας.",
    q12_opt3: "Γήινο και γειωμένο — τα χρώματα των ριζών, του φλοιού και της ζωής.",
    q12_opt4: "Χρυσό και φωτιά! Λάμπεις έντονα και ζεσταίνεις όλα γύρω σου.",

    // ── Q13: Leather & smoke ──────────────────────────────────────────
    q13_opt1: "Δέρμα και καπνός — ακατέργαστο, δυνατό, αναμφισβήτητα εσύ.",
    q13_opt2: "Μια νύξη σκοταδιού που τους κρατά σε αγωνία... τέλεια γοητεία.",
    q13_opt3: "Καθαρό και ξάστερο είναι η αλήθεια σου — αγνό και αδίσταχτα φρέσκο.",
    q13_opt4: "Η ελαφρότητα είναι η γλώσσα σου — και υπάρχει άπειρη ομορφιά σε αυτό.",

    // ── Q14: Social setting ───────────────────────────────────────────
    q14_opt1: "Ρομαντισμός και οικειότητα — οι καλύτερες στιγμές μοιράζονται με λίγους.",
    q14_opt2: "Κοινωνικό πλάσμα! Η ενέργειά σου φωτίζει κάθε δωμάτιο που μπαίνεις.",
    q14_opt3: "Ελεύθερο και φυσικό — βρίσκεις το κέντρο σου στον ανοιχτό αέρα.",
    q14_opt4: "Καλλιεργημένο και εκλεπτυσμένο — η τέχνη μιλά στις εξαιρετικές αισθήσεις σου.",

    // ── Q15: Temperature ──────────────────────────────────────────────
    q15_opt1: "Πάγος και διαύγεια — το πνεύμα σου τόσο έντονο και καθαρό όσο ο χειμωνιάτικος αέρας.",
    q15_opt2: "Μια δροσερή αύρα σε ζεστή μέρα — ακριβώς αυτό που χρειάζεται ο κόσμος.",
    q15_opt3: "Ζεστός σαν ηλιακό φως... κάνεις όλους γύρω σου να νιώθουν σπίτι τους.",
    q15_opt4: "Έντονη ζεστασιά — είσαι η φωτιά που τραβά τον κόσμο από το κρύο.",

    // ── Q16: Fragrance role ───────────────────────────────────────────
    q16_opt1: "Πανοπλία και τελετουργικό — το άρωμά σου σε προετοιμάζει να κατακτήσεις τη μέρα.",
    q16_opt2: "Καλλιτέχνης διάθεσης! Η συλλογή αρωμάτων σου αφηγείται την καθημερινή σου ιστορία.",
    q16_opt3: "Μαγνητισμός... το άρωμά σου είναι το αόρατο μέρος της γοητείας σου.",
    q16_opt4: "Μια μηχανή του χρόνου σε μπουκάλι — το άρωμά σου κουβαλά αναμνήσεις με χάρη.",

    // ── Q17: Fruit/food notes ─────────────────────────────────────────
    q17_opt1: "Φωτεινό εσπεριδοειδές φως! Η ενέργειά σου τόσο ανυψωτική όσο το βεργαμότο.",
    q17_opt2: "Απαλό, ώριμο και χρυσό — σαν καλοκαιρινό απόγευμα σε οπωρώνα.",
    q17_opt3: "Σκούρο και πλούσιο — προτιμάς φρούτα με βάθος και μυστήριο.",
    q17_opt4: "Καθαρή εκλέπτυνση — αφήνεις τις βαθύτερες νότες να μιλούν από μόνες τους.",

    // ── Q18: Floral ───────────────────────────────────────────────────
    q18_opt1: "Λουλούδι στην καρδιά! Το άρωμά σου θα ανθίζει με κάθε χτύπο της καρδιάς.",
    q18_opt2: "Διακριτικά πέταλα — ένας ανθικός ψίθυρος που προσθέτει βάθος χωρίς να κυριαρχεί.",
    q18_opt3: "Σκούρα τριαντάφυλλα και καπνός... βρίσκεις ομορφιά στις πιο σκιερές γωνιές.",
    q18_opt4: "Πέρα από τα λουλούδια — η ομορφιά σου είναι ακατέργαστη, στοιχειώδης, ανεξέλεγκτη.",

    // ── Q19: Oud & resins ─────────────────────────────────────────────
    q19_opt1: "Οπαδός του oud! Καταλαβαίνεις την αρχαία, ιερή γλώσσα των ρητινών.",
    q19_opt2: "Μια ήπια ρητινώδης ζεστασιά — βάθος χωρίς βαρύτητα. Τέλειο.",
    q19_opt3: "Ανοιχτό και εξερευνητικό — δεν περιορίζεσαι σε έναν μόνο κόσμο.",
    q19_opt4: "Προτιμάς το φως — αέρινο, αναπνεύσιμο, ελεύθερο από βαριές άγκυρες.",

    // ── Q20: Herbs & green ────────────────────────────────────────────
    q20_opt1: "Αρχαία βότανα και ρίζες — η ψυχή σου είναι συνδεδεμένη με τη γη.",
    q20_opt2: "Φρέσκα ζωντανά βότανα! Κουβαλάς τη ζωτικότητα του κήπου μέσα σου.",
    q20_opt3: "Ονείρατα λεβάντας — ήρεμα, θεραπευτικά και διαχρονικά όμορφα.",
    q20_opt4: "Πλουσιότερες, βαθύτερες νότες σε καλούν — η ζεστασιά είναι το φυσικό σου στοιχείο.",

    // ── Q21: Vintage vs modern ────────────────────────────────────────
    q21_opt1: "Μια διαχρονική ψυχή — πούδρα και χάρη, όπως πάντα έπρεπε να είναι.",
    q21_opt2: "Καθαρό και σύγχρονο — ζεις στο παρόν με κομψή απλότητα.",
    q21_opt3: "Το καλύτερο και των δύο κόσμων — σύγχρονη εκλέπτυνση με αρχαίο βάθος.",
    q21_opt4: "Τολμηρά πρωτοποριακό! Ανοίγεις δρόμους για τους άλλους να ακολουθήσουν.",

    // ── Q22: Musk ─────────────────────────────────────────────────────
    q22_opt1: "Καθαρό musk — η μυρωδιά ζεστού δέρματος και καθαρής άνεσης. Ακαταμάχητο.",
    q22_opt2: "Δεύτερο δέρμα... το άρωμά σου γίνεται ένα μαζί σου. Υπέροχο.",
    q22_opt3: "Ακατέργαστο και πρωτόγονο — αγκαλιάζεις τις πιο ενστικτώδεις, μαγνητικές νότες.",
    q22_opt4: "Φρέσκο και αγνό — χωρίς βαρύτητα, μόνο διαύγεια και φως.",

    // ── Q23: Concentration ────────────────────────────────────────────
    q23_opt1: "Ελαφρύ και γοητευτικό — ένα αρωματικό σύννεφο που μαγεύει χωρίς να αποπνίγει.",
    q23_opt2: "Καθημερινή τελειότητα — ισορροπημένο, αξιόπιστο, συνεχώς όμορφο.",
    q23_opt3: "Διαρκής κομψότητα — η παρουσία σου επιμένει σαν αγαπημένη ανάμνηση.",
    q23_opt4: "Καθαρή πολυτέλεια — σου αξίζει η πιο συμπυκνωμένη, δυνατή ουσία.",

    // ── Q24: Inner world ──────────────────────────────────────────────
    q24_opt1: "Γαλήνη εσωτερικά — η εσωτερική σου ειρήνη γίνεται η πιο λαμπερή ιδιότητά σου.",
    q24_opt2: "Πάθος καίει μέσα σου — είναι το καύσιμο κάθε μεγάλης ιστορίας.",
    q24_opt3: "Η ελευθερία είναι το δικαίωμά σου — και το άρωμά σου θα το αντικατοπτρίζει τέλεια.",
    q24_opt4: "Μυστηριώδης και βαθύς — κρατάς τον κόσμο να θέλει να μάθει περισσότερα.",

    // ── Q25: Feeling ──────────────────────────────────────────────────
    q25_opt1: "Η αυτοπεποίθηση είναι το άρωμά σου! Και τώρα θα το κάνουμε κυριολεκτικό — μεγαλειώδες.",
    q25_opt2: "Ο ρομαντισμός ζει στην καρδιά σου — το τέλειο άρωμά σου θα φέρει αυτή τη μαγεία.",
    q25_opt3: "Η γαλήνη είναι η υπερδύναμή σου — το άρωμά σου θα είναι καταφύγιο και για τους άλλους.",
    q25_opt4: "Ελευθερία και περιπέτεια! Το άρωμά σου θα είναι ένα ταξίδι σε κάθε ανάσα.",
  },
};
