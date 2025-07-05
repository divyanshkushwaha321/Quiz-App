import { useState } from "react"
import "./styles/App.css"
import LanguageSelection from "./components/LanguageSelection"
import QuizQuestion from "./components/QuizQuestion"
import LoadingScreen from "./components/LoadingScreen"
import EmailScreen from "./components/EmailScreen"
import ThankYouScreen from "./components/ThankYouScreen"
import { translations } from "./data/translations"
import { questions } from "./data/questions"

function App() {
  // Main application state management
  // currentStep controls which screen is displayed: language -> quiz -> loading -> email -> thankyou
  const [currentStep, setCurrentStep] = useState("language")

  // Language selection (en, fr, de, es)
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  // Current question index (0-based) for quiz navigation
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Store all user answers with question ID as key
  const [answers, setAnswers] = useState({})

  // User's email address for final submission
  const [userEmail, setUserEmail] = useState("")

  // Loading progress percentage (0-100) for the loading screen
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Get translations for current selected language
  const t = translations[selectedLanguage]
  
  /**
   * Handle language selection from the first screen
   * @param {string} language - Selected language code (en, fr, de, es)
   */
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    setCurrentStep("quiz") // Move to quiz questions
  }

  /**
   * Handle answer selection for quiz questions
   * @param {string} questionId - Unique identifier for the question
   * @param {string|array} answer - User's selected answer(s)
   */
  const handleAnswerSelect = (questionId, answer) => {
    // Update answers state with new answer
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    // Check if there are more questions or if quiz is complete
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question with slight delay for animation
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 300)
    } else {
      // Quiz complete - move to loading screen
      setTimeout(() => {
        setCurrentStep("loading")
        startLoading()
      }, 300)
    }
  }

  /**
   * Start the loading animation from 0% to 100% over 5 seconds
   */
  const startLoading = () => {
    setLoadingProgress(0)
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Move to email screen after loading completes
          setTimeout(() => {
            setCurrentStep("email")
          }, 500)
          return 100
        }
        // Increment by 2% every 100ms = 5 seconds total
        return prev + 2
      })
    }, 100)
  }

  /**
   * Handle email submission after validation
   * @param {string} email - Validated email address
   */
  const handleEmailSubmit = (email) => {
    setUserEmail(email)
    setCurrentStep("thankyou") // Move to final thank you screen
  }

  /**
   * Reset all application state to restart the quiz
   */
  const handleRetakeQuiz = () => {
    setCurrentStep("language")
    setCurrentQuestionIndex(0)
    setAnswers({})
    setUserEmail("")
    setLoadingProgress(0)
    setSelectedLanguage("en")
  }

  /**
   * Generate and download CSV file with user's quiz answers
   */
  const handleDownloadCSV = () => {
    // Create CSV content with headers and answer data
    const csvContent = [
      ["order", "title", "type", "answer"], // CSV headers
      ...questions.map((question, index) => [
        index + 1, // Question order number
        question.title[selectedLanguage], // Localized question title
        question.type, // Question type (single, multiple, emoji, bubble)
        // Handle both single answers and arrays (for multiple selection)
        Array.isArray(answers[question.id]) ? answers[question.id].join("; ") : answers[question.id] || "",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(",")) // Escape CSV values
      .join("\n")

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "quiz-answers.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  /**
   * Handle back button navigation in quiz
   */
  const handleBackButton = () => {
    if (currentQuestionIndex > 0) {
      // Go to previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      // Go back to language selection if on first question
      setCurrentStep("language")
    }
  }

  // Render appropriate screen based on current step
  return (
    <div className="app">
      {/* Language Selection Screen - First step */}
      {currentStep === "language" && <LanguageSelection onLanguageSelect={handleLanguageSelect} />}

      {/* Quiz Questions Screen - Main quiz flow */}
      {currentStep === "quiz" && (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 2} // +2 because language selection is step 1
          totalQuestions={questions.length + 1} // +1 to include language selection
          onAnswerSelect={handleAnswerSelect}
          onBack={handleBackButton}
          selectedAnswer={answers[questions[currentQuestionIndex]?.id]}
          translations={t}
          selectedLanguage={selectedLanguage} // Pass selected language
        />
      )}

      {/* Loading Screen - 5 second animation */}
      {currentStep === "loading" && <LoadingScreen progress={loadingProgress} translations={t} />}

      {/* Email Input Screen - Collect user email */}
      {currentStep === "email" && <EmailScreen onEmailSubmit={handleEmailSubmit} translations={t} />}

      {/* Thank You Screen - Final screen with download/retake options */}
      {currentStep === "thankyou" && (
        <ThankYouScreen onRetakeQuiz={handleRetakeQuiz} onDownloadCSV={handleDownloadCSV} translations={t} />
      )}
    </div>
  )
}

export default App
