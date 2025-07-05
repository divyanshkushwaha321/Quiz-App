/**
 * Quiz Questions Data Structure
 *
 * Progress Structure (5 total steps):
 * Step 1/5: Language Selection (20% progress)
 * Step 2/5: Gender Question (40% progress)
 * Step 3/5: Age Question (60% progress)
 * Step 4/5: Book Preferences (80% progress)
 * Step 5/5: Topic Selection (100% progress)
 *
 * Each question object contains:
 * - id: Unique identifier for storing answers
 * - type: Question interaction type (single, multiple, emoji, bubble)
 * - title: Question text in all supported languages
 * - subtitle: Optional additional instruction text
 * - options: Array of possible answers with localization
 */

export const questions = [
  {
    id: "gender", // Unique identifier for this question
    type: "emoji", // Uses large emoji buttons for selection
    title: {
      en: "What gender do you identify with?",
      fr: "À quel genre vous identifiez-vous?",
      de: "Mit welchem Geschlecht identifizieren Sie sich?",
      es: "¿Con qué género te identificas?",
    },
    subtitle: {
      en: "Please share how do you identify yourself",
      fr: "Veuillez partager comment vous vous identifiez",
      de: "Bitte teilen Sie mit, wie Sie sich identifizieren",
      es: "Por favor comparte cómo te identificas",
    },
    options: [
      {
        emoji: "👩", // Visual emoji for female option
        text: {
          en: "Female",
          fr: "Femme",
          de: "Weiblich",
          es: "Femenino",
        },
      },
      {
        emoji: "👨", // Visual emoji for male option
        text: {
          en: "Male",
          fr: "Homme",
          de: "Männlich",
          es: "Masculino",
        },
      },
      {
        emoji: "😊", // Visual emoji for other option
        text: {
          en: "Other",
          fr: "Autre",
          de: "Andere",
          es: "Otro",
        },
      },
    ],
  },
  {
    id: "age", // Age range selection
    type: "single", // Single selection, moves immediately to next question
    title: {
      en: "What is your age?",
      fr: "Quel est votre âge?",
      de: "Wie alt sind Sie?",
      es: "¿Cuál es tu edad?",
    },
    options: [
      {
        en: "18-29 years",
        fr: "18-29 ans",
        de: "18-29 Jahre",
        es: "18-29 años",
      },
      {
        en: "30-39 years",
        fr: "30-39 ans",
        de: "30-39 Jahre",
        es: "30-39 años",
      },
      {
        en: "40-49 years",
        fr: "40-49 ans",
        de: "40-49 Jahre",
        es: "40-49 años",
      },
      {
        en: "50+",
        fr: "50+",
        de: "50+",
        es: "50+",
      },
    ],
  },
  {
    id: "book_hate", // Multiple selection question about book preferences
    type: "multiple", // Allows multiple selections with checkboxes
    title: {
      en: "What do you hate the most in a book?",
      fr: "Que détestez-vous le plus dans un livre?",
      de: "Was hassen Sie am meisten an einem Buch?",
      es: "¿Qué es lo que más odias en un libro?",
    },
    options: [
      {
        en: "Lack of logic",
        fr: "Manque de logique",
        de: "Mangel an Logik",
        es: "Falta de lógica",
      },
      {
        en: "A slow speed",
        fr: "Un rythme lent",
        de: "Ein langsames Tempo",
        es: "Un ritmo lento",
      },
      {
        en: "Lack of humor",
        fr: "Manque d'humour",
        de: "Mangel an Humor",
        es: "Falta de humor",
      },
      {
        en: "Way too generic ending",
        fr: "Fin trop générique",
        de: "Viel zu generisches Ende",
        es: "Final demasiado genérico",
      },
    ],
  },
  {
    id: "topics", // Topic preference selection
    type: "bubble", // Bubble selection with emoji icons, limited to 3 selections
    title: {
      en: "What are your favorite topics?",
      fr: "Quels sont vos sujets préférés?",
      de: "Was sind Ihre Lieblingsthemen?",
      es: "¿Cuáles son tus temas favoritos?",
    },
    subtitle: {
      en: "Choose up to 3 topics you like",
      fr: "Choisissez jusqu'à 3 sujets que vous aimez",
      de: "Wählen Sie bis zu 3 Themen, die Ihnen gefallen",
      es: "Elige hasta 3 temas que te gusten",
    },
    options: [
      {
        emoji: "🐺", // Werewolf genre
        text: {
          en: "Werewolf",
          fr: "Loup-garou",
          de: "Werwolf",
          es: "Hombre lobo",
        },
      },
      {
        emoji: "⚔️",// Action
        text: {
          en: "Action",
          fr: "Action",
          de: "Action",
          es: "Acción",
        },
      },
      {
        emoji: "👑",
        text: {
          en: "Royal Obsession",
          fr: "Obsession Royale",
          de: "Königliche Obsession",
          es: "Obsesión Real",
        },
      },
      {
        emoji: "🤑", // Wealth/billionaire theme
        text: {
          en: "Billionaire",
          fr: "Milliardaire",
          de: "Milliardär",
          es: "Multimillonario",
        },
      },
      {
        emoji: "🥰", // Romance genre
        text: {
          en: "Romance",
          fr: "Romance",
          de: "Romantik",
          es: "Romance",
        },
      },
      {
        emoji: "👶", // Young adult genre
        text: {
          en: "Young Adult",
          fr: "Jeune Adulte",
          de: "Jugendliche",
          es: "Joven Adulto",
        },
      },
      {
        emoji: "🤠", // Bad boy trope
        text: {
          en: "Bad Boy",
          fr: "Mauvais Garçon",
          de: "Böser Junge",
          es: "Chico Malo",
        },
      },
    ],
  },
]
