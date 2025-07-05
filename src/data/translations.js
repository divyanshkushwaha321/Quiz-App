/**
 * Internationalization (i18n) Translations
 *
 * Supports 4 languages: English (en), French (fr), German (de), Spanish (es)
 */

export const translations = {
  // English translations (default language)
  en: {
    loading: "Finding collections for you...", // Loading screen message
    next: "Next", // Next button text for questions
    selectionCounter: "selected", // For "3/4 selected" instead of "2/3 selected"
    email: {
      title: "Email", // Screen title
      subtitle: "Enter your email to get full access", // Instruction text
      placeholder: "Your email", // Input placeholder
      privacy: "By continuing I agree with Privacy policy and Terms of use.", // Legal notice
      next: "Next", // Submit button text
      required: "Email is required", // Validation error for empty field
      invalid: "Please enter a valid email address", // Validation error for invalid format
    },
    thankyou: {
      title: "Thank you", // Main title
      subtitle: "for supporting us and passing quiz", // Subtitle text
      download: "Download my answers", // Download button text
      retake: "Retake quiz", // Retake button text
    },
  },

  // French translations
  fr: {
    loading: "Recherche de collections pour vous...",
    next: "Suivant", // Next button text for questions
    selectionCounter: "sélectionné", // For "3/4 sélectionné" instead of "2/3 sélectionné"
    email: {
      title: "Email",
      subtitle: "Entrez votre email pour obtenir un accès complet",
      placeholder: "Votre email",
      privacy: "En continuant, j'accepte la Politique de confidentialité et les Conditions d'utilisation.",
      next: "Suivant",
      required: "L'email est requis",
      invalid: "Veuillez entrer une adresse email valide",
    },
    thankyou: {
      title: "Merci",
      subtitle: "de nous soutenir et de passer le quiz",
      download: "Télécharger mes réponses",
      retake: "Reprendre le quiz",
    },
  },

  // German translations
  de: {
    loading: "Sammlungen für Sie finden...",
    next: "Weiter", // Next button text for questions
    selectionCounter: "ausgewählt", // For "3/4 ausgewählt" instead of "2/3 ausgewählt"
    email: {
      title: "Email",
      subtitle: "Geben Sie Ihre E-Mail ein, um vollen Zugang zu erhalten",
      placeholder: "Ihre E-Mail",
      privacy: "Durch Fortfahren stimme ich der Datenschutzrichtlinie und den Nutzungsbedingungen zu.",
      next: "Weiter",
      required: "E-Mail ist erforderlich",
      invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    },
    thankyou: {
      title: "Danke",
      subtitle: "dass Sie uns unterstützen und das Quiz bestehen",
      download: "Meine Antworten herunterladen",
      retake: "Quiz wiederholen",
    },
  },

  // Spanish translations
  es: {
    loading: "Encontrando colecciones para ti...",
    next: "Siguiente", // Next button text for questions
    selectionCounter: "seleccionado", // For "3/4 seleccionado" instead of "2/3 seleccionado"
    email: {
      title: "Email",
      subtitle: "Ingresa tu email para obtener acceso completo",
      placeholder: "Tu email",
      privacy: "Al continuar acepto la Política de privacidad y los Términos de uso.",
      next: "Siguiente",
      required: "El email es requerido",
      invalid: "Por favor ingresa una dirección de email válida",
    },
    thankyou: {
      title: "Gracias",
      subtitle: "por apoyarnos y completar el quiz",
      download: "Descargar mis respuestas",
      retake: "Repetir quiz",
    },
  },
}
