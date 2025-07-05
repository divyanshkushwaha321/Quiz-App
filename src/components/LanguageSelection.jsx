import "../styles/LanguageSelection.css"

/**
 * LanguageSelection Component - First screen for choosing quiz language
 * Once selected, all subsequent content will be in the chosen language
 */
const LanguageSelection = ({ onLanguageSelect }) => {
  // Available languages with their native names
  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "de", name: "German", nativeName: "Deutsch" },
    { code: "es", name: "Spanish", nativeName: "Español" },
  ]

  return (
    <div className="language-selection">
      {/* Progress header showing question 1/5 */}
      <div className="progress-header">
        <div className="progress-info">
          <span className="question-number">1/5</span>
        </div>
        {/* Progress bar showing 20% completion (1/5 questions) */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "20%" }}></div>
        </div>
      </div>

      <div className="question-content">
        <h1 className="question-title">What is your preferred language?</h1>
        <p className="question-subtitle">Choose language</p>

        <div className="options-container">
          {languages.map((language) => (
            <button key={language.code} className="option-button" onClick={() => onLanguageSelect(language.code)}>
              {/* <span className="language-name">{language.nativeName}</span> */}
              <span className="language-english">{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSelection
