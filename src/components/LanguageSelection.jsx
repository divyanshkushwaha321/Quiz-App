import "../styles/LanguageSelection.css"

const LanguageSelection = ({ onLanguageSelect }) => {
  const languages = [
    { code: "en", name: "English"},
    { code: "fr", name: "French"},
    { code: "de", name: "German"},
    { code: "es", name: "Spanish"},
  ]

  return (
    <div className="language-selection">
      <div className="progress-header">
        <div className="progress-info">
          <span className="question-number">1/5</span>
        </div>
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
              <span className="language-english">{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSelection
