import "../styles/ThankYouScreen.css"

const ThankYouScreen = ({ onRetakeQuiz, onDownloadCSV, translations }) => {
  return (
    <div className="thankyou-screen">
      <div className="thankyou-content">
        <h1 className="thankyou-title">{translations.thankyou.title}</h1>
        <p className="thankyou-subtitle">{translations.thankyou.subtitle}</p>

        {/* Success checkmark icon */}
        <div className="success-icon">
          <div className="checkmark-circle">
            {/* <img src="../images/tick.svg" alt="" /> */}
          </div>
        </div>

        {/* Action buttons */}
        <div className="action-buttons">
          {/* Download CSV button with download icon - now localized */}
          <button className="download-button" onClick={onDownloadCSV}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 13L6 9H8V3H12V9H14L10 13Z" fill="white" />
              <path d="M4 15H16V17H4V15Z" fill="white" />
            </svg>
            {translations.thankyou.download}
          </button>

          {/* Retake quiz button - resets all state - now localized */}
          <button className="retake-button" onClick={onRetakeQuiz}>
            {translations.thankyou.retake}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThankYouScreen
