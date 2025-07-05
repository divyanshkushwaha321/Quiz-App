import "../styles/LoadingScreen.css"

/**
 * LoadingScreen Component - Displays animated circular progress indicator
 * Shows progress from 0% to 100% over 5 seconds with loading message
 */
const LoadingScreen = ({ progress, translations }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Animated circular progress indicator */}
        <div className="progress-circle">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Background circle (gray) */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="8" />

            {/* Progress circle (gradient) */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              // Calculate stroke dash offset based on progress percentage
              strokeDasharray={`${2 * Math.PI * 90}`} // Full circumference
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`} // Offset based on progress
              transform="rotate(-90 100 100)" // Start from top instead of right
            />

            {/* Gradient definition for progress circle */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E91E63" />
                <stop offset="100%" stopColor="#9C27B0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Progress percentage text in center of circle */}
          <div className="progress-text">
            <span className="progress-percentage">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading message below the progress circle - now localized */}
        <p className="loading-message">{translations.loading || "Finding collections for you..."}</p>
      </div>
    </div>
  )
}

export default LoadingScreen
