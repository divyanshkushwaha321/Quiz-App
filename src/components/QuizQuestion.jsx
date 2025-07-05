"use client"

import { useState } from "react"
import "../styles/QuizQuestion.css"

/**
 * QuizQuestion Component - Renders different types of quiz questions
 * Supports: single select, multiple select, emoji selection, and bubble selection
 */
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
  // Local state for multiple selection questions (checkboxes and bubbles)
  // Stores temporary selections before user clicks "Next"
  const [tempSelectedAnswers, setTempSelectedAnswers] = useState(Array.isArray(selectedAnswer) ? selectedAnswer : [])

  /**
   * Handle single selection questions (radio button behavior)
   * Immediately moves to next question
   */
  const handleSingleSelect = (option) => {
    onAnswerSelect(question.id, option)
  }

  /**
   * Handle multiple selection questions (checkbox behavior)
   * Updates temporary state, requires "Next" button click
   */
  const handleMultiSelect = (option) => {
    const newSelection = tempSelectedAnswers.includes(option)
      ? tempSelectedAnswers.filter((item) => item !== option) // Remove if already selected
      : [...tempSelectedAnswers, option] // Add if not selected

    setTempSelectedAnswers(newSelection)
  }

  /**
   * Submit multiple selections when "Next" button is clicked
   */
  const handleMultiSelectNext = () => {
    onAnswerSelect(question.id, tempSelectedAnswers)
  }

  /**
   * Handle bubble selection questions (limited multiple selection)
   * Allows up to 4 selections for topic preferences
   */
  const handleBubbleSelect = (option) => {
    const isSelected = tempSelectedAnswers.includes(option)
    const isAtLimit = tempSelectedAnswers.length >= 4 // Changed from 3 to 4

    if (isSelected) {
      // Always allow deselection
      const newSelection = tempSelectedAnswers.filter((item) => item !== option)
      setTempSelectedAnswers(newSelection)
    } else if (!isAtLimit) {
      // Only allow selection if under limit
      const newSelection = [...tempSelectedAnswers, option]
      setTempSelectedAnswers(newSelection)
    }
    // If at limit and not selected, do nothing (button should be disabled)
  }

  // Calculate progress bar percentage - now includes language selection as step 1
  const progressPercentage = (questionNumber / totalQuestions) * 100

  return (
    <div className="quiz-question">
      {/* Header with back button, progress indicator, and progress bar */}
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

        {/* Visual progress bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* Main question content area */}
      <div className="question-content">
        {/* Question title - now uses selected language */}
        <h1 className="question-title">{question.title[selectedLanguage] || question.title.en}</h1>

        {/* Optional question subtitle - now uses selected language */}
        {question.subtitle && (
          <p className="question-subtitle">{question.subtitle[selectedLanguage] || question.subtitle.en}</p>
        )}

        {/* Dynamic options container based on question type */}
        <div className={`options-container ${question.type}`}>
          {/* BUBBLE TYPE: Topic selection with emoji bubbles (max 4 selections) */}
          {question.type === "bubble" ? (
            <>
              <div className="bubble-container">
                {question.options.map((option, index) => {
                  const optionText = option.text[selectedLanguage] || option.text.en
                  const isSelected = tempSelectedAnswers.includes(optionText)
                  const isAtLimit = tempSelectedAnswers.length >= 4
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

              {/* Show Next button only when selections are made */}
              {tempSelectedAnswers.length > 0 && (
                <button className="next-button" onClick={handleMultiSelectNext}>
                  {translations.next || "Next"}
                </button>
              )}
            </>
          ) : /* EMOJI TYPE: Gender selection with large emoji buttons */
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
            /* SINGLE TYPE: Default single selection (age ranges) */
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
