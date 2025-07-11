import { useState, useEffect } from "react"
import "../styles/QuizQuestion.css"

const QuizQuestion = ({
  question, // Current question object with title, options, type
  questionNumber, // Current question number (1-based)
  totalQuestions, // Total number of questions
  onAnswerSelect, // Callback when user selects answer(s)
  onBack, // Callback for back button
  selectedAnswer, // Previously selected answer (for navigation back)
  translations, // Localization object
  selectedLanguage, // Add this new prop for language selection
}) => {
  
  // Stores temporary selections before user clicks "Next"
  const [tempSelectedAnswers, setTempSelectedAnswers] = useState(Array.isArray(selectedAnswer) ? selectedAnswer : [])

  useEffect(() => {
    // Reset temporary selections when question changes or when navigating back
    setTempSelectedAnswers(Array.isArray(selectedAnswer) ? selectedAnswer : [])
  }, [question.id, selectedAnswer])

  
  // Immediately moves to next question
  const handleSingleSelect = (option) => {
    onAnswerSelect(question.id, option)
  }

  // Handle multiple selection questions (checkbox behavior)
  const handleMultiSelect = (option) => {
    const newSelection = tempSelectedAnswers.includes(option)
      ? tempSelectedAnswers.filter((item) => item !== option) // Remove if already selected
      : [...tempSelectedAnswers, option] // Add if not selected

    setTempSelectedAnswers(newSelection)
  }

  // Submit multiple selections when "Next" button is clicked
  const handleMultiSelectNext = () => {
    onAnswerSelect(question.id, tempSelectedAnswers)
  }

// Allows up to 4 selections for topic preferences
  const handleBubbleSelect = (option) => {
    const isSelected = tempSelectedAnswers.includes(option)
    const isAtLimit = tempSelectedAnswers.length >= 3 // Changed from 4 to 3

    if (isSelected) {
      // Always allow deselection
      const newSelection = tempSelectedAnswers.filter((item) => item !== option)
      setTempSelectedAnswers(newSelection)
    } else if (!isAtLimit) {
      // Only allow selection if under limit
      const newSelection = [...tempSelectedAnswers, option]
      setTempSelectedAnswers(newSelection)
    }
  }

  // Calculate progress bar percentage
  const progressPercentage = (questionNumber / totalQuestions) * 100

  return (
    <div className="quiz-question">
      <div className="progress-header">
        {/* Back navigation button */}
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Question counter display */}
        <div className="progress-info">
          <span className="question-number">
            {questionNumber}/{totalQuestions}
          </span>
        </div>

        {/*progress bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="question-content">
        {/* Question title - now uses selected language */}
        <h1 className="question-title">{question.title[selectedLanguage] || question.title.en}</h1>

        {/* Optional question subtitle - now uses selected language */}
        {question.subtitle && (
          <p className="question-subtitle">{question.subtitle[selectedLanguage] || question.subtitle.en}</p>
        )}

        <div className={`options-container ${question.type}`}>
          {/* BUBBLE TYPE: Topic selection with emoji bubbles*/}
          {question.type === "bubble" ? (
            <>
              <div className="bubble-container">
                {question.options.map((option, index) => {
                  const optionText = option.text[selectedLanguage] || option.text.en
                  const isSelected = tempSelectedAnswers.includes(optionText)
                  const isAtLimit = tempSelectedAnswers.length >= 3
                  const isDisabled = !isSelected && isAtLimit

                  return (
                    <button
                      key={index}
                      className={`bubble-option ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                      onClick={() => handleBubbleSelect(optionText)}
                      disabled={isDisabled}
                    >
                      <span className="bubble-emoji">{option.emoji}</span>
                      <span className="bubble-text">{optionText}</span>
                    </button>
                  )
                })}
              </div>

              {/* Show Next button only when exactly 3 selections are made */}
              {tempSelectedAnswers.length === 3 && (
                <button className="next-button" onClick={handleMultiSelectNext}>
                  {translations.next || "Next"}
                </button>
              )}
            </>
          ) : /* EMOJI TYPE: Gender selection  */
          question.type === "emoji" ? (
            <div className="emoji-options">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className="emoji-option"
                  onClick={() => handleSingleSelect(option.text[selectedLanguage] || option.text.en)}
                >
                  <span className="emoji">{option.emoji}</span>
                  <span className="emoji-label">{option.text[selectedLanguage] || option.text.en}</span>
                </button>
              ))}
            </div>
          ) : /* MULTIPLE TYPE: Checkbox-style multiple selection */
          question.type === "multiple" ? (
            <>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button multiple ${tempSelectedAnswers.includes(option[selectedLanguage] || option.en) ? "selected" : ""}`}
                  onClick={() => handleMultiSelect(option[selectedLanguage] || option.en)}
                >
                  <span className="option-text">{option[selectedLanguage] || option.en}</span>
                  {/* Custom checkbox with checkmark */}
                  <div
                    className={`checkbox ${tempSelectedAnswers.includes(option[selectedLanguage] || option.en) ? "checked" : ""}`}
                  >
                    {tempSelectedAnswers.includes(option[selectedLanguage] || option.en) && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13.5 4.5L6 12L2.5 8.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
              {/* Show Next button only when selections are made */}
              {tempSelectedAnswers.length > 0 && (
                <button className="next-button" onClick={handleMultiSelectNext}>
                  {translations.next || "Next"}
                </button>
              )}
            </>
          ) : (
            /* SINGLE TYPE: Default single selection*/
            question.options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleSingleSelect(option[selectedLanguage] || option.en)}
              >
                {option[selectedLanguage] || option.en}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizQuestion
