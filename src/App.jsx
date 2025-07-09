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
  // currentStep controls which screen is displayed: language -> quiz -> loading -> email -> thankyou
  const [currentStep, setCurrentStep] = useState("language")

  const [selectedLanguage, setSelectedLanguage] = useState("en")

  // Current question index for quiz navigation
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Store all user answers with question ID as key
  const [answers, setAnswers] = useState({})

  const [userEmail, setUserEmail] = useState("")

  const [loadingProgress, setLoadingProgress] = useState(0)

  // Get translations for current selected language
  const t = translations[selectedLanguage]
  
  /**
   * Handle language selection from the first screen
   * @param {string} language 
   */
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    setCurrentStep("quiz")
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
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setCurrentStep("loading")
        startLoading()
      }, 300)
    }
  }

  const startLoading = () => {
    setLoadingProgress(0)
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setCurrentStep("email")
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  /**
   * Handle email submission after validation
   * @param {string} email 
   */
  const handleEmailSubmit = (email) => {
    setUserEmail(email)
    setCurrentStep("thankyou") 
  }

  const handleRetakeQuiz = () => {
    setCurrentStep("language")
    setCurrentQuestionIndex(0)
    setAnswers({})
    setUserEmail("")
    setLoadingProgress(0)
    setSelectedLanguage("en")
  }

  
  const handleDownloadCSV = () => {
    // Create CSV content with headers and answer data
    const csvContent = [
      ["order", "title", "type", "answer"], // CSV headers
      ...questions.map((question, index) => [
        index + 1,
        question.title[selectedLanguage],
        question.type,
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

  const handleBackButton = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      setCurrentStep("language")
    }
  }

  return (
    <div className="app">
      {/* Language Selection Screen */}
      {currentStep === "language" && <LanguageSelection onLanguageSelect={handleLanguageSelect} />}

      {/* Quiz Questions Screen*/}
      {currentStep === "quiz" && (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 2}
          totalQuestions={questions.length + 1} 
          onAnswerSelect={handleAnswerSelect}
          onBack={handleBackButton}
          selectedAnswer={answers[questions[currentQuestionIndex]?.id]}
          translations={t}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Loading Screen*/}
      {currentStep === "loading" && <LoadingScreen progress={loadingProgress} translations={t} />}

      {/* Email Input Screen */}
      {currentStep === "email" && <EmailScreen onEmailSubmit={handleEmailSubmit} translations={t} />}

      {/* Thank You Screen */}
      {currentStep === "thankyou" && (
        <ThankYouScreen onRetakeQuiz={handleRetakeQuiz} onDownloadCSV={handleDownloadCSV} translations={t} />
      )}
    </div>
  )
}

export default App
